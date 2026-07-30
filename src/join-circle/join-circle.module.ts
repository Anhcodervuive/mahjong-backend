import { Module } from '@nestjs/common';
import { JoinCircleController } from './join-circle.controller';
import { JoinCircleService } from './join-circle.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JoinCircleController],
  providers: [JoinCircleService],
})
export class JoinCircleModule {}
