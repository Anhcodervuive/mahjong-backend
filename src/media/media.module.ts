import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { PrismaModule } from '../prisma/prisma.module';
import * as crypto from 'crypto';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = crypto.randomBytes(16).toString('hex');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}
