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

export interface JoinCircleEmailConfig {
  headerTitle?: string;
  subjectTitle?: string;
  introText?: string;
  preferencesTitle?: string;
  nextStepsTitle?: string;
  nextStepsText?: string;
  footerText?: string;
}

export interface ContactUsEmailConfig {
  headerTitle?: string;
  subjectTitle?: string;
  introText?: string;
  enquiryTitle?: string;
  followUpNote?: string;
  quickLinksTitle?: string;
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

const DEFAULT_JOIN_CIRCLE_CONFIG: Required<JoinCircleEmailConfig> = {
  headerTitle: 'Mahjong Success',
  subjectTitle: "We've Received Your Join Circle Request! 🀄",
  introText: 'Thank you for registering to join the Mahjong Success Circle. We have received your preferences and details.',
  preferencesTitle: 'Your Circle Preferences',
  nextStepsTitle: 'What Happens Next',
  nextStepsText: 'Our team will match you with players at a similar skill level and preferred location within 24–48 hours. Once a table of 4 is formed, we will reach out with your confirmed session details.',
  footerText: 'This is an automated message, please do not reply.',
};

const DEFAULT_CONTACT_US_CONFIG: Required<ContactUsEmailConfig> = {
  headerTitle: 'Mahjong Success',
  subjectTitle: 'Thank You for Contacting Mahjong Success',
  introText: 'Thank you for reaching out to us. We have received your enquiry and our team will get back to you shortly.',
  enquiryTitle: 'Enquiry Summary',
  followUpNote: 'Our team will review your message and reply within 2 working days.',
  quickLinksTitle: 'Explore Mahjong Success',
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

  private async getJoinCircleEmailConfig(): Promise<Required<JoinCircleEmailConfig>> {
    try {
      const setting = await this.prisma.setting.findUnique({
        where: { key: 'EMAIL_TEMPLATE_JOIN_CIRCLE' },
      });
      if (setting && setting.value) {
        const parsed = JSON.parse(setting.value);
        return {
          headerTitle: parsed.headerTitle || DEFAULT_JOIN_CIRCLE_CONFIG.headerTitle,
          subjectTitle: parsed.subjectTitle || DEFAULT_JOIN_CIRCLE_CONFIG.subjectTitle,
          introText: parsed.introText || DEFAULT_JOIN_CIRCLE_CONFIG.introText,
          preferencesTitle: parsed.preferencesTitle || DEFAULT_JOIN_CIRCLE_CONFIG.preferencesTitle,
          nextStepsTitle: parsed.nextStepsTitle || DEFAULT_JOIN_CIRCLE_CONFIG.nextStepsTitle,
          nextStepsText: parsed.nextStepsText || DEFAULT_JOIN_CIRCLE_CONFIG.nextStepsText,
          footerText: parsed.footerText || DEFAULT_JOIN_CIRCLE_CONFIG.footerText,
        };
      }
    } catch (e) {
      this.logger.error('Failed to load EMAIL_TEMPLATE_JOIN_CIRCLE setting, using defaults', e);
    }
    return DEFAULT_JOIN_CIRCLE_CONFIG;
  }

  private async getContactUsEmailConfig(): Promise<Required<ContactUsEmailConfig>> {
    try {
      const setting = await this.prisma.setting.findUnique({
        where: { key: 'EMAIL_TEMPLATE_CONTACT_US' },
      });
      if (setting && setting.value) {
        const parsed = JSON.parse(setting.value);
        return {
          headerTitle: parsed.headerTitle || DEFAULT_CONTACT_US_CONFIG.headerTitle,
          subjectTitle: parsed.subjectTitle || DEFAULT_CONTACT_US_CONFIG.subjectTitle,
          introText: parsed.introText || DEFAULT_CONTACT_US_CONFIG.introText,
          enquiryTitle: parsed.enquiryTitle || DEFAULT_CONTACT_US_CONFIG.enquiryTitle,
          followUpNote: parsed.followUpNote || DEFAULT_CONTACT_US_CONFIG.followUpNote,
          quickLinksTitle: parsed.quickLinksTitle || DEFAULT_CONTACT_US_CONFIG.quickLinksTitle,
          footerText: parsed.footerText || DEFAULT_CONTACT_US_CONFIG.footerText,
        };
      }
    } catch (e) {
      this.logger.error('Failed to load EMAIL_TEMPLATE_CONTACT_US setting, using defaults', e);
    }
    return DEFAULT_CONTACT_US_CONFIG;
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
      const minSpendVal = Number(loc.price || 0);
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
        ${minSpendVal > 0 ? `<tr><td style="padding: 6px 0; color: #aaa;">Minimum Spend:</td><td style="padding: 6px 0; font-weight: bold; color: #D4AF6A;">AED ${minSpendVal.toFixed(2)} / person <span style="font-size: 11px; font-weight: normal; color: #aaa;">(payable at venue)</span></td></tr>` : ''}
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

  async sendTestEmail(email: string, templateType: 'booking' | 'join-circle' | 'contact-us' = 'booking', isNewUser: boolean = true) {
    if (templateType === 'join-circle') {
      const dummyRequest = {
        firstName: 'Sample',
        lastName: 'Player',
        email: email,
        phone: '+971 50 123 4567',
        level: 'Beginner',
        ageGroup: '18–29 years',
        groupSize: 2,
        days: ['Tuesday', 'Saturday'],
        times: ['1:00 PM – 4:00 PM'],
        friendName: 'Friend Player',
        friendEmail: 'friend@example.com',
        friendPhone: '+971 50 765 4321',
        message: 'Looking forward to meeting new Mahjong players!',
        game: { name: 'Taiwanese Mahjong' },
        locations: [{ name: 'Dubai Hills' }, { name: 'Barsha' }],
      };
      await this.sendJoinCircleCustomerConfirmation(email, 'Sample Player', dummyRequest);
      return;
    }

    if (templateType === 'contact-us') {
      const dummyContact = {
        name: 'Sample Customer',
        email: email,
        phone: '+971 50 123 4567',
        subject: 'Corporate Events (The Thinking Table)',
        message: 'Hello, we would like to enquire about organising a Mahjong corporate event for 20 colleagues next month. Please share available packages.',
      };
      await this.sendContactCustomerAutoReply(dummyContact);
      return;
    }

    // Default: booking
    const dummyBooking = {
      bookingDate: new Date(),
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      totalAmount: 300,
      level: 'Beginners',
      notes: 'Looking forward to our first session together!',
      serviceOption: { name: 'Regular' },
      session: {
        title: '2 Hours Game Session',
        category: {
          name: 'Guided Games / Social Play',
          game: {
            name: 'Taiwanese Mahjong',
          },
        },
      },
      location: {
        name: 'Dubai Hills',
        description: "Tasha's Teahouse",
        address: 'Maple 1, Villa 611, Dubai Hills, Dubai',
        price: 50,
        mapUrl: 'https://maps.google.com',
      },
      participants: [
        { fullName: 'Sample Customer', email: email, phone: '+971 50 123 4567', ageGroup: { name: '18–29 yrs' }, isOwner: true },
        { fullName: 'Guest Player', email: 'friend@example.com', phone: '+971 50 765 4321', ageGroup: { name: '18–29 yrs' }, isOwner: false },
      ],
    };
    await this.sendBookingConfirmation(
      email,
      'Sample Customer',
      isNewUser,
      isNewUser ? 'Pass1234!' : undefined,
      dummyBooking,
    );
  }

  async sendJoinCircleCustomerConfirmation(email: string, fullName: string, request: any) {
    const config = await this.getJoinCircleEmailConfig();
    const gameName = request.game?.name || 'Mahjong';
    const level = request.level || 'Beginner';
    const ageGroup = request.ageGroup || 'General';
    const groupSize = request.groupSize || 1;
    const days = Array.isArray(request.days) ? request.days.join(', ') : (request.days || 'Flexible');
    const times = Array.isArray(request.times) ? request.times.join(', ') : (request.times || 'Flexible');
    const locations = request.locations && request.locations.length > 0
      ? request.locations.map((l: any) => l.name).join(', ')
      : 'Flexible';

    const friendInfoHtml = request.friendEmail || request.friendName ? `
      <tr>
        <td style="padding: 6px 0; color: #aaa;">Friend Joining:</td>
        <td style="padding: 6px 0; font-weight: bold;">
          ${request.friendName || 'Friend'} ${request.friendEmail ? `(${request.friendEmail})` : ''} ${request.friendPhone ? ` - ${request.friendPhone}` : ''}
        </td>
      </tr>
    ` : '';

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color: #071F1B; padding: 30px; text-align: center;">
          <h1 style="color: #D4AF6A; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">${config.headerTitle}</h1>
          <p style="color: rgba(212,175,106,0.7); margin: 8px 0 0; font-size: 13px;">Mahjong Success Circle</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #071F1B; margin-top: 0;">${config.subjectTitle}</h2>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">Hello <strong>${fullName}</strong>,</p>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">${config.introText}</p>
          
          <div style="background-color: #071F1B; color: #fff; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #D4AF6A; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 106, 0.3); padding-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
              ${config.preferencesTitle}
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 140px;">Selected Game:</td>
                <td style="padding: 6px 0; font-weight: bold;">${gameName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Skill Level:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #D4AF6A;">${level}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Age Group:</td>
                <td style="padding: 6px 0; font-weight: bold;">${ageGroup}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Preferred Area(s):</td>
                <td style="padding: 6px 0; font-weight: bold;">${locations}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Available Days:</td>
                <td style="padding: 6px 0; font-weight: bold;">${days}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Available Times:</td>
                <td style="padding: 6px 0; font-weight: bold;">${times}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Group Size:</td>
                <td style="padding: 6px 0; font-weight: bold;">${groupSize} Player(s)</td>
              </tr>
              ${friendInfoHtml}
            </table>
          </div>

          <!-- Next Steps Box -->
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #D4AF6A;">
            <h3 style="color: #071F1B; margin-top: 0; font-size: 15px;">${config.nextStepsTitle}</h3>
            <p style="color: #444; font-size: 14px; line-height: 1.6; margin-bottom: 0;">${config.nextStepsText}</p>
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
        subject: config.subjectTitle,
        html: htmlContent,
      });
      this.logger.log(`Join circle customer confirmation email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send join circle customer confirmation to ${email}`, error);
    }
  }

