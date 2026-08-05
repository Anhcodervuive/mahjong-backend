import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const existing = await this.findByEmail(data.email);
    if (existing) {
      throw new ConflictException('An account with this email already exists. If you booked a session previously, an account was automatically created for you. Please check your email for the password or reset it.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async getAllUsers(limit?: number, offset?: number) {
    const total = await this.prisma.user.count();
    const data = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit ? Number(limit) : undefined,
      skip: offset ? Number(offset) : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    });
    
    const usersWithLastBooking = await Promise.all(
      data.map(async (user) => {
        const lastBooking = await this.prisma.booking.findFirst({
          where: { contactEmail: user.email },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            bookingDate: true,
            startTime: true,
            endTime: true,
            totalAmount: true,
            session: {
              select: {
                title: true,
              }
            },
            participants: {
              where: { isOwner: true },
              select: {
                ageGroup: {
                  select: { name: true }
                }
              }
            }
          }
        });
        return {
          ...user,
          lastBooking,
        };
      })
    );

    return { data: usersWithLastBooking, total };
  }
}
