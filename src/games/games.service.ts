import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: createGameDto,
    });
  }

  async findAll(type?: any) {
    const where: any = { isDeleted: false };
    if (type) {
      where.type = type;
    }
    
    return this.prisma.game.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        categories: {
          where: type ? { isDeleted: false, type } : { isDeleted: false },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
          include: {
            sessions: {
              where: type ? { isDeleted: false, type } : { isDeleted: false },
              orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
            },
          }
        }
      }
    });
  }

  async findOne(id: number) {
    const game = await this.prisma.game.findUnique({
      where: { id },
      include: {
        categories: {
          where: { isDeleted: false },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
          include: {
            sessions: {
              where: { isDeleted: false },
              orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
            },
          }
        }
      }
    });
    if (!game) throw new NotFoundException(`Game with id ${id} not found`);
    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.prisma.game.findUnique({ where: { id } });
    if (!game) throw new NotFoundException(`Game with id ${id} not found`);

    return this.prisma.game.update({
      where: { id },
      data: updateGameDto,
    });
  }

  async remove(id: number) {
    const game = await this.prisma.game.findUnique({ where: { id } });
    if (!game) throw new NotFoundException(`Game with id ${id} not found`);

    return this.prisma.game.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async reorder(itemIds: number[]) {
    const transactions = itemIds.map((id, index) => 
      this.prisma.game.update({
        where: { id },
        data: { order: index + 1 }
      })
    );
    await this.prisma.$transaction(transactions);
    return { success: true };
  }
}
