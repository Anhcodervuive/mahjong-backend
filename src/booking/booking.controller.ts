import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() data: any) {
    return this.bookingService.createBooking(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  async getAllBookings(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.bookingService.getAllBookings(limit, offset, startDate, endDate);
  }

  @Get('verify-payment')
  async verifyPayment(@Query('ref') orderReference: string) {
    if (!orderReference) {
      return { success: false, error: 'No order reference provided' };
    }
    return this.bookingService.verifyPayment(orderReference);
  }
}
