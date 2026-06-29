import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgeGroupsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.ageGroup.findMany();
  }

  async findOne(id: number) {
    const ageGroup = await this.prisma.ageGroup.findUnique({ where: { id } });
    if (!ageGroup) throw new NotFoundException('Age group not found');
    return ageGroup;
  }

  async create(data: { name: string }) {
    return this.prisma.ageGroup.create({ data });
  }

  async update(id: number, data: { name: string }) {
    return this.prisma.ageGroup.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.ageGroup.delete({ where: { id } });
  }
}
