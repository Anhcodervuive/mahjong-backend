import { Module } from '@nestjs/common';
import { DateOverridesController } from './date-overrides.controller';
import { DateOverridesService } from './date-overrides.service';

@Module({
  controllers: [DateOverridesController],
  providers: [DateOverridesService]
})
export class DateOverridesModule {}
