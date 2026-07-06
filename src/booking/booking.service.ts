import { Injectable, InternalServerErrorException, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
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
      // 1. Create Booking in DB (Status: PENDING)
      const session = await this.prisma.session.findUnique({ where: { id: data.sessionId } });
      if (!session) throw new NotFoundException('Session not found');

      const serviceOption = await this.prisma.serviceOption.findUnique({ where: { id: data.serviceOptionId } });
      
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

      const booking = await this.prisma.booking.create({
        data: {
          sessionId: data.sessionId,
          serviceOptionId: data.serviceOptionId,
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
            create: data.participants.map((p: any) => ({
              ageGroupId: p.ageGroupId,
              fullName: p.fullName || p.name || 'Guest',
              email: p.email,
              phone: p.phone,
              isOwner: p.isOwner || false,
            })),
          },
        },
      });

      // 2. Generate Payment Link via N-Genius
      const amountInMinorUnits = Math.round(totalAmount * 100);
      const redirectUrl = `${process.env.FRONTEND_URL || 'http://127.0.0.1:5174'}/payment/callback`;
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
      throw new InternalServerErrorException('Booking creation failed');
    }
  }

  async verifyPayment(orderReference: string): Promise<any> {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: { transactionId: orderReference },
        include: { booking: { include: { session: { include: { category: { include: { game: true } } } }, participants: true } } },
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
          data: { status: 'CONFIRMED' },
        });
        // Asynchronously process user creation and send emails
        this.processBookingUsers(payment.booking).catch(e => 
          this.logger.error('Background user processing failed', e)
        );
      }

      return {
        success: isSuccess,
        bookingId: payment.bookingId,
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
      await this.smtp2goService.sendBookingConfirmation(
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
          session: true,
          serviceOption: true,
          participants: true,
          payment: true,
        },
      });

      return { data, total };
    } catch (error) {
      this.logger.error('Failed to fetch bookings', error);
      throw new InternalServerErrorException('Failed to fetch bookings');
    }
  }
}
