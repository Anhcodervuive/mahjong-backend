import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Headers,
  Req,
  HttpCode,
  HttpStatus,
  Logger,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { BookingService } from '../booking/booking.service';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(
    @Inject(forwardRef(() => BookingService))
    private readonly bookingService: BookingService,
    private readonly paymentService: PaymentService,
  ) {}

  /**
   * Health check / ping endpoint for N-Genius webhook
   */
  @Get('webhook')
  async webhookHealthCheck() {
    return {
      status: 'active',
      service: 'mahjong-payment-webhook',
      message: 'N-Genius Payment Webhook endpoint is active and listening.',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Webhook endpoint called by N-Genius upon payment events (CAPTURED, AUTHORISED, FAILED, etc.)
   */
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Body() body: any,
    @Query() query: any,
    @Headers() headers: any,
    @Req() req: any,
  ) {
    // Safeguard parsing if body came as string or raw buffer
    let payload = body;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch {
        // Keep as string if parsing fails
      }
    }

    this.logger.log(
      `Received N-Genius webhook notification: headers=${JSON.stringify({
        'content-type': headers['content-type'],
        'user-agent': headers['user-agent'],
        'x-signature': headers['x-signature'] || headers['signature'] || null,
      })}, payload=${JSON.stringify(payload)}, query=${JSON.stringify(query)}`,
    );

    // Flexible extraction of orderReference from all possible N-Genius webhook payloads
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

    const eventName =
      payload?.eventName ||
      payload?.type ||
      payload?.details?.eventName ||
      payload?.event ||
      'UNKNOWN';

    if (!orderReference) {
      this.logger.warn(
        `N-Genius webhook received without valid order reference: payload=${JSON.stringify(
          payload,
        )}`,
      );
      return {
        success: true,
        received: true,
        message: 'Webhook received but no order reference found in payload',
      };
    }

    this.logger.log(
      `Processing N-Genius webhook event '${eventName}' for orderReference: ${orderReference}`,
    );

    try {
      // Authoritatively verify order with N-Genius API and update database idempotently
      const result = await this.bookingService.verifyPayment(orderReference);
      this.logger.log(
        `Successfully processed webhook for orderReference ${orderReference}: result=${JSON.stringify(
          result,
        )}`,
      );
      return {
        success: true,
        orderReference,
        eventName,
        result,
      };
    } catch (error: any) {
      this.logger.error(
        `Error processing webhook for orderReference ${orderReference}: ${error?.message}`,
        error?.stack,
      );
      // Return 200 with error details to prevent endless retry storms from gateway if reference is unknown
      return {
        success: false,
        orderReference,
        eventName,
        error: error?.message || 'Failed to process webhook',
      };
    }
  }
}
