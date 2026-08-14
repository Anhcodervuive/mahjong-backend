import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('send-test')
  async sendTestEmail(@Body() body: { email: string; isNewUser?: boolean }) {
    await this.emailService.sendTestEmail(body.email, body.isNewUser);
    return { success: true, message: `Test email sent to ${body.email}` };
  }
}
