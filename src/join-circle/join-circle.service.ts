import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJoinCircleDto } from './dto/create-join-circle.dto';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JoinCircleService {
  private readonly logger = new Logger(JoinCircleService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(createDto: CreateJoinCircleDto) {
    const cleanEmail = (createDto.email || '').toLowerCase().trim();
    const fullName = `${createDto.firstName || ''} ${createDto.lastName || ''}`.trim() || 'Player';
    const phone = (createDto.phone || '').trim() || null;

    const request = await this.prisma.joinCircleRequest.create({
      data: {
        firstName: createDto.firstName,
        lastName: createDto.lastName,
        email: cleanEmail,
        phone: createDto.phone,
        gameId: createDto.gameId,
        level: createDto.level,
        ageGroup: createDto.ageGroup,
        days: createDto.days,
        times: createDto.times,
        groupSize: createDto.groupSize,
        message: createDto.message,
        friendName: createDto.friendName,
        friendEmail: createDto.friendEmail,
        friendPhone: createDto.friendPhone,
        locations: createDto.locationIds && createDto.locationIds.length > 0
          ? {
              connect: createDto.locationIds.map(id => ({ id })),
            }
          : undefined,
      },
      include: {
        game: true,
        locations: true,
      }
    });

    // Check if user already exists in system by email
    let isNewUser = false;
    let plainPassword = '';

    if (cleanEmail) {
      try {
        let user = await this.prisma.user.findUnique({
          where: { email: cleanEmail },
        });

        if (!user) {
          // Generate 8-character random password
          plainPassword = Math.random().toString(36).slice(-8);
          const hashedPassword = await bcrypt.hash(plainPassword, 10);

          user = await this.prisma.user.create({
            data: {
              email: cleanEmail,
              password: hashedPassword,
              name: fullName,
              phone: phone,
              role: 'USER',
            },
          });
          isNewUser = true;
          this.logger.log(`Created new user account for join-circle participant: ${cleanEmail}`);
        } else if (!user.phone && phone) {
          // Update phone if existing user didn't have one
          await this.prisma.user.update({
            where: { id: user.id },
            data: { phone },
          });
        }
      } catch (err) {
        this.logger.error(`Error checking/creating user for join-circle: ${cleanEmail}`, err);
      }
    }

    // Send customer confirmation & admin notification asynchronously
    Promise.all([
      this.emailService.sendJoinCircleAdminNotification(request).catch(e => 
        this.logger.error('Failed to send join circle admin notification', e)
      ),
      this.emailService.sendJoinCircleCustomerConfirmation(
        request.email,
        fullName,
        request,
        isNewUser,
        plainPassword,
      ).catch(e =>
        this.logger.error(`Failed to send join circle customer confirmation to ${request.email}`, e)
      ),
    ]);

    return request;
  }

  findAll() {
    return this.prisma.joinCircleRequest.findMany({
      include: {
        game: true,
        locations: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.joinCircleRequest.findUnique({
      where: { id },
      include: { game: true, locations: true },
    });
  }

  updateStatus(id: number, status: string) {
    return this.prisma.joinCircleRequest.update({
      where: { id },
      data: { status: status as any },
    });
  }

  remove(id: number) {
    return this.prisma.joinCircleRequest.delete({
      where: { id },
    });
  }
}
