import { Injectable, InternalServerErrorException, Logger, NotFoundException, BadRequestException, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentService } from '../payment/payment.service';
import { EmailService } from '../email/email.service';
import { Smtp2goService } from '../smtp2go/smtp2go.service';
import * as bcrypt from 'bcrypt';
import dayjs from 'dayjs';

function formatPhoneNumber(phone?: string): string {
  if (!phone) return '';
  const trimmed = String(phone).trim();
  if (!trimmed || trimmed === '-') return '';

  // If already starts with '+'
  if (trimmed.startsWith('+')) {
    return trimmed;
  }

  // If starts with '00' (international prefix)
  if (trimmed.startsWith('00')) {
    return `+${trimmed.slice(2)}`;
  }

  // Clean all characters except digits
  const cleanDigits = trimmed.replace(/\D/g, '');
  if (!cleanDigits) return trimmed;

  // If already has 971 at start (UAE country code)
  if (cleanDigits.startsWith('971')) {
    return `+${cleanDigits}`;
  }

  // If starts with 91 and has 12 digits (India country code)
  if (cleanDigits.startsWith('91') && cleanDigits.length === 12) {
    return `+${cleanDigits}`;
  }

  // If starts with '0' (e.g. 0558840978 in UAE local format)
  if (cleanDigits.startsWith('0')) {
    return `+971 ${cleanDigits.slice(1)}`;
  }

  // If 9 digits starting with 5 (UAE mobile without 0, e.g. 558840978)
  if (cleanDigits.length === 9 && cleanDigits.startsWith('5')) {
    return `+971 ${cleanDigits}`;
  }

  // If 7 digits (e.g. 1234567)
  if (cleanDigits.length === 7) {
    return `+971 ${cleanDigits}`;
  }

  // Fallback: prepend +971
  return `+971 ${trimmed}`;
}

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentService: PaymentService,
    private readonly emailService: EmailService,
    private readonly smtp2goService: Smtp2goService,
  ) {}

  async createBooking(data: any): Promise<{ paymentUrl: string }> {
    try {
      const sessionId = typeof data.sessionId === 'number' ? data.sessionId : parseInt(String(data.sessionId || '').replace(/\D/g, ''), 10);
      let serviceOptionId = data.serviceOptionId ? (typeof data.serviceOptionId === 'number' ? data.serviceOptionId : parseInt(String(data.serviceOptionId || '').replace(/\D/g, ''), 10)) : null;
      const locationId = data.locationId ? (typeof data.locationId === 'number' ? data.locationId : parseInt(String(data.locationId || '').replace(/\D/g, ''), 10)) : null;

      // 1. Create Booking in DB (Status: PENDING)
      const session = await this.prisma.session.findUnique({ 
        where: { id: sessionId },
        include: { category: true }
      });
      if (!session) throw new NotFoundException(`Session not found (id: ${data.sessionId})`);

      const isSocialPlay =
        (session.category?.name ?? '').toLowerCase() === 'social play' ||
        (session.category?.name ?? '').toLowerCase().includes('social') ||
        session.title.toLowerCase().includes('play date');

      let serviceOption = serviceOptionId 
        ? await this.prisma.serviceOption.findUnique({ where: { id: serviceOptionId } })
        : null;

      // For Social Play, ensure default to Regular (price 0)
      if (isSocialPlay && (!serviceOption || Number(serviceOption.price) > 0)) {
        const regularOption = await this.prisma.serviceOption.findFirst({
          where: { OR: [{ name: 'Regular' }, { price: 0 }] }
        });
        if (regularOption) {
          serviceOption = regularOption;
          serviceOptionId = regularOption.id;
        }
      }
      
      const unitPrice = parseFloat(session.pricePerPerson.toString()) + (serviceOption ? parseFloat(serviceOption.price.toString()) : 0);
      const totalAmount = unitPrice * data.participants.length;

      // Parse bookingDate correctly as UTC to prevent timezone shifts
      // Expecting data.bookingDate to be in 'YYYY-MM-DD' format
      const bookingDate = new Date(`${data.bookingDate}T00:00:00.000Z`);
      
      // Validate that booking satisfies the minimum 2 working days advance notice
      const nowInDubai = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));
      const today = dayjs(nowInDubai).startOf('day');

      let workingDaysCounted = 0;
      let checkDate = today.add(1, 'day');
      const upcomingOverrides = await this.prisma.dateOverride.findMany({
        where: {
          date: {
            gte: today.toDate(),
            lte: today.add(14, 'day').toDate(),
          },
        },
      });
      while (workingDaysCounted < 2) {
        const dateStr = checkDate.format('YYYY-MM-DD');
        const dow = checkDate.day();
        const isWeekend = dow === 0 || dow === 6; // Sunday (0) or Saturday (6)
        const override = upcomingOverrides.find(
          (o) => dayjs(o.date).format('YYYY-MM-DD') === dateStr
        );
        const isClosed = override ? override.isClosed : isWeekend;

        if (!isClosed) {
          workingDaysCounted++;
        }
        if (workingDaysCounted < 2) {
          checkDate = checkDate.add(1, 'day');
        }
      }
      const earliestBookable = checkDate.add(1, 'day');

      if (dayjs(data.bookingDate).isBefore(earliestBookable, 'day')) {
        throw new BadRequestException('Bookings require at least 2 working days advance notice.');
      }

      // --- SMART CHECK: Overlap & Capacity ---
      if (!isSocialPlay) {
        const timeToMins = (t: string) => {
          if (!t) return 0;
          const isPM = /pm/i.test(t);
          const isAM = /am/i.test(t);
          const cleanTime = t.replace(/(am|pm)/i, '').trim();
          const parts = cleanTime.split(':').map(s => parseInt(s, 10) || 0);
          let hours = parts[0] || 0;
          const minutes = parts[1] || 0;
          if (isPM && hours < 12) hours += 12;
          if (isAM && hours === 12) hours = 0;
          return hours * 60 + minutes;
        };
        const reqStartMins = timeToMins(data.startTime);
        const reqEndMins = timeToMins(data.endTime);

        const overlappingBookings = await this.prisma.booking.findMany({
          where: {
            bookingDate,
            OR: [
              { status: 'SUCCESS' },
              { status: 'PENDING', createdAt: { gte: new Date(Date.now() - 15 * 60000) } },
            ],
            session: {
              type: session.type,
              category: {
                name: { not: 'Social Play' }
              }
            }
          },
          include: { session: true }
        });

        // 1. Instructor Conflict Check (Overlapping DIFFERENT sessions)
        const instructorBusy = overlappingBookings.some(b => {
          if (!b.startTime || !b.endTime) return false;
          const bStart = timeToMins(b.startTime);
          const bEnd = timeToMins(b.endTime);
          const overlaps = Math.max(reqStartMins, bStart) < Math.min(reqEndMins, bEnd);
          if (overlaps && (b.sessionId !== sessionId || b.startTime !== data.startTime || b.endTime !== data.endTime)) {
            return true;
          }
          return false;
        });

        if (instructorBusy) {
          throw new BadRequestException('The instructor is unavailable for this time slot due to another scheduled session.');
        }

        // 2. Capacity Check for the exact same session slot
        const sameSlotBookings = overlappingBookings.filter(b => 
          b.sessionId === sessionId && b.startTime === data.startTime && b.endTime === data.endTime
        );
        const currentBookedCount = sameSlotBookings.reduce((sum, b) => sum + (b.quantity || 1), 0);
        const maxCapacity = session.maxPlayers || 4;

        if (currentBookedCount + data.participants.length > maxCapacity) {
          const availableLeft = Math.max(0, maxCapacity - currentBookedCount);
          throw new BadRequestException(`Only ${availableLeft} seat(s) remaining for this time slot.`);
        }
      }
      // ---------------------------------------

      const formattedContactPhone = formatPhoneNumber(data.contactPhone);

      const booking = await this.prisma.booking.create({
        data: {
          sessionId: sessionId,
          serviceOptionId: serviceOptionId,
          locationId: locationId || null,
          notes: data.notes || null,
          level: data.level || null,
          bookingDate,
          startTime: data.startTime,
          endTime: data.endTime,
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          contactPhone: formattedContactPhone,
          unitPrice,
          quantity: data.participants.length,
          totalAmount,
          status: 'PENDING',
          participants: {
            create: data.participants.map((p: any) => {
              const ageGroupId = p.ageGroupId ? (typeof p.ageGroupId === 'number' ? p.ageGroupId : parseInt(String(p.ageGroupId).replace(/\D/g, ''), 10)) : null;
              return {
                ageGroupId: isNaN(ageGroupId as number) ? null : ageGroupId,
                fullName: p.fullName || p.name || 'Guest',
                email: p.email,
                phone: formatPhoneNumber(p.phone) || formattedContactPhone,
                isOwner: p.isOwner || false,
              };
            }),
          },
        },
      });

      // 2. Generate Payment Link via N-Genius
      const amountInMinorUnits = Math.round(totalAmount * 100);
      const frontendBase = (process.env.FRONTEND_URL || 'https://staging.mahjongsuccess.com').replace(/\/+$/, '');
      const redirectUrl = `${frontendBase}/payment/callback?source=${encodeURIComponent(data.source || '/book-session')}`;
      console.log('Sending redirectUrl to N-Genius:', redirectUrl);

      const { orderReference, paymentLink } = await this.paymentService.createOrder(
        amountInMinorUnits,
        redirectUrl,
        {
          firstName: data.contactName.split(' ')[0],
          lastName: data.contactName.split(' ').slice(1).join(' ') || '.',
        }
      );

      // 3. Create Payment Record linked to Booking
      await this.prisma.payment.create({
        data: {
          bookingId: booking.id,
          provider: 'ngenius',
          transactionId: orderReference,
          paymentUrl: paymentLink,
          amount: totalAmount,
          currency: process.env.PAYMENT_CURRENCY || 'AED',
          status: 'PENDING',
        },
      });

      return { paymentUrl: paymentLink };
    } catch (error) {
      this.logger.error('Failed to create booking', error);
      console.error('Failed to create booking full error:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error?.message || 'Booking creation failed');
    }
  }

  async verifyPayment(orderReference: string): Promise<any> {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: { transactionId: orderReference },
        include: {
          booking: {
            include: {
              session: {
                include: {
                  category: {
                    include: {
                      game: true,
                    },
                  },
                },
              },
              participants: {
                include: {
                  ageGroup: true,
                },
              },
              location: true,
              serviceOption: true,
              payment: true,
            },
          },
        },
      });

      if (!payment) throw new NotFoundException('Payment record not found');

      // Check with N-Genius
      const statusData = await this.paymentService.getOrderStatus(orderReference);
      
      // N-Genius states: 'AUTHORISED', 'CAPTURED', etc.
      const isSuccess = statusData._embedded?.payment?.[0]?.state === 'CAPTURED' || statusData._embedded?.payment?.[0]?.state === 'AUTHORISED';

      if (isSuccess && payment.status !== 'SUCCESS') {
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'SUCCESS' },
        });
        await this.prisma.booking.update({
          where: { id: payment.bookingId },
          data: { status: 'SUCCESS' },
        });
        // Asynchronously process user creation and send emails
        this.processBookingUsers(payment.booking).catch(e => 
          this.logger.error('Background user processing failed', e)
        );
      } else if (!isSuccess && payment.status !== 'FAILED') {
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'FAILED' },
        });
        await this.prisma.booking.update({
          where: { id: payment.bookingId },
          data: { status: 'FAILED' },
        });

        // Send payment failure email to the user
        const customerEmail =
          payment.booking?.contactEmail ||
          payment.booking?.participants?.find((p: any) => p.isOwner)?.email ||
          payment.booking?.participants?.[0]?.email;
        const customerName =
          payment.booking?.contactName ||
          payment.booking?.participants?.find((p: any) => p.isOwner)?.fullName ||
          payment.booking?.participants?.[0]?.fullName ||
          'Valued Player';

        const rawState = statusData?._embedded?.payment?.[0]?.state || statusData?.state;
        const authMessage = statusData?._embedded?.payment?.[0]?.authResponse?.message;
        const failureReason =
          authMessage ||
          (rawState ? `Gateway status: ${rawState}` : 'Transaction was declined or cancelled by the card issuer / bank.');

        if (customerEmail) {
          this.emailService
            .sendPaymentFailedEmail(customerEmail, customerName, payment.booking, failureReason)
            .catch((e) =>
              this.logger.error(`Background payment failure email failed for ${customerEmail}`, e),
            );
        }
      }

      const venueSetting = await this.prisma.setting.findUnique({ where: { key: 'VENUE_DETAILS' } });

      const sessionTitle = payment.booking?.session?.title || '';
      const catName = payment.booking?.session?.category?.name || '';
      const isLevelSession = /level\s*\d+/i.test(sessionTitle) || /^level\s*\d+/i.test(catName);
      let sessionLevel: string | null = null;
      if (isLevelSession) {
        const titleMatch = sessionTitle.match(/level\s*\d+/i);
        const catMatch = catName.match(/level\s*\d+/i);
        sessionLevel = titleMatch ? titleMatch[0] : (catMatch ? catMatch[0] : null);
      }
      const finalLevel = payment.booking?.level || sessionLevel || null;

      const isSocialPlay =
        catName.toLowerCase() === 'social play' ||
        catName.toLowerCase().includes('social') ||
        sessionTitle.toLowerCase().includes('play date') ||
        sessionTitle.toLowerCase().includes('social play');

      let venueDisplay = '';
      let locationDisplay = '';
      if (isSocialPlay) {
        // For Social Play / Guided Games:
        // Venue: Cafe name (location.description)
        // Location: Area name (location.name)
        let areaName = payment.booking?.location?.name;
        if (!areaName && payment.booking?.notes) {
          const match = payment.booking.notes.match(/Preferred Location:\s*([^|]+)/i);
          if (match && match[1]) areaName = match[1].trim();
        }
        const cafeName = payment.booking?.location?.description;
        venueDisplay = cafeName || areaName || 'Preferred Venue';
        locationDisplay = areaName || '';
      } else {
        venueDisplay = payment.booking?.location?.address || payment.booking?.location?.name || venueSetting?.value || 'Venue address not set';
        locationDisplay = payment.booking?.location?.name || '';
      }

      return {
        success: isSuccess,
        bookingId: payment.bookingId,
        orderReference: payment.transactionId,
        sessionName: payment.booking?.session?.title,
        gameName: payment.booking?.session?.category?.game?.name,
        categoryName: payment.booking?.session?.category?.name,
        level: finalLevel,
        levelName: finalLevel || '',
        date: payment.booking?.bookingDate?.toISOString(),
        startTime: payment.booking?.startTime,
        endTime: payment.booking?.endTime,
        venue: venueDisplay,
        locationName: locationDisplay,
        status: statusData.state,
      };
    } catch (error) {
      this.logger.error(`Failed to verify payment for ${orderReference}`, error);
      throw new InternalServerErrorException('Payment verification failed');
    }
  }

  private async processBookingUsers(booking: any) {
    const participants = booking.participants || [];
    
    // Process all participants concurrently
    await Promise.all(participants.map(async (p: any) => {
      if (!p.email) return; // Skip if no email provided

      let user = await this.prisma.user.findUnique({ where: { email: p.email } });
      let isNewUser = false;
      let plainPassword = '';

      if (!user) {
        // Create new user
        plainPassword = Math.random().toString(36).slice(-8); // Random 8-char password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        
        user = await this.prisma.user.create({
          data: {
            email: p.email,
            password: hashedPassword,
            name: p.fullName || 'Guest',
            role: 'USER',
          }
        });
        isNewUser = true;
      }

      // Send customer confirmation email
      await this.emailService.sendBookingConfirmation(
        p.email,
        user.name,
        isNewUser,
        plainPassword,
        booking
      );
    }));

    // Send admin notification email to mahjongsuccess@gmail.com with CC to srinath.u@infozzle.com
    try {
      await this.emailService.sendBookingAdminNotification(booking);
    } catch (e) {
      this.logger.error('Failed to send admin booking notification email', e);
    }
  }

  async getAllBookings(
    limit?: number,
    offset?: number,
    startDate?: string,
    endDate?: string,
    search?: string,
    status?: string,
    type?: string,
  ) {
    try {
      const dateWhere: any = {};
      if (startDate || endDate) {
        dateWhere.createdAt = {};
        if (startDate) dateWhere.createdAt.gte = new Date(startDate);
        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          dateWhere.createdAt.lte = end;
        }
      }

      const where: any = { ...dateWhere };

      if (status && status !== 'ALL') {
        if (status === 'SUCCESS') {
          where.OR = [
            { status: 'SUCCESS' },
            { payment: { status: 'SUCCESS' } },
          ];
        } else if (status === 'PENDING') {
          where.OR = [
            { status: 'PENDING' },
            { payment: { status: 'PENDING' } },
          ];
        } else if (status === 'FAILED') {
          where.OR = [
            { status: 'FAILED' },
            { payment: { status: 'FAILED' } },
          ];
        }
      }

      // Booking Type Filter: TRAINING, GUIDED_GAME, PLAY_DATE
      if (type && type !== 'ALL') {
        if (type === 'PLAY_DATE') {
          where.session = {
            OR: [
              { category: { name: { contains: 'social', mode: 'insensitive' } } },
              { title: { contains: 'play date', mode: 'insensitive' } },
            ],
          };
        } else if (type === 'GUIDED_GAME') {
          where.session = {
            AND: [
              {
                OR: [
                  { type: 'GUIDED_GAME' },
                  { category: { name: { contains: 'guided', mode: 'insensitive' } } },
                  { title: { contains: 'game session', mode: 'insensitive' } },
                  { title: { contains: 'guided', mode: 'insensitive' } },
                ],
              },
              {
                NOT: {
                  OR: [
                    { category: { name: { contains: 'social', mode: 'insensitive' } } },
                    { title: { contains: 'play date', mode: 'insensitive' } },
                  ],
                },
              },
            ],
          };
        } else if (type === 'TRAINING') {
          where.session = {
            AND: [
              {
                OR: [
                  { type: 'TRAINING' },
                  { category: { name: { contains: 'level', mode: 'insensitive' } } },
                  { category: { name: { contains: 'bundle', mode: 'insensitive' } } },
                ],
              },
              {
                NOT: {
                  OR: [
                    { category: { name: { contains: 'social', mode: 'insensitive' } } },
                    { title: { contains: 'play date', mode: 'insensitive' } },
                    { type: 'GUIDED_GAME' },
                    { category: { name: { contains: 'guided', mode: 'insensitive' } } },
                    { title: { contains: 'game session', mode: 'insensitive' } },
                  ],
                },
              },
            ],
          };
        }
      }

      // Search Query (Session, Game, Customer Name, Email, Phone, Level, Transaction ID, Location)
      if (search && search.trim()) {
        const q = search.trim();
        const searchConditions: any[] = [
          { contactName: { contains: q, mode: 'insensitive' } },
          { contactEmail: { contains: q, mode: 'insensitive' } },
          { contactPhone: { contains: q, mode: 'insensitive' } },
          { level: { contains: q, mode: 'insensitive' } },
          { session: { title: { contains: q, mode: 'insensitive' } } },
          { session: { category: { name: { contains: q, mode: 'insensitive' } } } },
          { session: { category: { game: { name: { contains: q, mode: 'insensitive' } } } } },
          { location: { name: { contains: q, mode: 'insensitive' } } },
          { serviceOption: { name: { contains: q, mode: 'insensitive' } } },
          { payment: { transactionId: { contains: q, mode: 'insensitive' } } },
          { participants: { some: { fullName: { contains: q, mode: 'insensitive' } } } },
          { participants: { some: { email: { contains: q, mode: 'insensitive' } } } },
        ];

        const idNum = Number(q.replace('#', ''));
        if (!isNaN(idNum) && idNum > 0) {
          searchConditions.push({ id: idNum });
        }

        if (where.AND) {
          where.AND.push({ OR: searchConditions });
        } else if (where.OR) {
          where.AND = [
            { OR: where.OR },
            { OR: searchConditions },
          ];
          delete where.OR;
        } else {
          where.OR = searchConditions;
        }
      }

      const total = await this.prisma.booking.count({ where });
      const data = await this.prisma.booking.findMany({
        where,
        orderBy: {
          id: 'desc',
        },
        take: limit && Number(limit) > 0 ? Number(limit) : undefined,
        skip: offset ? Number(offset) : undefined,
        include: {
          session: { include: { category: { include: { game: true } } } },
          serviceOption: true,
          participants: { include: { ageGroup: true } },
          payment: true,
          location: true,
        },
      });

      // Compute segregation counts for the current date filter
      const counts = {
        all: await this.prisma.booking.count({ where: dateWhere }),
        training: await this.prisma.booking.count({
          where: {
            ...dateWhere,
            session: {
              AND: [
                {
                  OR: [
                    { type: 'TRAINING' },
                    { category: { name: { contains: 'level', mode: 'insensitive' } } },
                    { category: { name: { contains: 'bundle', mode: 'insensitive' } } },
                  ],
                },
                {
                  NOT: {
                    OR: [
                      { category: { name: { contains: 'social', mode: 'insensitive' } } },
                      { title: { contains: 'play date', mode: 'insensitive' } },
                      { type: 'GUIDED_GAME' },
                      { category: { name: { contains: 'guided', mode: 'insensitive' } } },
                      { title: { contains: 'game session', mode: 'insensitive' } },
                    ],
                  },
                },
              ],
            },
          },
        }),
        guidedGames: await this.prisma.booking.count({
          where: {
            ...dateWhere,
            session: {
              AND: [
                {
                  OR: [
                    { type: 'GUIDED_GAME' },
                    { category: { name: { contains: 'guided', mode: 'insensitive' } } },
                    { title: { contains: 'game session', mode: 'insensitive' } },
                    { title: { contains: 'guided', mode: 'insensitive' } },
                  ],
                },
                {
                  NOT: {
                    OR: [
                      { category: { name: { contains: 'social', mode: 'insensitive' } } },
                      { title: { contains: 'play date', mode: 'insensitive' } },
                    ],
                  },
                },
              ],
            },
          },
        }),
        playDate: await this.prisma.booking.count({
          where: {
            ...dateWhere,
            session: {
              OR: [
                { category: { name: { contains: 'social', mode: 'insensitive' } } },
                { title: { contains: 'play date', mode: 'insensitive' } },
              ],
            },
          },
        }),
      };

      return { data, total, counts };
    } catch (error) {
      this.logger.error('Failed to fetch bookings', error);
      throw new InternalServerErrorException('Failed to fetch bookings');
    }
  }

  async getUserBookings(email: string) {
    if (!email) return [];
    try {
      return await this.prisma.booking.findMany({
        where: {
          isDeleted: false,
          OR: [
            { contactEmail: { equals: email, mode: 'insensitive' } },
            { participants: { some: { email: { equals: email, mode: 'insensitive' } } } },
          ],
        },
        include: {
          session: {
            include: {
              category: {
                include: {
                  game: true,
                },
              },
            },
          },
          serviceOption: true,
          location: true,
          participants: {
            include: {
              ageGroup: true,
            },
          },
          payment: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      this.logger.error(`Failed to fetch bookings for ${email}`, error);
      throw new InternalServerErrorException('Failed to fetch user bookings');
    }
  }
}
