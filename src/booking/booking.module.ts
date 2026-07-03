import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

import { PrismaModule } from '../prisma/prisma.module';
import { PaymentModule } from '../payment/payment.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, PaymentModule, EmailModule],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule {}
