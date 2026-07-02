import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import dayjs from 'dayjs';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async getAvailabilityForMonth(year: number, month: number) {
    const startDate = dayjs(`${year}-${month}-01`).startOf('month');
    const endDate = startDate.endOf('month');
    const daysInMonth = startDate.daysInMonth();
    const today = dayjs().startOf('day');

    const weeklySchedules = await this.prisma.weeklySchedule.findMany();
    const dateOverrides = await this.prisma.dateOverride.findMany({
      where: {
        date: {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        },
      },
    });

    const bookings = await this.prisma.booking.findMany({
      where: {
        bookingDate: {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        },
        status: { in: ['CONFIRMED', 'PENDING'] },
      },
      include: { session: true },
    });

    const result: any[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const currentDate = startDate.date(d);
      const isPast = currentDate.isBefore(today);
      const dateStr = currentDate.format('YYYY-MM-DD');

      if (isPast) {
        result.push({ day: d, status: 'past', slots: [] });
        continue;
      }

      const override = dateOverrides.find(
        (o) => dayjs(o.date).format('YYYY-MM-DD') === dateStr,
      );

      let isClosed = false;
      let shifts: { startTimeStr: string; endTimeStr: string; capacity: number }[] = [];

      if (override) {
        if (override.isClosed) {
          isClosed = true;
        } else {
          shifts = [{
            startTimeStr: override.customStartTime || '10:00',
            endTimeStr: override.customEndTime || '22:00',
            capacity: override.customCapacity ?? 4
          }];
        }
      } else {
        const dow = currentDate.day();
        const ws = weeklySchedules.filter((w) => w.dayOfWeek === dow);
        if (ws.length === 0) {
          isClosed = true;
        } else {
          shifts = ws.map((w) => ({
            startTimeStr: w.startTime,
            endTimeStr: w.endTime,
            capacity: w.capacity
          }));
        }
      }

      if (isClosed) {
        result.push({ day: d, status: 'off-day', slots: [] });
        continue;
      }

      const slots: any[] = [];
      let totalCapacity = 0;
      let usedCapacity = 0;

      for (const shift of shifts) {
        const slotStart = shift.startTimeStr;
        const slotEnd = shift.endTimeStr;

        const bookingsInSlot = bookings.filter((b) => {
          return (
            dayjs(b.bookingDate).format('YYYY-MM-DD') === dateStr &&
            b.startTime === slotStart
          );
        });

        // Capacity is based on number of players. Each booking takes `quantity` slots.
        const bookedCount = bookingsInSlot.reduce((sum, b) => sum + (b.quantity || 1), 0); 
        const remaining = shift.capacity - bookedCount;

        totalCapacity += shift.capacity;
        usedCapacity += bookedCount;

        const sh = parseInt(slotStart.split(':')[0], 10);
        const eh = parseInt(slotEnd.split(':')[0], 10);
        const startLabel = `${sh % 12 === 0 ? 12 : sh % 12}:00 ${sh >= 12 ? 'PM' : 'AM'}`;
        const endLabel = `${eh % 12 === 0 ? 12 : eh % 12}:00 ${eh >= 12 ? 'PM' : 'AM'}`;

        slots.push({
          id: `${dateStr}-${slotStart}-${slotEnd}`,
          label: `${startLabel} - ${endLabel}`,
          startTime: slotStart,
          endTime: slotEnd,
          remaining: remaining > 0 ? remaining : 0,
        });
      }

      slots.sort((a, b) => a.startTime.localeCompare(b.startTime));

      let status = 'available';
      if (usedCapacity >= totalCapacity && totalCapacity > 0) {
        status = 'fully-booked';
      } else if (usedCapacity > 0) {
        status = 'filling-up';
      }

      result.push({ day: d, status, slots });
    }

    return result;
  }
}
