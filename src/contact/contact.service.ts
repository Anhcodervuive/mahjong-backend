import { Injectable, Logger } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly emailService: EmailService) {}

  async handleContactSubmission(dto: ContactDto) {
    this.logger.log(`Received contact enquiry from ${dto.name} <${dto.email}> for subject: "${dto.subject}"`);

    // Asynchronously send admin notification & customer auto-reply
    Promise.all([
      this.emailService.sendContactAdminNotification(dto).catch((err) =>
        this.logger.error('Failed to send contact admin notification', err),
      ),
      this.emailService.sendContactCustomerAutoReply(dto).catch((err) =>
        this.logger.error(`Failed to send contact auto-reply to ${dto.email}`, err),
      ),
    ]);

    return {
      success: true,
      message: 'Your enquiry has been received. Our team will review your message and reply within 2 working days.',
    };
  }
}
