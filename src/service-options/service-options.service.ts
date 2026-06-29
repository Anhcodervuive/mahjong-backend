import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServiceOptionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.serviceOption.findMany();
  }

  async findOne(id: number) {
    const serviceOption = await this.prisma.serviceOption.findUnique({ where: { id } });
    if (!serviceOption) throw new NotFoundException('Service option not found');
    return serviceOption;
  }

  async create(data: { name: string; description?: string; price: number }) {
    return this.prisma.serviceOption.create({ 
      data: {
        ...data,
        price: data.price || 0
      } 
    });
  }

  async update(id: number, data: { name?: string; description?: string; price?: number }) {
    return this.prisma.serviceOption.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.serviceOption.delete({ where: { id } });
  }
}
