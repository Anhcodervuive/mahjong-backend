import { PrismaClient } from '@prisma/client';

export async function seedReceivePage(prisma: PrismaClient) {
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'what-you-receive' },
    update: { title: 'What You Receive Page' },
    create: { slug: 'what-you-receive', title: 'What You Receive Page' },
  });

  const sections = [
    {
      key: 'hero',
      name: 'Hero Section',
      content: {
        subtitle: 'The Mahjong Success Experience',
        title: 'What You Receive at Each Training Level?',
        desc: 'Every Mahjong Success training level is designed to provide a structured, engaging, and practical learning experience that combines instruction, strategy, and gameplay.'
      }
    },
    {
      key: 'content',
      name: 'Content Section Banners',
      content: {
        banner1: '/uploads/receive-banner-1.jpg',
        banner2: '/uploads/receive-banner-2.jpg',
        items: [
          { title: "Comprehensive Training & Instruction", desc: "Learn through a detailed trainer-led presentation that covers the concepts, rules, strategies, techniques, and gameplay principles relevant to that level." },
          { title: "Frequently Asked Questions & Expert Guidance", desc: "Gain clarity through detailed explanations and answers to commonly asked questions, helping you better understand the game and avoid common mistakes." },
          { title: "Understand the Tiles & Their Uses", desc: "Learn about the tiles used at each level, their significance, how they interact within different hands, and how to maximise their value during gameplay." },
          { title: "Learn New Concepts & Strategies", desc: "Master the key concepts, hand-building techniques, strategic approaches, and decision-making skills introduced at that level." },
          { title: "Guided Learning Games", desc: "Play carefully selected Mahjong games designed to reinforce the concepts taught during training. Each game includes detailed explanations, practical examples, and strategic insights to accelerate learning." },
          { title: "Apply Learning Through Practical Play", desc: "Put theory into practice by applying newly learned concepts, tile knowledge, and strategies during gameplay, helping you build experience and confidence." }
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
