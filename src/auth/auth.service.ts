import { Injectable, UnauthorizedException, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersService.findByEmail((email || '').toLowerCase().trim());
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const { password, ...userWithoutPassword } = user;
    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }

  async forgotPassword(email: string) {
    const cleanEmail = (email || '').toLowerCase().trim();
    if (!cleanEmail) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.usersService.findByEmail(cleanEmail);
    if (!user) {
      // For security, do not disclose whether user exists or not
      return {
        message: 'If your email is registered with us, a password reset link has been sent.',
      };
    }

    // Generate random 32-byte hex token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires,
      },
    });

    const frontendUrl = (
      this.configService.get<string>('FRONTEND_URL') ||
      this.configService.get<string>('FE_URL') ||
      process.env.FRONTEND_URL ||
      process.env.FE_URL ||
      'https://staging.mahjongsuccess.com'
    ).replace(/\/+$/, '');
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`;

    try {
      await this.emailService.sendPasswordResetEmail(user.email, user.name, resetLink);
    } catch (err) {
      this.logger.error(`Failed to send password reset email to ${user.email}`, err);
    }

    return {
      message: 'If your email is registered with us, a password reset link has been sent.',
    };
  }

  async resetPassword(email: string, token: string, newPass: string) {
    const cleanEmail = (email || '').toLowerCase().trim();
    const cleanToken = (token || '').trim();

    if (!cleanEmail || !cleanToken || !newPass) {
      throw new BadRequestException('Email, token, and new password are required.');
    }

    if (newPass.length < 8) {
      throw new BadRequestException('New password must be at least 8 characters long.');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        email: cleanEmail,
        resetPasswordToken: cleanToken,
        resetPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired password reset link. Please request a new one.');
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return {
      message: 'Password has been reset successfully. You can now log in with your new password.',
    };
  }
}
