import { Controller, Get, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly service: AvailabilityService) {}
  @Get()
  getAvailability(
    @Query('year') year: string, 
    @Query('month') month: string,
    @Query('sessionId') sessionId?: string
  ) {
    return this.service.getAvailabilityForMonth(+year, +month, sessionId ? +sessionId : undefined);
  }

  @Get('guided-games')
  getGuidedGamesAvailability(
    @Query('year') year: string,
    @Query('month') month: string,
    @Query('sessionId') sessionId: string,
    @Query('locationId') locationId?: string,
  ) {
    return this.service.getGuidedGamesAvailability(
      +year,
      +month,
      +sessionId,
      locationId ? +locationId : undefined,
    );
  }
}
