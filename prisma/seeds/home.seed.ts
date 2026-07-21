import { PrismaClient } from '@prisma/client';

export async function seedHomePage(prisma: PrismaClient) {
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'home' },
    update: { title: 'Home Page' },
    create: { slug: 'home', title: 'Home Page' },
  });

  const sections = [
    {
      key: 'hero',
      name: 'Hero Section',
      content: {
        bg: '/uploads/hero-banner.jpg',
        title: 'MAHJONG SUCCESS',
        subtitle: 'Master Mahjong one tile at a time.',
        button: 'Get Started'
      }
    },
    {
      key: 'journey',
      name: 'The Journey',
      content: {
        subtitle: 'The Journey',
        title: 'A structured pathway to learning, playing, and succeeding at Mahjong.',
        desc1: 'From beginner foundations to advanced gameplay, Mahjong Success combines expert instruction, guided games, practical experience, and a vibrant community to help players of all ages build confidence, develop strategy, and enjoy the game.',
        desc2: 'Whether you\'re learning individually, with friends, or as a family, your journey to Mahjong success starts here.',
        button: 'Learn. Play. Strategize. Speed. Succeed.'
      }
    },
    {
      key: 'variants',
      name: 'Mahjong Variants',
      content: {
        subtitle: 'Mahjong Variants',
        title: 'Discover Different Paths to Success',
        desc1: 'Mahjong is played in many different ways around the world, with each variant offering its own unique rules, strategies, challenges, and opportunities for success.',
        desc2: 'At Mahjong Success, we introduce players to a variety of Mahjong formats, helping them understand the differences between each style while developing the skills and confidence to succeed in any game.',
        items: [
          {
            id: 'goulash',
            name: 'International Goulash',
            badge: 'Most Popular',
            image: '/uploads/game-goulash.jpg',
            tile: '/tile-1.png',
            desc: 'Learn through a structured six-level journey covering foundations, Joker strategy, advanced hand building, partnership play, concealed hands, and scoring mastery.',
            path: '/games/goulash'
          },
          {
            id: 'american',
            name: 'American',
            badge: null,
            image: '/uploads/game-american.jpg',
            tile: '/tile-2.png',
            desc: 'Master Charleston passing, Joker strategy, card-based gameplay, and winning hand development.',
            path: '/mahjong/american-mahjong'
          },
          {
            id: 'nml',
            name: 'NMJL',
            badge: null,
            image: '/uploads/game-nml.jpg',
            tile: '/tile-3.png',
            desc: 'Play the official National Mahjong League card with its annually updated hands, strategic flexibility, and competitive standards.',
            path: '/mahjong/national-mahjong-league'
          },
          {
            id: 'taiwan',
            name: 'Taiwanese',
            badge: null,
            image: '/uploads/game-taiwan.jpg',
            tile: '/tile-4.png',
            desc: 'Learn traditional Taiwanese Mahjong with sixteen-tile hands, strategic hand building, scoring, and advanced gameplay techniques.',
            path: '/mahjong/taiwanese-mahjong'
          }
        ]
      }
    },
    {
      key: 'why',
      name: 'Why Mahjong Success',
      content: {
        subtitle: 'Why Mahjong Success?',
        title: 'Building Better Players, One Tile at a Time',
        items: [
          { image: "/why-structured-path.jpg", title: "A Structured Path to Success", desc: "Follow a progressive learning journey designed to help you build confidence, skills, and understanding one level at a time.", anchor: "structured-path" },
          { image: "/why-guided-instruction.jpg", title: "Learn Through Guided Instruction", desc: "Learn from experienced trainers through structured lessons covering multiple Mahjong variants, strategies, and gameplay techniques.", anchor: "guided-instruction" },
          { image: "/why-guided-play.jpg", title: "Guided Play & Guided Games", desc: "Reinforce your learning through coached gameplay sessions where trainers help you apply concepts, improve strategy, and build confidence at the table.", anchor: "guided-play" },
          { image: "/why-convenience.jpg", title: "Learn at Your Convenience", desc: "Enjoy flexible learning with travelling instructors who can conduct lessons at your home, office, community space, or preferred venue.", anchor: "convenience" },
          { image: "/why-variety.jpg", title: "Experience a Variety of Mahjong Games", desc: "Explore multiple Mahjong formats and game variations that develop adaptability, strategic thinking, and a deeper understanding of the game.", anchor: "variety" },
          { image: "/why-community.jpg", title: "Join the Mahjong Success Community", desc: "Become part of a friendly and supportive community that meets regularly to learn, play, network, and grow together.", anchor: "community" },
          { image: "/why-events.jpg", title: "Exclusive Events, Socials & Tournaments", desc: "Participate in Mahjong socials, tournaments, meetups, matches, and community events designed to enhance your playing experience.", anchor: "events" },
          { image: "/why-mind.jpg", title: "Strengthen Your Mind & Enrich Your Life", desc: "Mahjong helps improve memory, concentration, strategic thinking, decision-making, and social connection while supporting lifelong mental engagement.", anchor: "mind" }
        ],
        closing1: 'Whether you want to learn, improve, compete, connect, or simply enjoy the game, Mahjong Success provides the pathway, support, and opportunities to help you succeed.',
        closing2: 'Master Mahjong One Tile at a Time.',
        button: 'Your Journey. Your Community. Your Success.'
      }
    },
    {
      key: 'who',
      name: 'Who Is It For',
      content: {
        subtitle: 'Who Is It For?',
        title: 'A Seat for Everyone.',
        italic: 'For Every Player. At Every Level.',
        desc: 'Whether you\'re discovering Mahjong for the first time or looking to deepen your skills, Mahjong Success welcomes players from all backgrounds, age groups, and experience levels.',
        img: '/uploads/seat-everyone.jpg',
        items: [
          "Complete beginners",
          "Casual players",
          "Experienced Mahjong enthusiasts",
          "Social players",
          "Students (10+) and Teens",
          "Young adults and working professionals",
          "Seniors and lifelong learners",
          "Families and friends",
          "Community groups",
          "Social clubs and associations",
          "Schools & Educational Institutions",
          "Universities and Colleges",
          "Corporate teams",
          "Event organisers",
          "Anyone seeking a unique social, learning, or team-building experience"
        ],
        button: 'Your Seat. Your Game. Your Mahjong Success.'
      }
    },
    {
      key: 'receive',
      name: 'What You Receive',
      content: {
        subtitle: 'The Mahjong Success Experience',
        title: 'What You Receive at Each Training Level',
        desc: 'Every Mahjong Success training level is designed to provide a structured, engaging, and practical learning experience that combines instruction, strategy, and gameplay.',
        img1: '/uploads/receive-banner-1.jpg',
        img2: '/uploads/receive-banner-2.jpg',
        cards1: [
          { icon: "BookOpen", title: "Comprehensive Training & Instruction", desc: "Learn through a detailed trainer-led presentation that covers the concepts, rules, strategies, techniques, and gameplay principles relevant to that level." },
          { icon: "HelpCircle", title: "Frequently Asked Questions & Expert Guidance", desc: "Gain clarity through detailed explanations and answers to commonly asked questions, helping you better understand the game and avoid common mistakes." },
          { icon: "Layers", title: "Understand the Tiles & Their Uses", desc: "Learn about the tiles used at each level, their significance, how they interact within different hands, and how to maximise their value during gameplay." }
        ],
        cards2: [
          { icon: "Target", title: "Learn New Concepts & Strategies", desc: "Master the key concepts, hand-building techniques, strategic approaches, and decision-making skills introduced at that level." },
          { icon: "GraduationCap", title: "Guided Learning Games", desc: "Play carefully selected Mahjong games designed to reinforce the concepts taught during training. Each game includes detailed explanations, practical examples, and strategic insights to accelerate learning." },
          { icon: "Users", title: "Apply Learning Through Practical Play", desc: "Put theory into practice by applying newly learned concepts, tile knowledge, and strategies during gameplay, helping you build experience and confidence." }
        ],
        button: 'Learn. Play. Apply. Succeed.'
      }
    },
    {
      key: 'bundles',
      name: 'Fast Track Bundles',
      content: {
        subtitle: 'Accelerate Your Progress',
        title: 'Mahjong Success Fast Track Bundles'
      }
    },
    {
      key: 'premium',
      name: 'Premium Experiences',
      content: {
        bg: '/uploads/premium-floral-bg.jpg',
        subtitle: 'Premium Mahjong Experiences',
        title: 'Your Venue. Your Schedule. Your Mahjong Success.'
      }
    },
    {
      key: 'difference',
      name: 'The Mahjong Success Difference',
      content: {
        subtitle: 'The Mahjong Success Difference',
        title: 'What Defines Our Players',
        cards: [
          {
            title: 'Well-Trained & Well-Prepared',
            desc: 'They have a clear understanding of the games they have learned, including the rules, concepts, strategies, and gameplay instructions.',
            img: '/uploads/diff-1-well-trained.jpg'
          },
          {
            title: 'Strong Etiquette & Table Manners',
            desc: 'They understand proper Mahjong etiquette, table conduct, sportsmanship, and respectful gameplay, contributing to a positive experience for everyone.',
            img: '/uploads/diff-2-etiquette.jpg'
          },
          {
            title: 'Strong Knowledge of the Rules',
            desc: 'They understand the game mechanics and play confidently without uncertainty or confusion.',
            img: '/uploads/diff-3-rules.jpg'
          },
          {
            title: 'Deep Understanding of Tiles',
            desc: 'They know the value, purpose, and strategic use of different tiles and how they contribute to winning hands.',
            img: '/uploads/diff-4-tiles.jpg'
          },
          {
            title: 'Joker Strategy Experts',
            desc: 'They understand joker rules, joker exchanges, joker optimisation, and how to maximise the value of jokers across different games.',
            img: '/uploads/diff-5-joker.jpg'
          },
          {
            title: 'Strategic Thinkers',
            desc: 'They think ahead, evaluate options, manage risks, and make informed decisions during gameplay.',
            img: '/uploads/diff-6-strategic.jpg'
          },
          {
            title: 'Familiar with Multiple Variants',
            desc: 'They are exposed to different Mahjong games and formats, making them adaptable and versatile players.',
            img: '/uploads/diff-7-variants.jpg'
          },
          {
            title: 'Answers, Not Questions',
            desc: 'Having completed structured training and FAQs, they spend less time asking basic questions and more time focusing on gameplay and strategy.',
            img: '/uploads/diff-8-answers.jpg'
          },
          {
            title: 'Smooth & Efficient Gameplay',
            desc: 'They understand game flow, avoid unnecessary delays, and help maintain an enjoyable pace of play.',
            img: '/uploads/diff-9-smooth.jpg'
          },
          {
            title: 'Confidence Through Practice',
            desc: 'Through guided games and practical play, they build confidence, speed, consistency, and real-game experience.',
            img: '/uploads/diff-10-confidence.jpg'
          }
        ]
      }
    },
    {
      key: 'mahjong_mania',
      name: 'Mahjong Mania',
      content: {
        img: '/uploads/mahjong-mania.jpg',
        tagline: 'More Ways to Play',
        title: 'Mahjong Mania',
        desc1: 'Mahjong Mania brings the community together for dynamic, multi-table gameplay sessions that offer variety, excitement, and a fresh challenge every time you play.',
        desc2: 'Whether you prefer individual play, team-based strategies, or tournament formats, Mahjong Mania provides a vibrant, competitive, and social environment designed for players who love the game and enjoy testing their skills in different ways.',
        btn: 'Explore Mahjong Mania'
      }
    },
    {
      key: 'thinking_table',
      name: 'The Thinking Table',
      content: {
        img: '/uploads/thinking-table.jpg',
        tagline: 'Corporate Learning & Development',
        title: 'The Thinking Table',
        desc1: 'The Thinking Table offers a unique and engaging corporate learning experience, using the strategic framework of Mahjong to develop critical thinking, decision making, risk management, and team collaboration.',
        desc2: 'Designed for professionals, teams, and organisations, this interactive workshop goes beyond traditional corporate training by immersing participants in a fast-paced, strategic game that mirrors real-world business challenges.',
        desc3: 'Enhance your team\u2019s strategic capabilities through a highly interactive and intellectually stimulating experience.',
        btn: 'Discover The Thinking Table'
      }
    },
    {
      key: 'community',
      name: 'Community / Join A Circle',
      content: {
        tag: 'Community',
        title: 'Join the Mahjong Success Circle',
        subtitle: 'Learn Together. Play Together. Succeed Together.',
        desc: "Whether you're a beginner, social player, or experienced enthusiast, you'll find a welcoming environment where you can improve your game, meet like-minded people, and enjoy the culture and camaraderie of Mahjong."
      }
    }
  ];

  for (const sectionData of sections) {
    await prisma.cmsSection.upsert({
      where: {
        pageId_key: { pageId: page.id, key: sectionData.key },
      },
      update: {
        name: sectionData.name,
        content: sectionData.content,
      },
      create: {
        pageId: page.id,
        key: sectionData.key,
        name: sectionData.name,
        content: sectionData.content,
      },
    });
  }

  console.log('Home page seeded successfully.');
}
