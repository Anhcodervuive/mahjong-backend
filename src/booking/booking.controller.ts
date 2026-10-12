import { Controller, Post, Get, Body, Query, UseGuards, Req, HttpCode, HttpStatus, Headers } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('my-bookings')
  async getMyBookings(@Req() req: any) {
    const email = req.user?.email;
    return this.bookingService.getUserBookings(email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  async getAllBookings(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('type') type?: string,
  ) {
    return this.bookingService.getAllBookings(limit, offset, startDate, endDate, search, status, type);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('admin/create-offline')
  async createOfflineBooking(@Body() data: any) {
    return this.bookingService.createOfflineBooking(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post(':id/delete')
  async deleteBookingPost(@Req() req: any) {
    return this.bookingService.deleteBooking(+req.params.id);
  }

  @Get('verify-payment')
  async verifyPayment(@Query('ref') orderReference: string) {
    if (!orderReference) {
      return { success: false, error: 'No order reference provided' };
    }
    return this.bookingService.verifyPayment(orderReference);
  }

  @Get('webhook')
  async webhookHealthCheck() {
    return {
      status: 'active',
      service: 'mahjong-booking-webhook',
      message: 'Booking Webhook alias endpoint is active and listening.',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleBookingWebhook(
    @Body() body: any,
    @Query() query: any,
    @Headers() headers: any,
  ) {
    let payload = body;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch {
        // Keep as string
      }
    }

    const orderReference =
      payload?.order?.reference ||
      payload?.details?.order?.reference ||
      payload?.details?.reference ||
      payload?.orderReference ||
      payload?.reference ||
      payload?._embedded?.payment?.[0]?.orderReference ||
      query?.ref ||
      query?.orderReference ||
      query?.reference;

    if (!orderReference) {
      return {
        success: true,
        received: true,
        message: 'Webhook received but no order reference found in payload',
      };
    }

    try {
      const result = await this.bookingService.verifyPayment(orderReference);
      return {
        success: true,
        orderReference,
        result,
      };
    } catch (error: any) {
      return {
        success: false,
        orderReference,
        error: error?.message || 'Failed to process webhook',
      };
    }
  }
}
