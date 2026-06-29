import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async saveMedia(file: Express.Multer.File) {
    const media = await this.prisma.media.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: `/uploads/${file.filename}`, // public URL path
      },
    });
    return media;
  }
}
