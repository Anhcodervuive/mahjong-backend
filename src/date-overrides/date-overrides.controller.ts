import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { DateOverridesService } from './date-overrides.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('date-overrides')
export class DateOverridesController {
  constructor(private readonly service: DateOverridesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  upsert(@Body() body: any) {
    return this.service.upsert(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
