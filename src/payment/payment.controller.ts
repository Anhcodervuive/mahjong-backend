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
  UnauthorizedException,
} from '@nestjs/common';
import { BookingService } from '../booking/booking.service';
import { PaymentService } from './payment.service';
import * as crypto from 'crypto';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  // In-memory deduplication cache to prevent replay attacks (dedupeKey -> timestamp)
  private readonly processedEvents = new Map<string, number>();

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
    const isSecretConfigured = !!process.env.PAYMENT_WEBHOOK_SECRET;
    return {
      status: 'active',
      service: 'mahjong-payment-webhook',
      secretProtection: isSecretConfigured ? 'ENABLED' : 'FALLBACK_API_VERIFICATION',
      message: 'N-Genius Payment Webhook endpoint is active and listening.',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Verify authenticity of incoming webhook using PAYMENT_WEBHOOK_SECRET
   * Strictly supports industry-standard HTTP Header Authentication:
   * 1. HMAC-SHA256 signature header: x-signature or x-ngenius-signature
   * 2. Secret / Bearer header: Authorization: Bearer <secret> or x-webhook-secret / x-api-key
   */
  private verifyWebhookAuth(
    headers: any,
    rawBody: any,
  ): { isValid: boolean; reason?: string } {
    const configuredSecret = process.env.PAYMENT_WEBHOOK_SECRET?.trim();

    // If no secret configured yet, allow requests to proceed to N-Genius server-to-server check
    if (!configuredSecret) {
      return { isValid: true, reason: 'NO_SECRET_CONFIGURED' };
    }

    // 1. Method A: Check HMAC-SHA256 Signature in HTTP headers (Most secure)
    const signature = (
      headers['x-signature'] ||
      headers['x-ngenius-signature'] ||
      headers['signature']
    )?.trim();

    if (signature) {
      try {
        const bodyStr = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody);
        const computedHex = crypto
          .createHmac('sha256', configuredSecret)
          .update(bodyStr)
          .digest('hex');
        const computedBase64 = crypto
          .createHmac('sha256', configuredSecret)
          .update(bodyStr)
          .digest('base64');

        if (
          signature.toLowerCase() === computedHex.toLowerCase() ||
          signature === computedBase64
        ) {
          return { isValid: true };
        }
      } catch (err: any) {
        this.logger.error(`Error computing HMAC signature: ${err?.message}`);
      }
    }

    // 2. Method B: Check HTTP Authorization / Secret Headers
    const authHeader = headers['authorization']?.trim();
    if (authHeader) {
      const token = authHeader
        .replace(/^Bearer\s+/i, '')
        .replace(/^Basic\s+/i, '')
        .trim();
      if (token === configuredSecret) {
        return { isValid: true };
      }
    }

    const headerToken = (
      headers['x-webhook-secret'] ||
      headers['x-api-key'] ||
      headers['webhook-secret']
    )?.trim();
    if (headerToken && headerToken === configuredSecret) {
      return { isValid: true };
    }

    // 3. Method C: Check any custom header key provided by merchant portal
    for (const [, val] of Object.entries(headers)) {
      if (typeof val === 'string' && val.trim() === configuredSecret) {
        return { isValid: true };
      }
    }

    return { isValid: false, reason: 'INVALID_OR_MISSING_HEADER_SECRET' };
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
    // 1. Verify Request Authenticity via HTTP Headers (HMAC-SHA256 signature or Bearer/Secret header)
    const authCheck = this.verifyWebhookAuth(headers, req.body || body);
    if (!authCheck.isValid) {
      this.logger.warn(`Blocked unauthorized webhook request: ${authCheck.reason}`);
      throw new UnauthorizedException('Invalid or missing webhook secret / signature in request headers');
    }

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

    const payloadState =
      payload?.order?.state ||
      payload?.details?.order?.state ||
      payload?.state ||
      payload?._embedded?.payment?.[0]?.state;

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
      `Processing N-Genius webhook event '${eventName}' [payloadState='${payloadState}'] for orderReference: ${orderReference}`,
    );

    // Replay attack prevention: Deduplication check
    const eventId = payload?.eventId || payload?.id;
    const dedupeKey = eventId
      ? `event_${eventId}`
      : `order_${orderReference}_${eventName}`;

    if (this.processedEvents.has(dedupeKey)) {
      const processedAt = this.processedEvents.get(dedupeKey);
      this.logger.warn(
        `Ignored replayed/duplicate webhook event: dedupeKey=${dedupeKey}, originallyReceivedAt=${new Date(
          processedAt!,
        ).toISOString()}`,
      );
      return {
        success: true,
        replayed: true,
        orderReference,
        eventName,
        message: 'Webhook event was already processed. Ignored for replay attack protection.',
      };
    }

    // If secret verification is enabled and payload contains the state, we can trust it directly!
    let directState: string | undefined;
    if (process.env.PAYMENT_WEBHOOK_SECRET) {
      const isSuccess =
        eventName === 'CAPTURED' ||
        eventName === 'AUTHORISED' ||
        eventName === 'PURCHASED' ||
        payloadState === 'CAPTURED' ||
        payloadState === 'AUTHORISED' ||
        payloadState === 'PURCHASED' ||
        payloadState === 'SUCCESS';

      const isFailed =
        eventName === 'FAILED' ||
        eventName === 'DECLINED' ||
        eventName === 'CANCELLED' ||
        payloadState === 'FAILED' ||
        payloadState === 'DECLINED' ||
        payloadState === 'CANCELLED';

      if (isSuccess) directState = 'CAPTURED';
      else if (isFailed) directState = 'FAILED';
    }

    try {
      // Authoritatively verify order: if directState is supplied, updates DB immediately without external roundtrip!
      const result = await this.bookingService.verifyPayment(orderReference, directState);

      // Mark as processed in deduplication cache to block replay attacks
      this.processedEvents.set(dedupeKey, Date.now());
      const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
      for (const [key, timestamp] of this.processedEvents.entries()) {
        if (timestamp < twoHoursAgo) {
          this.processedEvents.delete(key);
        }
      }

      this.logger.log(
        `Successfully processed webhook for orderReference ${orderReference} (directState=${directState || 'verified-via-api'}): result=${JSON.stringify(
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
      return {
        success: false,
        orderReference,
        eventName,
        error: error?.message || 'Failed to process webhook',
      };
    }
  }
}
