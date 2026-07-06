import { PrismaClient } from '@prisma/client';

export async function seedAboutPage(prisma: PrismaClient) {
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'about-mahjong' },
    update: { title: 'About Mahjong Page' },
    create: { slug: 'about-mahjong', title: 'About Mahjong Page' },
  });

  const sections = [
    {
      key: 'hero',
      name: 'Hero Section',
      content: {
        subtitle: 'About Mahjong',
        title: 'About Mahjong',
        desc: 'A timeless tile-based board game that combines strategy, skill, observation, and social interaction — enjoyed by millions across Asia and around the world.'
      }
    },
    {
      key: 'about',
      name: 'About Section',
      content: {
        subtitle: 'The Game',
        title: 'What is Mahjong?',
        desc1: 'Mahjong is a timeless tile-based board game that combines strategy, skill, observation, and social interaction. Originating in China during the 19th century, it has evolved into a beloved pastime enjoyed by millions across Asia and around the world.',
        desc2: 'Rich in history, culture, and tradition, Mahjong has been passed down through generations, bringing families, friends, and communities together around the table. While the game has many regional variations, its essence remains the same: strategic thinking, careful planning, adaptability, and the pursuit of a winning hand.',
        desc3: 'Beyond the tiles, Mahjong represents connection, heritage, and shared experiences — a game that encourages learning, conversation, and lifelong friendships. Today it continues to evolve through modern variants while preserving the vintage charm and traditions that make it one of the world\'s most enduring games.'
      }
    },
    {
      key: 'benefits',
      name: 'Benefits Section',
      content: {
        subtitle: 'The Benefits',
        title: 'Benefits of Learning Mahjong',
        desc1: 'More Than a Game. A Better Mind, Stronger Connections, and a Healthier Life.',
        desc2: 'Mahjong is more than just a game — it is a lifelong activity that combines strategic thinking, social interaction, learning, and mental stimulation. For generations, people around the world have enjoyed Mahjong not only for its entertainment value but also for its many cognitive, emotional, and social benefits.',
        items: [
          {
            icon: 'Activity',
            title: 'Cognitive Engagement',
            desc: 'Mahjong requires concentration, memory, and pattern recognition, keeping the mind sharp and active.'
          },
          {
            icon: 'Target',
            title: 'Strategic Thinking',
            desc: 'Players must constantly evaluate their hands, anticipate opponents\' moves, and adapt their strategies.'
          },
          {
            icon: 'Users',
            title: 'Social Connection',
            desc: 'The game fosters communication, teamwork (in partnership formats), and lasting friendships.'
          },
          {
            icon: 'Heart',
            title: 'Stress Relief',
            desc: 'The rhythmic sound of shuffling tiles and the focus required offer a meditative escape from daily stress.'
          }
        ]
      }
    }
  ];

  for (const s of sections) {
    await prisma.cmsSection.upsert({
      where: {
        pageId_key: { pageId: page.id, key: s.key },
      },
      update: {
        name: s.name,
        content: s.content,
      },
      create: {
        pageId: page.id,
        key: s.key,
        name: s.name,
        content: s.content,
      },
    });
  }
}
