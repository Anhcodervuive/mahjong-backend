import { Module } from '@nestjs/common';
import { JoinCircleController } from './join-circle.controller';
import { JoinCircleService } from './join-circle.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [JoinCircleController],
  providers: [JoinCircleService],
})
export class JoinCircleModule {}
