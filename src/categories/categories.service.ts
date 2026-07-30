import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.sessionCategory.create({
      data: createCategoryDto,
    });
  }

  async findAll(type?: any) {
    const where: any = { isDeleted: false };
    if (type) {
      where.type = type;
    }
    
    return this.prisma.sessionCategory.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        game: true,
      }
    });
  }

  async findByGame(gameId: number) {
    return this.prisma.sessionCategory.findMany({
      where: { gameId, isDeleted: false },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.sessionCategory.findUnique({
      where: { id },
      include: {
        game: true,
        sessions: {
          where: { isDeleted: false },
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
        },
      }
    });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.sessionCategory.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);

    return this.prisma.sessionCategory.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const category = await this.prisma.sessionCategory.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);

    return this.prisma.sessionCategory.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async reorder(itemIds: number[]) {
    const transactions = itemIds.map((id, index) => 
      this.prisma.sessionCategory.update({
        where: { id },
        data: { order: index + 1 }
      })
    );
    await this.prisma.$transaction(transactions);
    return { success: true };
  }
}
