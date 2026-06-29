import { Module } from '@nestjs/common';
import { ServiceOptionsController } from './service-options.controller';
import { ServiceOptionsService } from './service-options.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServiceOptionsController],
  providers: [ServiceOptionsService]
})
export class ServiceOptionsModule {}
