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

  async findAll() {
    return this.prisma.game.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        categories: {
          where: { isDeleted: false },
          include: {
            sessions: {
              where: { isDeleted: false }
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
          include: {
            sessions: {
              where: { isDeleted: false }
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
}
