import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  async getAllPages() {
    return this.prisma.cmsPage.findMany({
      include: {
        sections: true,
      },
    });
  }

  async getPageBySlug(slug: string) {
    return this.prisma.cmsPage.findUnique({
      where: { slug },
      include: {
        sections: true,
      },
    });
  }

  async updateSection(id: number, content: any) {
    return this.prisma.cmsSection.update({
      where: { id },
      data: { content },
    });
  }
}
