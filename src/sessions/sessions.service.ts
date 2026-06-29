import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto) {
    const { serviceOptions, ...sessionData } = createSessionDto;

    return this.prisma.session.create({
      data: {
        ...sessionData,
        serviceOptions: {
          create: serviceOptions?.map(opt => ({
            serviceOptionId: opt.serviceOptionId,
            price: opt.price,
          })) || [],
        },
      },
      include: {
        serviceOptions: {
          include: { serviceOption: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.session.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: {
          include: { game: true },
        },
        serviceOptions: {
          include: { serviceOption: true },
        },
      }
    });
  }

  async findOne(id: number) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        category: {
          include: { game: true },
        },
        serviceOptions: {
          include: { serviceOption: true },
        },
        children: true, // If it's a parent session
      }
    });
    if (!session) throw new NotFoundException(`Session with id ${id} not found`);
    return session;
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const session = await this.prisma.session.findUnique({ where: { id } });
    if (!session) throw new NotFoundException(`Session with id ${id} not found`);

    const serviceOptions = (updateSessionDto as any).serviceOptions;
    const sessionData = { ...updateSessionDto };
    delete (sessionData as any).serviceOptions;

    return this.prisma.$transaction(async (prisma) => {
      // If serviceOptions are provided, we replace the existing ones
      if (serviceOptions !== undefined) {
        // Delete existing pricing for this session
        await prisma.sessionServicePricing.deleteMany({
          where: { sessionId: id },
        });

        // Re-create the new pricing
        if (serviceOptions.length > 0) {
          await prisma.sessionServicePricing.createMany({
            data: serviceOptions.map(opt => ({
              sessionId: id,
              serviceOptionId: opt.serviceOptionId,
              price: opt.price,
            })),
          });
        }
      }

      // Update the main session entity
      return prisma.session.update({
        where: { id },
        data: sessionData as any,
        include: {
          serviceOptions: {
            include: { serviceOption: true },
          },
        },
      });
    });
  }

  async remove(id: number) {
    const session = await this.prisma.session.findUnique({ where: { id } });
    if (!session) throw new NotFoundException(`Session with id ${id} not found`);

    // Delete related service options first due to foreign key constraints
    await this.prisma.sessionServicePricing.deleteMany({
      where: { sessionId: id },
    });

    return this.prisma.session.delete({
      where: { id },
    });
  }
}
