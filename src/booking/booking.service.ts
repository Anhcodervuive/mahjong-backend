import { Injectable, InternalServerErrorException, Logger, NotFoundException, BadRequestException, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentService } from '../payment/payment.service';
import { EmailService } from '../email/email.service';
import { Smtp2goService } from '../smtp2go/smtp2go.service';
import * as bcrypt from 'bcrypt';

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

      const isSocialPlay = (session.category?.name ?? '').toLowerCase() === 'social play';

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
      
      // Validate that booking is not in the past
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      if (bookingDate < today) {
        throw new BadRequestException('Cannot book a session in the past');
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
          include: { session: { include: { category: true } } }
        });

        const hasOverlap = overlappingBookings.some(b => {
          if (!b.startTime || !b.endTime) return false;
          const bStart = timeToMins(b.startTime);
          const bEnd = timeToMins(b.endTime);
          const overlaps = Math.max(reqStartMins, bStart) < Math.min(reqEndMins, bEnd);
          if (!overlaps) return false;
          if (b.sessionId === sessionId && b.startTime === data.startTime && b.endTime === data.endTime) return false;
          return true;
        });

        if (hasOverlap) {
          throw new BadRequestException('Instructor is already booked for an overlapping time slot.');
        }

        const sameSlotBookings = overlappingBookings.filter(b => b.sessionId === sessionId && b.startTime === data.startTime && b.endTime === data.endTime);
        const bookedCount = sameSlotBookings.reduce((sum, b) => sum + (b.quantity || 1), 0);
        if (bookedCount + data.participants.length > session.maxPlayers) {
          throw new BadRequestException('Not enough capacity for this time slot.');
        }
      }
      // ---------------------------------------

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
          contactPhone: data.contactPhone,
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
                phone: p.phone,
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
      }

      const venueSetting = await this.prisma.setting.findUnique({ where: { key: 'VENUE_DETAILS' } });

      return {
        success: isSuccess,
        bookingId: payment.bookingId,
        orderReference: payment.transactionId,
        sessionName: payment.booking?.session?.title,
        gameName: payment.booking?.session?.category?.game?.name,
        categoryName: payment.booking?.session?.category?.name,
        level: payment.booking?.level,
        levelName: payment.booking?.level || (payment.booking?.session?.category?.name?.toLowerCase() !== 'social play' ? payment.booking?.session?.category?.name : ''),
        date: payment.booking?.bookingDate?.toISOString(),
        startTime: payment.booking?.startTime,
        endTime: payment.booking?.endTime,
        venue: payment.booking?.location?.address || payment.booking?.location?.name || venueSetting?.value || 'Venue address not set',
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

      // Send email
      await this.emailService.sendBookingConfirmation(
        p.email,
        user.name,
        isNewUser,
        plainPassword,
        booking
      );
    }));
  }

  async getAllBookings(limit?: number, offset?: number, startDate?: string, endDate?: string) {
    try {
      const where: any = {};
      if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = new Date(startDate);
        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          where.createdAt.lte = end;
        }
      }

      const total = await this.prisma.booking.count({ where });
      const data = await this.prisma.booking.findMany({
        where,
        orderBy: {
          id: 'desc',
        },
        take: limit ? Number(limit) : undefined,
        skip: offset ? Number(offset) : undefined,
        include: {
          session: { include: { category: { include: { game: true } } } },
          serviceOption: true,
          participants: { include: { ageGroup: true } },
          payment: true,
          location: true,
        },
      });

      return { data, total };
    } catch (error) {
      this.logger.error('Failed to fetch bookings', error);
      throw new InternalServerErrorException('Failed to fetch bookings');
    }
  }
}
