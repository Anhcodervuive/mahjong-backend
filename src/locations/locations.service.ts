import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async create(createLocationDto: CreateLocationDto) {
    const { schedules, ...data } = createLocationDto;
    return this.prisma.location.create({
      data: {
        ...data,
        schedules: schedules ? {
          create: schedules
        } : undefined
      },
      include: { schedules: true }
    });
  }

  findAll() {
    return this.prisma.location.findMany({
      where: { isDeleted: false },
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
      include: { schedules: true }
    });
  }

  async findOne(id: number) {
    const location = await this.prisma.location.findUnique({ 
      where: { id },
      include: { schedules: true }
    });
    if (!location) throw new NotFoundException(`Location with id ${id} not found`);
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.prisma.location.findUnique({ where: { id } });
    if (!location) throw new NotFoundException(`Location with id ${id} not found`);

    const { schedules, ...data } = updateLocationDto;

    return this.prisma.$transaction(async (prisma) => {
      if (schedules) {
        // Delete old schedules and create new ones
        await prisma.locationSchedule.deleteMany({
          where: { locationId: id }
        });
      }

      return prisma.location.update({
        where: { id },
        data: {
          ...data,
          ...(schedules ? {
            schedules: {
              create: schedules
            }
          } : {})
        },
        include: { schedules: true }
      });
    });
  }

  async remove(id: number) {
    const location = await this.prisma.location.findUnique({ where: { id } });
    if (!location) throw new NotFoundException(`Location with id ${id} not found`);

    return this.prisma.location.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async reorder(itemIds: number[]) {
    const transactions = itemIds.map((id, index) => 
      this.prisma.location.update({
        where: { id },
        data: { order: index + 1 }
      })
    );
    await this.prisma.$transaction(transactions);
    return { success: true };
  }
}
