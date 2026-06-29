import { PrismaClient, ContentType } from '@prisma/client';

export async function seedAboutPage(prisma: PrismaClient) {
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'about' },
    update: { title: 'About Mahjong Page' },
    create: { slug: 'about', title: 'About Mahjong Page' },
  });

  const sections = [
    // Hero Section
    { key: 'hero_subtitle', type: 'TEXT' as ContentType, value: 'About Mahjong' },
    { key: 'hero_title', type: 'TEXT' as ContentType, value: 'About Mahjong' },
    { key: 'hero_desc', type: 'TEXT' as ContentType, value: 'A timeless tile-based board game that combines strategy, skill, observation, and social interaction — enjoyed by millions across Asia and around the world.' },
    
    // About Section
    { key: 'about_subtitle', type: 'TEXT' as ContentType, value: 'The Game' },
    { key: 'about_title', type: 'TEXT' as ContentType, value: 'What is Mahjong?' },
    { key: 'about_desc1', type: 'TEXT' as ContentType, value: 'Mahjong is a timeless tile-based board game that combines strategy, skill, observation, and social interaction. Originating in China during the 19th century, it has evolved into a beloved pastime enjoyed by millions across Asia and around the world.' },
    { key: 'about_desc2', type: 'TEXT' as ContentType, value: 'Rich in history, culture, and tradition, Mahjong has been passed down through generations, bringing families, friends, and communities together around the table. While the game has many regional variations, its essence remains the same: strategic thinking, careful planning, adaptability, and the pursuit of a winning hand.' },
    { key: 'about_desc3', type: 'TEXT' as ContentType, value: 'Beyond the tiles, Mahjong represents connection, heritage, and shared experiences — a game that encourages learning, conversation, and lifelong friendships. Today it continues to evolve through modern variants while preserving the vintage charm and traditions that make it one of the world\'s most enduring games.' },
    
    // Benefits Section
    { key: 'benefits_subtitle', type: 'TEXT' as ContentType, value: 'The Benefits' },
    { key: 'benefits_title', type: 'TEXT' as ContentType, value: 'Benefits of Learning Mahjong' },
    { key: 'benefits_desc1', type: 'TEXT' as ContentType, value: 'More Than a Game. A Better Mind, Stronger Connections, and a Healthier Life.' },
    { key: 'benefits_desc2', type: 'TEXT' as ContentType, value: 'Mahjong is more than just a game — it is a lifelong activity that combines strategic thinking, social interaction, learning, and mental stimulation. For generations, people around the world have enjoyed Mahjong not only for its entertainment value but also for its many cognitive, emotional, and social benefits.' },
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
