import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CmsModule } from './cms/cms.module';
import { validate } from './env.validation';
import { MediaModule } from './media/media.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { GamesModule } from './games/games.module';
import { CategoriesModule } from './categories/categories.module';
import { SessionsModule } from './sessions/sessions.module';
import { AgeGroupsModule } from './age-groups/age-groups.module';
import { ServiceOptionsModule } from './service-options/service-options.module';
import { WeeklySchedulesModule } from './weekly-schedules/weekly-schedules.module';
import { DateOverridesModule } from './date-overrides/date-overrides.module';
import { AvailabilityModule } from './availability/availability.module';
import { PaymentModule } from './payment/payment.module';
import { BookingModule } from './booking/booking.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { EmailModule } from './email/email.module';
import { Smtp2goModule } from './smtp2go/smtp2go.module';
import { SettingsModule } from './settings/settings.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CmsModule,
    MediaModule,
    GamesModule,
    CategoriesModule,
    SessionsModule,
    AgeGroupsModule,
    ServiceOptionsModule,
    WeeklySchedulesModule,
    DateOverridesModule,
    AvailabilityModule,
    PaymentModule,
    BookingModule,
    DashboardModule,
    EmailModule,
    Smtp2goModule,
    SettingsModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
