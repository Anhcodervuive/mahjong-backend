import { PrismaClient, ContentType } from '@prisma/client';

export async function seedReceivePage(prisma: PrismaClient) {
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'receive' },
    update: { title: 'What You Receive Page' },
    create: { slug: 'receive', title: 'What You Receive Page' },
  });

  const BACKEND_URL = process.env.API_URL || 'http://localhost:4000';

  const sections = [
    // Hero Section
    { key: 'hero_subtitle', type: 'TEXT' as ContentType, value: 'The Mahjong Success Experience' },
    { key: 'hero_title', type: 'TEXT' as ContentType, value: 'What You Receive at Each Training Level?' },
    { key: 'hero_desc', type: 'TEXT' as ContentType, value: 'Every Mahjong Success training level is designed to provide a structured, engaging, and practical learning experience that combines instruction, strategy, and gameplay.' },
    
    // Content Section Banners
    { key: 'banner_1', type: 'IMAGE' as ContentType, value: `${BACKEND_URL}/uploads/receive-banner-1.jpg` },
    { key: 'banner_2', type: 'IMAGE' as ContentType, value: `${BACKEND_URL}/uploads/receive-banner-2.jpg` },
  ];

  for (const s of sections) {
    await prisma.cmsSection.upsert({
      where: {
        pageId_key: { pageId: page.id, key: s.key },
      },
      update: {},
      create: {
        pageId: page.id,
        key: s.key,
        type: s.type,
        value: s.value,
      },
    });
  }
}
