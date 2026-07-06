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
    { key: 'hero_bg', type: 'IMAGE' as ContentType, value: `/uploads/hero-banner.jpg` },
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
    { key: 'variant_1_img', type: 'IMAGE' as ContentType, value: `/uploads/game-goulash.jpg` },
    { key: 'variant_1_title', type: 'TEXT' as ContentType, value: 'International Goulash' },
    { key: 'variant_1_desc', type: 'TEXT' as ContentType, value: 'Learn through a structured six-level journey covering foundations, Joker strategy, advanced hand building, partnership play, concealed hands, and scoring mastery.' },

    { key: 'variant_2_img', type: 'IMAGE' as ContentType, value: `/uploads/game-american.jpg` },
    { key: 'variant_2_title', type: 'TEXT' as ContentType, value: 'American' },
    { key: 'variant_2_desc', type: 'TEXT' as ContentType, value: 'Master Charleston passing, Joker strategy, card-based gameplay, and winning hand development.' },

    { key: 'variant_3_img', type: 'IMAGE' as ContentType, value: `/uploads/game-nml.jpg` },
    { key: 'variant_3_title', type: 'TEXT' as ContentType, value: 'NMJL' },
    { key: 'variant_3_desc', type: 'TEXT' as ContentType, value: 'Play the official National Mahjong League card with its annually updated hands, strategic flexibility, and competitive standards.' },

    { key: 'variant_4_img', type: 'IMAGE' as ContentType, value: `/uploads/game-taiwan.jpg` },
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
    { key: 'who_img', type: 'IMAGE' as ContentType, value: `/uploads/seat-everyone.jpg` },
    { key: 'who_button', type: 'TEXT' as ContentType, value: 'Your Seat. Your Game. Your Mahjong Success.' },

    // What You Receive Section
    { key: 'receive_subtitle', type: 'TEXT' as ContentType, value: 'The Mahjong Success Experience' },
    { key: 'receive_title', type: 'TEXT' as ContentType, value: 'What You Receive at Each Training Level' },
    { key: 'receive_desc', type: 'TEXT' as ContentType, value: 'Every Mahjong Success training level is designed to provide a structured, engaging, and practical learning experience that combines instruction, strategy, and gameplay.' },
    { key: 'receive_img1', type: 'IMAGE' as ContentType, value: `/uploads/receive-banner-1.jpg` },
    { key: 'receive_img2', type: 'IMAGE' as ContentType, value: `/uploads/receive-banner-2.jpg` },
    { key: 'receive_button', type: 'TEXT' as ContentType, value: 'Learn. Play. Apply. Succeed.' },

    // Fast Track Bundles Section
    { key: 'bundles_subtitle', type: 'TEXT' as ContentType, value: 'Accelerate Your Progress' },
    { key: 'bundles_title', type: 'TEXT' as ContentType, value: 'Mahjong Success Fast Track Bundles' },

    // Premium Experiences Section
    { key: 'premium_bg', type: 'IMAGE' as ContentType, value: `/uploads/premium-floral-bg.jpg` },
    { key: 'premium_subtitle', type: 'TEXT' as ContentType, value: 'Premium Mahjong Experiences' },
    { key: 'premium_title', type: 'TEXT' as ContentType, value: 'Your Venue. Your Schedule. Your Mahjong Success.' },

    // The Mahjong Success Difference
    { key: 'diff_subtitle', type: 'TEXT' as ContentType, value: 'The Mahjong Success Difference' },
    { key: 'diff_title', type: 'TEXT' as ContentType, value: 'What Defines Our Players' },
    
    { key: 'diff_1_title', type: 'TEXT' as ContentType, value: 'Well-Trained & Well-Prepared' },
    { key: 'diff_1_desc', type: 'TEXT' as ContentType, value: 'They have a clear understanding of the games they have learned, including the rules, concepts, strategies, and gameplay instructions.' },
    { key: 'diff_1_img', type: 'IMAGE' as ContentType, value: '/uploads/diff-1-well-trained.jpg' },
    
    { key: 'diff_2_title', type: 'TEXT' as ContentType, value: 'Strong Etiquette & Table Manners' },
    { key: 'diff_2_desc', type: 'TEXT' as ContentType, value: 'They understand proper Mahjong etiquette, table conduct, sportsmanship, and respectful gameplay, contributing to a positive experience for everyone.' },
    { key: 'diff_2_img', type: 'IMAGE' as ContentType, value: '/uploads/diff-2-etiquette.jpg' },

    { key: 'diff_3_title', type: 'TEXT' as ContentType, value: 'Strong Knowledge of the Rules' },
    { key: 'diff_3_desc', type: 'TEXT' as ContentType, value: 'They understand the game mechanics and play confidently without uncertainty or confusion.' },
    { key: 'diff_3_img', type: 'IMAGE' as ContentType, value: '/uploads/diff-3-rules.jpg' },

    { key: 'diff_4_title', type: 'TEXT' as ContentType, value: 'Deep Understanding of Tiles' },
    { key: 'diff_4_desc', type: 'TEXT' as ContentType, value: 'They know the value, purpose, and strategic use of different tiles and how they contribute to winning hands.' },
    { key: 'diff_4_img', type: 'IMAGE' as ContentType, value: '/uploads/diff-4-tiles.jpg' },

    { key: 'diff_5_title', type: 'TEXT' as ContentType, value: 'Joker Strategy Experts' },
    { key: 'diff_5_desc', type: 'TEXT' as ContentType, value: 'They understand joker rules, joker exchanges, joker optimisation, and how to maximise the value of jokers across different games.' },
    { key: 'diff_5_img', type: 'IMAGE' as ContentType, value: '/uploads/diff-5-joker.jpg' },

    { key: 'diff_6_title', type: 'TEXT' as ContentType, value: 'Strategic Thinkers' },
    { key: 'diff_6_desc', type: 'TEXT' as ContentType, value: 'They think ahead, evaluate options, manage risks, and make informed decisions during gameplay.' },
    { key: 'diff_6_img', type: 'IMAGE' as ContentType, value: '/uploads/diff-6-strategic.jpg' },

    { key: 'diff_7_title', type: 'TEXT' as ContentType, value: 'Familiar with Multiple Variants' },
    { key: 'diff_7_desc', type: 'TEXT' as ContentType, value: 'They are exposed to different Mahjong games and formats, making them adaptable and versatile players.' },
    { key: 'diff_7_img', type: 'IMAGE' as ContentType, value: '/uploads/diff-7-variants.jpg' },

    { key: 'diff_8_title', type: 'TEXT' as ContentType, value: 'Answers, Not Questions' },
    { key: 'diff_8_desc', type: 'TEXT' as ContentType, value: 'Having completed structured training and FAQs, they spend less time asking basic questions and more time focusing on gameplay and strategy.' },
    { key: 'diff_8_img', type: 'IMAGE' as ContentType, value: '/uploads/diff-8-answers.jpg' },

    { key: 'diff_9_title', type: 'TEXT' as ContentType, value: 'Smooth & Efficient Gameplay' },
    { key: 'diff_9_desc', type: 'TEXT' as ContentType, value: 'They understand game flow, avoid unnecessary delays, and help maintain an enjoyable pace of play.' },
    { key: 'diff_9_img', type: 'IMAGE' as ContentType, value: '/uploads/diff-9-smooth.jpg' },

    { key: 'diff_10_title', type: 'TEXT' as ContentType, value: 'Confidence Through Practice' },
    { key: 'diff_10_desc', type: 'TEXT' as ContentType, value: 'Through guided games and practical play, they build confidence, speed, consistency, and real-game experience.' },
    { key: 'diff_10_img', type: 'IMAGE' as ContentType, value: '/uploads/diff-10-confidence.jpg' },

    // Mahjong Mania
    { key: 'mahjong_mania_img', type: 'IMAGE' as ContentType, value: '/uploads/mahjong-mania.jpg' },
    { key: 'mahjong_mania_tagline', type: 'TEXT' as ContentType, value: 'More Ways to Play' },
    { key: 'mahjong_mania_title', type: 'TEXT' as ContentType, value: 'Mahjong Mania' },
    { key: 'mahjong_mania_desc1', type: 'TEXT' as ContentType, value: 'Mahjong Mania brings the community together for dynamic, multi-table gameplay sessions that offer variety, excitement, and a fresh challenge every time you play.' },
    { key: 'mahjong_mania_desc2', type: 'TEXT' as ContentType, value: 'Whether you prefer individual play, team-based strategies, or tournament formats, Mahjong Mania provides a vibrant, competitive, and social environment designed for players who love the game and enjoy testing their skills in different ways.' },
    { key: 'mahjong_mania_btn', type: 'TEXT' as ContentType, value: 'Explore Mahjong Mania' },

    // Thinking Table
    { key: 'thinking_table_img', type: 'IMAGE' as ContentType, value: '/uploads/thinking-table.jpg' },
    { key: 'thinking_table_tagline', type: 'TEXT' as ContentType, value: 'Corporate Learning & Development' },
    { key: 'thinking_table_title', type: 'TEXT' as ContentType, value: 'The Thinking Table' },
    { key: 'thinking_table_desc1', type: 'TEXT' as ContentType, value: 'The Thinking Table offers a unique and engaging corporate learning experience, using the strategic framework of Mahjong to develop critical thinking, decision making, risk management, and team collaboration.' },
    { key: 'thinking_table_desc2', type: 'TEXT' as ContentType, value: 'Designed for professionals, teams, and organisations, this interactive workshop goes beyond traditional corporate training by immersing participants in a fast-paced, strategic game that mirrors real-world business challenges.' },
    { key: 'thinking_table_desc3', type: 'TEXT' as ContentType, value: 'Enhance your team’s strategic capabilities through a highly interactive and intellectually stimulating experience.' },
    { key: 'thinking_table_btn', type: 'TEXT' as ContentType, value: 'Discover The Thinking Table' },
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
