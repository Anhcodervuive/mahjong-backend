const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const AMERICAN_MAHJONG_LEVELS = [
  { id: "foundation", num: 1, tag: "Learn", tagBg: "bg-secondary/10 text-secondary", dotColor: "bg-secondary", name: "Foundation", tagline: "Start your American Mahjong journey with confidence.", description: "Foundation introduces you to the distinctive world of American Mahjong.", keyTakeaways: ["Tiles & suits", "NMJL card reading", "Basic terminology"], outcomes: "Ready to play first games." },
  { id: "charleston-passing", num: 2, tag: "Enhance", tagBg: "bg-primary/10 text-primary", dotColor: "bg-primary", name: "Charleston & Passing Strategy", tagline: "Turn Charleston into a strategic tool.", description: "Learn how passing sequences strengthen your hand.", keyTakeaways: ["Passing rules", "Reading opponent passes"], outcomes: "Strategic advantage before first tile is drawn." }
];

const TAIWAN_MAHJONG_LEVELS = [
  { id: "foundation", num: 1, tag: "Learn", tagBg: "bg-secondary/10 text-secondary", dotColor: "bg-secondary", name: "Foundation", tagline: "Start your Taiwan Mahjong journey.", description: "Structure and culture of traditional Taiwanese Mahjong.", keyTakeaways: ["Tile set", "3 suits", "Honour tiles"], outcomes: "Comfortable playing full games." }
];

const FAQ_DATA = [
  {
    num: "01",
    title: "Getting Started",
    items: [
      { q: "What is Mahjong?", a: "Mahjong is a timeless tile-based board game that combines strategy, skill, observation, and social interaction." },
      { q: "Do I need any prior Mahjong experience?", a: "Not at all. Most of our students start as complete beginners. Our Foundation Level is specifically designed to teach you everything you need to know, step by step." },
      { q: "What age groups do you teach?", a: "We welcome students aged 10 years and above. Our programmes are suitable for children, teenagers, university students, adults, seniors, families, community groups, and corporate teams." },
      { q: "Is Mahjong difficult to learn?", a: "Like any new skill, Mahjong takes practice. However, our structured training pathway simplifies the learning process, making it enjoyable, engaging, and easy to follow." },
      { q: "Which Mahjong variants do you teach?", a: "We teach a variety of Mahjong variants, including International Goulash, American, NMJL, Taiwanese, and other specialised formats." }
    ]
  },
  {
    num: "02",
    title: "Training & Learning Pathway",
    items: [
      { q: "How is the Mahjong Success programme structured?", a: "Mahjong Success is structured as a progressive learning journey from Foundation to Mastery." },
      { q: "What do I receive at each training level?", a: "Comprehensive trainer-led instruction, FAQ guidance, tile understanding, new concepts and strategies, and guided learning games." },
      { q: "Do I have to complete all levels?", a: "No. You may progress at your own pace. Some levels also offer specialised modules." },
      { q: "Can I learn privately?", a: "Yes. We offer one-to-one coaching, private group sessions, family training, and customised learning programmes." },
      { q: "Can lessons be conducted at my location?", a: "Absolutely. Our travelling instructors can conduct lessons at your home, office, community centre, school, or preferred venue." }
    ]
  },
  {
    num: "03",
    title: "Guided Games",
    items: [
      { q: "What are Guided Games?", a: "Guided Games are supervised gameplay sessions where an experienced Mahjong trainer sits with players and provides coaching and strategy guidance." },
      { q: "What is the difference between 1 Hour and 2 Hour Guided Play Sessions?", a: "1 Hour Guided Play Session includes 2 Guided Games. 2 Hours Guided Play Session includes 4 Guided Games for faster building of speed and strategy." },
      { q: "Do I need to be a Mahjong Success student to join Guided Games?", a: "No. Players who have learned Mahjong elsewhere are welcome." }
    ]
  },
  {
    num: "04",
    title: "Community & Events",
    items: [
      { q: "What is the Mahjong Success Circle?", a: "The Mahjong Success Circle is our community of players who gather regularly for social play and practice." },
      { q: "What is Mahjong Mania?", a: "Mahjong Mania is our events platform featuring socials, tournaments, friendly matches, and corporate events." },
      { q: "Do you organise tournaments?", a: "Yes. We organise friendly tournaments and competitive events throughout the year." },
      { q: "Can I join if I'm a beginner?", a: "Absolutely. Players of all skill levels are welcome." }
    ]
  },
  {
    num: "05",
    title: "Corporate & Educational Events",
    items: [
      { q: "What is The Thinking Table?", a: "The Thinking Table is our corporate events program that uses Mahjong to strengthen strategic thinking, communication, and teamwork." },
      { q: "Do you offer corporate team-building programmes?", a: "Yes. We offer customised corporate workshops, team-building sessions, and employee engagement programmes." },
      { q: "Do you work with schools and universities?", a: "Yes. We conduct events for schools, educational institutions, and universities." }
    ]
  },
  {
    num: "06",
    title: "Playing Mahjong",
    items: [
      { q: "Is Mahjong a game of luck or skill?", a: "While luck plays a role, successful Mahjong players rely heavily on strategy, observation, planning, and decision-making." },
      { q: "Does Mahjong improve cognitive skills?", a: "Mahjong exercises memory, concentration, pattern recognition, and analytical thinking." },
      { q: "Is Mahjong good for older adults?", a: "Many people enjoy Mahjong throughout their lives because it provides mental stimulation and social interaction." },
      { q: "Can families learn and play together?", a: "Absolutely. Mahjong is one of the few games that can be enjoyed across generations." }
    ]
  },
  {
    num: "07",
    title: "Registration & Bookings",
    items: [
      { q: "How do I register for a training programme?", a: "Simply fill out the booking form on our website." },
      { q: "Can I book a private group session?", a: "Yes. We offer customised sessions for families, friends, community groups, and corporate teams." },
      { q: "How can I learn more?", a: "Contact us to discuss your learning goals, preferred Mahjong variant, and group size." },
      { q: "Do you offer training packages or bundles?", a: "Yes. Mahjong Success offers a range of Fast Track Packages and Bundles." },
      { q: "Do your packages offer any savings?", a: "Yes. Our Fast Track Packages include discounted bundle pricing." }
    ]
  }
];

const DIFFERENCE_CARDS = [
  { num: 1, title: "Well-Trained & Well-Prepared", desc: "They have a clear understanding of rules, concepts, and strategies.", img: "/diff-1-well-trained.jpg" },
  { num: 2, title: "Strong Etiquette & Table Manners", desc: "They understand proper Mahjong etiquette and respectful gameplay.", img: "/diff-2-etiquette.jpg" },
  { num: 3, title: "Strong Knowledge of the Rules", desc: "They play confidently without uncertainty or confusion.", img: "/diff-3-rules.jpg" }
];

