import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto) {
    // serviceOptions is no longer part of session directly
    const sessionData = { ...createSessionDto };
    delete (sessionData as any).serviceOptions;

    return this.prisma.session.create({
      data: sessionData as any,
    });
  }

  async findAll(type?: any) {
    const where: any = { isDeleted: false };
    if (type) {
      where.type = type;
    }

    return this.prisma.session.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        category: {
          include: { game: true },
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
        children: {
          where: { isDeleted: false },
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
        }, // If it's a parent session
      }
    });
    if (!session) throw new NotFoundException(`Session with id ${id} not found`);
    return session;
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const session = await this.prisma.session.findUnique({ where: { id } });
    if (!session) throw new NotFoundException(`Session with id ${id} not found`);

    const sessionData = { ...updateSessionDto };
    delete (sessionData as any).serviceOptions;

    return this.prisma.session.update({
      where: { id },
      data: sessionData as any,
    });
  }

  async remove(id: number) {
    const session = await this.prisma.session.findUnique({ where: { id } });
    if (!session) throw new NotFoundException(`Session with id ${id} not found`);

    return this.prisma.session.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async reorder(itemIds: number[]) {
    const transactions = itemIds.map((id, index) => 
      this.prisma.session.update({
        where: { id },
        data: { order: index + 1 }
      })
    );
    await this.prisma.$transaction(transactions);
    return { success: true };
  }
}
