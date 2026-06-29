import { PrismaClient, ContentType } from '@prisma/client';

export async function seedHomePage(prisma: PrismaClient) {
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'home' },
    update: { title: 'Home Page' },
    create: { slug: 'home', title: 'Home Page' },
  });

  const BACKEND_URL = process.env.API_URL || 'http://localhost:4000';

  const sections = [
    // Hero Section
    { key: 'hero_bg', type: 'IMAGE' as ContentType, value: `${BACKEND_URL}/uploads/hero-banner.jpg` },
    { key: 'hero_title', type: 'TEXT' as ContentType, value: 'MAHJONG SUCCESS' },
    { key: 'hero_subtitle', type: 'TEXT' as ContentType, value: 'Master Mahjong one tile at a time.' },
    { key: 'hero_button', type: 'TEXT' as ContentType, value: 'Get Started' },
    
    // The Journey Section
    { key: 'journey_subtitle', type: 'TEXT' as ContentType, value: 'The Journey' },
    { key: 'journey_title', type: 'TEXT' as ContentType, value: 'A structured pathway to learning, playing, and succeeding at Mahjong.' },
    { key: 'journey_desc1', type: 'TEXT' as ContentType, value: 'From beginner foundations to advanced gameplay, Mahjong Success combines expert instruction, guided games, practical experience, and a vibrant community to help players of all ages build confidence, develop strategy, and enjoy the game.' },
    { key: 'journey_desc2', type: 'TEXT' as ContentType, value: 'Whether you\'re learning individually, with friends, or as a family, your journey to Mahjong success starts here.' },
    { key: 'journey_button', type: 'TEXT' as ContentType, value: 'Learn. Play. Strategize. Speed. Succeed.' },

    // Mahjong Variants Section
    { key: 'variants_subtitle', type: 'TEXT' as ContentType, value: 'Mahjong Variants' },
    { key: 'variants_title', type: 'TEXT' as ContentType, value: 'Discover Different Paths to Success' },
    { key: 'variants_desc1', type: 'TEXT' as ContentType, value: 'Mahjong is played in many different ways around the world, with each variant offering its own unique rules, strategies, challenges, and opportunities for success.' },
    { key: 'variants_desc2', type: 'TEXT' as ContentType, value: 'At Mahjong Success, we introduce players to a variety of Mahjong formats, helping them understand the differences between each style while developing the skills and confidence to succeed in any game.' },
    
    // Variants Cards (Images and Text)
    { key: 'variant_1_img', type: 'IMAGE' as ContentType, value: `${BACKEND_URL}/uploads/game-goulash.jpg` },
    { key: 'variant_1_title', type: 'TEXT' as ContentType, value: 'International Goulash' },
    { key: 'variant_1_desc', type: 'TEXT' as ContentType, value: 'Learn through a structured six-level journey covering foundations, Joker strategy, advanced hand building, partnership play, concealed hands, and scoring mastery.' },

    { key: 'variant_2_img', type: 'IMAGE' as ContentType, value: `${BACKEND_URL}/uploads/game-american.jpg` },
    { key: 'variant_2_title', type: 'TEXT' as ContentType, value: 'American' },
    { key: 'variant_2_desc', type: 'TEXT' as ContentType, value: 'Master Charleston passing, Joker strategy, card-based gameplay, and winning hand development.' },

    { key: 'variant_3_img', type: 'IMAGE' as ContentType, value: `${BACKEND_URL}/uploads/game-nml.jpg` },
    { key: 'variant_3_title', type: 'TEXT' as ContentType, value: 'NMJL' },
    { key: 'variant_3_desc', type: 'TEXT' as ContentType, value: 'Play the official National Mahjong League card with its annually updated hands, strategic flexibility, and competitive standards.' },

    { key: 'variant_4_img', type: 'IMAGE' as ContentType, value: `${BACKEND_URL}/uploads/game-taiwan.jpg` },
    { key: 'variant_4_title', type: 'TEXT' as ContentType, value: 'Taiwanese' },
    { key: 'variant_4_desc', type: 'TEXT' as ContentType, value: 'Learn traditional Taiwanese Mahjong with sixteen-tile hands, strategic hand building, scoring, and advanced gameplay techniques.' },

    // Why Mahjong Success Section
    { key: 'why_subtitle', type: 'TEXT' as ContentType, value: 'Why Mahjong Success?' },
    { key: 'why_title', type: 'TEXT' as ContentType, value: 'Building Better Players, One Tile at a Time' },
    { key: 'why_closing1', type: 'TEXT' as ContentType, value: 'Whether you want to learn, improve, compete, connect, or simply enjoy the game, Mahjong Success provides the pathway, support, and opportunities to help you succeed.' },
    { key: 'why_closing2', type: 'TEXT' as ContentType, value: 'Master Mahjong One Tile at a Time.' },
    { key: 'why_button', type: 'TEXT' as ContentType, value: 'Your Journey. Your Community. Your Success.' },

    // Who Is It For Section
    { key: 'who_subtitle', type: 'TEXT' as ContentType, value: 'Who Is It For?' },
    { key: 'who_title', type: 'TEXT' as ContentType, value: 'A Seat for Everyone.' },
    { key: 'who_italic', type: 'TEXT' as ContentType, value: 'For Every Player. At Every Level.' },
    { key: 'who_desc', type: 'TEXT' as ContentType, value: 'Whether you\'re discovering Mahjong for the first time or looking to deepen your skills, Mahjong Success welcomes players from all backgrounds, age groups, and experience levels.' },
    { key: 'who_img', type: 'IMAGE' as ContentType, value: `${BACKEND_URL}/uploads/seat-everyone.jpg` },
    { key: 'who_button', type: 'TEXT' as ContentType, value: 'Your Seat. Your Game. Your Mahjong Success.' },

    // What You Receive Section
    { key: 'receive_subtitle', type: 'TEXT' as ContentType, value: 'The Mahjong Success Experience' },
    { key: 'receive_title', type: 'TEXT' as ContentType, value: 'What You Receive at Each Training Level' },
    { key: 'receive_desc', type: 'TEXT' as ContentType, value: 'Every Mahjong Success training level is designed to provide a structured, engaging, and practical learning experience that combines instruction, strategy, and gameplay.' },
    { key: 'receive_img1', type: 'IMAGE' as ContentType, value: `${BACKEND_URL}/uploads/receive-banner-1.jpg` },
    { key: 'receive_img2', type: 'IMAGE' as ContentType, value: `${BACKEND_URL}/uploads/receive-banner-2.jpg` },
    { key: 'receive_button', type: 'TEXT' as ContentType, value: 'Learn. Play. Apply. Succeed.' },

    // Fast Track Bundles Section
    { key: 'bundles_subtitle', type: 'TEXT' as ContentType, value: 'Accelerate Your Progress' },
    { key: 'bundles_title', type: 'TEXT' as ContentType, value: 'Mahjong Success Fast Track Bundles' },

    // Premium Experiences Section
    { key: 'premium_bg', type: 'IMAGE' as ContentType, value: `${BACKEND_URL}/uploads/premium-floral-bg.jpg` },
    { key: 'premium_subtitle', type: 'TEXT' as ContentType, value: 'Premium Mahjong Experiences' },
    { key: 'premium_title', type: 'TEXT' as ContentType, value: 'Your Venue. Your Schedule. Your Mahjong Success.' },
  ];

  for (const sectionData of sections) {
    const sec = {
      pageId: page.id,
      key: sectionData.key,
      type: sectionData.type,
      value: sectionData.value,
    };
    await prisma.cmsSection.upsert({
      where: {
        pageId_key: { pageId: page.id, key: sectionData.key },
      },
      update: {},
      create: sec,
    });
  }

  console.log('Home page seeded successfully.');
}
