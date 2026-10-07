import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private get paymentUrl(): string {
    return (process.env.PAYMENT_URL || 'https://api-gateway.ngenius-payments.com').replace(/\/+$/, '');
  }
  private get apiKey(): string {
    return process.env.PAYMENT_GATEWAY_API_KEY || 'NjQ5YmU1YzgtYzE0ZS00ZTY2LTkxMmUtM2FkNzhjZTIzODlkOjNjNGY4MjZhLTMzOTMtNDcyMy1hZmIyLTBkMGM5MjFiODRmMQ==';
  }
  private get outletId(): string {
    return process.env.PAYMENT_OUTLET_ID || '89031a8a-b600-4d88-bf36-bdb056bbc6ba';
  }
  private get currency(): string {
    return (process.env.PAYMENT_CURRENCY || 'AED').replace(/['"]/g, '').trim();
  }

  /**
   * Request an Access Token from N-Genius Identity API
   */
  async getAccessToken(): Promise<string> {
    try {
      const response = await fetch(`${this.paymentUrl}/identity/auth/access-token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${this.apiKey}`,
          'Content-Type': 'application/vnd.ni-identity.v1+json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Failed to get access token: ${errorText}`);
        throw new Error('N-Genius Auth Failed');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      this.logger.error('Error fetching access token', error);
      throw new InternalServerErrorException('Payment gateway authentication failed');
    }
  }

  /**
   * Create an order in N-Genius and get the payment link
   */
  async createOrder(
    amountInMinorUnits: number,
    redirectUrl: string,
    billingDetails?: any,
    emailAddress?: string,
  ): Promise<{ orderReference: string; paymentLink: string }> {
    const accessToken = await this.getAccessToken();

    const orderPayload: any = {
      action: 'SALE',
      amount: {
        currencyCode: this.currency,
        value: amountInMinorUnits,
      },
      merchantAttributes: {
        redirectUrl: redirectUrl,
        cancelUrl: redirectUrl,
        skipConfirmationPage: false,
      },
      billingAddress: billingDetails,
    };

    if (emailAddress && emailAddress.trim()) {
      orderPayload.emailAddress = emailAddress.trim().toLowerCase();
    }
    
    console.log('Sending order payload to N-Genius:', JSON.stringify(orderPayload, null, 2));

    try {
      const response = await fetch(
        `${this.paymentUrl}/transactions/outlets/${this.outletId}/orders`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/vnd.ni-payment.v2+json',
            'Accept': 'application/vnd.ni-payment.v2+json',
          },
          body: JSON.stringify(orderPayload),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Failed to create order: ${errorText}`);
        throw new Error('N-Genius Create Order Failed');
      }

      const data = await response.json();
      const orderReference = data.reference;
      const paymentLink = data._links.payment.href;

      return { orderReference, paymentLink };
    } catch (error) {
      this.logger.error('Error creating order', error);
      throw new InternalServerErrorException('Failed to generate payment link');
    }
  }

  /**
   * Check the status of a payment order
   */
  async getOrderStatus(orderReference: string): Promise<any> {
    const accessToken = await this.getAccessToken();

    try {
      const response = await fetch(
        `${this.paymentUrl}/transactions/outlets/${this.outletId}/orders/${orderReference}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/vnd.ni-payment.v2+json',
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Failed to get order status: ${errorText}`);
        throw new Error('N-Genius Get Order Status Failed');
      }

      const data = await response.json();
      return data; // contains status, amount, etc.
    } catch (error) {
      this.logger.error(`Error fetching order status for ${orderReference}`, error);
      throw new InternalServerErrorException('Failed to check payment status');
    }
  }
}
