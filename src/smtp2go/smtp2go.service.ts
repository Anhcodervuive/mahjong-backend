import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

function formatPhoneNumber(phone?: string): string {
  if (!phone) return '';
  const trimmed = String(phone).trim();
  if (!trimmed || trimmed === '-') return '';

  if (trimmed.startsWith('+')) {
    return trimmed;
  }
  if (trimmed.startsWith('00')) {
    return `+${trimmed.slice(2)}`;
  }
  const cleanDigits = trimmed.replace(/\D/g, '');
  if (!cleanDigits) return trimmed;

  if (cleanDigits.startsWith('971')) {
    return `+${cleanDigits}`;
  }
  if (cleanDigits.startsWith('91') && cleanDigits.length === 12) {
    return `+${cleanDigits}`;
  }
  if (cleanDigits.startsWith('0')) {
    return `+971 ${cleanDigits.slice(1)}`;
  }
  if (cleanDigits.length === 9 && cleanDigits.startsWith('5')) {
    return `+971 ${cleanDigits}`;
  }
  if (cleanDigits.length === 7) {
    return `+971 ${cleanDigits}`;
  }
  return `+971 ${trimmed}`;
}

@Injectable()
export class Smtp2goService {
  private readonly logger = new Logger(Smtp2goService.name);

  constructor(private configService: ConfigService) {}

