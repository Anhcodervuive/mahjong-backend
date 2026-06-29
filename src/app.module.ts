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
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
