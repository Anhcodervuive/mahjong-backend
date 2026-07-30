import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  async getAllPages() {
    return this.prisma.cmsPage.findMany({
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async getPageBySlug(slug: string) {
    return this.prisma.cmsPage.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async updateSection(id: number, content: any) {
    return this.prisma.cmsSection.update({
      where: { id },
      data: { content },
    });
  }

  async reorderSections(items: { id: number; order: number }[]) {
    const transactions = items.map((item) =>
      this.prisma.cmsSection.update({
        where: { id: item.id },
        data: { order: item.order },
      }),
    );
    return this.prisma.$transaction(transactions);
  }

  async updatePageSeo(slug: string, seoData: any) {
    return this.prisma.cmsPage.update({
      where: { slug },
      data: {
        metaUrl: seoData.metaUrl,
        metaTitle: seoData.metaTitle,
        metaKeyword: seoData.metaKeyword,
        metaDescription: seoData.metaDescription,
        ogMetaTitle: seoData.ogMetaTitle,
        ogMetaDescription: seoData.ogMetaDescription,
        twitterMetaTitle: seoData.twitterMetaTitle,
        twitterMetaDescription: seoData.twitterMetaDescription,
      },
    });
  }

  async renamePointsCalculatorSlug() {
    const page = await this.prisma.cmsPage.findUnique({ where: { slug: 'points-calculator' } });
    if (page) {
      await this.prisma.cmsPage.update({
        where: { slug: 'points-calculator' },
        data: { slug: 'taiwanese-points-calculator', title: 'Taiwanese Points Calculator' }
      });
      return { status: 'Success', message: 'Renamed points-calculator to taiwanese-points-calculator' };
    }
    return { status: 'Skipped', message: 'Not found or already renamed' };
  }
}