  async sendBookingConfirmation(
    email: string,
    fullName: string,
    isNewUser: boolean,
    plainPassword?: string,
    bookingDetails?: any,
  ) {
    const sessionName = bookingDetails?.session?.title || 'Mahjong Session';
    const gameName = bookingDetails?.session?.category?.game?.name || 'Mahjong';
    const categoryName = bookingDetails?.session?.category?.name || 'Session';
    const skillLevel = bookingDetails?.level;
    const serviceOptionName = bookingDetails?.serviceOption?.name;
    const totalAmount = bookingDetails?.totalAmount ? Number(bookingDetails.totalAmount).toFixed(2) : (bookingDetails?.unitPrice ? Number(bookingDetails.unitPrice).toFixed(2) : '0.00');
    const notes = bookingDetails?.notes;
    const bookingType = bookingDetails?.session?.type || 'TRAINING';
    const isGuidedGame = bookingType === 'GUIDED_GAME';

    const date = new Date(bookingDetails?.bookingDate || Date.now()).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formatTime = (t: string) => {
      if (!t) return '';
      if (t.includes('AM') || t.includes('PM')) return t;
      const [h, m] = t.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hour = h % 12 === 0 ? 12 : h % 12;
      return `${hour}:${(m || 0).toString().padStart(2, '0')} ${ampm}`;
    };
    const time = `${formatTime(bookingDetails?.startTime)} – ${formatTime(bookingDetails?.endTime)}`;

    // --- Location / Venue block ---
    const location = bookingDetails?.location;
    const locationBlock = location
      ? `
        <tr>
          <td colspan="2" style="padding: 14px 0 6px; color: #D4AF6A; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; border-top: 1px solid rgba(212, 175, 106, 0.2);">📍 Meeting Location & Venue</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #aaa; width: 130px;">Area:</td>
          <td style="padding: 6px 0; font-weight: bold;">${location.name}</td>
        </tr>
        ${location.description ? `<tr><td style="padding: 6px 0; color: #aaa;">Venue:</td><td style="padding: 6px 0; font-weight: bold;">${location.description}</td></tr>` : ''}
        ${location.address ? `<tr><td style="padding: 6px 0; color: #aaa;">Address:</td><td style="padding: 6px 0;">${location.address}</td></tr>` : ''}
        ${location.parking ? `<tr><td style="padding: 6px 0; color: #aaa;">Parking:</td><td style="padding: 6px 0;">${location.parking}</td></tr>` : ''}
        ${location.mapUrl ? `<tr><td style="padding: 6px 0; color: #aaa;">Map:</td><td style="padding: 6px 0;"><a href="${location.mapUrl}" target="_blank" style="color: #D4AF6A; text-decoration: underline;">View on Google Maps</a></td></tr>` : ''}
      `
      : '';

    // Participants
    const participants = bookingDetails?.participants || [];
    let participantsHtml = '';
    if (participants.length > 0) {
      participantsHtml = `
        <div style="background-color: #071F1B; color: #fff; padding: 18px 16px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #D4AF6A; margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid rgba(212, 175, 106, 0.3); padding-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
            👥 Players (${participants.length} Player${participants.length > 1 ? 's' : ''})
          </h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              ${participants.map((p: any, i: number) => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="padding: 10px 4px; vertical-align: top;">
                    <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 4px;">
                      <span>${i + 1}. ${p.fullName || 'Guest'}</span>
                      ${p.isOwner ? '<span style="font-size: 9px; color: #D4AF6A; border: 1px solid #D4AF6A; padding: 1px 5px; border-radius: 3px; margin-left: 6px; font-weight: normal; vertical-align: middle;">Main</span>' : ''}
                      ${(p.ageGroup?.name || p.ageGroup) ? `<span style="display: inline-block; font-size: 10px; color: #D4AF6A; background-color: rgba(212,175,106,0.18); padding: 1px 7px; border-radius: 10px; margin-left: 6px; font-weight: normal; border: 1px solid rgba(212,175,106,0.3); vertical-align: middle;">${p.ageGroup?.name || p.ageGroup}</span>` : ''}
                    </div>
                    <div style="font-size: 12px; color: #bbb; line-height: 1.5; word-break: break-all;">
                      ${p.email ? `<span style="color: #bbb; margin-right: 14px; display: inline-block;">✉️ ${p.email}</span>` : ''}
                      ${p.phone ? `<span style="color: #bbb; display: inline-block;">📞 ${formatPhoneNumber(p.phone)}</span>` : ''}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    // Notes
    const notesHtml = notes ? `
      <div style="background-color: #fdfaf3; border: 1px solid #e8dec8; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 13px;">
        <strong style="color: #071F1B;">📝 Special Notes / Requests:</strong>
        <p style="margin: 5px 0 0; color: #555;">${notes}</p>
      </div>
    ` : '';

    const loginSection = isNewUser
      ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #D4AF6A;">
          <h3 style="color: #071F1B; margin-top: 0;">Your Account Details</h3>
          <p style="color: #333; margin-bottom: 10px;">An account has been automatically created for you to manage your bookings.</p>
          <p style="margin: 5px 0;"><strong>Username / Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Password:</strong> ${plainPassword || '••••••••'}</p>
          <p style="color: #666; font-size: 13px; margin-top: 15px;">Please log in to change your password as soon as possible.</p>
        </div>
      `
      : `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #071F1B;">
          <p style="color: #333; margin: 0;">You can view and manage your booking by logging into your existing Mahjong Success account.</p>
        </div>
      `;

    const typeLabel = isGuidedGame ? '🎮 Guided Game / Social Play' : '📚 Training Session';

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color: #071F1B; padding: 30px; text-align: center;">
          <h1 style="color: #D4AF6A; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Mahjong Success</h1>
          <p style="color: rgba(212,175,106,0.7); margin: 8px 0 0; font-size: 13px;">${typeLabel}</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #071F1B; margin-top: 0;">Booking Confirmed! 🎉</h2>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">Hello <strong>${fullName}</strong>,</p>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">Your booking has been confirmed. We look forward to seeing you at the table!</p>
          
          <div style="background-color: #071F1B; color: #fff; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #D4AF6A; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 106, 0.3); padding-bottom: 10px;">Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 130px;">Game:</td>
                <td style="padding: 6px 0; font-weight: bold;">${gameName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Category:</td>
                <td style="padding: 6px 0; font-weight: bold;">${categoryName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Session:</td>
                <td style="padding: 6px 0; font-weight: bold;">${sessionName}</td>
              </tr>
              ${skillLevel ? `
                <tr>
                  <td style="padding: 6px 0; color: #aaa;">Skill Level:</td>
                  <td style="padding: 6px 0; font-weight: bold; color: #D4AF6A;">${skillLevel}</td>
                </tr>
              ` : ''}
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Date:</td>
                <td style="padding: 6px 0; font-weight: bold;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Time:</td>
                <td style="padding: 6px 0; font-weight: bold;">${time}</td>
              </tr>
              ${serviceOptionName ? `
                <tr>
                  <td style="padding: 6px 0; color: #aaa;">Experience / Service:</td>
                  <td style="padding: 6px 0; font-weight: bold;">${serviceOptionName}</td>
                </tr>
              ` : ''}
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Total Paid:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #D4AF6A; font-size: 14px;">AED ${totalAmount} <span style="font-size:11px; color:#4ade80; font-weight:normal;">(Paid)</span></td>
              </tr>
              ${locationBlock}
            </table>
          </div>

          ${participantsHtml}

          ${notesHtml}

          ${loginSection}

          <div style="text-align: center; margin-top: 30px;">
            <a href="${(this.configService.get<string>('FRONTEND_URL') || 'https://staging.mahjongsuccess.com').replace(/\/+$/, '')}/login" style="display: inline-block; background-color: #D4AF6A; color: #071F1B; text-decoration: none; font-weight: bold; padding: 12px 30px; border-radius: 30px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Log In to Account</a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Mahjong Success. All rights reserved.</p>
          <p style="margin: 5px 0 0;">This is an automated message, please do not reply.</p>
        </div>
        
      </div>
    `;


    const apiKey = this.configService.get<string>('SMTP2GO_API_KEY');
    if (!apiKey) {
      this.logger.error('SMTP2GO_API_KEY is not configured in .env');
      return;
    }

    try {
      const response = await fetch('https://api.smtp2go.com/v3/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Smtp2go-Api': apiKey,
        },
        body: JSON.stringify({
          api_key: apiKey,
          to: [email],
          sender: `"Mahjong Success" <${this.configService.get<string>('SMTP_USER') || 'booking@yourdomain.com'}>`,
          subject: 'Your Mahjong Session Booking is Confirmed!',
          html_body: htmlContent,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        this.logger.log(`Booking confirmation email sent via SMTP2GO to ${email}`);
      } else {
        this.logger.error(`Failed to send email via SMTP2GO API: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      this.logger.error(`Error connecting to SMTP2GO API for ${email}`, error);
    }
  }

  async sendPaymentFailedEmail(
    email: string,
    fullName: string,
    bookingDetails?: any,
    failureReason?: string,
  ) {
    const sessionName = bookingDetails?.session?.title || 'Mahjong Session';
    const gameName = bookingDetails?.session?.category?.game?.name || 'Mahjong';
    const categoryName = bookingDetails?.session?.category?.name || 'Session';
    const skillLevel = bookingDetails?.level;
    const serviceOptionName = bookingDetails?.serviceOption?.name;
    const totalAmount = bookingDetails?.totalAmount
      ? Number(bookingDetails.totalAmount).toFixed(2)
      : (bookingDetails?.unitPrice ? Number(bookingDetails.unitPrice).toFixed(2) : '0.00');

    const date = new Date(bookingDetails?.bookingDate || Date.now()).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formatTime = (t: string) => {
      if (!t) return '';
      if (t.includes('AM') || t.includes('PM')) return t;
      const [h, m] = t.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hour = h % 12 === 0 ? 12 : h % 12;
      return `${hour}:${(m || 0).toString().padStart(2, '0')} ${ampm}`;
    };

    const time = (bookingDetails?.startTime && bookingDetails?.endTime)
      ? `${formatTime(bookingDetails.startTime)} – ${formatTime(bookingDetails.endTime)}`
      : '10:00 AM – 12:00 PM';

    const isGuided =
      gameName.toLowerCase().includes('guided') ||
      categoryName.toLowerCase().includes('guided') ||
      categoryName.toLowerCase().includes('social');
    const retryUrl = `${(this.configService.get<string>('FRONTEND_URL') || 'https://mahjongsuccess.com').replace(/\/+$/, '')}${isGuided ? '/guided-games-booking' : '/book-session'}`;

    const locationName = bookingDetails?.location?.name || bookingDetails?.location?.description || '';

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background-color: #071F1B; padding: 25px 20px; text-align: center;">
          <h1 style="color: #D4AF6A; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;">Mahjong Success</h1>
        </div>
        
        <!-- Body -->
        <div style="padding: 36px 26px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; border-radius: 50%; background-color: #fee2e2; color: #dc2626; font-size: 26px; font-weight: bold; margin-bottom: 12px;">✕</div>
            <h2 style="color: #891A1A; margin: 0 0 8px; font-size: 22px;">Payment Unsuccessful</h2>
            <p style="color: #666; font-size: 14px; margin: 0;">We were unable to complete the payment for your Mahjong booking.</p>
          </div>

          <p style="color: #444; font-size: 15px; line-height: 1.6;">Hello <strong>${fullName}</strong>,</p>
          <p style="color: #444; font-size: 15px; line-height: 1.6;">Your recent payment attempt could not be processed. As a result, your booking is currently marked as <strong>unpaid</strong> and your seat at the table has <strong>not been secured yet</strong>.</p>
          
          <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-left: 4px solid #dc2626; padding: 14px 16px; border-radius: 6px; margin: 20px 0; font-size: 13px; color: #991b1b;">
            <strong>Notice / Reason:</strong> ${failureReason || 'Transaction was declined, cancelled, or timed out by the payment gateway / bank.'}
          </div>

          <!-- Session Details Card -->
          <div style="background-color: #071F1B; color: #fff; padding: 18px 16px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #D4AF6A; margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid rgba(212, 175, 106, 0.3); padding-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
              Session Details
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              ${bookingDetails?.id ? `
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 110px;">Booking Ref:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #D4AF6A; font-family: monospace;">#${bookingDetails.id}</td>
              </tr>
              ` : ''}
              ${(bookingDetails?.payment?.transactionId || bookingDetails?.transactionId) ? `
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 110px;">Order Ref:</td>
                <td style="padding: 6px 0; font-family: monospace; font-size: 12px; color: #ffffff;">${bookingDetails?.payment?.transactionId || bookingDetails?.transactionId}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 110px;">Game:</td>
                <td style="padding: 6px 0; font-weight: bold;">${gameName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 110px;">Category:</td>
                <td style="padding: 6px 0; font-weight: bold;">${categoryName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 110px;">Session:</td>
                <td style="padding: 6px 0; font-weight: bold;">${sessionName}</td>
              </tr>
              ${skillLevel ? `
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 110px;">Skill Level:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #D4AF6A;">${skillLevel}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 110px;">Date:</td>
                <td style="padding: 6px 0; font-weight: bold;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 110px;">Time:</td>
                <td style="padding: 6px 0; font-weight: bold;">${time}</td>
              </tr>
              ${serviceOptionName ? `
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 110px;">Service:</td>
                <td style="padding: 6px 0; font-weight: bold;">${serviceOptionName}</td>
              </tr>
              ` : ''}
              ${locationName ? `
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 110px;">Location:</td>
                <td style="padding: 6px 0; font-weight: bold;">${locationName}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 110px;">Amount:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #f87171; font-size: 14px;">AED ${totalAmount} <span style="font-size:11px; color:#f87171; font-weight:normal;">(Payment Unsuccessful)</span></td>
              </tr>
            </table>
          </div>

          <!-- Suggested Next Steps -->
          <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #D4AF6A; font-size: 13px; color: #555;">
            <strong style="color: #071F1B;">Suggested Next Steps:</strong>
            <ul style="margin: 8px 0 0; padding-left: 20px; line-height: 1.6;">
              <li>Verify your card details or try a different debit / credit card.</li>
              <li>Ensure online transactions and international payments are permitted by your bank.</li>
              <li>Click the button below to re-book your preferred date and time slot.</li>
            </ul>
          </div>

          <!-- Retry CTA Button -->
          <div style="text-align: center; margin-top: 30px;">
            <a href="${retryUrl}" style="display: inline-block; background-color: #891A1A; color: #ffffff; text-decoration: none; font-weight: bold; padding: 12px 32px; border-radius: 30px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Try Booking Again</a>
          </div>

          <p style="text-align: center; color: #777; font-size: 13px; margin-top: 28px; line-height: 1.5;">
            Need assistance or believe this is an error? Reach out to us at <a href="mailto:mahjongsuccess@gmail.com" style="color: #D4AF6A; text-decoration: none; font-weight: bold;">mahjongsuccess@gmail.com</a>.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Mahjong Success. All rights reserved.</p>
          <p style="margin: 5px 0 0;">This is an automated message, please do not reply.</p>
        </div>
      </div>
    `;

    const apiKey = this.configService.get<string>('SMTP2GO_API_KEY');
    if (!apiKey) {
      this.logger.error('SMTP2GO_API_KEY is not configured in .env');
      return;
    }

    try {
      const response = await fetch('https://api.smtp2go.com/v3/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Smtp2go-Api': apiKey,
        },
        body: JSON.stringify({
          api_key: apiKey,
          to: [email],
          sender: `"Mahjong Success" <${this.configService.get<string>('SMTP_USER') || 'booking@yourdomain.com'}>`,
          subject: bookingDetails?.id ? `Payment Unsuccessful - Mahjong Session (#${bookingDetails.id})` : `Payment Unsuccessful - Mahjong Session`,
          html_body: htmlContent,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        this.logger.log(`Payment failed email sent via SMTP2GO to ${email}`);
      } else {
        this.logger.error(`Failed to send payment failed email via SMTP2GO API: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      this.logger.error(`Error connecting to SMTP2GO API for ${email}`, error);
    }
  }
}
