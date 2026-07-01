import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    // Total Revenue (only SUCCESS payments)
    const completedPayments = await this.prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'SUCCESS',
      },
    });

    const revenue = completedPayments._sum.amount ? Number(completedPayments._sum.amount) : 0;

    // Total Bookings
    const totalBookings = await this.prisma.booking.count();

    // Active Sessions (total available games/sessions)
    const activeSessions = await this.prisma.session.count();

    // Total Users
    const totalUsers = await this.prisma.user.count();

    // Generate Chart Data (Last 7 days revenue)
    const chartData: { date: string, revenue: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      
      const dailyPayments = await this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: {
          status: 'SUCCESS',
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      chartData.push({
        date: startOfDay.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        revenue: dailyPayments._sum.amount ? Number(dailyPayments._sum.amount) : 0,
      });
    }

    return {
      totalBookings,
      revenue,
      activeSessions,
      newUsers: totalUsers,
      chartData,
    };
  }
}
