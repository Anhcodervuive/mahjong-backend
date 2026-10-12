import { Module, forwardRef } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

import { PrismaModule } from '../prisma/prisma.module';
import { PaymentModule } from '../payment/payment.module';
import { EmailModule } from '../email/email.module';
import { Smtp2goModule } from '../smtp2go/smtp2go.module';
import { JoinCircleModule } from '../join-circle/join-circle.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => PaymentModule),
    EmailModule,
    Smtp2goModule,
    JoinCircleModule,
  ],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingModule {}

