import { PrismaClient } from '@prisma/client';

export async function seedFastTrackSplitPages(prisma: PrismaClient) {
  console.log('Seeding 4 Fast-Track Split Pages for CMS...');

  const INTERNATIONAL_BUNDLES = [
    {
      id: "launchpad",
      emoji: "🚀",
      title: "Mahjong Success Launchpad",
      subtitle: "FOUNDATION WITH STRATEGY",
      tagline: "The quickest path from beginner to player",
      body: "The Mahjong Success Launchpad combines Level 1 – Foundation and Level 2 – Joker Strategy into one comprehensive learning bundle, giving players the essential knowledge, skills, and confidence needed to begin their Mahjong journey successfully.\n\nLearn the tiles, suits, winds, dragons, jokers, hand-building fundamentals, winning conditions, and the strategic use of jokers to improve decision-making and gameplay.",
      includes: [
        "Level 1 – Foundation",
        "Level 2 – Joker Strategy",
      ],
      regularPrice: "AED 700",
      bundlePrice: "AED 500",
      saving: "Save AED 200",
      pricingNote: null,
      individualPricing: [
        "Foundation- AED 500",
        "Joker Strategy- AED 200",
        "Total - AED 700",
      ],
      courseDuration: [
        "4 hours",
      ],
      perfectFor: [
        "Complete beginners",
        "New Mahjong players",
        "Casual players looking for structured learning",
        "Social Players",
        "Anyone wanting a strong foundation and strategic understanding",
      ],
      outcome: "By the end of the Launchpad Bundle, players will confidently understand the Mahjong tiles, hand-building principles, winning conditions, and joker strategies, providing a strong foundation for future progression through the Mahjong Success pathway.",
      cta: "LEARN. THINK. SUCCEED.",
    },
    {
      id: "masterclass",
      emoji: "🀄",
      title: "Mahjong Success Masterclass",
      subtitle: "ADVANCE HANDS",
      tagline: "Take your Mahjong skills beyond the basics",
      body: "The Hand Mastery Series helps players develop advanced hand-building techniques, improve decision-making, and gain the confidence needed to recognise and pursue a wider range of winning opportunities.\n\nThe series is delivered through five specialised hand-building modules, allowing players to focus on the hand types they wish to learn, strengthen, and master.",
      includes: [
        "Module 1 – Crochet",
        "Module 2 – Chows & Mixed Chows",
        "Module 3 – Dragons & Winds",
        "Module 4 – Advanced Kongs Play",
        "Module 5 – Concealed Hands",
      ],
      regularPrice: "AED 1,250",
      bundlePrice: "AED 1,000",
      saving: "Save AED 250",
      pricingNote: "Bundle Price: AED 200 per module",
      individualPricing: [
        "Original Price: AED 250 per module",
        "Number of modules- 5",
        "Total - AED 1,250",
      ],
      courseDuration: [
        "Each module is for 2 hours",
        "Number of modules- 5",
        "Total 10 hours",
      ],
      perfectFor: [
        "Players who have completed the Launchpad Bundle or have a strong foundation",
        "Players looking to expand their hand-building knowledge",
        "Players who want to improve strategic thinking and decision-making",
        "Players seeking greater confidence in recognising winning opportunities",
        "Players looking to become more adaptable and versatile at the table",
      ],
      outcome: "By the end of this bundle, players will have a deeper understanding of advanced hand construction, stronger strategic awareness, and greater confidence in building and adapting hands during gameplay.",
      cta: "CONSTRUCT. STRATEGISE. SUCCEED.",
    },
    {
      id: "partnership",
      emoji: "🤝",
      title: "Mahjong Success Partnership Discount",
      subtitle: "LEARN TOGETHER. PLAY TOGETHER. SUCCEED TOGETHER.",
      tagline: "Master the art of Partnership Mahjong",
      body: "The Mahjong Success Partnership Bundle is designed for players who want to master the art of Partnership Mahjong. Learn how to play effectively with a partner, understand partnership dynamics, develop coordinated strategies, and maximise opportunities through teamwork and communication at the Mahjong table.\n\n4 players required to avail this special offer. Book a Partnership Table of 4 together and enjoy a AED 50 discount per player.",
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
      regularPrice: "AED 800 for 4 players",
      bundlePrice: "AED 600 for 4 players",
      saving: "Save AED 200",
      pricingNote: "Bring a Partner & Save, Bundle Price: AED 150 per person",
      individualPricing: [
        "AED 200 per person",
        "Number of players - 4",
        "Total- AED 800",
      ],
      courseDuration: [
        "2 hours",
      ],
      perfectFor: [
        "Existing Mahjong players",
        "Couples and spouses",
        "Family members",
        "Friends who play together",
        "Regular Mahjong partners",
      ],
      outcome: "By the end of this bundle, players will understand the principles of partnership Mahjong, develop stronger teamwork and communication skills, and gain the confidence to play strategically and effectively with a partner.",
      cta: "LEARN TOGETHER. PLAY TOGETHER. SUCCEED TOGETHER.",
    },
  ];

  const AMERICAN_BUNDLES = [
    {
      id: "american-launchpad",
      emoji: "🇺🇸",
      title: "Mahjong Success Launchpad",
      subtitle: "FOUNDATION TO STRATEGY",
      tagline: "The quickest path from beginner to player",
      body: "American Mahjong is a strategic tile game played under the official National Mah Jongg League (NMJL®) rules. Learn American Mahjong through structured training covering the Charleston, jokers, winning hands, and scoring.\n\nThe Mahjong Success Launchpad combines Level 1 – Foundation and Scoring, Level 2 – Joker Strategy; into one comprehensive learning bundle, giving players the essential knowledge, skills, and confidence needed to begin their Mahjong journey successfully. The 5-hour training programme will be delivered over 2 days, with 2.5 hours of focused training each day.",
      includes: [
        "Level 1 – Foundation",
        "Level 2 – Joker Strategy",
        "Scoring & Scoring Strategy",
      ],
      regularPrice: "AED 800",
      bundlePrice: "AED 600",
      saving: "Save AED 200",
      pricingNote: null,
      individualPricing: [
        "Foundation- AED 600",
        "Joker Strategy- AED 200",
        "Total AED 800",
      ],
      courseDuration: [
        "Day 1- 2.5 hours",
        "Day 2- 2.5 hours",
        "Total - 5 hours",
      ],
      perfectFor: [
        "Complete beginners",
        "New Mahjong players",
        "Casual players looking for structured learning",
        "Social Players",
        "Anyone wanting a strong foundation and strategic understanding",
      ],
      outcome: "By the end of the Launchpad Bundle, players will confidently understand the Mahjong tiles, hand-building principles, joker strategies and build winning hands. Players will also have a complete understanding of the American Mahjong Scoring system.",
      cta: "LEARN. THINK. SUCCEED.",
    },
    {
      id: "american-mastery",
      emoji: "🃏",
      title: "American Mahjong Mastery",
      subtitle: "ADVANCE HANDS MASTERY",
      tagline: "American National Mah Jongg League Card",
      body: "Take your American Mahjong game to the next level by mastering the wide variety of winning hands featured on the latest NMJL® Card. This fast-track option allows you to learn a wider range of hands, recognise more patterns, and develop stronger strategic thinking.\n\nThe series is delivered through four specialised hand-building modules, allowing players to focus on the hand types they wish to learn, strengthen, and master.",
      modules: [
        "Odd & Even Hands",
        "Consecutive Runs & Step Up Hands",
        "Any Like Numbers-Pairs, Pungs, Kongs, Quints & Sextets",
        "Singles, Pairs, Winds & Dragons",
      ],
      modulesTitle: "WHAT'S INCLUDED",
      regularPrice: "AED 1000",
      bundlePrice: "AED 800",
      saving: "Save AED 200",
      pricingNote: "Bundle Price: AED 200 per module",
      individualPricing: [
        "AED 250 per module",
        "Number of Modules- 4",
        "Total AED 1000",
      ],
      courseDuration: [
        "Each module is for 2 hours.",
        "Number of modules: 4",
        "Total 8 hours.",
      ],
      perfectFor: [
        "Players who have completed the Launchpad Bundle or have a strong foundation",
        "Players looking to expand their hand-building knowledge",
        "Players who want to improve strategic thinking and decision-making",
        "Players seeking greater confidence in recognising winning opportunities",
        "Players looking to become more adaptable and versatile at the table",
      ],
      outcome: "By the end of this bundle, players will have a deeper understanding of multiple advanced hand categories, stronger pattern recognition, and the strategic confidence to tackle a wider range of American Mahjong hands from the latest NMJL® Card.",
      cta: "MASTER. ACCELERATE. SUCCEED.",
    },
  ];

  const WESTERN_BUNDLES = [
    {
      id: "western-launchpad",
      emoji: "🌍",
      title: "Mahjong Success Launchpad",
      subtitle: "HALF LIMIT, LIMIT, MIDDLE LIMIT, DOUBLE LIMIT",
      tagline: "Learn the highest number and widest range of Mahjong Hands",
      body: "The Mahjong Success Launchpad combines Level 1 – Foundation, Level 2 – Joker Strategy and Level 3- Scoring & Scoring Strategy, into one comprehensive learning bundle, giving players the essential knowledge, skills, and confidence needed to begin their Mahjong journey successfully. Learn the tiles, suits, winds, dragons, jokers, hand-building fundamentals, winning conditions, and the strategic use of jokers to improve decision-making and gameplay. Master the Western Mahjong scoring system.",
      includes: [
        "Level 1 – Western Rules Fundamentals",
        "Level 2 – Joker Stragegy",
        "Level 3 - Scoring & Scoring Strategy",
      ],
      regularPrice: "AED 1,000",
      bundlePrice: "AED 800",
      saving: "Save AED 200",
      pricingNote: null,
      individualPricing: [
        "Foundation- AED 600",
        "Joker Strategy- AED 200",
        "Scoring & Scoring Strategy- AED 200",
        "Total- AED 1,000",
      ],
      courseDuration: [
        "Total- 5 hours",
        "Day 1- 2.5 hours",
        "Day 2- 2.5 hours",
      ],
      perfectFor: [
        "Complete beginners to Western Mahjong",
        "Players transitioning from other variants",
        "Social Players",
        "Anyone interested in a highest number and wide range of hands",
      ],
      outcome: "By the end of this bundle, players will understand Western scoring, observe proper etiquette, build classical hands, and participate confidently in Western Mahjong games.",
      cta: "LEARN. THINK. SUCCEED.",
    },
    {
      id: "western-mastery",
      emoji: "🏆",
      title: "Western Mahjong Mastery",
      subtitle: "LEARN THE WIDEST RANGE OF WINNING HANDS",
      tagline: "Master the highest number of hands in Mahjong",
      body: "Take your Mahjong skills to the next level by mastering the game's most prestigious Half Limit, Middle Limit, Limit, and Double Limit Hands. This advanced training series focuses on recognizing complex hand patterns, understanding the strategic requirements of high-value hands, and making informed decisions as the game progresses.\n\nThe series is delivered through six specialised hand-building modules, allowing players to focus on the hand types they wish to learn, strengthen, and master.",
      includes: [
        "Module 1: Pungs & Crochets",
        "Module 2: Chows & Mixed Chows",
        "Module 3: Runs",
        "Module 4: Step Up Runs",
        "Module 5: Pairs & Knitted Pairs",
        "Module 6: Terminals",
      ],
      regularPrice: "AED 1500",
      bundlePrice: "AED 1200",
      saving: "Save AED 300",
      pricingNote: "Bundle Price: AED 200 per module",
      individualPricing: [
        "AED 250 per module",
        "Number of modules: 6",
        "Total AED 1500",
      ],
      courseDuration: [
        "Each module is for 2 hours",
        "Number of modules: 6",
        "Total- 12 hours",
      ],
      perfectFor: [
        "Players who have completed the Launchpad Bundle or have a strong foundation",
        "Players looking to expand their hand-building knowledge",
        "Players who want to improve strategic thinking and decision-making",
        "Players who love to learn new hands and the highest number of hands",
        "Players looking for the widest range and variety of hands in Mahjong",
      ],
      outcome: "By the end of this bundle, players will have a deeper understanding of advanced hand construction, stronger strategic awareness, calculating scores rapidly, and greater confidence in building and adapting hands during gameplay.",
      cta: "COMPETE. CONQUER. CELEBRATE.",
    },
  ];

  const TAIWANESE_BUNDLES = [
    {
      id: "taiwanese-launchpad",
      emoji: "🀄",
      title: "Mahjong Success Launchpad",
      subtitle: "FOUNDATION WITH STRATEGY",
      tagline: "Fast-track your Taiwanese Mahjong journey with this complete 3-level bundle designed to take players from the basics to confident, strategic, and accurate play.",
      body: "This bundle includes Level 1 Foundation with 5 primary hands, Scoring & Scoring Strategy. Players begin by learning the tiles, suits, honours, flowers, table flow, melds, calling, discarding, winning hands, and Mahjong etiquette. They then progress to hand-building, including Pure hands, Semi Pure hands, 2 Suit hands, 5 Suit Hands and Pure Honors hands. The final level focuses on scoring, bonuses, penalties, dealer bonuses, self-draw wins, dice-on-the-wall, false Mahjong, chasing tiles, and common scoring mistakes.",
      includes: [
        "Level 1: Foundation – Beginner Taiwanese Mahjong",
        "Level 2: Hands: Pure & Semi Pure Hands, 2 Suit & 5 Suit Hands, and Pure Honors hands",
        "Level 3: Scoring – Scoring, bonuses, and penalties",
      ],
      regularPrice: "AED 1100",
      bundlePrice: "AED 900",
      saving: "Save AED 200",
      pricingNote: null,
      individualPricing: [
        "Foundation: AED 600",
        "5 Hands: AED 250",
        "Scoring: AED 350",
        "Total: AED 1,100",
      ],
      courseDuration: [
        "3 sessions",
        "2.5 hours per session",
        "Total 7.5 hours",
      ],
      perfectFor: [
        "Complete beginners to Taiwanese Mahjong",
        "Players transitioning from other variants",
        "Social Players",
        "Anyone wanting a strong foundation and strategic understanding",
      ],
      outcome: "By the end of the Taiwanese Mahjong Masterclass Bundle, players will have a complete understanding of Taiwanese Mahjong from foundation to building scoring hands. They will be able to play with confidence, build stronger winning hands, recognise high-scoring opportunities, calculate scores accurately, apply bonuses correctly, and avoid common penalties at the table.",
      cta: "LEARN. MASTER. WIN.",
    },
    {
      id: "taiwanese-mastery",
      emoji: "🎯",
      title: "Taiwanese Mahjong Mastery",
      subtitle: "SPECIAL FOCUS SESSIONS FOR HIGHER-SCORING MAHJONG HANDS",
      tagline: "High Scoring Hands",
      body: "Each session focuses on a specific advanced hand pattern, with clear examples, practical guidance, and table-based understanding so players can apply the hands during real play.\n\nThe Advance Hands Mastery Bundle is designed for players who already understand the basics of Taiwanese Mahjong and want to strengthen their hand-building skills. These focused sessions help players learn, recognise, and confidently build special higher-scoring winning combinations.\n\nThese hands build on the Advanced Hands course content, including Pong hands, Sheung hands, Jewel hands, Step Up hands, Terminal hands and Hands in Pairs.\n\nThe series is delivered through seven specialised hand-building modules, allowing players to focus on the hand types they wish to learn, strengthen, and master.",
      modules: [
        "Advance Hands- Pure & Semi Pure hands, 2 Suit & 5 Suit hands and Pure Honors hands",
        "Jewel Hands: Jade, Ruby, Diamond and Jade with Ruby hands",
        "Pong Hands: All Pong, Wind Pong, Dragon Pong, Sister Pong & Uncle Pong Hands",
        "Sheung Hands: All Sheung, Sister Sheung, Brother Sheung, Dragon Runs and Four in 2/3/4 ways",
        "Step Up Hands",
        "Terminal hands: Terminal Pongs, Terminal Sheungs, Orphan hands",
        "Concealed Hands: Hands in pairs",
        "Scoring",
      ],
      modulesTitle: "MODULES INCLUDED",
      regularPrice: "AED 2,000",
      bundlePrice: "AED 1,600",
      saving: "Save AED 400",
      pricingNote: "Bundle Price: AED 200 per module",
      individualPricing: [
        "AED 250 per module",
        "8 modules",
        "Total- AED 2,000",
      ],
      courseDuration: [
        "2 hours per module",
        "8 modules",
        "Total: 16 hours",
      ],
      perfectFor: [
        "Players who have completed the Launchpad Bundle or have a strong Taiwanese Mahjong foundation",
        "Players looking to expand their hand-building knowledge",
        "Players who want to improve strategic thinking and decision-making",
        "Players who love to learn new hands and the entire range of Taiwanese hands",
        "Players who enjoy learning the scoring for all Taiwanese hands",
      ],
      outcome: "By the end of each session, players will understand the structure of the selected advanced hand, recognise the tiles and melds required, and learn how to plan their game towards completing that hand. These sessions help players move beyond basic winning combinations and start aiming for stronger, more rewarding Mahjong hands.",
      cta: "THINK. LEARN. APPLY.",
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
        title: 'Choose Your Bundle and Begin',
        description: 'All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience, then choose your bundle on the booking screen.',
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
        title: 'Choose Your Bundle and Begin',
        description: 'All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience, then choose your bundle on the booking screen.',
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
        title: 'Choose Your Bundle and Begin',
        description: 'All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience, then choose your bundle on the booking screen.',
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
        title: 'Choose Your Bundle and Begin',
        description: 'All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience, then choose your bundle on the booking screen.',
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

    await prisma.cmsSection.deleteMany({
      where: { pageId: page.id },
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
