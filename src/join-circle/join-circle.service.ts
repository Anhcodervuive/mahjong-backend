import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJoinCircleDto } from './dto/create-join-circle.dto';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';

function formatPhoneNumber(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const trimmed = phone.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('+')) {
    return trimmed;
  }

  if (trimmed.startsWith('971')) {
    return `+${trimmed}`;
  }

  if (trimmed.startsWith('05')) {
    const cleanDigits = trimmed.substring(1);
    return `+971 ${cleanDigits}`;
  }

  return `+971 ${trimmed}`;
}

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
    const formattedPhone = formatPhoneNumber(createDto.phone) || createDto.phone?.trim() || null;

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
              phone: formattedPhone,
              role: 'USER',
            },
          });
          isNewUser = true;
          this.logger.log(`Created new user account for join-circle participant: ${cleanEmail}`);
        } else if (!user.phone && formattedPhone) {
          // Update phone if existing user didn't have one
          await this.prisma.user.update({
            where: { id: user.id },
            data: { phone: formattedPhone },
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

  async getOptions() {
    const options = await this.prisma.circleOption.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    const days = options.filter(o => o.type === 'DAY').map(o => o.value);
    const times = options.filter(o => o.type === 'TIME').map(o => o.value);

    const defaultDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const defaultTimes = ["10 am-12 pm", "1 pm-3 pm", "2 pm- 4 pm", "4 pm - 6 pm", "6 pm-8 pm"];

    return {
      days: days.length > 0 ? days : defaultDays,
      times: times.length > 0 ? times : defaultTimes,
      raw: options,
    };
  }

  async updateOptions(dto: { days?: string[]; times?: string[] }) {
    return this.prisma.$transaction(async (tx) => {
      if (Array.isArray(dto.days)) {
        await tx.circleOption.deleteMany({ where: { type: 'DAY' } });
        if (dto.days.length > 0) {
          await tx.circleOption.createMany({
            data: dto.days.map((val, idx) => ({
              type: 'DAY',
              value: val.trim(),
              order: idx + 1,
              isActive: true,
            })),
          });
        }
      }

      if (Array.isArray(dto.times)) {
        await tx.circleOption.deleteMany({ where: { type: 'TIME' } });
        if (dto.times.length > 0) {
          await tx.circleOption.createMany({
            data: dto.times.map((val, idx) => ({
              type: 'TIME',
              value: val.trim(),
              order: idx + 1,
              isActive: true,
            })),
          });
        }
      }

      const updated = await tx.circleOption.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      });

      return {
        days: updated.filter(o => o.type === 'DAY').map(o => o.value),
        times: updated.filter(o => o.type === 'TIME').map(o => o.value),
      };
    });
  }
}
