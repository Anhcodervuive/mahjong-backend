import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

export interface EmailTemplateConfig {
  headerTitle?: string;
  confirmationTitle?: string;
  introText?: string;
  detailsTitle?: string;
  newUserTitle?: string;
  newUserIntro?: string;
  existingUserIntro?: string;
  buttonText?: string;
  footerText?: string;
}

const DEFAULT_EMAIL_CONFIG: Required<EmailTemplateConfig> = {
  headerTitle: 'Mahjong Success',
  confirmationTitle: 'Booking Confirmed! 🎉',
  introText: "Your seat for the upcoming Mahjong session has been successfully booked. We can't wait to see you at the table!",
  detailsTitle: 'Session Details',
  newUserTitle: 'Your Account Details',
  newUserIntro: 'An account has been automatically created for you to manage your bookings.',
  existingUserIntro: 'You can view and manage your booking by logging into your existing Mahjong Success account.',
  buttonText: 'LOG IN TO ACCOUNT',
  footerText: 'This is an automated message, please do not reply.',
};

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const port = parseInt(this.configService.get<string>('SMTP_PORT') as string, 10) || 465;
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: port,
      secure: port === 465,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      debug: true,
      logger: true,
    });
  }

  private async getEmailConfig(): Promise<Required<EmailTemplateConfig>> {
    try {
      const setting = await this.prisma.setting.findUnique({
        where: { key: 'EMAIL_TEMPLATE_CONFIG' },
      });
      if (setting && setting.value) {
        const parsed = JSON.parse(setting.value);
        return {
          headerTitle: parsed.headerTitle || DEFAULT_EMAIL_CONFIG.headerTitle,
          confirmationTitle: parsed.confirmationTitle || DEFAULT_EMAIL_CONFIG.confirmationTitle,
          introText: parsed.introText || DEFAULT_EMAIL_CONFIG.introText,
          detailsTitle: parsed.detailsTitle || DEFAULT_EMAIL_CONFIG.detailsTitle,
          newUserTitle: parsed.newUserTitle || DEFAULT_EMAIL_CONFIG.newUserTitle,
          newUserIntro: parsed.newUserIntro || DEFAULT_EMAIL_CONFIG.newUserIntro,
          existingUserIntro: parsed.existingUserIntro || DEFAULT_EMAIL_CONFIG.existingUserIntro,
          buttonText: parsed.buttonText || DEFAULT_EMAIL_CONFIG.buttonText,
          footerText: parsed.footerText || DEFAULT_EMAIL_CONFIG.footerText,
        };
      }
    } catch (e) {
      this.logger.error('Failed to load EMAIL_TEMPLATE_CONFIG setting, using defaults', e);
    }
    return DEFAULT_EMAIL_CONFIG;
  }

  async sendBookingConfirmation(
    email: string,
    fullName: string,
    isNewUser: boolean,
    plainPassword?: string,
    bookingDetails?: any,
  ) {
    const config = await this.getEmailConfig();
    const sessionName = bookingDetails?.session?.title || 'Mahjong Session';
    const gameName = bookingDetails?.session?.category?.game?.name || 'Mahjong';
    const categoryName = bookingDetails?.session?.category?.name || 'Session';
    const skillLevel = bookingDetails?.level;
    const serviceOptionName = bookingDetails?.serviceOption?.name;
    const totalAmount = bookingDetails?.totalAmount ? Number(bookingDetails.totalAmount).toFixed(2) : (bookingDetails?.unitPrice ? Number(bookingDetails.unitPrice).toFixed(2) : '0.00');
    const notes = bookingDetails?.notes;

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

    // Location / Venue Info
    let venueDetailsHtml = '';
    if (bookingDetails?.location) {
      const loc = bookingDetails.location;
      venueDetailsHtml = `
        <tr>
          <td colspan="2" style="padding: 14px 0 6px; color: #D4AF6A; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; border-top: 1px solid rgba(212, 175, 106, 0.2);">📍 Venue & Location</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #aaa; width: 130px;">Area:</td>
          <td style="padding: 6px 0; font-weight: bold;">${loc.name}</td>
        </tr>
        ${loc.description ? `<tr><td style="padding: 6px 0; color: #aaa;">Venue:</td><td style="padding: 6px 0; font-weight: bold;">${loc.description}</td></tr>` : ''}
        ${loc.address ? `<tr><td style="padding: 6px 0; color: #aaa;">Address:</td><td style="padding: 6px 0;">${loc.address}</td></tr>` : ''}
        ${loc.parking ? `<tr><td style="padding: 6px 0; color: #aaa;">Parking:</td><td style="padding: 6px 0;">${loc.parking}</td></tr>` : ''}
        ${loc.mapUrl ? `<tr><td style="padding: 6px 0; color: #aaa;">Map:</td><td style="padding: 6px 0;"><a href="${loc.mapUrl}" target="_blank" style="color: #D4AF6A; text-decoration: underline;">View on Google Maps</a></td></tr>` : ''}
      `;
    } else {
      const venueSetting = await this.prisma.setting.findUnique({ where: { key: 'VENUE_DETAILS' } });
      if (venueSetting?.value) {
        venueDetailsHtml = `
          <tr>
            <td colspan="2" style="padding: 14px 0 6px; color: #D4AF6A; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; border-top: 1px solid rgba(212, 175, 106, 0.2);">📍 Venue Address</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #aaa; width: 130px;">Address:</td>
            <td style="padding: 6px 0; font-weight: bold;">${venueSetting.value}</td>
          </tr>
        `;
      }
    }

    // Participants
    const participants = bookingDetails?.participants || [];
    let participantsHtml = '';
    if (participants.length > 0) {
      participantsHtml = `
        <div style="background-color: #071F1B; color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #D4AF6A; margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid rgba(212, 175, 106, 0.3); padding-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
            👥 Players (${participants.length} Player${participants.length > 1 ? 's' : ''})
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.15); text-align: left; color: #D4AF6A;">
                <th style="padding: 6px 4px;">Name</th>
                <th style="padding: 6px 4px;">Email</th>
                <th style="padding: 6px 4px;">Phone</th>
                <th style="padding: 6px 4px;">Age Group</th>
              </tr>
            </thead>
            <tbody>
              ${participants.map((p: any, i: number) => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <td style="padding: 8px 4px; font-weight: bold; color: #fff;">${i + 1}. ${p.fullName || 'Guest'}${p.isOwner ? ' <span style="font-size:10px; color:#D4AF6A; border:1px solid #D4AF6A; padding:1px 4px; border-radius:3px; margin-left:4px;">Main</span>' : ''}</td>
                  <td style="padding: 8px 4px; color: #bbb;">${p.email || '-'}</td>
                  <td style="padding: 8px 4px; color: #bbb;">${p.phone || '-'}</td>
                  <td style="padding: 8px 4px; color: #bbb;">${p.ageGroup?.name || p.ageGroup || '-'}</td>
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
          <h3 style="color: #071F1B; margin-top: 0;">${config.newUserTitle}</h3>
          <p style="color: #333; margin-bottom: 10px;">${config.newUserIntro}</p>
          <p style="margin: 5px 0;"><strong>Username / Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Password:</strong> ${plainPassword || '••••••••'}</p>
          <p style="color: #666; font-size: 13px; margin-top: 15px;">Please log in to change your password as soon as possible.</p>
        </div>
      `
      : `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #071F1B;">
          <p style="color: #333; margin: 0;">${config.existingUserIntro}</p>
        </div>
      `;

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color: #071F1B; padding: 30px; text-align: center;">
          <h1 style="color: #D4AF6A; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">${config.headerTitle}</h1>
        </div>
        
        <!-- Body -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #071F1B; margin-top: 0;">${config.confirmationTitle}</h2>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">Hello <strong>${fullName}</strong>,</p>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">${config.introText}</p>
          
          <div style="background-color: #071F1B; color: #fff; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #D4AF6A; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 106, 0.3); padding-bottom: 10px;">${config.detailsTitle}</h3>
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
              ${venueDetailsHtml}
            </table>
          </div>

          ${participantsHtml}

          ${notesHtml}

          ${loginSection}

          <div style="text-align: center; margin-top: 30px;">
            <a href="${this.configService.get<string>('FRONTEND_URL') || 'https://mahjong-success.com'}/login" style="display: inline-block; background-color: #D4AF6A; color: #071F1B; text-decoration: none; font-weight: bold; padding: 12px 30px; border-radius: 30px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">${config.buttonText}</a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} ${config.headerTitle}. All rights reserved.</p>
          <p style="margin: 5px 0 0;">${config.footerText}</p>
        </div>
        
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: '"Mahjong Success" <' + this.configService.get<string>('SMTP_USER') + '>',
        to: email,
        subject: config.confirmationTitle,
        html: htmlContent,
      });
      this.logger.log(`Booking confirmation email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error);
    }
  }

  async sendTestEmail(email: string, isNewUser: boolean = true) {
    const dummyBooking = {
      bookingDate: new Date(),
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      session: {
        title: 'Beginner Hand Building Workshop',
        category: {
          name: 'Guided Games',
          game: {
            name: 'Taiwanese Mahjong',
          },
        },
      },
    };
    await this.sendBookingConfirmation(
      email,
      'Sample User',
      isNewUser,
      isNewUser ? 'Pass1234!' : undefined,
      dummyBooking,
    );
  }

  async sendJoinCircleAdminNotification(request: any) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || this.configService.get<string>('SMTP_USER');
    
    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #071F1B;">New Join Circle Request</h2>
        <p>A new request has been submitted to join a circle.</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.firstName} ${request.lastName}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.email}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.phone}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Game:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.game?.name || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Level:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.level}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Age Group:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.ageGroup}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Days:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.days.join(', ')}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Times:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.times.join(', ')}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Group Size:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.groupSize}</td></tr>
        </table>
        ${request.message ? `<p><strong>Message:</strong><br>${request.message}</p>` : ''}
        ${request.friendEmail ? `<p><strong>Friend Email:</strong> ${request.friendEmail}</p>` : ''}
        ${request.friendPhone ? `<p><strong>Friend Phone:</strong> ${request.friendPhone}</p>` : ''}
        
        <p style="margin-top: 20px;">Please check the admin panel for more details.</p>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: '"Mahjong Success" <' + this.configService.get<string>('SMTP_USER') + '>',
        to: adminEmail,
        subject: 'New Join Circle Request',
        html: htmlContent,
      });
      this.logger.log(`Join circle notification sent to ${adminEmail}`);
    } catch (error) {
      this.logger.error(`Failed to send join circle notification to ${adminEmail}`, error);
    }
  }
}