async function seedAll() {
  console.log("Seeding structured CMS data across all 24 pages...");

  // 1. Home (Import from home.seed.ts to ensure all 11 sections are seeded)
  require('ts-node/register');
  const { seedHomePage } = require('../prisma/seeds/home.seed.ts');
  await seedHomePage(prisma);

  // 1b. About Mahjong
  const aboutPage = await prisma.cmsPage.upsert({ where: { slug: 'about-mahjong' }, update: { title: 'About Mahjong' }, create: { slug: 'about-mahjong', title: 'About Mahjong' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: aboutPage.id } });
  await prisma.cmsSection.create({ data: { pageId: aboutPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: 'About Mahjong', subtitle: 'About Mahjong', desc: 'A timeless tile-based board game that combines strategy, skill, observation, and social interaction — enjoyed by millions across Asia and around the world.' } } });
  await prisma.cmsSection.create({ data: { pageId: aboutPage.id, key: 'about', name: 'What is Mahjong Section', order: 1, content: { title: 'What is Mahjong?', subtitle: 'The Game', desc1: 'Mahjong is a timeless tile-based board game that combines strategy, skill, observation, and social interaction.', desc2: 'Rich in history, culture, and tradition, Mahjong has been passed down through generations.', desc3: 'Beyond the tiles, Mahjong represents connection, heritage, and shared experiences.', tiles: [
    { label: "Suits", tiles: [
      { img: "/tile-bamboo.png", name: "Bamboos" },
      { img: "/tile-characters.png", name: "Characters" },
      { img: "/tile-circles.png", name: "Circles" }
    ]},
    { label: "Honours", tiles: [
      { img: "/tile-red-dragon.png", name: "Red Dragon" },
      { img: "/tile-green-dragon.png", name: "Green Dragon" },
      { img: "/tile-white-dragon.png", name: "White Dragon" }
    ]},
    { label: "Winds", tiles: [
      { img: "/tile-east-wind.png", name: "East" },
      { img: "/tile-south-wind.png", name: "South" },
      { img: "/tile-west-wind.png", name: "West" },
      { img: "/tile-north-wind.png", name: "North" }
    ]}
  ] } } });
  await prisma.cmsSection.create({ data: { pageId: aboutPage.id, key: 'benefits', name: 'Benefits Section', order: 2, content: { title: 'Benefits of Learning Mahjong', subtitle: 'The Benefits', desc1: 'More Than a Game. A Better Mind, Stronger Connections, and a Healthier Life.', desc2: 'Mahjong is more than just a game — it is a lifelong activity that combines strategic thinking, social interaction, learning, and mental stimulation.', audience: [
    { title: "Benefits for Children & Teenagers (10+)", desc: "Mahjong helps young players develop concentration, memory, patience, observation, and critical thinking skills." },
    { title: "Benefits for Young Adults & Working Professionals", desc: "Mahjong strengthens analytical thinking, adaptability, planning, and decision-making." },
    { title: "Benefits for Adults & Seniors", desc: "Mahjong provides ongoing mental stimulation that helps keep the mind active and engaged." }
  ], general: [
    { title: "Supports Cognitive Health", desc: "Mahjong is often described as a workout for the brain." },
    { title: "Encourages Emotional Wellbeing", desc: "Mahjong provides opportunities for relaxation, enjoyment, achievement, and social engagement." },
    { title: "Reduces Social Isolation", desc: "Mahjong brings people together around a table, creating opportunities for conversation." },
    { title: "Strengthening Families Across Generations", desc: "Mahjong is one of the few activities that can be enjoyed across generations." },
    { title: "Building Communities & Friendships", desc: "Mahjong creates communities and builds friendships." },
    { title: "A Healthy Alternative to Screen Time", desc: "Offers a refreshing screen-free activity." }
  ] } } });

  // 2. American Mahjong
  const amPage = await prisma.cmsPage.upsert({ where: { slug: 'american-mahjong' }, update: { title: 'American Mahjong' }, create: { slug: 'american-mahjong', title: 'American Mahjong' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: amPage.id } });
  await prisma.cmsSection.create({ data: { pageId: amPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "American Mahjong", title: "Master American Mahjong", subtitle: "Master Charleston passing, Joker strategy, card-based gameplay, and defensive play." } } });
  await prisma.cmsSection.create({ data: { pageId: amPage.id, key: 'levels', name: 'Learning Journey Levels', order: 1, content: { title: "Your Learning Journey", subtitle: "Six structured levels, each building on the last.", levels: AMERICAN_MAHJONG_LEVELS } } });

  // 3. Taiwan Mahjong
  const twPage = await prisma.cmsPage.upsert({ where: { slug: 'taiwan-mahjong' }, update: { title: 'Taiwanese Mahjong' }, create: { slug: 'taiwan-mahjong', title: 'Taiwanese Mahjong' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: twPage.id } });
  await prisma.cmsSection.create({ data: { pageId: twPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "Taiwan Mahjong", title: "Master Taiwan Mahjong", subtitle: "Master 16-tile Taiwanese rules, scoring structures, and competitive play." } } });
  await prisma.cmsSection.create({ data: { pageId: twPage.id, key: 'levels', name: 'Learning Journey Levels', order: 1, content: { title: "Your Learning Journey", subtitle: "Six structured levels, each building on the last.", levels: TAIWAN_MAHJONG_LEVELS } } });

  // 4. Goulash
  const goulashPage = await prisma.cmsPage.upsert({ where: { slug: 'goulash' }, update: { title: 'International Goulash' }, create: { slug: 'goulash', title: 'International Goulash' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: goulashPage.id } });
  await prisma.cmsSection.create({ data: { pageId: goulashPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "International Goulash", title: "Master International Goulash", subtitle: "Learn International Goulash Mahjong with structured levels." } } });
  await prisma.cmsSection.create({ data: { pageId: goulashPage.id, key: 'levels', name: 'Learning Journey Levels', order: 1, content: { title: "Your Learning Journey", subtitle: "Six structured levels.", levels: AMERICAN_MAHJONG_LEVELS } } });

  // 5. ATF Mahjong
  const atfPage = await prisma.cmsPage.upsert({ where: { slug: 'atf-mahjong' }, update: { title: 'ATF Mahjong' }, create: { slug: 'atf-mahjong', title: 'ATF Mahjong' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: atfPage.id } });
  await prisma.cmsSection.create({ data: { pageId: atfPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "NMJL", title: "Master NMJL", subtitle: "Structured learning for NMJL Mahjong." } } });
  await prisma.cmsSection.create({ data: { pageId: atfPage.id, key: 'levels', name: 'Learning Journey Levels', order: 1, content: { title: "Your Learning Journey", subtitle: "Six structured levels.", levels: AMERICAN_MAHJONG_LEVELS } } });

  // 6. FAQ
  const faqPage = await prisma.cmsPage.upsert({ where: { slug: 'faq' }, update: { title: 'Frequently Asked Questions' }, create: { slug: 'faq', title: 'Frequently Asked Questions' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: faqPage.id } });
  await prisma.cmsSection.create({ data: { pageId: faqPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "Help & Support", title: "Frequently Asked Questions", subtitle: "Everything you need to know about Mahjong Success." } } });
  await prisma.cmsSection.create({ data: { pageId: faqPage.id, key: 'faqs', name: 'FAQ Categories & Answers', order: 1, content: { categories: FAQ_DATA } } });

  // 7. Fast Track Bundles
  const ftbPage = await prisma.cmsPage.upsert({ where: { slug: 'fast-track-bundles' }, update: { title: 'Fast-Track Bundles' }, create: { slug: 'fast-track-bundles', title: 'Fast-Track Bundles' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: ftbPage.id } });
  await prisma.cmsSection.create({ data: { pageId: ftbPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: 'Fastrack Bundles', subtitle: 'Mahjong Success', description: 'Accelerate your journey to Mahjong Success.' } } });
  await prisma.cmsSection.create({ data: { pageId: ftbPage.id, key: 'international', name: 'International Bundles', order: 1, content: { bundles: [
    {
      id: "launchpad",
      title: "Mahjong Success Launchpad",
      subtitle: "Foundation to Strategy",
      tagline: "The quickest path from beginner to player.",
      body: "The Mahjong Success Launchpad combines Level 1 – Foundation and Level 2 – Joker Strategy into one comprehensive learning bundle.",
      includes: ["Level 1 – Foundation (AED 400)", "Level 2 – Joker Strategy (AED 200)"],
      regularPrice: "AED 600",
      bundlePrice: "AED 500",
      saving: "Save AED 100",
      perfectFor: ["Complete beginners", "New Mahjong players", "Casual players looking for structured learning"],
      outcome: "By the end of the Launchpad Bundle, players will confidently understand Mahjong tiles and hand-building principles.",
      cta: "Learn. Think. Succeed."
    },
    {
      id: "masterclass",
      title: "Mahjong Success Masterclass",
      subtitle: "Advanced Hand Building",
      tagline: "Take your Mahjong skills beyond the basics.",
      body: "The Hand Mastery Series helps players develop advanced hand-building techniques.",
      includes: ["Module 1 – Crochet Hands", "Module 2 – Chows & Mixed Chows", "Module 3 – Dragons & Winds Hands"],
      regularPrice: "AED 650",
      bundlePrice: "AED 500",
      saving: "Save AED 150",
      perfectFor: ["Players with a strong foundation"],
      outcome: "Deeper understanding of advanced hand construction.",
      cta: "Construct. Strategise. Succeed."
    }
  ] } } });
  await prisma.cmsSection.create({ data: { pageId: ftbPage.id, key: 'american', name: 'American Bundles', order: 2, content: { bundles: [
    {
      id: "american-launchpad",
      title: "Mahjong Success Launchpad",
      subtitle: "Foundation to Strategy",
      tagline: "The quickest path from beginner to player.",
      body: "The Mahjong Success Launchpad combines Level 1 – Foundation and Level 2 – Joker Strategy.",
      includes: ["Level 1 – Foundation (AED 400)", "Level 2 – Joker Strategy (AED 200)"],
      regularPrice: "AED 600",
      bundlePrice: "AED 500",
      saving: "Save AED 100",
      perfectFor: ["Complete beginners", "New Mahjong players"],
      outcome: "By the end of the Launchpad Bundle, players will understand American Mahjong principles.",
      cta: "Learn. Think. Succeed."
    }
  ] } } });
  await prisma.cmsSection.create({ data: { pageId: ftbPage.id, key: 'western', name: 'Western Bundles', order: 3, content: { bundles: [
    {
      id: "western-classic",
      title: "Western Mahjong Classic Bundle",
      subtitle: "Traditional Western Rules",
      tagline: "Learn classic rules that bridge Eastern and Western play.",
      body: "Teaches traditional Western rules popular across Europe.",
      includes: ["Level 1 – Western Rules Fundamentals (AED 400)", "Level 2 – Scoring & Etiquette (AED 200)"],
      regularPrice: "AED 600",
      bundlePrice: "AED 500",
      saving: "Save AED 100",
      perfectFor: ["Complete beginners to Western Mahjong"],
      outcome: "Understand Western scoring and etiquette.",
      cta: "Honour Tradition. Master Western."
    }
  ] } } });
  await prisma.cmsSection.create({ data: { pageId: ftbPage.id, key: 'taiwanese', name: 'Taiwanese Bundles', order: 4, content: { bundles: [
    {
      id: "taiwanese-masterclass",
      title: "Taiwanese Mahjong Masterclass Bundle",
      subtitle: "From Beginners to Mastery",
      tagline: "Fast-track your Taiwanese Mahjong journey.",
      body: "Includes Level 1 Foundation, Level 2 Advanced Hands, and Level 3 Scoring.",
      includes: ["Level 1: Foundation", "Level 2: Advanced Hands", "Level 3: Scoring"],
      regularPrice: "AED 1,200",
      bundlePrice: "AED 1,000",
      saving: "Save AED 200",
      perfectFor: ["Beginners to Taiwanese Mahjong"],
outcome: "Complete understanding of Taiwanese Mahjong from foundation to advanced play.",
      cta: "Learn. Master. Win."
    }
  ] } } });

  // 7. Guided Games
  const guidedGamesPage = await prisma.cmsPage.upsert({ where: { slug: 'guided-games' }, update: {}, create: { slug: 'guided-games', title: 'Guided Games' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: guidedGamesPage.id } });
  await prisma.cmsSection.create({ data: { pageId: guidedGamesPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: 'Guided Games', subtitle: 'Learn through play', desc: 'Lorem ipsum...' } } });
  await prisma.cmsSection.create({ data: { pageId: guidedGamesPage.id, key: 'learn', name: 'Learn Section', order: 1, content: { items: ["Game rules and mechanics", "Winning strategies and techniques", "Hand-building approaches", "Tile selection and discard strategy", "Risk assessment and decision-making", "Reading the table and anticipating opponents", "Scoring opportunities", "Common mistakes and how to avoid them", "Variant-specific rules and gameplay", "Strategic thinking and game awareness"] } } });
  await prisma.cmsSection.create({ data: { pageId: guidedGamesPage.id, key: 'sessions', name: 'Sessions Section', order: 2, content: { title: 'Sessions', desc: 'Lorem ipsum...' } } });
  await prisma.cmsSection.create({ data: { pageId: guidedGamesPage.id, key: 'two_game', name: '2-Game Session Config', order: 3, content: {
      label: "2-Game Session", duration: "Approximately 1 Hour", tagline: "Learn It. Play It. Understand It.",
      intro: "Designed for players who have recently completed a Mahjong Success training level and want to strengthen their understanding through practical gameplay.",
      body: "Each Mahjong Success level introduces new games, new concepts, strategies, techniques, and formats.",
      includes: ["Guided play through 2 Mahjong games", "Reinforcement of concepts learned during training", "Practical application of rules and strategies", "Real-time coaching and support"],
      helps: ["Strengthen their understanding of the current level", "Practise games introduced during training", "Build confidence at the table"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: guidedGamesPage.id, key: 'four_game', name: '4-Game Session Config', order: 4, content: {
      label: "4-Game Session", duration: "Extended Session", tagline: "Practice \u2192 Play \u2192 Strategy \u2192 Speed \u2192 Succeed",
      intro: "Designed for players who are already familiar with Mahjong concepts, rules, and gameplay and are looking to deepen their understanding through extended guided play.",
      body: "Led by an experienced Mahjong trainer, the session provides opportunities to play multiple games...",
      includes: ["Guided play through 4 Mahjong games", "Advanced application of concepts learned at the current level", "Exposure to additional game variations and formats", "Strategy coaching throughout the session"],
      helps: ["Consolidate learning from their current level", "Gain a deeper understanding of concepts and strategies", "Build gameplay speed and efficiency"]
  } } });

  // 8. Community
  const communityPage = await prisma.cmsPage.upsert({ where: { slug: 'community' }, update: {}, create: { slug: 'community', title: 'Community' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: communityPage.id } });
  await prisma.cmsSection.create({ data: { pageId: communityPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: 'Community', subtitle: 'Join us', desc: 'Lorem ipsum...' } } });
  await prisma.cmsSection.create({ data: { pageId: communityPage.id, key: 'circle', name: 'Circle Section', order: 1, content: { title: 'Circle', desc: 'Lorem ipsum...' } } });
  await prisma.cmsSection.create({ data: { pageId: communityPage.id, key: 'cta', name: 'CTA Section', order: 2, content: { title: 'Get Involved', btnLabel: 'Join', btnLink: '/join' } } });

  // 9. Mahjong Mania
  const mahjongManiaPage = await prisma.cmsPage.upsert({ where: { slug: 'mahjong-mania' }, update: {}, create: { slug: 'mahjong-mania', title: 'Mahjong Mania' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: mahjongManiaPage.id } });
  await prisma.cmsSection.create({ data: { pageId: mahjongManiaPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: 'Mahjong Mania', subtitle: 'Events & Socials', desc: 'Lorem ipsum...' } } });
  await prisma.cmsSection.create({ data: { pageId: mahjongManiaPage.id, key: 'offerings', name: 'Offerings Section', order: 1, content: { title: 'Our Offerings', desc: 'Lorem ipsum...' } } });

  // 10. Thinking Table
  const thinkingTablePage = await prisma.cmsPage.upsert({ where: { slug: 'thinking-table' }, update: {}, create: { slug: 'thinking-table', title: 'The Thinking Table' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: thinkingTablePage.id } });
  await prisma.cmsSection.create({ data: { pageId: thinkingTablePage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: 'The Thinking Table', subtitle: 'Corporate Events', desc: 'Lorem ipsum...' } } });
  await prisma.cmsSection.create({ data: { pageId: thinkingTablePage.id, key: 'benefits', name: 'Benefits Section', order: 1, content: { title: 'Benefits', desc: 'Lorem ipsum...' } } });
  await prisma.cmsSection.create({ data: { pageId: thinkingTablePage.id, key: 'ideal', name: 'Ideal Section', order: 2, content: { title: 'Ideal For', desc: 'Lorem ipsum...' } } });
  await prisma.cmsSection.create({ data: { pageId: thinkingTablePage.id, key: 'programmes', name: 'Programmes Section', order: 3, content: { title: 'Programmes', desc: 'Lorem ipsum...' } } });

  // 11. Premium Experiences
  const premiumExpPage = await prisma.cmsPage.upsert({ where: { slug: 'premium-experiences' }, update: {}, create: { slug: 'premium-experiences', title: 'Premium Experiences' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: premiumExpPage.id } });
  await prisma.cmsSection.create({ data: { pageId: premiumExpPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: 'Premium Experiences', subtitle: 'Elevate Your Game', desc: 'Lorem ipsum...' } } });
  await prisma.cmsSection.create({ data: { pageId: premiumExpPage.id, key: 'tutor', name: 'Tutor Section', order: 1, content: { title: 'Our Tutors', desc: 'Lorem ipsum...' } } });
  await prisma.cmsSection.create({ data: { pageId: premiumExpPage.id, key: 'convenience', name: 'Convenience Section', order: 2, content: { title: 'Convenience', desc: 'Lorem ipsum...' } } });

  // 8. Points Calculator
  const pcPage = await prisma.cmsPage.upsert({ where: { slug: 'points-calculator' }, update: { title: 'Points Calculator' }, create: { slug: 'points-calculator', title: 'Points Calculator' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: pcPage.id } });
  await prisma.cmsSection.create({ data: { pageId: pcPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "Taiwanese Mahjong", title: "Points Calculator", subtitle: "Score with Confidence. Play with Precision.", desc: "Calculate your Taiwanese Mahjong score instantly. Select your combinations and let the calculator do the math for you." } } });
  await prisma.cmsSection.create({ data: { pageId: pcPage.id, key: 'multipliers', name: 'Calculator Settings & Multipliers', order: 1, content: { basePoints: 5, instantWinMultiplier: 1 } } });
  await prisma.cmsSection.create({ data: { pageId: pcPage.id, key: 'category_flowers', name: 'Scoring Category: Flowers', order: 2, content: {
    id: "flowers", name: "Flowers", icon: "🌸", color: "#E7F3EE",
    items: [
      { id: "flower-count", name: "Number of Flowers", type: "stepper", min: 0, max: 8, pointsPerUnit: 1, default: 0 },
      { id: "seat-flower", name: "Seat Flower", type: "toggle", points: 5, default: false },
      { id: "mixed-bouquet", name: "Mixed Bouquet", type: "toggle", points: 10, default: false },
      { id: "full-bouquet", name: "Full Bouquet", type: "toggle", points: 20, default: false },
      { id: "seven-flowers", name: "7 Flowers Instant Win", type: "toggle", points: 50, default: false, instantWin: true },
      { id: "eight-flowers", name: "8 Flowers Instant Win", type: "toggle", points: 100, default: false, instantWin: true }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: pcPage.id, key: 'category_winds_dragons', name: 'Scoring Category: Winds & Dragons', order: 3, content: {
    id: "winds-dragons", name: "Winds & Dragons", icon: "🀄", color: "#FEF3E7",
    items: [
      { id: "pong-winds", name: "Pong of Winds", type: "chip", points: 5, default: false },
      { id: "pong-dragons", name: "Pong of Dragons", type: "chip", points: 10, default: false },
      { id: "little-3-winds", name: "Little 3 Winds", type: "chip", points: 30, default: false },
      { id: "big-3-winds", name: "Big 3 Winds", type: "chip", points: 50, default: false },
      { id: "little-4-winds", name: "Little 4 Winds", type: "chip", points: 80, default: false },
      { id: "big-4-winds", name: "Big 4 Winds", type: "chip", points: 100, default: false },
      { id: "little-dragons", name: "Little Dragons", type: "chip", points: 40, default: false },
      { id: "big-dragons", name: "Big Dragons", type: "chip", points: 80, default: false }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: pcPage.id, key: 'category_gongs', name: 'Scoring Category: Gongs', order: 4, content: {
    id: "gongs", name: "Gongs", icon: "🀫", color: "#F0FDF4",
    items: [
      { id: "open-gongs", name: "Open Gongs", type: "stepper", min: 0, max: 4, pointsPerUnit: 5, default: 0 },
      { id: "concealed-gongs", name: "Concealed Gongs", type: "stepper", min: 0, max: 4, pointsPerUnit: 10, default: 0 },
      { id: "robbing-gong", name: "Robbing a Gong", type: "toggle", points: 15, default: false },
      { id: "self-draw-gong", name: "Self Draw Gong", type: "toggle", points: 10, default: false }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: pcPage.id, key: 'category_hand_structure', name: 'Scoring Category: Hand Structure', order: 5, content: {
    id: "hand-structure", name: "Hand Structure", icon: "🧩", color: "#FDF4FF",
    items: [
      { id: "all-sheung", name: "All Sheung Hand", type: "card", points: 20, default: false, description: "All sequences, no triplets" },
      { id: "all-pong", name: "All Pong Hand", type: "card", points: 30, default: false, description: "All triplets, no sequences" },
      { id: "pure-suit", name: "Pure Suit Hand", type: "card", points: 50, default: false, description: "One suit only + honors" },
      { id: "semi-pure", name: "Semi Pure Hand", type: "card", points: 30, default: false, description: "One suit + honors" },
      { id: "two-suit", name: "2 Suit Hand", type: "card", points: 15, default: false, description: "Two suits only" },
      { id: "all-5-suit", name: "All 5 Suit Hand", type: "card", points: 40, default: false, description: "All three suits + winds + dragons" },
      { id: "step-up", name: "Step Up Hand", type: "card", points: 25, default: false, description: "Sequences in steps of 1-2-3, 4-5-6, 7-8-9" },
      { id: "sequential-pongs", name: "Sequential Pongs", type: "card", points: 35, default: false, description: "Pongs in consecutive numbers" }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: pcPage.id, key: 'category_special_hands', name: 'Scoring Category: Special Hands', order: 6, content: {
    id: "special-hands", name: "Special Hands", icon: "⭐", color: "#FFF7ED",
    items: [
      { id: "nico-nico", name: "Nico Nico", type: "large-card", points: 100, default: false, description: "Seven pairs hand" },
      { id: "13-orphans", name: "13 Orphans", type: "large-card", points: 200, default: false, description: "One of each terminal and honor, plus a pair" },
      { id: "16-orphans", name: "16 Orphans", type: "large-card", points: 300, default: false, description: "Extended 13 orphans with extra tiles" },
      { id: "chicken-hand", name: "Chicken Hand", type: "large-card", points: 5, default: false, description: "Basic winning hand with no special patterns" },
      { id: "jade-hand", name: "Jade Hand", type: "large-card", points: 80, default: false, description: "All green tiles" },
      { id: "ruby-hand", name: "Ruby Hand", type: "large-card", points: 80, default: false, description: "All red tiles" },
      { id: "diamond-hand", name: "Diamond Hand", type: "large-card", points: 80, default: false, description: "All white tiles" },
      { id: "sapphire-hand", name: "Sapphire Hand", type: "large-card", points: 80, default: false, description: "All blue/black tiles" }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: pcPage.id, key: 'category_winning_conditions', name: 'Scoring Category: Winning Conditions', order: 7, content: {
    id: "winning-conditions", name: "Winning Conditions", icon: "🏆", color: "#ECFDF5",
    items: [
      { id: "dealer-win", name: "Dealer Win", type: "toggle", points: 10, default: false },
      { id: "self-draw", name: "Self Draw", type: "toggle", points: 10, default: false },
      { id: "human-hand", name: "Human Hand", type: "toggle", points: 5, default: false },
      { id: "heavenly-tile", name: "Heavenly Tile", type: "toggle", points: 50, default: false, instantWin: true },
      { id: "earthly-tile", name: "Earthly Tile", type: "toggle", points: 50, default: false, instantWin: true },
      { id: "seabed-tile", name: "Seabed Tile", type: "toggle", points: 10, default: false },
      { id: "calling-ding", name: "Calling / Ding Ding", type: "toggle", points: 10, default: false },
      { id: "true-single-wait", name: "True Single Wait", type: "toggle", points: 10, default: false },
      { id: "calling-by-pairs", name: "Calling by Pairs", type: "toggle", points: 15, default: false }
    ]
  } } });

  // 9. International Points Calculator
  const ipcPage = await prisma.cmsPage.upsert({ where: { slug: 'international-points-calculator' }, update: { title: 'International Goulash Points Calculator' }, create: { slug: 'international-points-calculator', title: 'International Goulash Points Calculator' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: ipcPage.id } });
  await prisma.cmsSection.create({ data: { pageId: ipcPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: "International Goulash Points Calculator", subtitle: "Calculate International Goulash Hands and Multipliers" } } });
  await prisma.cmsSection.create({ data: { pageId: ipcPage.id, key: 'multipliers', name: 'Calculator Settings & Multipliers', order: 1, content: { basePoints: 5, instantWinMultiplier: 1 } } });
  await prisma.cmsSection.create({ data: { pageId: ipcPage.id, key: 'category_flowers', name: 'Scoring Category: Flowers', order: 2, content: {
    id: "flowers", name: "Flowers", icon: "🌸", color: "#E7F3EE",
    items: [
      { id: "flower-count", name: "Number of Flowers", type: "stepper", min: 0, max: 8, pointsPerUnit: 1, default: 0 },
      { id: "seat-flower", name: "Seat Flower", type: "toggle", points: 5, default: false },
      { id: "mixed-bouquet", name: "Mixed Bouquet", type: "toggle", points: 10, default: false },
      { id: "full-bouquet", name: "Full Bouquet", type: "toggle", points: 20, default: false },
      { id: "seven-flowers", name: "7 Flowers Instant Win", type: "toggle", points: 50, default: false, instantWin: true },
      { id: "eight-flowers", name: "8 Flowers Instant Win", type: "toggle", points: 100, default: false, instantWin: true }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ipcPage.id, key: 'category_winds_dragons', name: 'Scoring Category: Winds & Dragons', order: 3, content: {
    id: "winds-dragons", name: "Winds & Dragons", icon: "🀄", color: "#FEF3E7",
    items: [
      { id: "pong-winds", name: "Pong of Winds", type: "chip", points: 5, default: false },
      { id: "pong-dragons", name: "Pong of Dragons", type: "chip", points: 10, default: false },
      { id: "little-3-winds", name: "Little 3 Winds", type: "chip", points: 30, default: false },
      { id: "big-3-winds", name: "Big 3 Winds", type: "chip", points: 50, default: false },
      { id: "little-4-winds", name: "Little 4 Winds", type: "chip", points: 80, default: false },
      { id: "big-4-winds", name: "Big 4 Winds", type: "chip", points: 100, default: false },
      { id: "little-dragons", name: "Little Dragons", type: "chip", points: 40, default: false },
      { id: "big-dragons", name: "Big Dragons", type: "chip", points: 80, default: false }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ipcPage.id, key: 'category_gongs', name: 'Scoring Category: Gongs', order: 4, content: {
    id: "gongs", name: "Gongs", icon: "🀫", color: "#F0FDF4",
    items: [
      { id: "open-gongs", name: "Open Gongs", type: "stepper", min: 0, max: 4, pointsPerUnit: 5, default: 0 },
      { id: "concealed-gongs", name: "Concealed Gongs", type: "stepper", min: 0, max: 4, pointsPerUnit: 10, default: 0 },
      { id: "robbing-gong", name: "Robbing a Gong", type: "toggle", points: 15, default: false },
      { id: "self-draw-gong", name: "Self Draw Gong", type: "toggle", points: 10, default: false }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ipcPage.id, key: 'category_hand_structure', name: 'Scoring Category: Hand Structure', order: 5, content: {
    id: "hand-structure", name: "Hand Structure", icon: "🧩", color: "#FDF4FF",
    items: [
      { id: "all-sheung", name: "All Sheung Hand", type: "card", points: 20, default: false, description: "All sequences, no triplets" },
      { id: "all-pong", name: "All Pong Hand", type: "card", points: 30, default: false, description: "All triplets, no sequences" },
      { id: "pure-suit", name: "Pure Suit Hand", type: "card", points: 50, default: false, description: "One suit only + honors" },
      { id: "semi-pure", name: "Semi Pure Hand", type: "card", points: 30, default: false, description: "One suit + honors" },
      { id: "two-suit", name: "2 Suit Hand", type: "card", points: 15, default: false, description: "Two suits only" },
      { id: "all-5-suit", name: "All 5 Suit Hand", type: "card", points: 40, default: false, description: "All three suits + winds + dragons" },
      { id: "step-up", name: "Step Up Hand", type: "card", points: 25, default: false, description: "Sequences in steps of 1-2-3, 4-5-6, 7-8-9" },
      { id: "sequential-pongs", name: "Sequential Pongs", type: "card", points: 35, default: false, description: "Pongs in consecutive numbers" }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ipcPage.id, key: 'category_special_hands', name: 'Scoring Category: Special Hands', order: 6, content: {
    id: "special-hands", name: "Special Hands", icon: "⭐", color: "#FFF7ED",
    items: [
      { id: "nico-nico", name: "Nico Nico", type: "large-card", points: 100, default: false, description: "Seven pairs hand" },
      { id: "13-orphans", name: "13 Orphans", type: "large-card", points: 200, default: false, description: "One of each terminal and honor, plus a pair" },
      { id: "16-orphans", name: "16 Orphans", type: "large-card", points: 300, default: false, description: "Extended 13 orphans with extra tiles" },
      { id: "chicken-hand", name: "Chicken Hand", type: "large-card", points: 5, default: false, description: "Basic winning hand with no special patterns" },
      { id: "jade-hand", name: "Jade Hand", type: "large-card", points: 80, default: false, description: "All green tiles" },
      { id: "ruby-hand", name: "Ruby Hand", type: "large-card", points: 80, default: false, description: "All red tiles" },
      { id: "diamond-hand", name: "Diamond Hand", type: "large-card", points: 80, default: false, description: "All white tiles" },
      { id: "sapphire-hand", name: "Sapphire Hand", type: "large-card", points: 80, default: false, description: "All blue/black tiles" }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ipcPage.id, key: 'category_winning_conditions', name: 'Scoring Category: Winning Conditions', order: 7, content: {
    id: "winning-conditions", name: "Winning Conditions", icon: "🏆", color: "#ECFDF5",
    items: [
      { id: "dealer-win", name: "Dealer Win", type: "toggle", points: 10, default: false },
      { id: "self-draw", name: "Self Draw", type: "toggle", points: 10, default: false },
      { id: "human-hand", name: "Human Hand", type: "toggle", points: 5, default: false },
      { id: "heavenly-tile", name: "Heavenly Tile", type: "toggle", points: 50, default: false, instantWin: true },
      { id: "earthly-tile", name: "Earthly Tile", type: "toggle", points: 50, default: false, instantWin: true },
      { id: "seabed-tile", name: "Seabed Tile", type: "toggle", points: 10, default: false },
      { id: "calling-ding", name: "Calling / Ding Ding", type: "toggle", points: 10, default: false },
      { id: "true-single-wait", name: "True Single Wait", type: "toggle", points: 10, default: false },
      { id: "calling-by-pairs", name: "Calling by Pairs", type: "toggle", points: 15, default: false }
    ]
  } } });

  // 10. Privacy Policy
  const privacyPage = await prisma.cmsPage.upsert({ where: { slug: 'privacy-policy' }, update: { title: 'Privacy Policy' }, create: { slug: 'privacy-policy', title: 'Privacy Policy' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: privacyPage.id } });
  await prisma.cmsSection.create({ data: { pageId: privacyPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: 'Privacy Policy', subtitle: 'How Mahjong Success collects and protects your personal information.' } } });
  await prisma.cmsSection.create({ data: { pageId: privacyPage.id, key: 'summary', name: 'Privacy Summary', order: 1, content: {
    bullets: ["We collect only what we need", "We do not sell personal data", "Marketing opt-out is available", "You may request access or correction", "Photos/videos may be taken during sessions (opt-out available)"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: privacyPage.id, key: 'overview', name: 'Your Privacy Matters Grid', order: 2, content: {
    tag: 'Overview',
    title: 'Your Privacy Matters',
    desc: 'Mahjong Success respects your privacy and is committed to handling your information responsibly and transparently, and in accordance with applicable data protection requirements.',
    overviewGrid: [
      { title: "What We May Collect", body: "Name, email, phone number, booking details, payment references, programme registrations, and website usage data such as analytics or cookies." },
      { title: "Why We Collect It", body: "To manage bookings, communicate with you, provide support, improve our services, deliver training and events, and share updates where permitted." },
      { title: "Who We May Share It With", body: "Payment providers, booking systems, instructors, or trusted service partners only where reasonably necessary for operations." },
      { title: "What We Don't Do", body: "We do not sell your personal data to third parties under any circumstances." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: privacyPage.id, key: 'details', name: 'Privacy Details Accordions', order: 3, content: {
    accordionDetails: [
      { title: "Cookies & Analytics", body: "We may use cookies and analytics tools to understand website usage, improve performance, and enhance your browsing experience. Users may choose to disable cookies through their browser settings, although some website features may be affected." },
      { title: "Your Rights", body: "You may request access to, correction of, or updates to your personal information by contacting Mahjong Success at any time. We will make reasonable efforts to ensure that personal information remains accurate and up to date." },
      { title: "Marketing Opt-Out", body: "From time to time, Mahjong Success may send programme updates, event invitations, community announcements, and promotional offers. You may opt out at any time by contacting us or following the unsubscribe instructions provided." },
      { title: "Data Sharing", body: "We may share information only when necessary to deliver programmes and events, process payments, manage registrations, comply with legal obligations, or protect the safety and rights of participants. Any third-party providers are expected to maintain appropriate privacy and security standards." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: privacyPage.id, key: 'photoMedia', name: 'Photography & Media', order: 4, content: {
    tag: 'Photography & Media',
    title: 'Photography & Media',
    desc1: 'From time to time, photos or short videos may be taken during classes, events, or programmes for use on Mahjong Success\'s website, social media, or promotional materials. These are used thoughtfully to reflect the experience and community.',
    desc2: 'If you prefer not to be photographed or recorded, simply let us know before the start of the programme or event — we will fully respect your preference.'
  } } });
  await prisma.cmsSection.create({ data: { pageId: privacyPage.id, key: 'contact', name: 'Privacy Contact', order: 5, content: {
    title: 'Privacy Contact',
    desc: 'If you have any questions or concerns regarding our privacy practices, please contact us:',
    email: 'info@mahjongsuccess.com',
    web: 'www.mahjongsuccess.com',
    businessName: 'Mahjong Success',
    effectiveDate: '2026'
  } } });

  // 11. Refund Policy
  const refundPage = await prisma.cmsPage.upsert({ where: { slug: 'refund-policy' }, update: { title: 'Refund Policy' }, create: { slug: 'refund-policy', title: 'Refund Policy' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: refundPage.id } });
  await prisma.cmsSection.create({ data: { pageId: refundPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: 'Payment & Refund Policy', subtitle: 'Transparent policies for bookings, payments, and refunds.' } } });
  await prisma.cmsSection.create({ data: { pageId: refundPage.id, key: 'summary', name: 'Policy Summary Bullets', order: 1, content: {
    bullets: ["Full payment required to confirm booking", "Credit card / debit card accepted", "14+ days: full credit or reschedule", "7–14 days: reschedule subject to availability", "Under 7 days: no refund", "No-shows are non-refundable", "Approved refunds via original payment method"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: refundPage.id, key: 'windows', name: 'Cancellation Windows Timeline', order: 2, content: {
    noteTitle: "Please note:",
    noteDesc: "As our sessions are intentionally kept small, last-minute cancellations impact the experience for all participants. We appreciate your understanding in honouring your booking.",
    cancellationWindows: [
      { label: "14+ Days Notice", tag: "Full Flexibility", tagColor: "#0E7B5A", tagBg: "rgba(14,123,90,0.10)", body: "Full credit or rescheduling may be offered for training programmes and private coaching sessions." },
      { label: "7–14 Days Notice", tag: "Still Flexible", tagColor: "#8B6914", tagBg: "rgba(212,175,106,0.15)", body: "A rescheduling request may be accommodated subject to availability. Participants may nominate a replacement, subject to Mahjong Success approval." },
      { label: "Under 7 Days", tag: "No Refund", tagColor: "#891A1A", tagBg: "rgba(137,26,26,0.10)", body: "No refund will be provided. No-shows are non-refundable and non-transferable." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: refundPage.id, key: 'assistance', name: 'Need Assistance', order: 5, content: {
    tag: 'Need Assistance?',
    title: 'We\'re here to make this easy.',
    desc: 'For refunds, rescheduling, or any booking queries, please get in touch.',
    email: 'info@mahjongsuccess.com',
    web: 'www.mahjongsuccess.com',
    effectiveDate: '2026'
  } } });
  await prisma.cmsSection.create({ data: { pageId: refundPage.id, key: 'payments', name: 'Payment Requirements Accordions', order: 3, content: {
    paymentAccordions: [
      { title: "1. Payment Requirements", body: "All registrations and bookings must be paid in full before participation is confirmed. Bookings are only considered confirmed once payment has been successfully received and acknowledged by Mahjong Success." },
      { title: "2. Accepted Payment Methods", body: "Mahjong Success currently accepts payment exclusively via Credit Cards and Debit Cards. Cash payments, bank transfers, cheques, and other payment methods are not accepted unless otherwise approved by Mahjong Success." },
      { title: "3. Payment Timing", body: "Payment must be completed at the time of booking unless alternative arrangements have been agreed in writing. Failure to complete payment may result in loss of booking reservation, cancellation of registration, or release of the reserved seat to another participant." },
      { title: "4. Programme Fees", body: "All programme fees are displayed in the applicable currency and are subject to change without prior notice. The fee applicable at the time of booking will apply to the participant's registration." },
      { title: "5. Group & Corporate Bookings", body: "Special arrangements may be available for corporate programmes, schools, educational institutions, community groups, and private events. Additional terms may apply and will be communicated during the booking process." },
      { title: "6. Payment Security", body: "All card payments are processed through secure third-party payment providers. Mahjong Success does not store or retain credit card information on its systems." },
      { title: "7. Failed or Declined Payments", body: "If a payment is declined, rejected, or otherwise unsuccessful, the booking will not be confirmed. The participant may be required to submit a new payment." },
      { title: "8. Refunds & Credits", body: "Any approved refunds, credits, or rescheduled bookings will be administered in accordance with the Mahjong Success Refund & Rescheduling Policy." },
      { title: "9. Pricing Errors", body: "In the event of an incorrect price being displayed due to a technical or administrative error, Mahjong Success reserves the right to cancel or amend the booking and provide the participant with the correct pricing information before proceeding." },
      { title: "10. Contact Us", body: "For questions regarding payments, bookings, or billing matters, please contact us at info@mahjongsuccess.com." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: refundPage.id, key: 'refunds', name: 'Refund & Rescheduling Accordions', order: 4, content: {
    refundAccordions: [
      { title: "1. General Policy", body: "Mahjong Success invests significant time and resources in planning programmes, reserving venues, preparing materials, and allocating trainers. As a result, all registrations are subject to this Refund & Rescheduling Policy." },
      { title: "2. Training Programmes — Participant Cancellation", body: "More than 14 days before the programme: Full credit or rescheduling may be offered. 7 to 14 days before the programme: A rescheduling request may be accommodated subject to availability. Less than 7 days before the programme: No refund will be provided. No-shows are non-refundable and non-transferable." },
      { title: "3. Guided Games (2-Game & 4-Game Sessions)", body: "More than 7 days' notice: Rescheduling may be requested. Less than 7 days' notice: No refund will be provided. No-shows are non-refundable and non-transferable." },
      { title: "4. Mahjong Mania Events & Socials", body: "Event registrations are non-refundable. More than 7 days' notice: Transfers to another participant may be permitted with prior approval." },
      { title: "5. The Thinking Table — Corporate Programmes", body: "Corporate bookings are non-refundable. Rescheduling requests will be considered subject to trainer and venue availability. Any venue or third-party costs already incurred may remain payable." },
      { title: "6. Private Coaching & Private Group Sessions", body: "More than 14 days before the programme: Full credit or rescheduling may be offered. 7 to 14 days before the programme: A rescheduling request may be accommodated subject to availability. Less than 7 days: No refund will be provided." },
      { title: "7. Programme Cancellation by Mahjong Success", body: "If Mahjong Success cancels, postpones, or reschedules a programme due to insufficient registrations, trainer availability, venue issues, or circumstances beyond our control, participants may be offered a replacement session, programme credit, or rescheduled date." },
      { title: "8. Medical or Exceptional Circumstances", body: "Requests arising from medical emergencies or exceptional circumstances will be reviewed on a case-by-case basis. Supporting documentation may be requested." },
      { title: "9. No-Shows", body: "Participants who fail to attend a scheduled programme, training session, guided game, or event without prior notice will not be eligible for any refund, credit, transfer, or replacement session." },
      { title: "10. Refund Processing", body: "Refunds will be processed using the original payment method where possible. Processing times may vary depending on the payment provider. Any applicable administrative, banking, or transaction fees may be deducted." },
      { title: "11. Contact Us", body: "For questions regarding cancellations, refunds, or rescheduling, please contact us at info@mahjongsuccess.com." }
    ]
  } } });

  // 12. Terms & Conditions
  const termsPage = await prisma.cmsPage.upsert({ where: { slug: 'terms-and-conditions' }, update: { title: 'Terms and Conditions' }, create: { slug: 'terms-and-conditions', title: 'Terms and Conditions' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: termsPage.id } });
  await prisma.cmsSection.create({ data: { pageId: termsPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: 'Terms & Conditions', subtitle: 'Please read these terms carefully before booking.' } } });
  await prisma.cmsSection.create({ data: { pageId: termsPage.id, key: 'summary', name: 'Terms Summary Bullets', order: 1, content: {
    bullets: ["Open to participants aged 10 and above", "Full payment required to confirm booking", "Respectful conduct is expected at all times", "Photography opt-out available on request", "Training materials remain property of Mahjong Success", "Privacy governed by our Privacy Policy"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: termsPage.id, key: 'overview', name: 'Overview Summary Grid', order: 2, content: {
    overviewGrid: [
      { title: "Services", body: "Mahjong Success provides training programmes, guided games, events, community activities, corporate experiences, private coaching, and educational programmes." },
      { title: "Payment", body: "Bookings are confirmed only after successful payment is received and acknowledged by Mahjong Success." },
      { title: "Participant Conduct", body: "All participants must treat trainers and fellow participants with respect. Mahjong Success reserves the right to remove participants for disruptive or inappropriate behaviour." },
      { title: "Cancellation & Refunds", body: "Cancellation and refund rights are governed by the separate Refund & Rescheduling Policy." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: termsPage.id, key: 'details', name: 'Terms in Detail Accordions', order: 3, content: {
    termsAccordions: [
      { title: "1. Registration & Participation", body: "Participation in Mahjong Success programmes is subject to availability and confirmation of registration. Mahjong Success reserves the right to refuse or cancel registrations where necessary for operational, safety, or behavioural reasons." },
      { title: "2. Age Requirements", body: "Mahjong Success welcomes participants aged 10 years and above. Participants between the ages of 10 and 18 must be accompanied by a participating parent, guardian, or responsible adult." },
      { title: "3. Programme Structure", body: "Mahjong Success offers a variety of programmes, including Training Levels, Guided Games, Mahjong Success Circle, Mahjong Mania Events, The Thinking Table Corporate Programmes, Private Coaching, Community Activities, Tournaments and Special Events." },
      { title: "4. Bookings & Payments", body: "Full payment is required to confirm a booking. Bookings are only considered confirmed upon receipt of payment and confirmation from Mahjong Success." },
      { title: "5. Cancellation & Rescheduling", body: "Participants who are unable to attend should provide as much notice as possible. Requests for rescheduling will be considered on a case-by-case basis and subject to availability." },
      { title: "6. Participant Conduct", body: "All participants are expected to conduct themselves respectfully and professionally. Treat trainers and fellow participants with respect and follow Mahjong etiquette." },
      { title: "7. Learning Outcomes", body: "Mahjong Success provides training, guidance, coaching, and learning opportunities. Individual learning outcomes, skill levels, and playing ability may vary." },
      { title: "8. Photography & Media", body: "From time to time, photographs, videos, testimonials, and event recordings may be taken during programmes and events. Participants who do not wish to appear in photographs or videos should notify us." },
      { title: "9. Intellectual Property", body: "All Mahjong Success training materials, presentations, handouts, programme content, methodologies, branding, logos, graphics, and educational resources remain the intellectual property of Mahjong Success." },
      { title: "10. Health & Wellbeing", body: "Participants are responsible for their own health and wellbeing while attending Mahjong Success activities. Mahjong Success is not liable for personal injury, loss, or damage." },
      { title: "11. Community Participation", body: "Participation in the Mahjong Success Circle, Mahjong Mania events, Future Minds programmes, or other community activities is voluntary." },
      { title: "12. Privacy", body: "Personal information collected during registration will be used for programme administration, communication, customer service, and operational purposes." },
      { title: "13. Changes to Terms & Conditions", body: "Mahjong Success reserves the right to update or amend these Terms & Conditions at any time." },
      { title: "14. Contact Us", body: "For questions relating to these Terms & Conditions, please contact us at info@mahjongsuccess.com." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: termsPage.id, key: 'contact', name: 'Business Contact', order: 4, content: {
    businessName: 'Mahjong Success',
    email: 'info@mahjongsuccess.com',
    web: 'www.mahjongsuccess.com',
    effectiveDate: '2026'
  } } });

  // 13. Who We Teach
  const wwtPage = await prisma.cmsPage.upsert({ where: { slug: 'who-we-teach' }, update: { title: 'Who We Teach' }, create: { slug: 'who-we-teach', title: 'Who We Teach' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: wwtPage.id } });
  await prisma.cmsSection.create({ data: { pageId: wwtPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "Who We Teach", title: "Mahjong for Everyone", subtitle: "From complete beginners to corporate teams." } } });
  await prisma.cmsSection.create({ data: { pageId: wwtPage.id, key: 'individuals', name: 'Individual Players', order: 1, content: {
    title: "Individual Players",
    subtitle: "For Every Player, at Every Stage",
    individuals: [
      { num: 1, eyebrow: "Start from Zero", title: "Complete Beginners", body: "You've always been curious about Mahjong but never known where to start. Our Foundation Level was built for exactly that moment, helping you learn the game step by step with confidence." },
      { num: 2, eyebrow: "Build Confidence", title: "Casual Players", body: "You've played occasionally with friends or family and want to improve your understanding, strategy, and enjoyment of the game." },
      { num: 3, eyebrow: "Take Your Game Further", title: "Experienced Mahjong Enthusiasts", body: "Expand your skills, explore new variants, master advanced hands, and challenge yourself through higher-level gameplay and strategy." },
      { num: 4, eyebrow: "Play, Connect, Belong", title: "Social Players", body: "Meet like-minded players, make new friends, and enjoy Mahjong in a welcoming and engaging social environment." },
      { num: 5, eyebrow: "Learn Through Play", title: "Students (10+) & Teens", body: "Develop concentration, memory, critical thinking, observation, and problem-solving skills through a fun and interactive game." },
      { num: 6, eyebrow: "Think Smarter. Play Better", title: "Young Adults & Working Professionals", body: "Strengthen decision-making, strategic thinking, adaptability, and communication skills while enjoying a meaningful social activity." },
      { num: 7, eyebrow: "Keep the Mind Active", title: "Seniors & Lifelong Learners", body: "Enjoy lifelong learning, mental stimulation, social interaction, and a rewarding hobby that can be enjoyed for years to come." },
      { num: 8, eyebrow: "Create Meaningful Moments Together", title: "Families & Friends", body: "Learn, play, and connect across generations while sharing quality time around the Mahjong table." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: wwtPage.id, key: 'groups', name: 'Groups & Organisations', order: 2, content: {
    title: "Groups & Organisations",
    subtitle: "We Also Work With",
    groups: [
      { num: 1, eyebrow: "Bring People Together", title: "Community Groups", body: "Foster friendship, engagement, and social interaction through regular Mahjong activities and gatherings." },
      { num: 2, eyebrow: "Connect Through Shared Interests", title: "Social Clubs & Associations", body: "Offer members a unique activity that encourages learning, networking, and community participation." },
      { num: 3, eyebrow: "Learning Beyond the Classroom", title: "Schools & Educational Institutions", body: "Introduce students to a game that develops focus, patience, strategic thinking, and cognitive skills in an engaging environment." },
      { num: 4, eyebrow: "Learn, Network, Compete", title: "Universities & Colleges", body: "Build analytical thinking and social connections while participating in a game that combines strategy, learning, and fun." },
      { num: 5, eyebrow: "Stronger Bonds, Better Collaboration", title: "Corporate Teams", body: "Empower teams to think strategically, communicate effectively, collaborate, and connect through interactive corporate experiences." },
      { num: 6, eyebrow: "Engagement Through Learning", title: "Human Resources, L&D and Wellness Teams", body: "Provide employees with innovative development, wellness, team-building, and engagement programmes." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: wwtPage.id, key: 'anyone', name: 'Anyone Section', order: 3, content: {
    tag: "A Place for Everyone",
    title: "Anyone Looking for a Unique Social, Learning, or Team-Building Experience",
    desc: "Whether your goal is learning, networking, family bonding, mental stimulation, or simply having fun, Mahjong Success offers a welcoming pathway to learn, play, connect, and succeed."
  } } });
  await prisma.cmsSection.create({ data: { pageId: wwtPage.id, key: 'cta', name: 'CTA Section', order: 4, content: {
    tag: "Ready to Begin?",
    title: "Learn Together. Play Together. Succeed Together.",
    desc: "Whatever your background, goal, or experience level — there is a place for you at Mahjong Success.",
    btnLabel: "Book a Session"
  } } });

  // 14. Players Different
  const pdPage = await prisma.cmsPage.upsert({ where: { slug: 'players-different' }, update: { title: 'Why Our Players Are Different' }, create: { slug: 'players-different', title: 'Why Our Players Are Different' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: pdPage.id } });
  await prisma.cmsSection.create({ data: { pageId: pdPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "The Difference", title: "Why Our Players Stand Out", subtitle: "Confidence, strategy, and sportsmanship." } } });
  await prisma.cmsSection.create({ data: { pageId: pdPage.id, key: 'differentiators', name: 'Defining Qualities', order: 1, content: {
    tag: "10 DEFINING QUALITIES",
    title: "The Traits That Define Our Players",
    differentiators: [
      { num: 1, title: "Well-Trained & Well-Prepared", desc: "Mahjong Success players have a clear understanding of the games they have learned, including the rules, concepts, strategies, and gameplay instructions.", img: "/pd-1-prepared.png" },
      { num: 2, title: "Strong Mahjong Etiquette & Table Manners", desc: "They understand proper Mahjong etiquette, table conduct, sportsmanship, and respectful gameplay, contributing to a positive experience for everyone at the table.", img: "/pd-2-etiquette.png" },
      { num: 3, title: "Strong Knowledge of the Rules", desc: "They understand the game mechanics and play confidently without uncertainty or confusion.", img: "/pd-3-rules.png" },
      { num: 4, title: "Deep Understanding of Tiles", desc: "They know the value, purpose, and strategic use of different tiles and how they contribute to winning hands.", img: "/pd-4-tiles.png" },
      { num: 5, title: "Joker Strategy Experts", desc: "They understand joker rules, joker exchanges, joker optimisation, and how to maximise the value of jokers across different games.", img: "/pd-5-joker.png" },
      { num: 6, title: "Strategic Thinkers", desc: "They think ahead, evaluate options, manage risks, and make informed decisions during gameplay.", img: "/pd-6-strategic.png" },
      { num: 7, title: "Familiar with Multiple Mahjong Variants", desc: "They are exposed to different Mahjong games and formats, making them adaptable and versatile players.", img: "/pd-7-variants.png" },
      { num: 8, title: "Answers, Not Questions", desc: "Having completed structured training and FAQs, they spend less time asking basic questions and more time focusing on gameplay and strategy.", img: "/pd-8-answers.png" },
      { num: 9, title: "Smooth & Efficient Gameplay", desc: "They understand game flow, avoid unnecessary delays, and help maintain an enjoyable pace of play.", img: "/pd-9-smooth.png" },
      { num: 10, title: "Confidence Through Practice", desc: "Through guided games and practical play, they build confidence, speed, consistency, and real-game experience.", img: "/pd-10-confidence.png" }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: pdPage.id, key: 'cta', name: 'Closing CTA Section', order: 2, content: {
    title: "The Mahjong Success Difference",
    desc: "A Mahjong Success player is recognised by their preparation, respected for their etiquette, admired for their knowledge and strategy, and valued for the positive experience they bring to every table.",
    quote: "Learn. Play. Succeed.",
    btnLabel: "Begin Your Journey"
  } } });

  // 15. Founder
  const founderPage = await prisma.cmsPage.upsert({ where: { slug: 'founder' }, update: { title: 'Founder' }, create: { slug: 'founder', title: 'Founder' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: founderPage.id } });
  await prisma.cmsSection.create({ data: { pageId: founderPage.id, key: 'hero', name: 'Hero Section & Bio', order: 0, content: { 
    badge: "Meet The Founder", 
    title: "Our Story & Vision", 
    subtitle: "Passionate about preserving and teaching Mahjong.",
    image: "/hashmat-pereira.jpg",
    bioBadge: "25+ Years of Leadership Experience",
    bioTitle: "Hashmat Pereira",
    bioSubtitle: "Founder, Mahjong Success",
    bioDesc1: "Hashmat Pereira is the Founder of Mahjong Success and a passionate advocate of lifelong learning, strategic thinking, and community building through Mahjong.",
    bioDesc2: "With more than 25 years of leadership experience, Hashmat has built, launched, and managed successful businesses, led large teams, developed products, training programmes, and delivered coaching and mentorship across multiple industries. Her career includes senior leadership roles with leading global and regional organisations including Mastercard, Citibank, Mashreq Bank, and Samba Financial Group.",
    bioDesc3: "Drawing on this extensive experience in strategy, training, customer engagement, and business development, Hashmat created Mahjong Success to provide a structured and enjoyable pathway for players to learn, play, and master the board game Mahjong."
  } } });
  await prisma.cmsSection.create({ data: { pageId: founderPage.id, key: 'experience', name: 'Founder Experience Cards', order: 1, content: {
    EXPERIENCE_CARDS: [
      { title: "Senior Leadership", desc: "25+ years across global and regional organisations including Mastercard, Citibank, Mashreq Bank, and Samba Financial Group." },
      { title: "Events & Experiences", desc: "Partner at Flagship Events LLC — a UAE leader — bringing deep expertise in corporate experiences, community events, and social gatherings." },
      { title: "Licensed Private Tutor", desc: "Combines professional teaching methodologies with a structured learning framework to build Mahjong knowledge, strategic thinking, and gameplay." },
      { title: "Community Builder", desc: "Passionate advocate for lifelong learning, community building, and bringing people of all ages and backgrounds together." },
      { title: "Training & Coaching", desc: "Built, launched, and managed successful businesses; led large teams; developed products, training programmes, and delivered coaching." },
      { title: "Strategic Thinker", desc: "Deep expertise in strategy, customer engagement, business development, and creating structured pathways that make complex skills accessible." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: founderPage.id, key: 'story', name: 'Founder Story Timeline', order: 2, content: {
    title: "The Story",
    subtitle: "From Corporate Leadership to Social Community Building",
    STORY_TIMELINE: [
      { year: "The Foundation", title: "A Career Built on Leadership", desc: "With more than 25 years of experience building businesses, leading large teams, and delivering coaching across multiple industries." },
      { year: "Events & Community", title: "Partner at Flagship Events LLC", desc: "As a Partner at Flagship Events LLC in the UAE, Hashmat gained deep expertise in event management, community engagement, and corporate experiences." },
      { year: "A Passion Ignited", title: "Discovering Mahjong's Potential", desc: "Hashmat saw how the board game Mahjong uniquely combined strategic thinking, continuous learning, and genuine human connection." },
      { year: "Identifying the Gap", title: "A Structured Learning Pathway", desc: "Hashmat envisioned a structured, enjoyable approach that would make learning Mahjong an engaging & fulfilling experience." },
      { year: "Mahjong Success", title: "Building Something Real", desc: "Combining her expertise in training, events, strategy, and community building, Hashmat founded Mahjong Success." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: founderPage.id, key: 'vision', name: 'Founder Vision Pillars', order: 3, content: {
    title: "The Vision Behind Mahjong Success",
    desc1: "Hashmat's vision is to make the board game Mahjong accessible to people of all ages and backgrounds while building a vibrant community that brings together families, friends, students, professionals, and lifelong learners.",
    desc2: "Through Mahjong Success, she combines her expertise in training, events, strategy, and community building to create a unique learning and social experience that helps players connect, grow, and succeed.",
    desc3: "Her belief is simple: Mahjong is more than a game. It is a way to connect, learn, think strategically, and build relationships that last a lifetime.",
    VISION_PILLARS: [
      { label: "Make Mahjong Accessible", desc: "Create structured, enjoyable learning pathways for players of all ages and backgrounds." },
      { label: "Build a Vibrant Community", desc: "Bring together families, friends, students, professionals, and lifelong learners through the timeless game of Mahjong." },
      { label: "Develop Strategic Thinking", desc: "Help players strengthen decision-making, observation, analytical thinking, and planning skills." },
      { label: "Create Lasting Connections", desc: "Foster a welcoming environment where every player feels at home at the Mahjong table." }
    ]
  } } });

  // 16. Why Mahjong Success
  const wmsPage = await prisma.cmsPage.upsert({ where: { slug: 'why-mahjong-success' }, update: { title: 'Why Mahjong Success' }, create: { slug: 'why-mahjong-success', title: 'Why Mahjong Success' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: wmsPage.id } });
  await prisma.cmsSection.create({ data: { pageId: wmsPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "Why Mahjong Success?", title: "Building Better Players, One Tile at a Time", subtitle: "At Mahjong Success, we believe that learning Mahjong should be structured, enjoyable, and rewarding. Whether you're a complete beginner or an experienced player looking to refine your skills, we provide the guidance, community, and opportunities needed to help you succeed." } } });
  await prisma.cmsSection.create({ data: { pageId: wmsPage.id, key: 'structured_path', name: '01 - Structured Path to Success', order: 1, content: {
    tag: "01 — A Structured Path to Success",
    title: "Every Level Builds on the Last",
    desc1: "Our progressive learning pathway takes you step by step from the fundamentals to advanced gameplay, ensuring that every new skill builds naturally on the one before it.",
    desc2: "Rather than overwhelming players with complex rules and strategies from the start, we focus on helping you develop confidence, understanding, and practical experience at every stage of your Mahjong journey. Each level introduces new concepts, techniques, and challenges designed to strengthen your skills and deepen your appreciation of the game.",
    desc3: "As you progress through the programme, you'll learn to think more strategically, adapt to different game situations, build stronger hands, understand scoring, and become a more confident and versatile player.",
    desc4: "Each level at Mahjong Success is carefully designed to help you grow, improve, and achieve success one step at a time.",
    cards: [
      { image: "/why-structured-path.jpg", title: "A Structured Path to Success", desc: "Follow a progressive learning journey designed to help you build confidence, skills, and understanding one level at a time.", anchor: "structured-path" },
      { image: "/why-guided-instruction.jpg", title: "Learn Through Guided Instruction", desc: "Learn from experienced trainers through structured lessons covering multiple Mahjong variants, strategies, and gameplay techniques.", anchor: "guided-instruction" },
      { image: "/why-guided-play.jpg", title: "Guided Play & Guided Games", desc: "Reinforce your learning through coached gameplay sessions where trainers help you apply concepts, improve strategy, and build confidence at the table.", anchor: "guided-play" },
      { image: "/why-convenience.jpg", title: "Learn at Your Convenience", desc: "Enjoy flexible learning with travelling instructors who can conduct lessons at your home, office, community space, or preferred venue.", anchor: "convenience" },
      { image: "/why-variety.jpg", title: "Experience a Variety of Mahjong Games", desc: "Explore multiple Mahjong formats and game variations that develop adaptability, strategic thinking, and a deeper understanding of the game.", anchor: "variety" },
      { image: "/why-community.jpg", title: "Join the Mahjong Success Community", desc: "Become part of a friendly and supportive community that meets regularly to learn, play, network, and grow together.", anchor: "community" },
      { image: "/why-events.jpg", title: "Exclusive Events, Socials & Tournaments", desc: "Participate in Mahjong socials, tournaments, meetups, and community events designed to enhance your playing experience.", anchor: "events" },
      { image: "/why-mind.jpg", title: "Strengthen Your Mind & Enrich Your Life", desc: "Mahjong helps improve memory, concentration, strategic thinking, decision-making, and social connection while supporting lifelong mental engagement.", anchor: "mind" }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: wmsPage.id, key: 'guided_instruction', name: '02 - Guided Instruction', order: 2, content: {
    tag: "02 — Learn Through Guided Instruction",
    title: "Learn It. Play It. Master It.",
    desc1: "At Mahjong Success, learning doesn't stop with understanding the rules. We believe the best way to improve is through a combination of structured instruction and guided gameplay.",
    desc2: "Benefit from expert-led classes, personalised guidance, and practical learning experiences designed to accelerate your progress. Whether through group sessions or one-to-one coaching, you'll receive the support needed to understand the game, improve your strategy, and play with confidence.",
    cardTitle: "Guided Instruction",
    cardDesc: "Learn the fundamentals, strategies, techniques, scoring systems, and Mahjong variants through structured lessons designed to build knowledge progressively.",
    variantsTitle: "Mahjong Variants We Teach",
    variantsDesc: "By learning different Mahjong variants, you'll gain a deeper understanding of the game, discover new strategic approaches, and develop the confidence to play in a wide range of Mahjong environments.",
    variants: ["National Mahjong League", "International Goulash", "Taiwanese", "Partnership Mahjong", "Speciality and Custom Mahjong Formats"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: wmsPage.id, key: 'guided_play', name: '03 - Guided Play', order: 3, content: {
    tag: "03 — Guided Play Sessions",
    title: "Knowledge Becomes Skill Through Practice",
    desc: "Our expert-led guided play sessions allow players to participate in real games while receiving coaching, feedback, and strategic insights throughout the session.",
    cardTitle: "Guided Play Sessions",
    cardDesc: "Knowledge becomes skill through practice. These small-group sessions provide opportunities to apply what you've learned in a real-game environment with tutor support throughout.",
    bulletsTitle: "These sessions provide opportunities to",
    benefits: ["Apply what you've learned in a real-game environment", "Learn new games and Mahjong variants through play", "Improve strategic decision-making", "Receive guidance from experienced instructors", "Learn from other players at the table", "Build confidence and game awareness", "Develop stronger gameplay habits", "Gain practical experience in a supportive setting"],
    note: "Guided play bridges the gap between learning and mastery, helping players become more confident, capable, and successful at the table."
  } } });
  await prisma.cmsSection.create({ data: { pageId: wmsPage.id, key: 'convenience', name: '04 - Convenience', order: 4, content: {
    tag: "04 — We Bring Mahjong to You",
    title: "Learning on Your Terms",
    desc1: "Our travelling instructors can conduct lessons at your home, office, community space, or preferred venue, allowing you to learn in a comfortable and familiar environment.",
    desc2: "Whether you're looking for one-to-one coaching, private group lessons, family learning sessions, or customised training for friends and colleagues, we can tailor the experience to suit your schedule, location, and learning goals.",
    desc3: "Enjoy the flexibility of learning Mahjong where and when it works best for you.",
    idealTitle: "Ideal For",
    ideal: ["Busy professionals", "Families and friends learning together", "Private groups", "Community groups", "Corporate teams", "Students seeking personalised coaching"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: wmsPage.id, key: 'variety', name: '05 - Variety of Games', order: 5, content: {
    tag: "05 — Experience a Variety of Mahjong Games",
    title: "More Games. More Strategies. More Growth.",
    desc1: "At each level, students are introduced to a carefully selected range of Mahjong games and formats designed to expand their thinking, challenge their decision-making, and develop new strategic skills. Rather than repeatedly playing the same game, you'll experience a variety of Mahjong styles — each with its own unique rules, objectives, and strategic considerations. Each level typically includes five or more game variations.",
    desc2: "By learning through a variety of games, players remain engaged, challenged, and continuously growing throughout their Mahjong journey.",
    benefits: ["Explore different styles of play", "Develop new strategic approaches", "Strengthen analytical thinking", "Improve problem-solving skills", "Adapt to changing game situations", "Discover the Mahjong formats they enjoy most"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: wmsPage.id, key: 'community', name: '06 - Community', order: 6, content: {
    tag: "06 — Join the Mahjong Success Community",
    title: "Learning is Better Together",
    desc: "When you join Mahjong Success, you become part of a welcoming community of like-minded players who share a passion for learning, playing, networking, and growing together. Whether you're a beginner or an experienced player, you'll always find a friendly table waiting for you.",
    bulletsTitle: "Community Benefits",
    benefits: ["Weekly Mahjong gatherings and social play sessions", "Opportunities to practise and improve your skills", "A supportive and welcoming learning environment", "Meet fellow Mahjong enthusiasts and build lasting friendships", "Learn from players with different experiences and playing styles", "Access to community events and special gatherings"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: wmsPage.id, key: 'events', name: '07 - Events & Socials', order: 7, content: {
    tag: "07 — Access Exclusive Mahjong Events, Socials & Tournaments",
    title: "Continue the Journey Beyond the Classroom",
    desc1: "Continue your Mahjong journey beyond the classroom through our Mahjong Mania events, socials, tournaments, matches, meetups, offsites, and community gatherings. These experiences provide opportunities to practise your skills, meet new players, gain real-game experience, and enjoy Mahjong in a fun, engaging, and supportive environment.",
    desc2: "Whether you prefer casual social games, friendly matches, organised tournaments, or special Mahjong events, there is always an opportunity to learn, play, and connect with fellow enthusiasts.",
    bulletsTitle: "What You'll Have Access To",
    benefits: ["Mahjong social and networking opportunities", "Friendly matches and practice games", "Organised tournaments and competitions", "Mahjong meetups and community gatherings", "Mahjong-themed events", "Mahjong offsites and retreats"],
    desc3: "From your first social game to your first tournament victory, Mahjong Success provides opportunities to continue learning, building confidence, and enjoying the game."
  } } });
  await prisma.cmsSection.create({ data: { pageId: wmsPage.id, key: 'mind', name: '08 - Mind & Life Skills', order: 8, content: {
    tag: "08 — Develop Skills for Life, Build a Stronger Mind for Success",
    title: "Build a Stronger Mind for Success",
    desc1: "Mahjong is much more than a game. It is a powerful exercise in strategic thinking, memory, concentration, observation, planning, and decision-making. Through every lesson and every game, players develop the ability to think ahead, recognise patterns, assess risks, solve problems, and adapt to changing situations. These skills not only improve Mahjong performance but also contribute to personal growth, lifelong learning, and success beyond the table.",
    desc2: "At Mahjong Success, we believe that every game is an opportunity to sharpen your mind, challenge yourself, and continue growing.",
    desc3: "At Mahjong Success, we believe that learning Mahjong is not only about becoming a better player — it is also about keeping your mind active, building meaningful relationships, and investing in your personal growth.",
    desc4: "Whether you're learning for recreation, mental stimulation, social connection, or lifelong learning, Mahjong offers benefits that extend far beyond the game itself.",
    benefits: ["Improve concentration and focus", "Strengthen memory and recall", "Enhance analytical and strategic thinking", "Develop problem-solving abilities", "Improve decision-making skills", "Promote adaptability and mental agility", "Encourage patience and discipline", "Support lifelong learning and cognitive wellbeing", "Foster meaningful social connections", "Build confidence and resilience"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: wmsPage.id, key: 'cta', name: 'Closing CTA', order: 9, content: {
    title: "Start Your Journey to Mahjong Success",
    subtitle: "Contact us today and discover how you can Master Mahjong One Tile at a Time.",
    btnLabel: "Book a Session"
  } } });

  // 17. What You Receive
  const wyrPage = await prisma.cmsPage.upsert({ where: { slug: 'what-you-receive' }, update: { title: 'What You Receive' }, create: { slug: 'what-you-receive', title: 'What You Receive' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: wyrPage.id } });
  await prisma.cmsSection.create({ data: { pageId: wyrPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "What You Receive", title: "What You Receive at Each Training Level?", desc: "Every Mahjong Success training level is designed to provide a structured, engaging, and practical learning experience that combines instruction, strategy, and gameplay." } } });
  await prisma.cmsSection.create({ data: { pageId: wyrPage.id, key: 'content', name: 'Page Content & Banner Images', order: 1, content: {
    banner1: "/receive-banner-1.jpg",
    banner2: "/receive-banner-2.jpg",
    items: [
      { title: "Comprehensive Training & Instruction", desc: "Learn through a detailed trainer-led presentation that covers the concepts, rules, strategies, techniques, and gameplay principles relevant to that level." },
      { title: "Frequently Asked Questions & Expert Guidance", desc: "Gain clarity through detailed explanations and answers to commonly asked questions, helping you better understand the game and avoid common mistakes." },
      { title: "Understand the Tiles & Their Uses", desc: "Learn about the tiles used at each level, their significance, how they interact within different hands, and how to maximise their value during gameplay." },
      { title: "Learn New Concepts & Strategies", desc: "Master the key concepts, hand-building techniques, strategic approaches, and decision-making skills introduced at that level." },
      { title: "Guided Learning Games", desc: "Play carefully selected Mahjong games designed to reinforce the concepts taught during training. Each game includes detailed explanations, practical examples, and strategic insights to accelerate learning." },
      { title: "Apply Learning Through Practical Play", desc: "Put theory into practice by applying newly learned concepts, tile knowledge, and strategies during gameplay, helping you build experience and confidence." }
    ]
  } } });

  // 18. Guided Games
  const ggPage = await prisma.cmsPage.upsert({ where: { slug: 'guided-games' }, update: { title: 'Guided Games' }, create: { slug: 'guided-games', title: 'Guided Games' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: ggPage.id } });
  await prisma.cmsSection.create({ data: { pageId: ggPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "Guided Games", title: "Practice. Play. Improve.", subtitle: "Apply what you’ve learned in a supportive, real-game environment." } } });
  await prisma.cmsSection.create({ data: { pageId: ggPage.id, key: 'learn', name: 'What You\'ll Learn', order: 1, content: { 
    WHAT_YOULL_LEARN: ["Game rules and mechanics", "Winning strategies and techniques", "Hand-building approaches", "Tile selection and discard strategy", "Risk assessment and decision-making", "Reading the table and anticipating opponents", "Scoring opportunities", "Common mistakes and how to avoid them", "Variant-specific rules and gameplay", "Strategic thinking and game awareness"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ggPage.id, key: 'sessions', name: 'Sessions Config', order: 2, content: { 
    badge: "Session Options",
    title: "Choose Your Guided Session",
    subtitle: "Two formats designed for different stages of your journey \u2014 pick the one that fits where you are now."
  } } });
  await prisma.cmsSection.create({ data: { pageId: ggPage.id, key: 'two_game', name: '2-Game Session', order: 3, content: { 
    label: "2-Game Session",
    duration: "Approximately 1 Hour",
    tagline: "Learn It. Play It. Understand It.",
    intro: "Designed for players who have recently completed a Mahjong Success training level and want to strengthen their understanding through practical gameplay.",
    body: "Each Mahjong Success level introduces new games, new concepts, strategies, techniques, and formats. This session provides an opportunity to apply these lessons in a real-game environment while receiving guidance and support from an experienced Mahjong trainer. Rather than simply learning the theory, players get to play the games taught at their level, ask questions, explore strategies, and gain a deeper understanding of how the game works in practice.",
    btnLabel: "Book a 2-Game Session",
    includes: ["Guided play through 2 Mahjong games", "Reinforcement of concepts learned during training", "Practical application of rules and strategies", "Real-time coaching and support", "Strategy discussions and gameplay insights", "Question-and-answer opportunities", "Personalised feedback and game analysis", "Opportunities to practise games taught at the current level", "Introduction to new games"],
    helps: ["Strengthen their understanding of the current level", "Practise games introduced during training", "Build confidence at the table", "Improve strategic thinking and decision-making", "Gain practical gameplay experience", "Become more comfortable with rules and game flow", "Learn through expert guidance and feedback"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ggPage.id, key: 'four_game', name: '4-Game Session', order: 4, content: { 
    label: "4-Game Session",
    duration: "Extended Session",
    tagline: "Practice \u2192 Play \u2192 Strategy \u2192 Speed \u2192 Succeed",
    intro: "Designed for players who are already familiar with Mahjong concepts, rules, and gameplay and are looking to deepen their understanding through extended guided play.",
    body: "Led by an experienced Mahjong trainer, the session provides opportunities to play multiple games while receiving real-time coaching, strategic guidance, and personalised feedback. Players are exposed to a wider range of game situations, decision-making opportunities, and Mahjong formats, helping them strengthen their overall gameplay and strategic thinking. The focus is on developing confidence, consistency, speed, and proficiency through practical experience.",
    btnLabel: "Book a 4-Game Session",
    includes: ["Guided play through 4 Mahjong games", "Advanced application of concepts learned at the current level", "Exposure to additional game variations and formats", "Strategy coaching throughout the session", "Real-time guidance and feedback", "Practical decision-making and gameplay analysis", "Increased opportunities to build speed and confidence", "Greater exposure to different game situations and challenges"],
    helps: ["Consolidate learning from their current level", "Gain a deeper understanding of concepts and strategies", "Build gameplay speed and efficiency", "Strengthen strategic thinking and decision-making", "Develop consistency and game awareness", "Practise games introduced during training", "Experience a wider variety of gameplay situations", "Build confidence before progressing to the next level", "Become more adaptable and versatile players"]
  } } });

  // 19. Community
  const commPage = await prisma.cmsPage.upsert({ where: { slug: 'community' }, update: { title: 'Community' }, create: { slug: 'community', title: 'Community' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: commPage.id } });
  await prisma.cmsSection.create({ data: { pageId: commPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { title: "Mahjong Success Circle", subtitle: "Mahjong is a game built for four. Our Circles bring players together beyond the classroom — for regular games, shared rituals, and lasting friendships." } } });
  await prisma.cmsSection.create({ data: { pageId: commPage.id, key: 'circle', name: 'What is a Circle', order: 1, content: { 
    title: "What is a Circle?", 
    desc1: "A Circle is a small, regular group of Mahjong players who meet to play, learn, and connect. Unlike a casual game night, a Circle has continuity — the same people, the same table, building something together over time.",
    desc2: "Each Circle is formed from players at a similar level, so the game stays balanced and the conversation stays meaningful. Whether you join an existing Circle or help form a new one, you're stepping into a ready-made community.",
    desc3: "Circles meet regularly — fortnightly or monthly — in a relaxed, social setting. There's no pressure to perform. The goal is simple: show up, play well, and enjoy the company.",
    features: [
      { title: "4 Players", desc: "Every Circle is built around a core group of four — the perfect number for a full, balanced table." },
      { title: "Regular Sessions", desc: "Circles meet on a consistent schedule, giving you a rhythm and something to look forward to each week." },
      { title: "Matched Levels", desc: "Players are grouped by experience so the game stays engaging and the learning stays relevant." },
      { title: "Built to Last", desc: "Circles aren't one-off events. They're ongoing — designed to grow into friendships that extend beyond the table." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: commPage.id, key: 'benefits', name: 'Benefits of Joining', order: 2, content: {
    title: "Benefits of Joining a Circle",
    subtitle: "The classroom teaches you how to play. The Circle is where you truly learn — through repetition, conversation, and the particular magic of a game played with people you know.",
    benefits: [
      { title: "Accelerated Progress", desc: "Nothing improves your game faster than regular play. Circle members develop intuition, speed, and strategy that classroom sessions alone can't replicate." },
      { title: "Real Table Conversation", desc: "You'll start to read players, spot patterns, and discuss decisions after hands. The table becomes a place of genuine strategic exchange." },
      { title: "Consistent Company", desc: "You know who you're playing with. That consistency creates comfort, trust, and eventually — friendship." },
      { title: "A Ritual to Return To", desc: "In a busy life, a regular Circle gives you something to anchor to — a dedicated time, a familiar place, and people who are genuinely glad you're there." },
      { title: "Belonging", desc: "Mahjong has always been a social act. Joining a Circle means becoming part of something with history, inside jokes, and a shared language." },
      { title: "Cultural Connection", desc: "Regular play deepens your appreciation of the game's heritage — the etiquette, the rhythms, and the rituals that make Mahjong unlike any other game." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: commPage.id, key: 'how_it_works', name: 'How It Works', order: 3, content: {
    howItWorks: [
      { label: "Who Can Join", desc: "Circles are open to students who have completed at least Level 1 (Foundation). You need to know the tiles, the rules, and the basics of hand-building — the Circle takes it from there." },
      { label: "Session Format", desc: "Each session runs for approximately 2 to 3 hours. You'll play multiple rounds, discuss strategy between hands, and close with a brief recap of the key moments." },
      { label: "Meeting Frequency", desc: "Most Circles meet fortnightly or monthly, on a day and time agreed by the group. You can join an existing Circle with a matching schedule or help form a new one." },
      { label: "Location", desc: "Sessions are hosted at coffee shops in an informal setting — tiles provided, tea on the table, relaxed comfortable environment." },
      { label: "Group Size", desc: "A full Circle is four players. We sometimes run sessions with a rotating fifth member to allow flexibility and keep the group active when someone can't make it." },
      { label: "Commitment", desc: "There's no lock-in. Circles work best when members attend consistently, but life happens — just let the group know in advance and we'll manage around you." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: commPage.id, key: 'gallery', name: 'Photo Gallery', order: 4, content: {
    images: [
      { src: "/community-social-1.png", alt: "Women of diverse backgrounds smiling and playing mahjong together at a cafe" },
      { src: "/community-social-2.png", alt: "Mixed group enjoying mahjong in an upscale lounge setting" },
      { src: "/community-social-3.png", alt: "Women laughing and celebrating together over a mahjong game" }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: commPage.id, key: 'end_section', name: 'Closing Thoughts', order: 5, content: {
    quote: "\"The best games are played with people who keep coming back.\"",
    desc: "A Circle isn't just about Mahjong — it's about the rhythm of showing up, the pleasure of familiar company, and the quiet satisfaction of a game played well together. Once you find your table, everything else follows.",
    btnLabel: "Join the circle",
    btnLink: "/join-circle"
  } } });
  await prisma.cmsSection.create({ data: { pageId: commPage.id, key: 'cta', name: 'Call to Action', order: 6, content: {
    title: "Ready to Find Your Circle?",
    desc: "Tell us a little about your level and availability. We'll match you with the right group and get you to the table.",
    btn1Label: "Join the circle",
    btn1Link: "/join-circle",
    btn2Label: "Book a Session First",
    btn2Link: "/book-session"
  } } });
  await prisma.cmsSection.create({ data: { pageId: commPage.id, key: 'faq', name: 'Not Ready to Form a Circle?', order: 7, content: {
    title: "Not ready to form a full Circle?",
    q1: "How do I find players?",
    a1: "Our Mahjong Mania socials are the perfect place to meet other players, practise your skills, and eventually form a Circle of your own.",
    q2: "Can I join as an individual?",
    a2: "Yes. Let us know you're looking for a Circle, and we'll help match you with players at a similar level.",
    q3: "What if I need a refresher?",
    a3: "If it's been a while since you last played, we offer refresher sessions to bring you up to speed before you join a Circle."
  } } });

  // 20. Mahjong Mania
  const mmPage = await prisma.cmsPage.upsert({ where: { slug: 'mahjong-mania' }, update: { title: 'Mahjong Mania' }, create: { slug: 'mahjong-mania', title: 'Mahjong Mania' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: mmPage.id } });
  await prisma.cmsSection.create({ data: { pageId: mmPage.id, key: 'hero', name: 'Hero', order: 0, content: { 
    title: "Mahjong Mania",
    subtitle: "A social events and experiences platform dedicated to bringing people together through the joy of Mahjong.",
    desc: "Whether you're looking to meet new players, host a memorable celebration, organise a corporate gathering, or simply enjoy a fun afternoon around the table, Mahjong Mania creates engaging and unforgettable Mahjong experiences for all occasions.",
    btnLabel: "Play. Connect. Celebrate.",
    btn2Label: "Contact us",
    CHARS: ["萬", "筒", "條", "中", "發", "白", "東", "西", "南", "北"],
    HERO_SLIDES: [
      { type: "brand" },
      { type: "event", tag: "UPCOMING EVENT", title: "Mahjong Social Night", subtitle: "An Evening of Tiles, Laughter & Good Company", desc: "Join a relaxed Mahjong session for all skill levels. Play, socialize, meet new friends, and be part of our growing community.", date: "Saturday, 18 July 2026", time: "6:30 PM – 9:30 PM", location: "The Social Club, Singapore", cta: "Attend Our Events" },
      { type: "event", tag: "UPCOMING EVENT", title: "Summer Mahjong Tournament", subtitle: "Compete, Connect & Celebrate", desc: "Compete in our signature summer tournament featuring exciting matches, friendly rivalry, and prizes to be won.", date: "Sunday, 10 August 2026", time: "10:00 AM – 5:00 PM", location: "Grand Ballroom, Marina Bay", cta: "Attend Our Events" }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: mmPage.id, key: 'offerings', name: 'Offerings', order: 1, content: { 
    tag: "WHAT WE OFFER",
    title: "Experiences for Every Occasion",
    ctaTitle: "Ready to Join Us?",
    ctaDesc: "Register your interest for an upcoming event or get in touch to plan something special. We'd love to have you at the table.",
    btnLabel: "Plan Your Event",
    OFFERINGS: [
      { icon: "Users", title: "Mahjong Socials", desc: "Regular social gatherings where players of all skill levels can meet, play, and connect with fellow Mahjong enthusiasts." },
      { icon: "PartyPopper", title: "Private Mahjong Parties", desc: "Celebrate birthdays, anniversaries, family gatherings, and special occasions with a unique Mahjong-themed experience tailored to your guests." },
      { icon: "Plane", title: "Mahjong Offsites", desc: "Organised Mahjong retreats, outings, and special events designed to create memorable experiences beyond the traditional game table." },
      { icon: "Heart", title: "Community Get-Togethers", desc: "Casual and themed Mahjong events that foster friendships, learning, and community engagement." },
      { icon: "Trophy", title: "Tournaments & Competitions", desc: "Structured events for players looking to challenge themselves and test their skills in a fun and supportive atmosphere." }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: mmPage.id, key: 'who_for', name: 'Who is it For?', order: 2, content: { 
    tag: "WHO IS IT FOR?",
    title: "Mahjong Mania is Perfect For...",
    desc: "Our experiences are designed to be inclusive, accessible, and endlessly entertaining. You don't need to be an expert to join the fun.",
    btnLabel: "Plan Your Event",
    MANIA_FOR: ["Complete beginners", "Casual players", "Experienced Mahjong enthusiasts", "Corporate teams", "Community groups", "Families and friends", "Event organisers", "Anyone looking for a unique social experience"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: mmPage.id, key: 'philosophy', name: 'Philosophy', order: 3, content: { 
    quote: "\"Every Mahjong tile tells a story, and every game creates an opportunity to connect.\"",
    desc: "Whether you're celebrating a birthday, hosting a company event, gathering with friends, or joining one of our social sessions, Mahjong Mania brings people together through shared experiences, meaningful conversations, and the timeless enjoyment of Mahjong.",
    btnLabel: "Come for the Mahjong. Stay for the memories."
  } } });
  await prisma.cmsSection.create({ data: { pageId: mmPage.id, key: 'offsites', name: 'Mahjong Offsites', order: 4, content: { 
    title: "Mahjong Offsites",
    subtitle: "Looking for a unique and engaging offsite experience for your team, organisation, community, or private group?",
    desc1: "Our Mahjong Offsites combine strategic thinking, teamwork, social interaction, and friendly competition in a relaxed and enjoyable environment. Whether you're planning a corporate retreat, team-building session, client appreciation event, community gathering, or private group experience, we'll create a customised Mahjong event tailored to your objectives.",
    desc2: "From venue setup and facilitation to gameplay guidance and event management, we take care of every detail so you can focus on connecting, learning, and having fun.",
    btnLabel: "Contact Us Today to Book Your Premium Mahjong Off-Site Event and Create a Truly Memorable Experience"
  } } });
  await prisma.cmsSection.create({ data: { pageId: mmPage.id, key: 'services', name: 'Event Services', order: 5, content: { 
    tag: "EVENT SERVICES",
    title: "How We Can Help",
    desc: "Whether you're hosting a private party or a large corporate gathering, we provide everything needed for a seamless and unforgettable Mahjong experience.",
    btnLabel: "Request a Quote",
    ctaTitle: "Bring Mahjong Mania to Your Next Event",
    ctaDesc: "Contact us today to discuss how we can create a customised Mahjong experience for your guests.",
    ctaBtn1: "Contact Us",
    ctaBtn2: "View Upcoming Events",
    MANIA_SERVICES: ["Organise and manage Mahjong-themed events", "Provide Mahjong tables, mats, and equipment", "Facilitate games and activities", "Host social and corporate gatherings", "Design customised Mahjong experiences", "Coordinate tournaments and competitions", "Create memorable celebrations centred around Mahjong", "Contact Us Today to Discuss and Book Your Customized Mahjong Success Event"]
  } } });

  // 21. Thinking Table
  const ttPage = await prisma.cmsPage.upsert({ where: { slug: 'thinking-table' }, update: { title: 'The Thinking Table' }, create: { slug: 'thinking-table', title: 'The Thinking Table' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: ttPage.id } });
  await prisma.cmsSection.create({ data: { pageId: ttPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { 
    title: "The Thinking Table",
    subtitle: "Building Stronger Teams Through Strategic Play",
    desc: "Empowering organisations to develop sharper thinkers, stronger communicators, and more connected teams through the timeless strategy of Mahjong."
  } } });
  await prisma.cmsSection.create({ data: { pageId: ttPage.id, key: 'gallery', name: 'Photo Gallery', order: 1, content: {
    images: [
      { src: "/mania-formal-group.png", alt: "Business professionals in formal suits playing mahjong together" },
      { src: "/mania-formal-woman.png", alt: "Woman in formal evening wear and man in suit enjoying mahjong at an elegant table" },
      { src: "/mania-formal-mixed.png", alt: "Mixed group in formal business attire laughing around a mahjong table" }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ttPage.id, key: 'benefits', name: 'Key Benefits', order: 2, content: { 
    title: "KEY BENEFITS",
    subtitle: "What Your Organisation Gains",
    btnLabel: "Contact us",
    btnLink: "/contact",
    items: ["Strengthen analytical and critical thinking skills", "Improve strategic decision-making", "Enhance problem-solving abilities", "Encourage teamwork and collaboration", "Build communication and interpersonal skills", "Increase employee engagement and participation", "Support workplace wellbeing and mental agility", "Create memorable team-building experiences", "Foster cross-functional relationships and networking", "Promote a culture of continuous learning"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ttPage.id, key: 'ideal', name: 'Ideal For', order: 3, content: { 
    title: "IDEAL FOR",
    subtitle: "Built for Modern Workplaces",
    btnLabel: "Contact us",
    btnLink: "/contact",
    items: ["HR and People Development teams", "Learning & Development programmes", "Team-building initiatives", "Leadership development workshops", "Employee engagement events", "Corporate retreats and offsites", "Wellness and mental fitness programmes", "Client and stakeholder engagement activities"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ttPage.id, key: 'programmes', name: 'Our Programmes', order: 4, content: {
    title: "OUR PROGRAMMES",
    subtitle: "Let's Build a Programme That Works for Your Team",
    btnLabel: "Contact us",
    btnLink: "/contact",
    items: ["Customised corporate training programmes", "Team-building workshops", "Leadership and management development sessions", "Employee engagement activities", "Corporate offsites and retreats", "Learning & Development initiatives", "Networking and client engagement events", "Bespoke Mahjong-based learning experiences"]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ttPage.id, key: 'approach', name: 'A Different Approach', order: 4, content: {
    title: "A DIFFERENT APPROACH TO LEARNING",
    subtitle: "Experiential, Not Classroom-Based",
    desc1: "Unlike traditional classroom-based training, our programmes use experiential learning to engage participants through strategic play, real-time decision-making, observation, communication, and collaboration.",
    desc2: "The result is a highly engaging experience that participants remember long after the event is over.",
    items: [
      { title: "Strategic Play" },
      { title: "Real-Time Decisions" },
      { title: "Communication" },
      { title: "Collaboration" }
    ]
  } } });
  await prisma.cmsSection.create({ data: { pageId: ttPage.id, key: 'why_choose', name: 'Why Choose Us', order: 5, content: {
    title: "WHY HR & L&D PROFESSIONALS CHOOSE US",
    subtitle: "A Smarter Way to Develop People",
    desc1: "In today's workplace, organisations are looking for innovative ways to develop people, strengthen teams, and improve employee engagement. Our strategic Mahjong-based learning experiences provide a unique alternative to traditional training programmes by combining learning, collaboration, and fun in a highly interactive environment.",
    desc2: "Designed for Human Resources, Learning & Development, Employee Engagement, and Corporate Wellness teams, these programmes help participants develop valuable workplace skills while fostering stronger relationships across teams.",
    btnLabel: "Contact us",
    btnLink: "/contact"
  } } });
  await prisma.cmsSection.create({ data: { pageId: ttPage.id, key: 'cta', name: 'Call to Action', order: 6, content: {
    title: "Ready to Transform Your Team?",
    desc: "We design customised experiences tailored to your organisation's goals — adaptable to different team sizes, learning objectives, and event formats.",
    btnLabel: "Contact us",
    btnLink: "/contact"
  } } });


  // 22. Premium Experiences
  const pePage = await prisma.cmsPage.upsert({ where: { slug: 'premium-experiences' }, update: { title: 'Premium Experiences' }, create: { slug: 'premium-experiences', title: 'Premium Experiences' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: pePage.id } });
  await prisma.cmsSection.create({ data: { pageId: pePage.id, key: 'hero', name: 'Hero Section', order: 0, content: { 
    badge: "Exclusive to Mahjong Success",
    title: "Premium Mahjong Experiences",
    subtitle: "Your Venue. Your Schedule. Your Mahjong Success.",
    desc: "We understand that not everyone can learn or play according to a fixed schedule or location. That's why we offer flexible premium options that bring Mahjong directly to you.",
    btnLabel: "Book a Premium Experience",
    btnLink: "/book-session"
  } } });
  await prisma.cmsSection.create({ data: { pageId: pePage.id, key: 'intro', name: 'Intro Section', order: 1, content: { 
    desc1: "Whether you prefer a tutor at your home or community venue, or would like to arrange a private training or guided play session at a time that suits your group, our Premium Mahjong Experiences are designed around your convenience.",
    desc2: "Ideal for families, friends, community groups, corporate teams, and private gatherings — these customised experiences provide the flexibility to learn, practise, and enjoy Mahjong in a setting that works best for you."
  } } });
  await prisma.cmsSection.create({ data: { pageId: pePage.id, key: 'tutor', name: 'Travelling Tutor', order: 2, content: { 
    badge: "Option 1",
    title: "The Travelling Tutor",
    subtitle: "We Bring Mahjong to You",
    desc: "A Mahjong Success trainer travels to your home, office, community centre, or chosen venue to conduct private lessons or guided game sessions for your group.",
    items: ["Private lessons", "Families learning together", "Small groups of friends", "Community groups", "Corporate sessions", "Students who prefer personalised instruction"],
    btnLabel: "Enquire About a Travelling Tutor",
    btnLink: "/contact",
    pricingTitle: "Additional Investment",
    pricingAmount: "AED 100",
    pricingUnit: "per person",
    pricingDesc: "Added to the standard programme fee. Covers tutor travel time, transportation, and the convenience of on-site instruction.",
    pricingNote: "Minimum 4 players required"
  } } });
  await prisma.cmsSection.create({ data: { pageId: pePage.id, key: 'convenience', name: 'Premium Convenience', order: 3, content: { 
    badge: "Option 2",
    title: "Premium Convenience",
    subtitle: "Exclusive Sessions on Your Schedule",
    desc: "We set up a private training or guided game session exclusively for your group at our venue, scheduled at a time that fits your group's availability.",
    items: ["Private training sessions", "Guided game sessions", "Family sessions", "Community gatherings", "Private play groups", "Groups with schedules that do not fit the regular timetable"],
    btnLabel: "Enquire About Premium Convenience",
    btnLink: "/contact",
    pricingTitle: "Additional Investment",
    pricingAmount: "AED 100",
    pricingUnit: "per person",
    pricingDesc: "Added to the standard programme or guided play fee. Provides greater flexibility, personalised attention, and the convenience of learning or playing at a time that works best for you and your group.",
    pricingNote: "Minimum 4 players required"
  } } });

  // 23. Contact
  const contactPage = await prisma.cmsPage.upsert({ where: { slug: 'contact' }, update: { title: 'Contact' }, create: { slug: 'contact', title: 'Contact' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: contactPage.id } });
  await prisma.cmsSection.create({ data: { pageId: contactPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { 
    tag: "Get in Touch",
    title: "Contact Us",
    desc: "We're here to help with any enquiry."
  } } });
  await prisma.cmsSection.create({ data: { pageId: contactPage.id, key: 'success', name: 'Success Message', order: 1, content: { 
    title: "Message Sent!",
    desc: "Your email client has been opened with your message pre-filled. A member of the Mahjong Success team will be in touch shortly.",
    btnLabel: "Back to Home",
    btnLabel2: "Send Another"
  } } });
  await prisma.cmsSection.create({ data: { pageId: contactPage.id, key: 'form', name: 'Form Configuration', order: 2, content: { 
    title: "How Can We Assist You?",
    desc: "Whether you're looking to learn Mahjong, join a social event, organise a corporate session, explore our programmes, or simply learn more about Mahjong Success, we're happy to assist.",
    faqPrefix: "Before contacting us, we recommend visiting our",
    faqLink: "Frequently Asked Questions (FAQs) page",
    faqSuffix: ". Many of the questions we receive are already answered there.",
    noQuestionStr: "If your question isn't covered, please feel free to get in touch. Simply select the subject that best matches your enquiry and send us your message.",
    lookForwardStr: "We look forward to hearing from you and helping you on your Mahjong journey.",
    email: "info@mahjongsuccess.com",
    tagline: "Learn. Play. Succeed.",
    formTitle: "Send Us a Message",
    enquiryStr: "Your Enquiry",
    selectSubject: "Select a subject\u2026",
    sendBtn: "Send Message",
    SUBJECTS: ["General Enquiry", "Mahjong Training Programmes", "Guided Games", "Fast Track Packages", "Mahjong Mania (Social Events)", "The Thinking Table (Corporate Events)", "Premium Mahjong Experiences", "Partnerships & Collaborations", "Other"]
  } } });

  // 24. Why Mahjong Success
  const wmsPage2 = await prisma.cmsPage.upsert({ where: { slug: 'why-mahjong-success' }, update: { title: 'Why Mahjong Success' }, create: { slug: 'why-mahjong-success', title: 'Why Mahjong Success' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: wmsPage2.id } });
  // Hero Section
  await prisma.cmsSection.create({ data: { pageId: wmsPage2.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: 'Why Mahjong Success?', title: 'Building Better Players, One Tile at a Time', subtitle: 'At Mahjong Success, we believe that learning Mahjong should be structured, enjoyable, and rewarding.' } } });
  
  // Structured Path Section
  await prisma.cmsSection.create({ data: { pageId: wmsPage2.id, key: 'structured_path', name: 'Structured Path', order: 1, content: { 
    tag: "01 — A Structured Path to Success",
    title: "Every Level Builds on the Last",
    desc1: "Our progressive learning pathway takes you step by step from the fundamentals to advanced gameplay, ensuring that every new skill builds naturally on the one before it.",
    desc2: "Rather than overwhelming players with complex rules and strategies from the start, we focus on helping you develop confidence, understanding, and practical experience at every stage of your Mahjong journey. Each level introduces new concepts, techniques, and challenges designed to strengthen your skills and deepen your appreciation of the game.",
    desc3: "As you progress through the programme, you'll learn to think more strategically, adapt to different game situations, build stronger hands, understand scoring, and become a more confident and versatile player.",
    desc4: "Each level at Mahjong Success is carefully designed to help you grow, improve, and achieve success one step at a time.",
    cards: [
      { image: "/why-structured-path.jpg", title: "A Structured Path to Success", desc: "Follow a progressive learning journey designed to help you build confidence, skills, and understanding one level at a time.", anchor: "structured-path" },
      { image: "/why-guided-instruction.jpg", title: "Learn Through Guided Instruction", desc: "Learn from experienced trainers through structured lessons covering multiple Mahjong variants, strategies, and gameplay techniques.", anchor: "guided-instruction" },
      { image: "/why-guided-play.jpg", title: "Guided Play & Guided Games", desc: "Reinforce your learning through coached gameplay sessions where trainers help you apply concepts, improve strategy, and build confidence at the table.", anchor: "guided-play" },
      { image: "/why-convenience.jpg", title: "Learn at Your Convenience", desc: "Enjoy flexible learning with travelling instructors who can conduct lessons at your home, office, community space, or preferred venue.", anchor: "convenience" },
      { image: "/why-variety.jpg", title: "Experience a Variety of Mahjong Games", desc: "Explore multiple Mahjong formats and game variations that develop adaptability, strategic thinking, and a deeper understanding of the game.", anchor: "variety" },
      { image: "/why-community.jpg", title: "Join the Mahjong Success Community", desc: "Become part of a friendly and supportive community that meets regularly to learn, play, network, and grow together.", anchor: "community" },
      { image: "/why-events.jpg", title: "Exclusive Events, Socials & Tournaments", desc: "Participate in Mahjong socials, tournaments, meetups, matches, and community events designed to enhance your playing experience.", anchor: "events" },
      { image: "/why-mind.jpg", title: "Strengthen Your Mind & Enrich Your Life", desc: "Mahjong helps improve memory, concentration, strategic thinking, decision-making, and social connection while supporting lifelong mental engagement.", anchor: "mind" }
    ]
  } } });
  
  // Guided Instruction Section
  await prisma.cmsSection.create({ data: { pageId: wmsPage2.id, key: 'guided_instruction', name: 'Guided Instruction', order: 2, content: { 
    tag: "02 — Learn Through Guided Instruction",
    title: "Learn It. Play It. Master It.",
    desc1: "At Mahjong Success, learning doesn't stop with understanding the rules. We believe the best way to improve is through a combination of structured instruction and guided gameplay.",
    desc2: "Benefit from expert-led classes, personalised guidance, and practical learning experiences designed to accelerate your progress. Whether through group sessions or one-to-one coaching, you'll receive the support needed to understand the game, improve your strategy, and play with confidence.",
    cardTitle: "Guided Instruction",
    cardDesc: "Learn the fundamentals, strategies, techniques, scoring systems, and Mahjong variants through structured lessons designed to build knowledge progressively.",
    variantsTitle: "Mahjong Variants We Teach",
    variantsDesc: "By learning different Mahjong variants, you'll gain a deeper understanding of the game, discover new strategic approaches, and develop the confidence to play in a wide range of Mahjong environments.",
    variants: ["National Mahjong League", "International Goulash", "Taiwanese", "Partnership Mahjong", "Speciality and Custom Mahjong Formats"]
  } } });
  
  // Guided Play Section
  await prisma.cmsSection.create({ data: { pageId: wmsPage2.id, key: 'guided_play', name: 'Guided Play', order: 3, content: { 
    tag: "03 — Guided Play Sessions",
    title: "Knowledge Becomes Skill Through Practice",
    desc: "Our expert-led guided play sessions allow players to participate in real games while receiving coaching, feedback, and strategic insights throughout the session.",
    cardTitle: "Guided Play Sessions",
    cardDesc: "Knowledge becomes skill through practice. These small-group sessions provide opportunities to apply what you've learned in a real-game environment with tutor support throughout.",
    bulletsTitle: "These sessions provide opportunities to",
    benefits: ["Apply what you've learned in a real-game environment", "Learn new games and Mahjong variants through play", "Improve strategic decision-making", "Receive guidance from experienced instructors", "Learn from other players at the table", "Build confidence and game awareness", "Develop stronger gameplay habits", "Gain practical experience in a supportive setting"],
    note: "Guided play bridges the gap between learning and mastery, helping players become more confident, capable, and successful at the table."
  } } });
  
  // Convenience Section
  await prisma.cmsSection.create({ data: { pageId: wmsPage2.id, key: 'convenience', name: 'Convenience', order: 4, content: { 
    tag: "04 — We Bring Mahjong to You",
    title: "Learning on Your Terms",
    desc1: "Our travelling instructors can conduct lessons at your home, office, community space, or preferred venue, allowing you to learn in a comfortable and familiar environment.",
    desc2: "Whether you're looking for one-to-one coaching, private group lessons, family learning sessions, or customised training for friends and colleagues, we can tailor the experience to suit your schedule, location, and learning goals.",
    desc3: "Enjoy the flexibility of learning Mahjong where and when it works best for you.",
    idealTitle: "Ideal For",
    ideal: ["Busy professionals", "Families and friends learning together", "Private groups", "Community groups", "Corporate teams", "Students seeking personalised coaching"]
  } } });
  
  // Variety Section
  await prisma.cmsSection.create({ data: { pageId: wmsPage2.id, key: 'variety', name: 'Variety', order: 5, content: { 
    tag: "05 — Experience a Variety of Mahjong Games",
    title: "More Games. More Strategies. More Growth.",
    desc1: "At each level, students are introduced to a carefully selected range of Mahjong games and formats designed to expand their thinking, challenge their decision-making, and develop new strategic skills. Rather than repeatedly playing the same game, you'll experience a variety of Mahjong styles — each with its own unique rules, objectives, and strategic considerations. Each level typically includes five or more game variations.",
    desc2: "By learning through a variety of games, players remain engaged, challenged, and continuously growing throughout their Mahjong journey.",
    benefits: ["Explore different styles of play", "Develop new strategic approaches", "Strengthen analytical thinking", "Improve problem-solving skills", "Adapt to changing game situations", "Discover the Mahjong formats they enjoy most"]
  } } });
  
  // Community Section
  await prisma.cmsSection.create({ data: { pageId: wmsPage2.id, key: 'community', name: 'Community', order: 6, content: { features: ["Weekly Mahjong gatherings and social play sessions", "Opportunities to practise and improve your skills", "A supportive and welcoming learning environment", "Meet fellow Mahjong enthusiasts and build lasting friendships", "Learn from players with different experiences and playing styles", "Access to community events and special gatherings"] } } });
  // Results Section
  await prisma.cmsSection.create({ data: { pageId: wmsPage2.id, key: 'results', name: 'Results', order: 7, content: { summary: "Because better training makes better players." } } });
  // Events Section
  await prisma.cmsSection.create({ data: { pageId: wmsPage2.id, key: 'events', name: 'Events', order: 8, content: { benefits: ["Mahjong social and networking opportunities", "Friendly matches and practice games", "Organised tournaments and competitions", "Mahjong meetups and community gatherings", "Mahjong-themed events", "Mahjong offsites and retreats"] } } });
  // Mind Section
  await prisma.cmsSection.create({ data: { pageId: wmsPage2.id, key: 'mind', name: 'Mind', order: 9, content: { benefits: ["Improve concentration and focus", "Strengthen memory and recall", "Enhance analytical and strategic thinking", "Develop problem-solving abilities", "Improve decision-making skills", "Promote adaptability and mental agility", "Encourage patience and discipline", "Support lifelong learning and cognitive wellbeing", "Foster meaningful social connections", "Build confidence and resilience"] } } });
  // CTA Section
  await prisma.cmsSection.create({ data: { pageId: wmsPage2.id, key: 'cta', name: 'Closing CTA', order: 10, content: { title: 'Start Your Journey to Mahjong Success', subtitle: 'Contact us today and discover how you can Master Mahjong One Tile at a Time.', btnLabel: 'Book a Session' } } });

  // 25. Founder
  const founderPage = await prisma.cmsPage.upsert({ where: { slug: 'founder' }, update: { title: 'Founder' }, create: { slug: 'founder', title: 'Founder' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: founderPage.id } });
  await prisma.cmsSection.create({ data: { pageId: founderPage.id, key: 'story', name: 'The Story Section', order: 1, content: { title: "The Story", subtitle: "From Corporate Leadership to Social Community Building", storyTimeline: [ { year: "1999 - 2024", title: "Corporate Leadership", desc: "Hashmat built a successful career in corporate leadership..." }, { year: "2015", title: "A New Passion Discovered", desc: "Introduced to the game of Mahjong..." }, { year: "2024", title: "Mahjong Success Founded", desc: "Recognising the lack of structured training..." } ] } } });

  // 26. International Points Calculator
  const ipcPage = await prisma.cmsPage.upsert({ where: { slug: 'international-points-calculator' }, update: { title: 'International Goulash Points Calculator' }, create: { slug: 'international-points-calculator', title: 'International Goulash Points Calculator' } });
  await prisma.cmsSection.deleteMany({ where: { pageId: ipcPage.id } });
  await prisma.cmsSection.create({ data: { pageId: ipcPage.id, key: 'hero', name: 'Hero Section', order: 0, content: { badge: "International Goulash", title: "Points Calculator", subtitle: "Score with Confidence. Play with Precision.", desc: "Calculate your International Goulash score instantly." } } });


  const allPages = await prisma.cmsPage.findMany({ include: { sections: { orderBy: { id: 'asc' } } } });
  for (const page of allPages) {
    for (let idx = 0; idx < page.sections.length; idx++) {
      await prisma.cmsSection.update({
        where: { id: page.sections[idx].id },
        data: { order: idx }
      });
    }
  }

  console.log("Seeded all 24 CMS pages with clean structured sections!");
}

seedAll().catch(console.error).finally(() => prisma.$disconnect());
