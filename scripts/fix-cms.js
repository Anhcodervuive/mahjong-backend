const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixCms() {
  // 1. why-mahjong-success
  const wmsPage = await prisma.cmsPage.upsert({ where: { slug: 'why-mahjong-success' }, update: {}, create: { slug: 'why-mahjong-success', title: 'Why Mahjong Success' } });
  
  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: wmsPage.id, key: 'structured_path' } }, update: {
    content: { cards: [
      { image: "/why-structured-path.jpg", title: "A Structured Path to Success", desc: "Follow a progressive learning journey...", anchor: "structured-path" },
      { image: "/why-guided-instruction.jpg", title: "Learn Through Guided Instruction", desc: "Learn from experienced trainers...", anchor: "guided-instruction" },
      { image: "/why-guided-play.jpg", title: "Guided Play & Guided Games", desc: "Reinforce your learning...", anchor: "guided-play" },
      { image: "/why-convenience.jpg", title: "Learn at Your Convenience", desc: "Enjoy flexible learning...", anchor: "convenience" },
      { image: "/why-variety.jpg", title: "Experience a Variety of Mahjong Games", desc: "Explore multiple Mahjong formats...", anchor: "variety" },
      { image: "/why-community.jpg", title: "Join the Mahjong Success Community", desc: "Become part of a friendly...", anchor: "community" },
      { image: "/why-events.jpg", title: "Exclusive Events, Socials & Tournaments", desc: "Participate in Mahjong socials...", anchor: "events" },
      { image: "/why-mind.jpg", title: "Strengthen Your Mind & Enrich Your Life", desc: "Mahjong helps improve memory...", anchor: "mind" }
    ]}
  }, create: { pageId: wmsPage.id, key: 'structured_path', name: 'Structured Path', order: 1, content: { cards: [
      { image: "/why-structured-path.jpg", title: "A Structured Path to Success", desc: "Follow a progressive learning journey...", anchor: "structured-path" }
    ]}
  }});

  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: wmsPage.id, key: 'guided_instruction' } }, update: {
    content: { variants: ["National Mahjong League", "International Goulash", "Taiwanese", "Partnership Mahjong", "Speciality and Custom Mahjong Formats"] }
  }, create: { pageId: wmsPage.id, key: 'guided_instruction', name: 'Guided Instruction', order: 2, content: { variants: ["National Mahjong League"] } }});

  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: wmsPage.id, key: 'guided_play' } }, update: {
    content: { benefits: ["Apply what you've learned in a real-game environment", "Learn new games and Mahjong variants through play", "Improve strategic decision-making"] }
  }, create: { pageId: wmsPage.id, key: 'guided_play', name: 'Guided Play', order: 3, content: { benefits: ["Apply what you've learned in a real-game environment"] } }});

  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: wmsPage.id, key: 'convenience' } }, update: {
    content: { ideal: ["Busy professionals", "Families and friends learning together", "Private groups", "Community groups", "Corporate teams"] }
  }, create: { pageId: wmsPage.id, key: 'convenience', name: 'Convenience', order: 4, content: { ideal: ["Busy professionals"] } }});

  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: wmsPage.id, key: 'variety' } }, update: {
    content: { benefits: ["Explore different styles of play", "Develop new strategic approaches", "Strengthen analytical thinking"] }
  }, create: { pageId: wmsPage.id, key: 'variety', name: 'Variety', order: 5, content: { benefits: ["Explore different styles of play"] } }});

  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: wmsPage.id, key: 'community' } }, update: {
    content: { benefits: ["Weekly Mahjong gatherings and social play sessions", "Opportunities to practise and improve your skills", "A supportive and welcoming learning environment"] }
  }, create: { pageId: wmsPage.id, key: 'community', name: 'Community', order: 6, content: { benefits: ["Weekly Mahjong gatherings"] } }});

  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: wmsPage.id, key: 'events' } }, update: {
    content: { benefits: ["Mahjong social and networking opportunities", "Friendly matches and practice games", "Organised tournaments and competitions"] }
  }, create: { pageId: wmsPage.id, key: 'events', name: 'Events', order: 7, content: { benefits: ["Mahjong social and networking opportunities"] } }});

  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: wmsPage.id, key: 'mind' } }, update: {
    content: { benefits: ["Improve concentration and focus", "Strengthen memory and recall", "Enhance analytical and strategic thinking"] }
  }, create: { pageId: wmsPage.id, key: 'mind', name: 'Mind', order: 8, content: { benefits: ["Improve concentration and focus"] } }});

  // 2. points-calculator
  const pcPage = await prisma.cmsPage.upsert({ where: { slug: 'points-calculator' }, update: {}, create: { slug: 'points-calculator', title: 'Points Calculator' } });
  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: pcPage.id, key: 'hero' } }, update: {
    content: { badge: "Taiwanese Mahjong", title: "Points Calculator", subtitle: "Score with Confidence. Play with Precision.", desc: "Calculate your Taiwanese Mahjong score instantly. Select your combinations and let the calculator do the math for you." }
  }, create: { pageId: pcPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "Taiwanese Mahjong", title: "Points Calculator", subtitle: "Score with Confidence. Play with Precision.", desc: "Calculate your Taiwanese Mahjong score instantly. Select your combinations and let the calculator do the math for you." } } });

  // 3. international-points-calculator
  const ipcPage = await prisma.cmsPage.upsert({ where: { slug: 'international-points-calculator' }, update: {}, create: { slug: 'international-points-calculator', title: 'International Goulash Points Calculator' } });
  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: ipcPage.id, key: 'hero' } }, update: {
    content: { badge: "International Goulash", title: "Points Calculator", subtitle: "Score with Confidence. Play with Precision.", desc: "Calculate your International Goulash score instantly." }
  }, create: { pageId: ipcPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "International Goulash", title: "Points Calculator", subtitle: "Score with Confidence. Play with Precision.", desc: "Calculate your International Goulash score instantly." } } });

  // 4. privacy-policy
  const privacyPage = await prisma.cmsPage.upsert({ where: { slug: 'privacy-policy' }, update: {}, create: { slug: 'privacy-policy', title: 'Privacy Policy' } });
  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: privacyPage.id, key: 'contact' } }, update: {
    content: { title: 'Privacy Contact', desc: 'If you have any questions or concerns regarding our privacy practices, please contact us:', email: 'info@mahjongsuccess.com', web: 'www.mahjongsuccess.com', businessName: 'Mahjong Success', effectiveDate: '2026' }
  }, create: { pageId: privacyPage.id, key: 'contact', name: 'Privacy Contact', order: 5, content: { title: 'Privacy Contact', desc: 'If you have any questions or concerns regarding our privacy practices, please contact us:', email: 'info@mahjongsuccess.com', web: 'www.mahjongsuccess.com', businessName: 'Mahjong Success', effectiveDate: '2026' } } });

  // 5. founder
  const founderPage = await prisma.cmsPage.upsert({ where: { slug: 'founder' }, update: {}, create: { slug: 'founder', title: 'Founder' } });
  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: founderPage.id, key: 'story' } }, update: {
    content: { title: "The Story", subtitle: "From Corporate Leadership to Social Community Building", storyTimeline: [ { year: "1999 - 2024", title: "Corporate Leadership", desc: "Hashmat built a successful career in corporate leadership..." }, { year: "2015", title: "A New Passion Discovered", desc: "Introduced to the game of Mahjong..." }, { year: "2024", title: "Mahjong Success Founded", desc: "Recognising the lack of structured training..." } ] }
  }, create: { pageId: founderPage.id, key: 'story', name: 'The Story Section', order: 1, content: { title: "The Story", subtitle: "From Corporate Leadership to Social Community Building", storyTimeline: [ { year: "1999 - 2024", title: "Corporate Leadership", desc: "Hashmat built a successful career in corporate leadership..." } ] } } });

  console.log("Fixes applied successfully.");
}

fixCms().catch(console.error).finally(() => prisma.$disconnect());
