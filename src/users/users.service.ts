import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

function getBookingKind(booking: any): 'TRAINING' | 'GUIDED_GAME' | 'PLAY_DATE' {
  const catName = (booking?.session?.category?.name || '').toLowerCase();
  const sessionTitle = (booking?.session?.title || '').toLowerCase();
  const sessionType = booking?.session?.type || '';

  if (
    catName.includes('social') ||
    sessionTitle.includes('play date') ||
    (booking?.level && ['beginners', 'intermediate', 'advanced'].includes(booking.level.toLowerCase()) && !sessionTitle.includes('level'))
  ) {
    return 'PLAY_DATE';
  }
  if (
    sessionType === 'GUIDED_GAME' ||
    catName.includes('guided') ||
    sessionTitle.includes('game session') ||
    sessionTitle.includes('guided game')
  ) {
    return 'GUIDED_GAME';
  }
  return 'TRAINING';
}

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

  async updateProfile(userId: number, data: {
    name?: string;
    phone?: string;
    preferredGame?: string;
    level?: string;
    ageGroup?: string;
    preferredLocations?: string[];
    preferredTimings?: string[];
  }) {
    const updateData: any = {};
    if (data.name !== undefined && data.name.trim()) {
      updateData.name = data.name.trim();
    }
    if (data.phone !== undefined) {
      updateData.phone = data.phone.trim();
    }
    if (data.preferredGame !== undefined) {
      updateData.preferredGame = data.preferredGame ? data.preferredGame.trim() : null;
    }
    if (data.level !== undefined) {
      updateData.level = data.level ? data.level.trim() : null;
    }
    if (data.ageGroup !== undefined) {
      updateData.ageGroup = data.ageGroup ? data.ageGroup.trim() : null;
    }
    if (data.preferredLocations !== undefined) {
      updateData.preferredLocations = Array.isArray(data.preferredLocations)
        ? data.preferredLocations.map((l: string) => l.trim()).filter(Boolean)
        : [];
    }
    if (data.preferredTimings !== undefined) {
      updateData.preferredTimings = Array.isArray(data.preferredTimings)
        ? data.preferredTimings.map((t: string) => t.trim()).filter(Boolean)
        : [];
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        preferredGame: true,
        level: true,
        ageGroup: true,
        preferredLocations: true,
        preferredTimings: true,
      },
    });
  }

  async getUserPreferences(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return null;
    }

    const email = user.email.toLowerCase().trim();

    // 1. Fetch Latest Booking (Priority 1)
    const latestBooking = await this.prisma.booking.findFirst({
      where: {
        contactEmail: { equals: email, mode: 'insensitive' },
        isDeleted: false,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        session: {
          include: {
            category: {
              include: {
                game: true,
              },
            },
          },
        },
        location: true,
        participants: {
          include: {
            ageGroup: true,
          },
        },
      },
    });

    // 2. Fetch Latest JoinCircleRequest (Priority 2)
    const latestCircle = await this.prisma.joinCircleRequest.findFirst({
      where: {
        email: { equals: email, mode: 'insensitive' },
        isDeleted: false,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        game: true,
        locations: true,
      },
    });

    // Extract booking data
    const bookingGame = latestBooking?.session?.category?.game?.name || null;
    const bookingLevel = latestBooking?.level || null;
    const bookingAgeGroup = latestBooking?.participants?.[0]?.ageGroup?.name || null;
    const bookingLocation = latestBooking?.location?.name || null;
    const bookingTiming =
      latestBooking?.startTime && latestBooking?.endTime
        ? `${latestBooking.startTime} - ${latestBooking.endTime}`
        : null;

    // Extract circle data
    const circleGame = latestCircle?.game?.name || null;
    const circleLevel = latestCircle?.level || null;
    const circleAgeGroup = latestCircle?.ageGroup || null;
    const circleLocations = latestCircle?.locations?.map((l: any) => l.name) || [];
    const circleTimings = [
      ...(latestCircle?.days || []),
      ...(latestCircle?.times || []),
    ];

    // Priority Merge Rule (as requested by Srinath & Mashihul):
    // 1. Game: Booking > Circle > User.preferredGame
    const preferredGame = bookingGame || circleGame || user.preferredGame || null;

    // 2. Level: Booking > Circle > User.level
    const level = bookingLevel || circleLevel || user.level || null;

    // 3. Age Group: Booking > Circle > User.ageGroup
    const ageGroup = bookingAgeGroup || circleAgeGroup || user.ageGroup || null;

    // 4. Preferred Locations:
    const locationsSet = new Set<string>();
    if (bookingLocation) locationsSet.add(bookingLocation);
    if (circleLocations && circleLocations.length > 0) {
      circleLocations.forEach((loc: string) => locationsSet.add(loc));
    }
    if (user.preferredLocations && user.preferredLocations.length > 0) {
      user.preferredLocations.forEach((loc: string) => locationsSet.add(loc));
    }
    const preferredLocations = Array.from(locationsSet);

    // 5. Preferred Timings:
    const timingsSet = new Set<string>();
    if (circleTimings && circleTimings.length > 0) {
      circleTimings.forEach((t: string) => timingsSet.add(t));
    }
    if (bookingTiming) timingsSet.add(bookingTiming);
    if (user.preferredTimings && user.preferredTimings.length > 0) {
      user.preferredTimings.forEach((t: string) => timingsSet.add(t));
    }
    const preferredTimings = Array.from(timingsSet);

    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      preferredGame,
      level,
      ageGroup,
      preferredLocations,
      preferredTimings,
      source: latestBooking ? 'BOOKING' : latestCircle ? 'JOIN_CIRCLE' : 'PROFILE',
      latestBookingId: latestBooking?.id || null,
      latestCircleRequestId: latestCircle?.id || null,
    };
  }

  async getAllUsers(limit?: number, offset?: number, search?: string, type?: string) {
    // 1. Fetch all users
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        preferredGame: true,
        level: true,
        ageGroup: true,
        preferredLocations: true,
        preferredTimings: true,
        createdAt: true,
      },
    });

    // 2. Fetch all non-deleted bookings with full relation data
    const allBookings = await this.prisma.booking.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        session: {
          include: {
            category: {
              include: {
                game: true,
              },
            },
          },
        },
        location: true,
        serviceOption: true,
        payment: true,
        participants: {
          include: {
            ageGroup: true,
          },
        },
      },
    });

    // 3. Map bookings to user emails
    const bookingsByEmail = new Map<string, any[]>();
    for (const b of allBookings) {
      const emails = new Set<string>();
      if (b.contactEmail) emails.add(b.contactEmail.toLowerCase().trim());
      if (b.participants) {
        for (const p of b.participants) {
          if (p.email) emails.add(p.email.toLowerCase().trim());
        }
      }

      for (const email of emails) {
        if (!bookingsByEmail.has(email)) {
          bookingsByEmail.set(email, []);
        }
        bookingsByEmail.get(email)!.push(b);
      }
    }

    // 4. Enrich each user
    let enrichedUsers = users.map((user) => {
      const emailLower = (user.email || '').toLowerCase().trim();
      const userBookings = bookingsByEmail.get(emailLower) || [];

      let trainingCount = 0;
      let guidedGamesCount = 0;
      let playDateCount = 0;
      let totalSpend = 0;

      for (const b of userBookings) {
        const kind = getBookingKind(b);
        if (kind === 'TRAINING') trainingCount++;
        else if (kind === 'GUIDED_GAME') guidedGamesCount++;
        else if (kind === 'PLAY_DATE') playDateCount++;

        totalSpend += Number(b.totalAmount || 0);
      }

      const activityTypes: string[] = [];
      if (trainingCount > 0) activityTypes.push('TRAINING');
      if (guidedGamesCount > 0) activityTypes.push('GUIDED_GAME');
      if (playDateCount > 0) activityTypes.push('PLAY_DATE');

      // Phone
      const phone =
        user.phone ||
        userBookings.find((b) => b.contactPhone)?.contactPhone ||
        userBookings
          .flatMap((b) => b.participants || [])
          .find((p) => p.email?.toLowerCase() === emailLower && p.phone)?.phone ||
        '';

      // Age Group
      const ageGroup =
        userBookings
          .flatMap((b) => b.participants || [])
          .find((p) => p.email?.toLowerCase() === emailLower && p.ageGroup?.name)?.ageGroup?.name ||
        userBookings[0]?.participants?.find((p: any) => p.isOwner)?.ageGroup?.name ||
        userBookings[0]?.participants?.[0]?.ageGroup?.name ||
        '';

      // Last Booking
      const lastBooking = userBookings[0] || null;

      return {
        ...user,
        phone,
        ageGroup,
        totalBookings: userBookings.length,
        totalSpend,
        trainingCount,
        guidedGamesCount,
        playDateCount,
        activityTypes,
        lastBooking,
      };
    });

    // 5. Calculate global counts before filtering (for tab badges)
    const counts = {
      all: enrichedUsers.length,
      training: enrichedUsers.filter((u) => u.trainingCount > 0).length,
      guidedGames: enrichedUsers.filter((u) => u.guidedGamesCount > 0).length,
      playDate: enrichedUsers.filter((u) => u.playDateCount > 0).length,
    };

    // 6. Filter by Type
    if (type && type !== 'ALL') {
      if (type === 'TRAINING') {
        enrichedUsers = enrichedUsers.filter((u) => u.trainingCount > 0);
      } else if (type === 'GUIDED_GAME') {
        enrichedUsers = enrichedUsers.filter((u) => u.guidedGamesCount > 0);
      } else if (type === 'PLAY_DATE') {
        enrichedUsers = enrichedUsers.filter((u) => u.playDateCount > 0);
      }
    }

    // 7. Filter by Search Query
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      enrichedUsers = enrichedUsers.filter((u) => {
        const idMatch = `#${u.id}`.includes(q) || String(u.id).includes(q);
        const nameMatch = (u.name || '').toLowerCase().includes(q);
        const emailMatch = (u.email || '').toLowerCase().includes(q);
        const phoneMatch = (u.phone || '').toLowerCase().includes(q);
        const ageMatch = (u.ageGroup || '').toLowerCase().includes(q);
        const sessionMatch = (u.lastBooking?.session?.title || '').toLowerCase().includes(q);
        const gameMatch = (u.lastBooking?.session?.category?.game?.name || '').toLowerCase().includes(q);
        return idMatch || nameMatch || emailMatch || phoneMatch || ageMatch || sessionMatch || gameMatch;
      });
    }

    const total = enrichedUsers.length;
    const paginatedData =
      limit && Number(limit) > 0
        ? enrichedUsers.slice(Number(offset || 0), Number(offset || 0) + Number(limit))
        : enrichedUsers;

    return { data: paginatedData, total, counts };
  }
}
