import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJoinCircleDto } from './dto/create-join-circle.dto';

@Injectable()
export class JoinCircleService {
  private readonly logger = new Logger(JoinCircleService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createDto: CreateJoinCircleDto) {
    const request = await this.prisma.joinCircleRequest.create({
      data: {
        firstName: createDto.firstName,
        lastName: createDto.lastName,
        email: createDto.email,
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
