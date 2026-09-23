import { PrismaClient } from '@prisma/client';

export async function seedFastTrackSplitPages(prisma: PrismaClient) {
  console.log('Seeding 4 Fast-Track Split Pages for CMS...');

  const INTERNATIONAL_BUNDLES = [
    {
      id: "launchpad",
      emoji: "🚀",
      title: "Mahjong Success Launchpad",
      subtitle: "Foundation with Strategy",
      tagline: "The quickest path from beginner to player.",
      body: "The Mahjong Success Launchpad combines Level 1 – Foundation and Level 2 – Joker Strategy into one comprehensive learning bundle, giving players the essential knowledge, skills, and confidence needed to begin their Mahjong journey successfully.\n\nLearn the tiles, suits, winds, dragons, jokers, hand-building fundamentals, winning conditions, and the strategic use of jokers to improve decision-making and gameplay.",
      includes: [
        "Level 1 – Foundation (AED 400)",
        "Level 2 – Joker Strategy (AED 200)",
      ],
      regularPrice: "AED 600",
      bundlePrice: "AED 500",
      saving: "Save AED 100",
      pricingNote: null,
      perfectFor: [
        "Complete beginners",
        "New Mahjong players",
        "Casual players looking for structured learning",
        "Players returning to Mahjong",
        "Anyone wanting a strong foundation and strategic understanding",
      ],
      outcome: "By the end of the Launchpad Bundle, players will confidently understand the Mahjong tiles, hand-building principles, winning conditions, and joker strategies, providing a strong foundation for future progression through the Mahjong Success pathway.",
      cta: "Learn. Think. Succeed.",
    },
    {
      id: "masterclass",
      emoji: "🀄",
      title: "Mahjong Success Masterclass",
      subtitle: "Advance Hands",
      tagline: "Take your Mahjong skills beyond the basics.",
      body: "The Hand Mastery Series helps players develop advanced hand-building techniques, improve decision-making, and gain the confidence needed to recognise and pursue a wider range of winning opportunities.\n\nThe series is delivered through four specialised hand-building modules, allowing players to focus on the hand types they wish to learn, strengthen, and master.",
      includes: [
        "Module 1 – Crochet Hands",
        "Module 2 – Chows & Mixed Chows",
        "Module 3 – Dragons & Winds Hands",
        "Module 4 – Advanced Kongs Play",
        "Module 5 – Concealed Hands",
      ],
      regularPrice: "AED 650",
      bundlePrice: "AED 500",
      saving: "Save AED 150",
      pricingNote: "Individual Module: AED 125 each",
      perfectFor: [
        "Players who have completed the Launchpad Bundle or have a strong foundation",
        "Players looking to expand their hand-building knowledge",
        "Players who want to improve strategic thinking and decision-making",
        "Players seeking greater confidence in recognising winning opportunities",
        "Players looking to become more adaptable and versatile at the table",
      ],
      outcome: "By the end of this bundle, players will have a deeper understanding of advanced hand construction, stronger strategic awareness, and greater confidence in building and adapting hands during gameplay.",
      cta: "Construct. Strategise. Succeed.",
    },
    {
      id: "partnership",
      emoji: "🤝",
      title: "Mahjong Success Partnership Discount",
      subtitle: "Learn Together. Play Together. Succeed Together.",
      tagline: "Master the art of partnership Mahjong.",
      body: "The Mahjong Success Partnership Bundle is designed for players who want to master the art of partnership Mahjong. Learn how to play effectively with a partner, understand partnership dynamics, develop coordinated strategies, and maximise opportunities through teamwork and communication at the Mahjong table.",
      includes: [
        "Understanding Partnership Mahjong",
        "Roles and Responsibilities in Partnership Play",
        "Partnership Strategies and Tactics",
        "Communication and Table Awareness",
        "Coordinated Decision-Making",
        "Supporting Your Partner's Game",
        "Recognising Team Opportunities",
        "Guided Partnership Gameplay",
      ],
      regularPrice: "AED 500",
      bundlePrice: "AED 400",
      saving: "Save AED 100",
      pricingNote: "Bring a Partner & Save — 4 players: AED 400 (AED 100 per person)",
      perfectFor: [
        "Existing Mahjong players",
        "Couples and spouses",
        "Family members",
        "Friends who play together",
        "Regular Mahjong partners",
        "Players preparing for partnership games and tournaments",
      ],
      outcome: "By the end of this bundle, players will understand the principles of partnership Mahjong, develop stronger teamwork and communication skills, and gain the confidence to play strategically and effectively with a partner.",
      cta: "Learn Together. Play Together. Succeed Together.",
    },
    {
      id: "concealed",
      emoji: "🎭",
      title: "Mahjong Success Concealed Hands Offer",
      subtitle: "Patience. Precision. Mastery.",
      tagline: "Concealed Hands — among the most rewarding aspects of Mahjong.",
      body: "This specialised programme helps players develop the discipline, strategic thinking, and game awareness required to successfully build and complete concealed hands while maximising scoring opportunities.\n\nBring a partner and enjoy a special bundled rate while learning together.",
      includes: [
        "Individual Registration: AED 200 per person",
        "2-Player Bundle: AED 300 (AED 50 savings per person)",
      ],
      regularPrice: "AED 400",
      bundlePrice: "AED 300",
      saving: "Save AED 100",
      pricingNote: "Bring a spouse, family member, friend, or regular Mahjong partner and save",
      perfectFor: [
        "Players who have completed previous Mahjong Success levels",
        "Players looking to strengthen advanced gameplay skills",
        "Players seeking to improve patience, discipline, and strategic thinking",
        "Players wanting to maximise scoring opportunities",
        "Players preparing for higher-level Mahjong play",
      ],
      outcome: "By the end of this programme, players will understand the principles and strategies behind concealed hands, recognise opportunities more effectively, and develop the confidence to pursue and complete concealed hands successfully.",
      cta: "Think Deeper. Play Smarter. Succeed.",
    },
    {
      id: "guided-bundle",
      emoji: "🀄",
      title: "Guided Games Bundle",
      subtitle: "Practice. Play. Progress.",
      tagline: "Put your learning into practice through tutor-led gameplay.",
      body: "Guided Games are designed to help players put their learning into practice through tutor-led gameplay. Build confidence, strengthen strategy, improve decision-making, and gain practical experience with expert guidance at the table.\n\nThis package provides twice the gameplay experience, allowing players to build speed, improve strategic thinking, gain confidence, and apply their learning across a wider range of game situations.",
      includes: [
        "2 Hours of Guided Play",
        "4 Guided Games",
        "Expert Tutor Guidance Throughout",
      ],
      regularPrice: "AED 250",
      bundlePrice: "AED 200",
      saving: "Save AED 50",
      pricingNote: "Regular Price: AED 250 per person (2 × AED 125 per hour)",
      perfectFor: [
        "Players who have completed a Mahjong Success training level",
        "Players looking to strengthen concepts through practice",
        "Players wanting to build speed and confidence",
        "Players preparing for progression to the next training level",
        "Players seeking more guided gameplay experience",
      ],
      outcome: "By the end of the Guided Games Bundle, players will have greater confidence, improved game awareness, stronger strategic thinking, and practical experience applying Mahjong concepts in real gameplay situations.",
      cta: "Practice. Play. Progress. Succeed.",
    },
  ];

  const AMERICAN_BUNDLES = [
    {
      id: "american-launchpad",
      emoji: "🇺🇸",
      title: "Mahjong Success Launchpad",
      subtitle: "Foundation to Strategy",
      tagline: "The quickest path from beginner to player.",
      body: "The Mahjong Success Launchpad combines Level 1 – Foundation and Level 2 – Joker Strategy into one comprehensive learning bundle, giving players the essential knowledge, skills, and confidence needed to begin their Mahjong journey successfully.\n\nLearn the tiles, suits, winds, dragons, jokers, hand-building fundamentals, winning conditions, and the strategic use of jokers to improve decision-making and gameplay.",
      includes: [
        "Level 1 – Foundation (AED 400)",
        "Level 2 – Joker Strategy (AED 200)",
      ],
      regularPrice: "AED 600",
      bundlePrice: "AED 500",
      saving: "Save AED 100",
      pricingNote: "3 hours",
      perfectFor: [
        "Complete beginners",
        "New Mahjong players",
        "Casual players looking for structured learning",
        "Players returning to Mahjong",
        "Anyone wanting a strong foundation and strategic understanding",
      ],
      outcome: "By the end of the Launchpad Bundle, players will confidently understand the Mahjong tiles, hand-building principles, winning conditions, and joker strategies, providing a strong foundation for future progression through the Mahjong Success pathway.",
      cta: "Learn. Think. Succeed.",
    },
    {
      id: "american-advanced-mastery",
      emoji: "🃏",
      title: "American Mahjong Mastery",
      subtitle: "Advance Hands Mastery",
      tagline: "Take your American Mahjong skills to the next level with our Advanced Hand Mastery Fast Track Bundle.",
      body: "Choose any two Advanced Hand Mastery modules and complete them together in one extended Masterclass. This fast-track option allows you to learn a wider range of hands, recognise more patterns, and develop stronger strategic thinking in a single, immersive session.",
      modules: [
        "Even Hands",
        "Odd Hands",
        "Consecutive Runs",
        "Singles & Pairs",
        "Quints",
        "Any Like Numbers",
        "3–6–9 Hands",
        "Winds & Dragons",
      ],
      includes: [
        "Understanding hand structures and patterns",
        "Block and chunk recognition",
        "Line selection and pivoting strategies",
        "Charleston decision-making",
        "Joker strategy",
        "Offensive and defensive play",
        "Guided practice and hand analysis",
      ],
      regularPrice: "AED 400",
      bundlePrice: "AED 300",
      saving: "Save AED 100",
      pricingNote: "Individual Module: AED 200 per person, 1 hour",
      perfectFor: [
        "Players who want to accelerate their learning, build confidence across multiple hand categories, and progress more quickly through the Mahjong Success Advanced Hand Mastery Programme.",
      ],
      outcome: "By the end of this bundle, players will have a deeper understanding of multiple advanced hand categories, stronger pattern recognition, and the strategic confidence to tackle a wider range of American Mahjong hands.",
      cta: "Master. Accelerate. Succeed.",
    },
  ];

  const WESTERN_BUNDLES = [
    {
      id: "western-classic",
      emoji: "🌍",
      title: "Mahjong Success Launchpad",
      subtitle: "Half Limit, Limit, Middle Limit, Double Limit",
      tagline: "Learn the classic rules that bridge Eastern and Western play.",
      body: "The Western Mahjong Classic Bundle teaches the traditional Western rules that have made this variant popular across Europe and beyond.\n\nUnderstand scoring with the Babcock system, honour the classical hand types, and learn the etiquette that defines Western Mahjong culture.",
      includes: [
        "Level 1 – Western Rules Fundamentals (AED 400)",
        "Level 2 – Scoring & Etiquette (AED 200)",
      ],
      regularPrice: "AED 600",
      bundlePrice: "AED 500",
      saving: "Save AED 100",
      pricingNote: null,
      perfectFor: [
        "Complete beginners to Western Mahjong",
        "Players transitioning from other variants",
        "Social club members",
        "Anyone interested in classical Mahjong traditions",
      ],
      outcome: "By the end of this bundle, players will understand Western scoring, observe proper etiquette, build classical hands, and participate confidently in Western Mahjong games.",
      cta: "Honour Tradition. Master Western.",
    },
    {
      id: "western-tournament",
      emoji: "🏆",
      title: "Western Mahjong Mastery",
      subtitle: "Learn the widest range of winning hands",
      tagline: "Prepare for competitive Western Mahjong at any level.",
      body: "The Western Mahjong Tournament Bundle equips players with the skills, speed, and strategic depth needed for tournament play.\n\nFocus on timed play, advanced scoring combinations, and the mental discipline required for competitive Western Mahjong.",
      includes: [
        "Module 1 – Tournament Rules & Timing",
        "Module 2 – Advanced Scoring Combinations",
        "Module 3 – Competitive Strategy & Psychology",
      ],
      regularPrice: "AED 450",
      bundlePrice: "AED 375",
      saving: "Save AED 75",
      pricingNote: "Individual Module: AED 150 each",
      perfectFor: [
        "Experienced Western Mahjong players",
        "Tournament newcomers",
        "Club champions seeking higher competition",
        "Players who thrive under timed conditions",
      ],
      outcome: "By the end of this bundle, players will compete confidently in tournaments, calculate complex scores rapidly, manage time under pressure, and execute advanced competitive strategies.",
      cta: "Compete. Conquer. Celebrate.",
    },
  ];

  const TAIWANESE_BUNDLES = [
    {
      id: "taiwanese-masterclass",
      emoji: "🇹🇼",
      title: "Mahjong Success Launchpad",
      subtitle: "Foundation with Strategy",
      tagline: "Fast-track your Taiwanese Mahjong journey with this complete 3-level bundle designed to take players from the basics to confident, strategic, and accurate play.",
      body: "This bundle includes Level 1 Foundation, Level 2 Advanced Hands, and Level 3 Scoring. Players begin by learning the tiles, suits, honours, flowers, table flow, melds, calling, discarding, winning hands, and Mahjong etiquette. They then progress to advanced hand-building, including Brother and Sister Sheungs, Uncle and Sister Pongs, Step Up Hands, Terminal Hands, Jewel Hands, and other higher-scoring combinations. The final level focuses on scoring, bonuses, penalties, special hands, dealer bonuses, self-draw wins, dice-on-the-wall, false Mahjong, chasing tiles, and common scoring mistakes.",
      includes: [
        "Level 1: Foundation – Beginner Taiwanese Mahjong",
        "Level 2: Advanced Hands – High-scoring winning combinations",
        "Level 3: Scoring – Scoring, bonuses, and penalties",
      ],
      individualPricing: [
        "Level 1 Foundation: AED 400",
        "Level 2 Advanced Hands: AED 400",
        "Level 3 Scoring: AED 400",
        "Total individual value: AED 1,200",
      ],
      courseDuration: [
        "Each level is a 3-hour session",
        "Total duration: 9 hours",
      ],
      regularPrice: "AED 1,200",
      bundlePrice: "AED 1,000",
      saving: "Save AED 200",
      pricingNote: null,
      outcome: "By the end of the Taiwanese Mahjong Masterclass Bundle, players will have a complete understanding of Taiwanese Mahjong from foundation to advanced play. They will be able to play with confidence, build stronger winning hands, recognise high-scoring opportunities, calculate scores accurately, apply bonuses correctly, and avoid common penalties at the table.",
      cta: "Learn. Master. Win.",
    },
    {
      id: "taiwanese-advanced-hands",
      emoji: "🎯",
      title: "Taiwanese Mahjong Mastery",
      subtitle: "Special Focus Sessions for Higher-Scoring Mahjong Hands",
      tagline: "The Advanced Hands Bundle is designed for players who already understand the basics of Taiwanese Mahjong and want to strengthen their hand-building skills. These focused sessions help players learn, recognise, and confidently build special higher-scoring winning combinations.",
      body: "Each session focuses on a specific advanced hand pattern, with clear examples, practical guidance, and table-based understanding so players can apply the hands during real play.\n\nThese hands build on the Advanced Hands course content, including Step Up Hands, Uncle and Sister Pong Hands, Terminal Hands, Jewel Hands, and hands in pairs.",
      modules: [
        "All Step-Up Hand",
        "All Neighbour / Uncle Pong Hand",
        "Hands with Pairs",
        "Jewel Hands",
        "Terminal Hands",
        "Advanced Hand Combinations and Related Winning Patterns",
      ],
      modulesTitle: "Advanced Hands Covered",
      includes: [
        "Session Duration: 1.5 hours per hand",
        "Individual Hand Price: AED 150 per hand",
      ],
      savingsDetails: [
        "Regular price for 2 hands: AED 300",
        "Bundle price: AED 200",
        "You save: AED 100",
      ],
      regularPrice: "AED 300",
      bundlePrice: "AED 200",
      saving: "Save AED 100",
      pricingNote: "Learn any 2 advanced hands for only AED 200",
      outcome: "By the end of each session, players will understand the structure of the selected advanced hand, recognise the tiles and melds required, and learn how to plan their game towards completing that hand. These sessions help players move beyond basic winning combinations and start aiming for stronger, more rewarding Mahjong hands.",
      cta: "Think. Learn. Apply.",
    },
  ];

  const PAGES = [
    {
      slug: 'fast-track-international-goulash',
      title: 'Fast-Track: International Goulash',
      metaTitle: 'International Goulash Fast-Track Bundles | Mahjong Success',
      metaDescription: 'Accelerate your International Goulash journey. Bundled learning packages from foundation to joker strategy and advanced hand mastery.',
      hero: {
        subtitle: 'MAHJONG SUCCESS',
        title: 'International Goulash Fast-Track Bundles',
        description: 'Accelerate your journey to International Goulash Mahjong Success. Bundled learning pathways and packages that combine multiple training levels into a structured programme — for players ready to progress faster.',
        btnLabel: 'Book a Bundle Session',
        btnLink: '/book-session?game=International%20Goulash',
      },
      bundles: INTERNATIONAL_BUNDLES,
      cta: {
        tag: 'Ready to Progress Faster?',
        title: 'Choose Your International Goulash Bundle and Begin',
        description: 'All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience — then choose your bundle on the booking screen.',
        btnLabel: 'Book a Session',
        btnLink: '/book-session?game=International%20Goulash',
      },
    },
    {
      slug: 'fast-track-american-mahjong',
      title: 'Fast-Track: American Mahjong',
      metaTitle: 'American Mahjong Fast-Track Bundles | Mahjong Success',
      metaDescription: 'Fast-track your American Mahjong NMJL journey. Structured packages covering card understanding, Charleston strategy, and advanced mastery.',
      hero: {
        subtitle: 'MAHJONG SUCCESS',
        title: 'American Mahjong Fast-Track Bundles',
        description: 'Accelerate your journey to American Mahjong Success. Bundled learning pathways designed for players ready to master NMJL rules, pattern recognition, and advanced gameplay.',
        btnLabel: 'Book a Bundle Session',
        btnLink: '/book-session?game=American%20Mahjong',
      },
      bundles: AMERICAN_BUNDLES,
      cta: {
        tag: 'Ready to Progress Faster?',
        title: 'Choose Your American Mahjong Bundle and Begin',
        description: 'All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience — then choose your bundle on the booking screen.',
        btnLabel: 'Book a Session',
        btnLink: '/book-session?game=American%20Mahjong',
      },
    },
    {
      slug: 'fast-track-western-mahjong',
      title: 'Fast-Track: Western Mahjong',
      metaTitle: 'Western Mahjong Fast-Track Bundles | Mahjong Success',
      metaDescription: 'Master Western Mahjong with structured fast-track bundles. Traditional rules, Babcock scoring, and tournament competitive play.',
      hero: {
        subtitle: 'MAHJONG SUCCESS',
        title: 'Western Mahjong Fast-Track Bundles',
        description: 'Accelerate your journey to Western Mahjong Success. Classical rules, traditional scoring, and tournament preparation combined into structured learning packages.',
        btnLabel: 'Book a Bundle Session',
        btnLink: '/book-session?game=Western%20Mahjong',
      },
      bundles: WESTERN_BUNDLES,
      cta: {
        tag: 'Ready to Progress Faster?',
        title: 'Choose Your Western Mahjong Bundle and Begin',
        description: 'All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience — then choose your bundle on the booking screen.',
        btnLabel: 'Book a Session',
        btnLink: '/book-session?game=Western%20Mahjong',
      },
    },
    {
      slug: 'fast-track-taiwanese-mahjong',
      title: 'Fast-Track: Taiwanese Mahjong',
      metaTitle: 'Taiwanese Mahjong Fast-Track Bundles | Mahjong Success',
      metaDescription: 'Fast-track your Taiwanese Mahjong journey with our 16-tile masterclass and advanced hands bundles designed for rapid, confident progression.',
      hero: {
        subtitle: 'MAHJONG SUCCESS',
        title: 'Taiwanese Mahjong Fast-Track Bundles',
        description: 'Fast-track your Taiwanese Mahjong journey with this complete bundle series designed to take players from the basics to confident, strategic, and accurate 16-tile play.',
        btnLabel: 'Book a Bundle Session',
        btnLink: '/book-session?game=Taiwanese%20Mahjong',
      },
      bundles: TAIWANESE_BUNDLES,
      cta: {
        tag: 'Ready to Progress Faster?',
        title: 'Choose Your Taiwanese Mahjong Bundle and Begin',
        description: 'All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience — then choose your bundle on the booking screen.',
        btnLabel: 'Book a Session',
        btnLink: '/book-session?game=Taiwanese%20Mahjong',
      },
    },
  ];

  for (const pageData of PAGES) {
    const page = await prisma.cmsPage.upsert({
      where: { slug: pageData.slug },
      update: {
        title: pageData.title,
        metaTitle: pageData.metaTitle,
        metaDescription: pageData.metaDescription,
      },
      create: {
        slug: pageData.slug,
        title: pageData.title,
        metaTitle: pageData.metaTitle,
        metaDescription: pageData.metaDescription,
      },
    });

    const sections = [
      {
        key: 'hero',
        name: 'Hero Section',
        order: 0,
        content: pageData.hero,
      },
      {
        key: 'bundles',
        name: 'Bundles List',
        order: 1,
        content: {
          bundles: pageData.bundles,
        },
      },
      {
        key: 'cta',
        name: 'Call to Action',
        order: 2,
        content: pageData.cta,
      },
    ];

    for (const sec of sections) {
      await prisma.cmsSection.upsert({
        where: {
          pageId_key: {
            pageId: page.id,
            key: sec.key,
          },
        },
        update: {
          name: sec.name,
          order: sec.order,
          content: sec.content,
        },
        create: {
          pageId: page.id,
          key: sec.key,
          name: sec.name,
          order: sec.order,
          content: sec.content,
        },
      });
    }

    console.log(`  ✓ Seeded CMS page: ${pageData.slug}`);
  }

  console.log('✅ All 4 Fast-Track Split Pages seeded successfully!');
}
