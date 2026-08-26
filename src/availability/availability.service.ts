import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import dayjs from 'dayjs';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async getEarliestBookableDate(): Promise<dayjs.Dayjs> {
    const nowInDubai = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));
    const today = dayjs(nowInDubai).startOf('day');

    // Fetch upcoming date overrides for the next 14 days
    const upcomingOverrides = await this.prisma.dateOverride.findMany({
      where: {
        date: {
          gte: today.toDate(),
          lte: today.add(14, 'day').toDate(),
        },
      },
    });

    let workingDaysCounted = 0;
    let checkDate = today.add(1, 'day'); // Start checking from tomorrow

    while (workingDaysCounted < 2) {
      const dateStr = checkDate.format('YYYY-MM-DD');
      const isSunday = checkDate.day() === 0;
      const override = upcomingOverrides.find(
        (o) => dayjs(o.date).format('YYYY-MM-DD') === dateStr
      );
      const isClosed = override ? override.isClosed : isSunday;

      if (!isClosed) {
        workingDaysCounted++;
      }
      if (workingDaysCounted < 2) {
        checkDate = checkDate.add(1, 'day');
      }
    }

    return checkDate.add(1, 'day');
  }

  async getAvailabilityForMonth(year: number, month: number, sessionId?: number) {
    const startDate = dayjs(`${year}-${month}-01`).startOf('month');
    const endDate = startDate.endOf('month');
    const daysInMonth = startDate.daysInMonth();
    const earliestBookableDate = await this.getEarliestBookableDate();

    const weeklySchedules = await this.prisma.weeklySchedule.findMany();
    const dateOverrides = await this.prisma.dateOverride.findMany({
      where: {
        date: {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        },
      },
    });

    const fifteenMinsAgo = dayjs().subtract(15, 'minute').toDate();

    const bookings = await this.prisma.booking.findMany({
      where: {
        bookingDate: {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        },
        OR: [
          { status: 'SUCCESS' },
          { status: 'PENDING', createdAt: { gte: fifteenMinsAgo } }
        ]
      },
      include: { session: { include: { category: true } } },
    });

    const result: any[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const currentDate = startDate.date(d);
      const isPast = currentDate.isBefore(earliestBookableDate, 'day');
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

      const timeToMins = (t: string) => {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
      };

      for (const shift of shifts) {
        const slotStart = shift.startTimeStr;
        const slotEnd = shift.endTimeStr;
        const tsStartMins = timeToMins(slotStart);
        const tsEndMins = timeToMins(slotEnd);

        // All overlapping non-social play bookings
        const overlappingBookings = bookings.filter((b) => {
          if (dayjs(b.bookingDate).format('YYYY-MM-DD') !== dateStr) return false;
          if (!b.startTime || !b.endTime) return false;
          
          const bStart = timeToMins(b.startTime);
          const bEnd = timeToMins(b.endTime);
          return Math.max(tsStartMins, bStart) < Math.min(tsEndMins, bEnd);
        });

        // Check if instructor is busy with a DIFFERENT time slot or DIFFERENT session
        const instructorBusy = overlappingBookings.some((b) => {
          const catName = (b.session?.category?.name ?? '').toLowerCase();
          if (catName === 'social play') return false; 
          
          if (sessionId && b.sessionId === sessionId && b.startTime === slotStart && b.endTime === slotEnd) return false; 
          return true; // Overlaps -> instructor is blocked
        });

        let remaining = 0;
        let bookedCount = 0;

        if (!instructorBusy) {
          const exactSlotBookings = overlappingBookings.filter(b => b.startTime === slotStart && b.endTime === slotEnd);
          bookedCount = exactSlotBookings.reduce((sum, b) => sum + (b.quantity || 1), 0); 
          remaining = Math.max(0, shift.capacity - bookedCount);
        }

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
      const hasAvailableSlots = slots.some((s) => s.remaining > 0);
      
      if (!hasAvailableSlots && slots.length > 0) {
        status = 'fully-booked';
      } else if (usedCapacity > 0) {
        status = 'filling-up';
      }

      result.push({ day: d, status, slots });
    }

    return result;
  }

  // ── NEW: Guided Games availability ─────────────────────────────────────────
  async getGuidedGamesAvailability(year: number, month: number, sessionId: number, locationId?: number) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: { category: true },
    });
    if (!session) return [];

    const isSocialPlay = (session.category?.name ?? '').toLowerCase() === 'social play';
    const durationMinutes = session.duration;
    
    // --- 1. Fetch Month Bookings ---
    const startDate = dayjs(`${year}-${month}-01`).startOf('month');
    const endDate = startDate.endOf('month');
    const daysInMonth = startDate.daysInMonth();
    const earliestBookableDate = await this.getEarliestBookableDate();
    const fifteenMinsAgo = dayjs().subtract(15, 'minute').toDate();

    const allBookings = await this.prisma.booking.findMany({
      where: {
        bookingDate: { gte: startDate.toDate(), lte: endDate.toDate() },
        OR: [
          { status: 'SUCCESS' },
          { status: 'PENDING', createdAt: { gte: fifteenMinsAgo } },
        ]
      },
      include: { session: { include: { category: true } } },
    });

    const result: any[] = [];

    // --- 2. Social Play Logic ---
    if (isSocialPlay) {
      if (!locationId) return []; // Require location for social play
      
      const locationSchedules = await this.prisma.locationSchedule.findMany({
        where: { locationId }
      });
      const dateOverrides = await this.prisma.dateOverride.findMany({
        where: { date: { gte: startDate.toDate(), lte: endDate.toDate() } },
      });

      for (let d = 1; d <= daysInMonth; d++) {
        const currentDate = startDate.date(d);
        if (currentDate.isBefore(earliestBookableDate, 'day')) {
          result.push({ day: d, status: 'past', slots: [] });
          continue;
        }

        const dateStr = currentDate.format('YYYY-MM-DD');
        const override = dateOverrides.find(o => dayjs(o.date).format('YYYY-MM-DD') === dateStr);
        
        let isClosed = false;
        let shifts: { startTimeStr: string; endTimeStr: string; capacity: number }[] = [];

        if (override) {
          isClosed = override.isClosed;
          if (!isClosed) {
            shifts = [{
              startTimeStr: override.customStartTime || '10:00',
              endTimeStr: override.customEndTime || '22:00',
              capacity: override.customCapacity ?? 999
            }];
          }
        } else {
          const dow = currentDate.day();
          const ws = locationSchedules.filter(w => w.dayOfWeek === dow);
          if (ws.length === 0) isClosed = true;
          else {
            shifts = ws.map(w => ({
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

        const dayBookings = allBookings.filter(b => dayjs(b.bookingDate).format('YYYY-MM-DD') === dateStr && b.locationId === locationId);
        const slots: any[] = [];
        let usedCapacity = 0;

        for (const shift of shifts) {
          const slotBookings = dayBookings.filter(b => b.startTime === shift.startTimeStr && b.endTime === shift.endTimeStr);
          const bookedCount = slotBookings.reduce((sum, b) => sum + (b.quantity || 1), 0);
          const remaining = Math.max(0, shift.capacity - bookedCount);
          usedCapacity += bookedCount;

          const sh = parseInt(shift.startTimeStr.split(':')[0], 10);
          const eh = parseInt(shift.endTimeStr.split(':')[0], 10);
          const startLabel = `${sh % 12 === 0 ? 12 : sh % 12}:00 ${sh >= 12 ? 'PM' : 'AM'}`;
          const endLabel = `${eh % 12 === 0 ? 12 : eh % 12}:00 ${eh >= 12 ? 'PM' : 'AM'}`;

          slots.push({
            id: `${dateStr}-${shift.startTimeStr}-${shift.endTimeStr}`,
            label: `${startLabel} - ${endLabel}`,
            startTime: shift.startTimeStr,
            endTime: shift.endTimeStr,
            remaining,
            total: shift.capacity
          });
        }
        
        slots.sort((a, b) => a.startTime.localeCompare(b.startTime));
        const hasAvailable = slots.some(s => s.remaining > 0);
        let status = 'available';
        if (!hasAvailable && slots.length > 0) status = 'fully-booked';
        else if (usedCapacity > 0) status = 'filling-up';
        
        result.push({ day: d, status, slots });
      }
      return result;
    }

    // --- 3. Guided Games (Non-Social Play) Logic ---
    const capacity = session.maxPlayers;
    const START_MIN = 11 * 60; // 11:00
    const END_MIN = 18 * 60;   // 18:00
    const BREAK_MIN = 60;

    const timeSlots: any[] = [];
    let current = START_MIN;
    while (current + durationMinutes <= END_MIN) {
      const slotEnd = current + durationMinutes;
      const sh = Math.floor(current / 60); const sm = current % 60;
      const eh = Math.floor(slotEnd / 60); const em = slotEnd % 60;
      
      const startTime = `${sh.toString().padStart(2, '0')}:${sm.toString().padStart(2, '0')}`;
      const endTime = `${eh.toString().padStart(2, '0')}:${em.toString().padStart(2, '0')}`;
      
      const startLabel = `${sh % 12 === 0 ? 12 : sh % 12}:${sm === 0 ? '00' : sm.toString().padStart(2, '0')} ${sh >= 12 ? 'PM' : 'AM'}`;
      const endLabel = `${eh % 12 === 0 ? 12 : eh % 12}:${em === 0 ? '00' : em.toString().padStart(2, '0')} ${eh >= 12 ? 'PM' : 'AM'}`;

      timeSlots.push({ startTime, endTime, startLabel, endLabel });

      const nextStart = slotEnd + BREAK_MIN;
      if (nextStart + durationMinutes > END_MIN) {
        const lastStart = END_MIN - durationMinutes;
        if (lastStart >= slotEnd) {
          const lsh = Math.floor(lastStart / 60); const lsm = lastStart % 60;
          timeSlots.push({
            startTime: `${lsh.toString().padStart(2, '0')}:${lsm.toString().padStart(2, '0')}`,
            endTime: `18:00`,
            startLabel: `${lsh % 12 === 0 ? 12 : lsh % 12}:${lsm === 0 ? '00' : lsm.toString().padStart(2, '0')} ${lsh >= 12 ? 'PM' : 'AM'}`,
            endLabel: `6:00 PM`
          });
        }
        break;
      }
      current = nextStart;
    }

    const weeklySchedules = await this.prisma.weeklySchedule.findMany();
    const dateOverrides = await this.prisma.dateOverride.findMany({
      where: { date: { gte: startDate.toDate(), lte: endDate.toDate() } },
    });

    for (let d = 1; d <= daysInMonth; d++) {
      const currentDate = startDate.date(d);
      if (currentDate.isBefore(earliestBookableDate, 'day')) {
        result.push({ day: d, status: 'past', slots: [] });
        continue;
      }

      const dateStr = currentDate.format('YYYY-MM-DD');
      const override = dateOverrides.find(o => dayjs(o.date).format('YYYY-MM-DD') === dateStr);
      
      let isClosed = false;
      if (override) isClosed = override.isClosed;
      else {
        const dow = currentDate.day();
        const ws = weeklySchedules.filter(w => w.dayOfWeek === dow);
        isClosed = ws.length === 0;
      }

      if (isClosed) {
        result.push({ day: d, status: 'off-day', slots: [] });
        continue;
      }

      const dayBookings = allBookings.filter(b => dayjs(b.bookingDate).format('YYYY-MM-DD') === dateStr);
      const slots: any[] = [];

      const timeToMins = (t: string) => {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
      };

      for (const ts of timeSlots) {
        const tsStartMins = timeToMins(ts.startTime);
        const tsEndMins = timeToMins(ts.endTime);

        const overlappingBookings = dayBookings.filter(b => {
          if (!b.startTime || !b.endTime) return false;
          const bStart = timeToMins(b.startTime);
          const bEnd = timeToMins(b.endTime);
          return Math.max(tsStartMins, bStart) < Math.min(tsEndMins, bEnd);
        });
        
        // Instructor Exclusivity: Lock if any non-social play session is booked in an overlapping time
        const instructorBusy = overlappingBookings.some((b) => {
          const catName = (b.session?.category?.name ?? '').toLowerCase();
          if (catName === 'social play') return false; // Social play does not block instructors
          // If it's the exact same session AND exact same time slot, it just reduces capacity, doesn't block
          if (b.sessionId === sessionId && b.startTime === ts.startTime && b.endTime === ts.endTime) return false;
          return true;
        });
        
        if (instructorBusy) continue;

        const sessionBookings = overlappingBookings.filter(b => b.sessionId === sessionId && b.startTime === ts.startTime && b.endTime === ts.endTime);
        const bookedCount = sessionBookings.reduce((sum, b) => sum + (b.quantity || 1), 0);
        const remaining = Math.max(0, capacity - bookedCount);

        slots.push({
          id: `${dateStr}-${ts.startTime}-${ts.endTime}`,
          label: `${ts.startLabel} - ${ts.endLabel}`,
          startTime: ts.startTime,
          endTime: ts.endTime,
          remaining,
          total: capacity
        });
      }

      const hasAvailable = slots.some(s => s.remaining > 0);
      const hasDayBookings = dayBookings.some(b => {
        const catName = (b.session?.category?.name ?? '').toLowerCase();
        return catName !== 'social play';
      });

      let status = 'available';
      if (slots.length === 0 || !hasAvailable) status = 'fully-booked';
      else if (hasDayBookings) status = 'filling-up';

      result.push({ day: d, status, slots });
    }

    return result;
  }
}