  async sendJoinCircleAdminNotification(request: any) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || this.configService.get<string>('SMTP_USER');
    const locations = request.locations && request.locations.length > 0
      ? request.locations.map((l: any) => l.name).join(', ')
      : 'Flexible';
    
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
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Locations:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${locations}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Days:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${Array.isArray(request.days) ? request.days.join(', ') : request.days}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Times:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${Array.isArray(request.times) ? request.times.join(', ') : request.times}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Group Size:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${request.groupSize}</td></tr>
        </table>
        ${request.friendName || request.friendEmail ? `<p><strong>Friend:</strong> ${request.friendName || ''} (${request.friendEmail || ''} - ${request.friendPhone || ''})</p>` : ''}
        ${request.message ? `<p><strong>Message:</strong><br>${request.message}</p>` : ''}
        
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

  async sendContactCustomerAutoReply(contact: { name: string; email: string; subject: string; message: string; phone?: string }) {
    const config = await this.getContactUsEmailConfig();
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'https://mahjong-success.com';

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color: #071F1B; padding: 30px; text-align: center;">
          <h1 style="color: #D4AF6A; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">${config.headerTitle}</h1>
          <p style="color: rgba(212,175,106,0.7); margin: 8px 0 0; font-size: 13px;">Customer Care</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #071F1B; margin-top: 0;">${config.subjectTitle}</h2>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">Hello <strong>${contact.name}</strong>,</p>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">${config.introText}</p>
          
          <!-- Summary Box -->
          <div style="background-color: #071F1B; color: #fff; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #D4AF6A; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 106, 0.3); padding-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
              ${config.enquiryTitle}
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 6px 0; color: #aaa; width: 120px;">Subject:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #D4AF6A;">${contact.subject}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Name:</td>
                <td style="padding: 6px 0; font-weight: bold;">${contact.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #aaa;">Email:</td>
                <td style="padding: 6px 0;">${contact.email}</td>
              </tr>
              ${contact.phone ? `<tr><td style="padding: 6px 0; color: #aaa;">Phone:</td><td style="padding: 6px 0;">${contact.phone}</td></tr>` : ''}
            </table>
            
            <div style="margin-top: 15px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #aaa; margin: 0 0 5px 0; font-size: 12px;">Your Message:</p>
              <p style="color: #fff; margin: 0; font-style: italic; line-height: 1.5;">&ldquo;${contact.message}&rdquo;</p>
            </div>
          </div>

          <!-- Follow-up Notice Box -->
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #D4AF6A;">
            <p style="color: #071F1B; font-size: 14px; line-height: 1.6; margin: 0; font-weight: 500;">
              ⏳ ${config.followUpNote}
            </p>
          </div>

          <!-- Quick Links Section -->
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #777; font-size: 13px; margin-bottom: 15px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
              ${config.quickLinksTitle}
            </p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <a href="${frontendUrl}/guided-games" style="display: inline-block; background-color: #071F1B; color: #D4AF6A; text-decoration: none; font-size: 12px; font-weight: bold; padding: 8px 16px; border-radius: 20px; margin: 4px;">Guided Games</a>
              <a href="${frontendUrl}/fast-track-bundles" style="display: inline-block; background-color: #071F1B; color: #D4AF6A; text-decoration: none; font-size: 12px; font-weight: bold; padding: 8px 16px; border-radius: 20px; margin: 4px;">Fast Track Bundles</a>
              <a href="${frontendUrl}/faq" style="display: inline-block; background-color: #071F1B; color: #D4AF6A; text-decoration: none; font-size: 12px; font-weight: bold; padding: 8px 16px; border-radius: 20px; margin: 4px;">FAQs</a>
            </div>
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
        to: contact.email,
        subject: config.subjectTitle,
        html: htmlContent,
      });
      this.logger.log(`Contact customer auto-reply email sent to ${contact.email}`);
    } catch (error) {
      this.logger.error(`Failed to send contact auto-reply to ${contact.email}`, error);
    }
  }

  async sendContactAdminNotification(contact: { name: string; email: string; subject: string; message: string; phone?: string }) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || this.configService.get<string>('SMTP_USER');
    
    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #071F1B;">New Contact Us Enquiry</h2>
        <p>A new enquiry has been submitted through the website contact form.</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 120px;"><strong>Subject:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #891A1A; font-weight: bold;">${contact.subject}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${contact.name}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${contact.email}">${contact.email}</a></td></tr>
          ${contact.phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${contact.phone}</td></tr>` : ''}
        </table>
        <div style="margin-top: 15px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #071F1B;">
          <p style="margin: 0 0 5px 0; font-weight: bold; color: #333;">Message:</p>
          <p style="margin: 0; color: #555; white-space: pre-wrap;">${contact.message}</p>
        </div>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: '"Mahjong Success" <' + this.configService.get<string>('SMTP_USER') + '>',
        to: adminEmail,
        subject: `New Enquiry: ${contact.subject} (from ${contact.name})`,
        html: htmlContent,
      });
      this.logger.log(`Contact admin notification sent to ${adminEmail}`);
    } catch (error) {
      this.logger.error(`Failed to send contact admin notification to ${adminEmail}`, error);
    }
  }
}
