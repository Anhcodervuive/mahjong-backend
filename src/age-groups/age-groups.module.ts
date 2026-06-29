import { Module } from '@nestjs/common';
import { AgeGroupsController } from './age-groups.controller';
import { AgeGroupsService } from './age-groups.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AgeGroupsController],
  providers: [AgeGroupsService]
})
export class AgeGroupsModule {}
