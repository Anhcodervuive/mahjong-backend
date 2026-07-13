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
}
