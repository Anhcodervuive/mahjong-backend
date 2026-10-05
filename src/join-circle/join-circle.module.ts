import { Module } from '@nestjs/common';
import { JoinCircleController } from './join-circle.controller';
import { JoinCircleService } from './join-circle.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';
import { PaymentModule } from '../payment/payment.module';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [PrismaModule, EmailModule, PaymentModule, SettingsModule],
  controllers: [JoinCircleController],
  providers: [JoinCircleService],
  exports: [JoinCircleService],
})
export class JoinCircleModule {}
