import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    const port = parseInt(this.configService.get<string>('SMTP_PORT') as string, 10) || 465;
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: port,
      secure: port === 465, // Use SSL for port 465, STARTTLS for 587
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      debug: true,
      logger: true,
    });
  }

  async sendBookingConfirmation(
    email: string,
    fullName: string,
    isNewUser: boolean,
    plainPassword?: string,
    bookingDetails?: any,
  ) {
    const sessionName = bookingDetails?.session?.title || 'Mahjong Session';
    const gameName = bookingDetails?.session?.category?.game?.name || 'Mahjong';
    const levelName = bookingDetails?.session?.category?.name || 'Session';
    const date = new Date(bookingDetails?.bookingDate).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const time = `${bookingDetails?.startTime} - ${bookingDetails?.endTime}`;

    const loginSection = isNewUser
      ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #D4AF6A;">
          <h3 style="color: #071F1B; margin-top: 0;">Your Account Details</h3>
          <p style="color: #333; margin-bottom: 10px;">An account has been automatically created for you to manage your bookings.</p>
          <p style="margin: 5px 0;"><strong>Username / Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Password:</strong> ${plainPassword}</p>
          <p style="color: #666; font-size: 13px; margin-top: 15px;">Please log in to change your password as soon as possible.</p>
        </div>
      `
      : `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #071F1B;">
          <p style="color: #333; margin: 0;">You can view and manage your booking by logging into your existing Mahjong Success account.</p>
        </div>
      `;

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color: #071F1B; padding: 30px; text-align: center;">
          <h1 style="color: #D4AF6A; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Mahjong Success</h1>
        </div>
        
        <!-- Body -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #071F1B; margin-top: 0;">Booking Confirmed!</h2>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">Hello <strong>${fullName}</strong>,</p>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">Your seat for the upcoming Mahjong session has been successfully booked. We can't wait to see you at the table!</p>
          
          <div style="background-color: #071F1B; color: #fff; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #D4AF6A; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(212, 175, 106, 0.3); padding-bottom: 10px;">Session Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #aaa; width: 100px;">Game:</td>
                <td style="padding: 8px 0; font-weight: bold;">${gameName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #aaa;">Level:</td>
                <td style="padding: 8px 0; font-weight: bold;">${levelName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #aaa;">Session:</td>
                <td style="padding: 8px 0; font-weight: bold;">${sessionName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #aaa;">Date:</td>
                <td style="padding: 8px 0; font-weight: bold;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #aaa;">Time:</td>
                <td style="padding: 8px 0; font-weight: bold;">${time}</td>
              </tr>
            </table>
          </div>

          ${loginSection}

          <div style="text-align: center; margin-top: 30px;">
            <a href="${this.configService.get<string>('FRONTEND_URL') || 'https://mahjong-success.com'}/login" style="display: inline-block; background-color: #D4AF6A; color: #071F1B; text-decoration: none; font-weight: bold; padding: 12px 30px; border-radius: 30px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Log In to Account</a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Mahjong Success. All rights reserved.</p>
          <p style="margin: 5px 0 0;">This is an automated message, please do not reply.</p>
        </div>
        
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: '"Mahjong Success" <' + this.configService.get<string>('SMTP_USER') + '>',
        to: email,
        subject: 'Your Mahjong Session Booking is Confirmed!',
        html: htmlContent,
      });
      this.logger.log(`Booking confirmation email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error);
    }
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
