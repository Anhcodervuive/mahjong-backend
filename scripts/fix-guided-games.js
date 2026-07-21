const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixGuidedGames() {
  const guidedGamesPage = await prisma.cmsPage.upsert({ where: { slug: 'guided-games' }, update: {}, create: { slug: 'guided-games', title: 'Guided Games' } });
  
  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: guidedGamesPage.id, key: 'two_game' } }, update: {
    content: {
      label: "2-Game Session", duration: "Approximately 1 Hour", tagline: "Learn It. Play It. Understand It.",
      intro: "Designed for players who have recently completed a Mahjong Success training level and want to strengthen their understanding through practical gameplay.",
      body: "Each Mahjong Success level introduces new games, new concepts, strategies, techniques, and formats.",
      includes: ["Guided play through 2 Mahjong games", "Reinforcement of concepts learned during training", "Practical application of rules and strategies", "Real-time coaching and support"],
      helps: ["Strengthen their understanding of the current level", "Practise games introduced during training", "Build confidence at the table"]
    }
  }, create: { pageId: guidedGamesPage.id, key: 'two_game', name: '2-Game Session Config', order: 3, content: {
      label: "2-Game Session", duration: "Approximately 1 Hour", tagline: "Learn It. Play It. Understand It.",
      intro: "Designed for players who have recently completed a Mahjong Success training level and want to strengthen their understanding through practical gameplay.",
      body: "Each Mahjong Success level introduces new games, new concepts, strategies, techniques, and formats.",
      includes: ["Guided play through 2 Mahjong games", "Reinforcement of concepts learned during training", "Practical application of rules and strategies", "Real-time coaching and support"],
      helps: ["Strengthen their understanding of the current level", "Practise games introduced during training", "Build confidence at the table"]
  } } });

  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: guidedGamesPage.id, key: 'four_game' } }, update: {
    content: {
      label: "4-Game Session", duration: "Extended Session", tagline: "Practice \u2192 Play \u2192 Strategy \u2192 Speed \u2192 Succeed",
      intro: "Designed for players who are already familiar with Mahjong concepts, rules, and gameplay and are looking to deepen their understanding through extended guided play.",
      body: "Led by an experienced Mahjong trainer, the session provides opportunities to play multiple games...",
      includes: ["Guided play through 4 Mahjong games", "Advanced application of concepts learned at the current level", "Exposure to additional game variations and formats", "Strategy coaching throughout the session"],
      helps: ["Consolidate learning from their current level", "Gain a deeper understanding of concepts and strategies", "Build gameplay speed and efficiency"]
    }
  }, create: { pageId: guidedGamesPage.id, key: 'four_game', name: '4-Game Session Config', order: 4, content: {
      label: "4-Game Session", duration: "Extended Session", tagline: "Practice \u2192 Play \u2192 Strategy \u2192 Speed \u2192 Succeed",
      intro: "Designed for players who are already familiar with Mahjong concepts, rules, and gameplay and are looking to deepen their understanding through extended guided play.",
      body: "Led by an experienced Mahjong trainer, the session provides opportunities to play multiple games...",
      includes: ["Guided play through 4 Mahjong games", "Advanced application of concepts learned at the current level", "Exposure to additional game variations and formats", "Strategy coaching throughout the session"],
      helps: ["Consolidate learning from their current level", "Gain a deeper understanding of concepts and strategies", "Build gameplay speed and efficiency"]
  } } });

  await prisma.cmsSection.upsert({ where: { pageId_key: { pageId: guidedGamesPage.id, key: 'learn' } }, update: {
    content: { items: ["Game rules and mechanics", "Winning strategies and techniques", "Hand-building approaches", "Tile selection and discard strategy", "Risk assessment and decision-making", "Reading the table and anticipating opponents", "Scoring opportunities", "Common mistakes and how to avoid them", "Variant-specific rules and gameplay", "Strategic thinking and game awareness"] }
  }, create: { pageId: guidedGamesPage.id, key: 'learn', name: 'Learn Section', order: 1, content: { items: ["Game rules and mechanics", "Winning strategies and techniques", "Hand-building approaches", "Tile selection and discard strategy", "Risk assessment and decision-making", "Reading the table and anticipating opponents", "Scoring opportunities", "Common mistakes and how to avoid them", "Variant-specific rules and gameplay", "Strategic thinking and game awareness"] } } });

  console.log("Guided Games sections fixed.");
}

fixGuidedGames().catch(console.error).finally(() => prisma.$disconnect());
