import { Controller, Post, Get, Body, Query, UseGuards, Req, HttpCode, HttpStatus, Headers, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
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
    const configuredSecret = process.env.PAYMENT_WEBHOOK_SECRET?.trim();
    if (configuredSecret) {
      const headerToken = (
        headers['x-webhook-secret'] ||
        headers['x-api-key'] ||
        headers['webhook-secret']
      )?.trim();
      const authHeader = headers['authorization']
        ?.replace(/^Bearer\s+/i, '')
        ?.replace(/^Basic\s+/i, '')
        ?.trim();
      const sig = (
        headers['x-signature'] ||
        headers['x-ngenius-signature'] ||
        headers['signature']
      )?.trim();

      let sigMatch = false;
      if (sig) {
        try {
          const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
          const hex = crypto.createHmac('sha256', configuredSecret).update(bodyStr).digest('hex');
          const b64 = crypto.createHmac('sha256', configuredSecret).update(bodyStr).digest('base64');
          sigMatch = sig.toLowerCase() === hex.toLowerCase() || sig === b64;
        } catch {
          // ignore error
        }
      }

      let customHeaderMatch = false;
      for (const [, val] of Object.entries(headers)) {
        if (typeof val === 'string' && val.trim() === configuredSecret) {
          customHeaderMatch = true;
          break;
        }
      }

      const isValid =
        headerToken === configuredSecret ||
        authHeader === configuredSecret ||
        customHeaderMatch ||
        sigMatch;

      if (!isValid) {
        throw new UnauthorizedException('Invalid or missing webhook secret / signature in request headers');
      }
    }

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

    let directState: string | undefined;
    if (configuredSecret) {
      const eventName = payload?.eventName || payload?.type || payload?.event;
      const state =
        payload?.order?.state ||
        payload?.details?.order?.state ||
        payload?.state ||
        payload?._embedded?.payment?.[0]?.state;

      const isSuccess =
        eventName === 'CAPTURED' ||
        eventName === 'AUTHORISED' ||
        eventName === 'PURCHASED' ||
        state === 'CAPTURED' ||
        state === 'AUTHORISED' ||
        state === 'PURCHASED' ||
        state === 'SUCCESS';

      const isFailed =
        eventName === 'FAILED' ||
        eventName === 'DECLINED' ||
        eventName === 'CANCELLED' ||
        state === 'FAILED' ||
        state === 'DECLINED' ||
        state === 'CANCELLED';

      if (isSuccess) directState = 'CAPTURED';
      else if (isFailed) directState = 'FAILED';
    }

    try {
      const result = await this.bookingService.verifyPayment(orderReference, directState);
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
