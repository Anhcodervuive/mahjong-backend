import { PrismaClient } from '@prisma/client';

export async function seed_home(prisma: PrismaClient) {
  console.log('Seeding home...');
  
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'home' },
    update: { title: 'Home Page' },
    create: { slug: 'home', title: 'Home Page' },
  });


  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'community' } },
    update: { content: {
      "tag": "Community",
      "desc": "Whether you're a beginner, social player, or experienced enthusiast, you'll find a welcoming environment where you can improve your game, meet like-minded people, and enjoy the culture and camaraderie of Mahjong.",
      "title": "Join the Mahjong Success Circle",
      "subtitle": "Learn Together. Play Together. Succeed Together."
    } },
    create: {
      key: 'community',
      name: 'Community / Join A Circle',
      pageId: page.id,
      content: {
        "tag": "Community",
        "desc": "Whether you're a beginner, social player, or experienced enthusiast, you'll find a welcoming environment where you can improve your game, meet like-minded people, and enjoy the culture and camaraderie of Mahjong.",
        "title": "Join the Mahjong Success Circle",
        "subtitle": "Learn Together. Play Together. Succeed Together."
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'hero' } },
    update: { content: {
      "bg": "/uploads/hero-banner.jpg",
      "title": "MAHJONG SUCCESS",
      "subtitle": "Master Mahjong one tile at a time.",
      "buttonClickLink": "/book-session",
      "buttonTextLabel": "Get Started"
    } },
    create: {
      key: 'hero',
      name: 'Hero Section',
      pageId: page.id,
      content: {
        "bg": "/uploads/hero-banner.jpg",
        "title": "MAHJONG SUCCESS",
        "subtitle": "Master Mahjong one tile at a time.",
        "buttonClickLink": "/book-session",
        "buttonTextLabel": "Get Started"
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'bundles' } },
    update: { content: {
      "items": [
        {
          "desc1": "The quickest path from beginner to player.",
          "desc2": "Designed for new and developing players, the Launchpad Bundle combines the essential foundations, strategies, and hand-building skills needed to play confidently and successfully. Build a strong understanding of the game while developing the knowledge, confidence, and strategic thinking required to progress faster and smarter.",
          "title": "Beginners to Players",
          "button": "View Bundle",
          "tagline": "Mahjong Success Launchpad",
          "buttonLink": "/fast-track-bundles#launchpad"
        },
        {
          "desc1": "Designed to bridge the gap between learning and doing.",
          "desc2": "This bundle focuses on practical application, speed, and advanced strategic thinking. By combining structured training with guided gameplay, it provides the essential tools, techniques, and confidence needed to refine your approach, anticipate opponent moves, and secure Mahjong Success.",
          "title": "Developing Players",
          "button": "View Bundle",
          "tagline": "The Gameplay Mastery Bundle",
          "buttonLink": "/fast-track-bundles#gameplay-mastery"
        }
      ],
      "title": "Mahjong Success Fast Track Bundles",
      "subtitle": "Accelerate Your Progress"
    } },
    create: {
      key: 'bundles',
      name: 'Fast Track Bundles',
      pageId: page.id,
      content: {
        "items": [
          {
            "desc1": "The quickest path from beginner to player.",
            "desc2": "Designed for new and developing players, the Launchpad Bundle combines the essential foundations, strategies, and hand-building skills needed to play confidently and successfully. Build a strong understanding of the game while developing the knowledge, confidence, and strategic thinking required to progress faster and smarter.",
            "title": "Beginners to Players",
            "button": "View Bundle",
            "tagline": "Mahjong Success Launchpad",
            "buttonLink": "/fast-track-bundles#launchpad"
          },
          {
            "desc1": "Designed to bridge the gap between learning and doing.",
            "desc2": "This bundle focuses on practical application, speed, and advanced strategic thinking. By combining structured training with guided gameplay, it provides the essential tools, techniques, and confidence needed to refine your approach, anticipate opponent moves, and secure Mahjong Success.",
            "title": "Developing Players",
            "button": "View Bundle",
            "tagline": "The Gameplay Mastery Bundle",
            "buttonLink": "/fast-track-bundles#gameplay-mastery"
          }
        ],
        "title": "Mahjong Success Fast Track Bundles",
        "subtitle": "Accelerate Your Progress"
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'thinking_table' } },
    update: { content: {
      "img": "/uploads/thinking-table.jpg",
      "desc1": "The Thinking Table offers a unique and engaging corporate learning experience, using the strategic framework of Mahjong to develop critical thinking, decision making, risk management, and team collaboration.",
      "desc2": "Designed for professionals, teams, and organisations, this interactive workshop goes beyond traditional corporate training by immersing participants in a fast-paced, strategic game that mirrors real-world business challenges.",
      "desc3": "Enhance your team’s strategic capabilities through a highly interactive and intellectually stimulating experience.",
      "title": "The Thinking Table",
      "tagline": "Corporate Learning & Development",
      "buttonClickLink": "/thinking-table",
      "buttonTextLabel": "Discover The Thinking Table"
    } },
    create: {
      key: 'thinking_table',
      name: 'The Thinking Table',
      pageId: page.id,
      content: {
        "img": "/uploads/thinking-table.jpg",
        "desc1": "The Thinking Table offers a unique and engaging corporate learning experience, using the strategic framework of Mahjong to develop critical thinking, decision making, risk management, and team collaboration.",
        "desc2": "Designed for professionals, teams, and organisations, this interactive workshop goes beyond traditional corporate training by immersing participants in a fast-paced, strategic game that mirrors real-world business challenges.",
        "desc3": "Enhance your team’s strategic capabilities through a highly interactive and intellectually stimulating experience.",
        "title": "The Thinking Table",
        "tagline": "Corporate Learning & Development",
        "buttonClickLink": "/thinking-table",
        "buttonTextLabel": "Discover The Thinking Table"
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'premium' } },
    update: { content: {
      "bg": "/uploads/premium-floral-bg.jpg",
      "desc1": "At Mahjong Success, we understand that not everyone can learn or play according to a fixed schedule or location. That's why we offer flexible premium options that bring Mahjong directly to you.",
      "desc2": "Whether you prefer a tutor at your home, office, or community venue, or would like to arrange a private training or guided play session at a time that suits your group, our Premium Mahjong Experiences are designed around your convenience.",
      "desc3": "Ideal for families, friends, community groups, corporate teams, and private gatherings, these customised experiences provide the flexibility to learn, practise, and enjoy Mahjong in a setting that works best for you.",
      "items": [
        {
          "emoji": "📍",
          "title": "Travelling Tutor",
          "tagline": "We Bring Mahjong to You",
          "buttonClickLink": "/premium-experiences#travelling-tutor",
          "buttonTextLabel": "Book Now"
        },
        {
          "emoji": "🕒",
          "title": "Play at Your Convenience",
          "tagline": "Your Group. Your Time. Your Table.",
          "buttonClickLink": "/premium-experiences#play-at-your-convenience",
          "buttonTextLabel": "Book Now"
        }
      ],
      "title": "Your Venue. Your Schedule. Your Mahjong Success.",
      "subtitle": "Premium Mahjong Experiences",
      "footerText": "A MINIMUM GROUP SIZE OF FOUR PLAYERS IS REQUIRED FOR ALL PREMIUM MAHJONG EXPERIENCE OPTIONS."
    } },
    create: {
      key: 'premium',
      name: 'Premium Experiences',
      pageId: page.id,
      content: {
        "bg": "/uploads/premium-floral-bg.jpg",
        "desc1": "At Mahjong Success, we understand that not everyone can learn or play according to a fixed schedule or location. That's why we offer flexible premium options that bring Mahjong directly to you.",
        "desc2": "Whether you prefer a tutor at your home, office, or community venue, or would like to arrange a private training or guided play session at a time that suits your group, our Premium Mahjong Experiences are designed around your convenience.",
        "desc3": "Ideal for families, friends, community groups, corporate teams, and private gatherings, these customised experiences provide the flexibility to learn, practise, and enjoy Mahjong in a setting that works best for you.",
        "items": [
          {
            "emoji": "📍",
            "title": "Travelling Tutor",
            "tagline": "We Bring Mahjong to You",
            "buttonClickLink": "/premium-experiences#travelling-tutor",
            "buttonTextLabel": "Book Now"
          },
          {
            "emoji": "🕒",
            "title": "Play at Your Convenience",
            "tagline": "Your Group. Your Time. Your Table.",
            "buttonClickLink": "/premium-experiences#play-at-your-convenience",
            "buttonTextLabel": "Book Now"
          }
        ],
        "title": "Your Venue. Your Schedule. Your Mahjong Success.",
        "subtitle": "Premium Mahjong Experiences",
        "footerText": "A MINIMUM GROUP SIZE OF FOUR PLAYERS IS REQUIRED FOR ALL PREMIUM MAHJONG EXPERIENCE OPTIONS."
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'why' } },
    update: { content: {
      "items": [
        {
          "desc": "Follow a progressive learning journey designed to help you build confidence, skills, and understanding one level at a time.",
          "image": "/why-structured-path.jpg",
          "title": "A Structured Path to Success",
          "anchor": "structured-path"
        },
        {
          "desc": "Learn from experienced trainers through structured lessons covering multiple Mahjong variants, strategies, and gameplay techniques.",
          "image": "/why-guided-instruction.jpg",
          "title": "Learn Through Guided Instruction",
          "anchor": "guided-instruction"
        },
        {
          "desc": "Reinforce your learning through coached gameplay sessions where trainers help you apply concepts, improve strategy, and build confidence at the table.",
          "image": "/why-guided-play.jpg",
          "title": "Guided Play & Guided Games",
          "anchor": "guided-play"
        },
        {
          "desc": "Enjoy flexible learning with travelling instructors who can conduct lessons at your home, office, community space, or preferred venue.",
          "image": "/why-convenience.jpg",
          "title": "Learn at Your Convenience",
          "anchor": "convenience"
        },
        {
          "desc": "Explore multiple Mahjong formats and game variations that develop adaptability, strategic thinking, and a deeper understanding of the game.",
          "image": "/why-variety.jpg",
          "title": "Experience a Variety of Mahjong Games",
          "anchor": "variety"
        },
        {
          "desc": "Become part of a friendly and supportive community that meets regularly to learn, play, network, and grow together.",
          "image": "/why-community.jpg",
          "title": "Join the Mahjong Success Community",
          "anchor": "community"
        },
        {
          "desc": "Participate in Mahjong socials, tournaments, meetups, matches, and community events designed to enhance your playing experience.",
          "image": "/why-events.jpg",
          "title": "Exclusive Events, Socials & Tournaments",
          "anchor": "events"
        },
        {
          "desc": "Mahjong helps improve memory, concentration, strategic thinking, decision-making, and social connection while supporting lifelong mental engagement.",
          "image": "/why-mind.jpg",
          "title": "Strengthen Your Mind & Enrich Your Life",
          "anchor": "mind"
        }
      ],
      "title": "Building Better Players, One Tile at a Time",
      "closing1": "Whether you want to learn, improve, compete, connect, or simply enjoy the game, Mahjong Success provides the pathway, support, and opportunities to help you succeed.",
      "closing2": "Master Mahjong One Tile at a Time.",
      "subtitle": "Why Mahjong Success?",
      "buttonClickLink": "/book-session",
      "buttonTextLabel": "Your Journey. Your Community. Your Success."
    } },
    create: {
      key: 'why',
      name: 'Why Mahjong Success',
      pageId: page.id,
      content: {
        "items": [
          {
            "desc": "Follow a progressive learning journey designed to help you build confidence, skills, and understanding one level at a time.",
            "image": "/why-structured-path.jpg",
            "title": "A Structured Path to Success",
            "anchor": "structured-path"
          },
          {
            "desc": "Learn from experienced trainers through structured lessons covering multiple Mahjong variants, strategies, and gameplay techniques.",
            "image": "/why-guided-instruction.jpg",
            "title": "Learn Through Guided Instruction",
            "anchor": "guided-instruction"
          },
          {
            "desc": "Reinforce your learning through coached gameplay sessions where trainers help you apply concepts, improve strategy, and build confidence at the table.",
            "image": "/why-guided-play.jpg",
            "title": "Guided Play & Guided Games",
            "anchor": "guided-play"
          },
          {
            "desc": "Enjoy flexible learning with travelling instructors who can conduct lessons at your home, office, community space, or preferred venue.",
            "image": "/why-convenience.jpg",
            "title": "Learn at Your Convenience",
            "anchor": "convenience"
          },
          {
            "desc": "Explore multiple Mahjong formats and game variations that develop adaptability, strategic thinking, and a deeper understanding of the game.",
            "image": "/why-variety.jpg",
            "title": "Experience a Variety of Mahjong Games",
            "anchor": "variety"
          },
          {
            "desc": "Become part of a friendly and supportive community that meets regularly to learn, play, network, and grow together.",
            "image": "/why-community.jpg",
            "title": "Join the Mahjong Success Community",
            "anchor": "community"
          },
          {
            "desc": "Participate in Mahjong socials, tournaments, meetups, matches, and community events designed to enhance your playing experience.",
            "image": "/why-events.jpg",
            "title": "Exclusive Events, Socials & Tournaments",
            "anchor": "events"
          },
          {
            "desc": "Mahjong helps improve memory, concentration, strategic thinking, decision-making, and social connection while supporting lifelong mental engagement.",
            "image": "/why-mind.jpg",
            "title": "Strengthen Your Mind & Enrich Your Life",
            "anchor": "mind"
          }
        ],
        "title": "Building Better Players, One Tile at a Time",
        "closing1": "Whether you want to learn, improve, compete, connect, or simply enjoy the game, Mahjong Success provides the pathway, support, and opportunities to help you succeed.",
        "closing2": "Master Mahjong One Tile at a Time.",
        "subtitle": "Why Mahjong Success?",
        "buttonClickLink": "/book-session",
        "buttonTextLabel": "Your Journey. Your Community. Your Success."
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'difference' } },
    update: { content: {
      "cards": [
        {
          "img": "/uploads/diff-1-well-trained.jpg",
          "desc": "They have a clear understanding of the games they have learned, including the rules, concepts, strategies, and gameplay instructions.",
          "title": "Well-Trained & Well-Prepared"
        },
        {
          "img": "/uploads/diff-2-etiquette.jpg",
          "desc": "They understand proper Mahjong etiquette, table conduct, sportsmanship, and respectful gameplay, contributing to a positive experience for everyone.",
          "title": "Strong Etiquette & Table Manners"
        },
        {
          "img": "/uploads/diff-3-rules.jpg",
          "desc": "They understand the game mechanics and play confidently without uncertainty or confusion.",
          "title": "Strong Knowledge of the Rules"
        },
        {
          "img": "/uploads/diff-4-tiles.jpg",
          "desc": "They know the value, purpose, and strategic use of different tiles and how they contribute to winning hands.",
          "title": "Deep Understanding of Tiles"
        },
        {
          "img": "/uploads/diff-5-joker.jpg",
          "desc": "They understand joker rules, joker exchanges, joker optimisation, and how to maximise the value of jokers across different games.",
          "title": "Joker Strategy Experts"
        },
        {
          "img": "/uploads/diff-6-strategic.jpg",
          "desc": "They think ahead, evaluate options, manage risks, and make informed decisions during gameplay.",
          "title": "Strategic Thinkers"
        },
        {
          "img": "/uploads/diff-7-variants.jpg",
          "desc": "They are exposed to different Mahjong games and formats, making them adaptable and versatile players.",
          "title": "Familiar with Multiple Variants"
        },
        {
          "img": "/uploads/diff-8-answers.jpg",
          "desc": "Having completed structured training and FAQs, they spend less time asking basic questions and more time focusing on gameplay and strategy.",
          "title": "Answers, Not Questions"
        },
        {
          "img": "/uploads/diff-9-smooth.jpg",
          "desc": "They understand game flow, avoid unnecessary delays, and help maintain an enjoyable pace of play.",
          "title": "Smooth & Efficient Gameplay"
        },
        {
          "img": "/uploads/diff-10-confidence.jpg",
          "desc": "Through guided games and practical play, they build confidence, speed, consistency, and real-game experience.",
          "title": "Confidence Through Practice"
        }
      ],
      "title": "What Makes a Mahjong Success Player Different?",
      "subtitle": "The Mahjong Success Difference"
    } },
    create: {
      key: 'difference',
      name: 'The Mahjong Success Difference',
      pageId: page.id,
      content: {
        "cards": [
          {
            "img": "/uploads/diff-1-well-trained.jpg",
            "desc": "They have a clear understanding of the games they have learned, including the rules, concepts, strategies, and gameplay instructions.",
            "title": "Well-Trained & Well-Prepared"
          },
          {
            "img": "/uploads/diff-2-etiquette.jpg",
            "desc": "They understand proper Mahjong etiquette, table conduct, sportsmanship, and respectful gameplay, contributing to a positive experience for everyone.",
            "title": "Strong Etiquette & Table Manners"
          },
          {
            "img": "/uploads/diff-3-rules.jpg",
            "desc": "They understand the game mechanics and play confidently without uncertainty or confusion.",
            "title": "Strong Knowledge of the Rules"
          },
          {
            "img": "/uploads/diff-4-tiles.jpg",
            "desc": "They know the value, purpose, and strategic use of different tiles and how they contribute to winning hands.",
            "title": "Deep Understanding of Tiles"
          },
          {
            "img": "/uploads/diff-5-joker.jpg",
            "desc": "They understand joker rules, joker exchanges, joker optimisation, and how to maximise the value of jokers across different games.",
            "title": "Joker Strategy Experts"
          },
          {
            "img": "/uploads/diff-6-strategic.jpg",
            "desc": "They think ahead, evaluate options, manage risks, and make informed decisions during gameplay.",
            "title": "Strategic Thinkers"
          },
          {
            "img": "/uploads/diff-7-variants.jpg",
            "desc": "They are exposed to different Mahjong games and formats, making them adaptable and versatile players.",
            "title": "Familiar with Multiple Variants"
          },
          {
            "img": "/uploads/diff-8-answers.jpg",
            "desc": "Having completed structured training and FAQs, they spend less time asking basic questions and more time focusing on gameplay and strategy.",
            "title": "Answers, Not Questions"
          },
          {
            "img": "/uploads/diff-9-smooth.jpg",
            "desc": "They understand game flow, avoid unnecessary delays, and help maintain an enjoyable pace of play.",
            "title": "Smooth & Efficient Gameplay"
          },
          {
            "img": "/uploads/diff-10-confidence.jpg",
            "desc": "Through guided games and practical play, they build confidence, speed, consistency, and real-game experience.",
            "title": "Confidence Through Practice"
          }
        ],
        "title": "What Makes a Mahjong Success Player Different?",
        "subtitle": "The Mahjong Success Difference"
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'variants' } },
    update: { content: {
      "desc1": "Mahjong is played in many different ways around the world, with each variant offering its own unique rules, strategies, challenges, and opportunities for success.",
      "desc2": "At Mahjong Success, we introduce players to a variety of Mahjong formats, helping them understand the differences between each style while developing the skills and confidence to succeed in any game.",
      "items": [
        {
          "id": "goulash",
          "desc": "Learn through a structured six-level journey covering foundations, Joker strategy, advanced hand building, partnership play, concealed hands, and scoring mastery.",
          "name": "International Goulash",
          "path": "/games/goulash",
          "tile": "/tile-1.png",
          "badge": "Most Popular",
          "image": "/uploads/game-goulash.jpg"
        },
        {
          "id": "american",
          "desc": "Master Charleston passing, Joker strategy, card-based gameplay, and winning hand development.",
          "name": "American Mahjong",
          "path": "/mahjong/american-mahjong",
          "tile": "/tile-2.png",
          "badge": null,
          "image": "/uploads/game-american.jpg"
        },
        {
          "id": "nml",
          "desc": "Play the official National Mahjong League card with its annually updated hands, strategic flexibility, and competitive standards.",
          "name": "Western Mahjong",
          "path": "/mahjong/national-mahjong-league",
          "tile": "/tile-3.png",
          "badge": null,
          "image": "/uploads/game-nml.jpg"
        },
        {
          "id": "taiwan",
          "desc": "Learn traditional Taiwanese Mahjong with sixteen-tile hands, strategic hand building, scoring, and advanced gameplay techniques.",
          "name": "Taiwanese Mahjong",
          "path": "/mahjong/taiwanese-mahjong",
          "tile": "/tile-4.png",
          "badge": null,
          "image": "/uploads/game-taiwan.jpg"
        }
      ],
      "title": "Discover Different Paths to Success",
      "subtitle": "Mahjong Variants"
    } },
    create: {
      key: 'variants',
      name: 'Mahjong Variants',
      pageId: page.id,
      content: {
        "desc1": "Mahjong is played in many different ways around the world, with each variant offering its own unique rules, strategies, challenges, and opportunities for success.",
        "desc2": "At Mahjong Success, we introduce players to a variety of Mahjong formats, helping them understand the differences between each style while developing the skills and confidence to succeed in any game.",
        "items": [
          {
            "id": "goulash",
            "desc": "Learn through a structured six-level journey covering foundations, Joker strategy, advanced hand building, partnership play, concealed hands, and scoring mastery.",
            "name": "International Goulash",
            "path": "/games/goulash",
            "tile": "/tile-1.png",
            "badge": "Most Popular",
            "image": "/uploads/game-goulash.jpg"
          },
          {
            "id": "american",
            "desc": "Master Charleston passing, Joker strategy, card-based gameplay, and winning hand development.",
            "name": "American Mahjong",
            "path": "/mahjong/american-mahjong",
            "tile": "/tile-2.png",
            "badge": null,
            "image": "/uploads/game-american.jpg"
          },
          {
            "id": "nml",
            "desc": "Play the official National Mahjong League card with its annually updated hands, strategic flexibility, and competitive standards.",
            "name": "Western Mahjong",
            "path": "/mahjong/national-mahjong-league",
            "tile": "/tile-3.png",
            "badge": null,
            "image": "/uploads/game-nml.jpg"
          },
          {
            "id": "taiwan",
            "desc": "Learn traditional Taiwanese Mahjong with sixteen-tile hands, strategic hand building, scoring, and advanced gameplay techniques.",
            "name": "Taiwanese Mahjong",
            "path": "/mahjong/taiwanese-mahjong",
            "tile": "/tile-4.png",
            "badge": null,
            "image": "/uploads/game-taiwan.jpg"
          }
        ],
        "title": "Discover Different Paths to Success",
        "subtitle": "Mahjong Variants"
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'mahjong_mania' } },
    update: { content: {
      "img": "/uploads/mahjong-mania.jpg",
      "desc1": "Mahjong Mania brings the community together for dynamic, multi-table gameplay sessions that offer variety, excitement, and a fresh challenge every time you play.",
      "desc2": "Whether you prefer individual play, team-based strategies, or tournament formats, Mahjong Mania provides a vibrant, competitive, and social environment designed for players who love the game and enjoy testing their skills in different ways.",
      "title": "Mahjong Mania",
      "tagline": "More Ways to Play",
      "buttonClickLink": "/mahjong-mania",
      "buttonTextLabel": "Explore Mahjong Mania"
    } },
    create: {
      key: 'mahjong_mania',
      name: 'Mahjong Mania',
      pageId: page.id,
      content: {
        "img": "/uploads/mahjong-mania.jpg",
        "desc1": "Mahjong Mania brings the community together for dynamic, multi-table gameplay sessions that offer variety, excitement, and a fresh challenge every time you play.",
        "desc2": "Whether you prefer individual play, team-based strategies, or tournament formats, Mahjong Mania provides a vibrant, competitive, and social environment designed for players who love the game and enjoy testing their skills in different ways.",
        "title": "Mahjong Mania",
        "tagline": "More Ways to Play",
        "buttonClickLink": "/mahjong-mania",
        "buttonTextLabel": "Explore Mahjong Mania"
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'receive' } },
    update: { content: {
      "desc": "Every Mahjong Success training level is designed to provide a structured, engaging, and practical learning experience that combines instruction, strategy, and gameplay.",
      "img1": "/uploads/receive-banner-1.jpg",
      "img2": "/uploads/receive-banner-2.jpg",
      "title": "What You Receive at Each Training Level",
      "cards1": [
        {
          "desc": "Learn through a detailed trainer-led presentation that covers the concepts, rules, strategies, techniques, and gameplay principles relevant to that level.",
          "icon": "BookOpen",
          "title": "Comprehensive Training & Instruction"
        },
        {
          "desc": "Gain clarity through detailed explanations and answers to commonly asked questions, helping you better understand the game and avoid common mistakes.",
          "icon": "HelpCircle",
          "title": "Frequently Asked Questions & Expert Guidance"
        },
        {
          "desc": "Learn about the tiles used at each level, their significance, how they interact within different hands, and how to maximise their value during gameplay.",
          "icon": "Layers",
          "title": "Understand the Tiles & Their Uses"
        }
      ],
      "cards2": [
        {
          "desc": "Master the key concepts, hand-building techniques, strategic approaches, and decision-making skills introduced at that level.",
          "icon": "Target",
          "title": "Learn New Concepts & Strategies"
        },
        {
          "desc": "Play carefully selected Mahjong games designed to reinforce the concepts taught during training. Each game includes detailed explanations, practical examples, and strategic insights to accelerate learning.",
          "icon": "GraduationCap",
          "title": "Guided Learning Games"
        },
        {
          "desc": "Put theory into practice by applying newly learned concepts, tile knowledge, and strategies during gameplay, helping you build experience and confidence.",
          "icon": "Users",
          "title": "Apply Learning Through Practical Play"
        }
      ],
      "subtitle": "The Mahjong Success Experience",
      "buttonClickLink": "/book-session",
      "buttonTextLabel": "Learn. Play. Apply. Succeed."
    } },
    create: {
      key: 'receive',
      name: 'What You Receive',
      pageId: page.id,
      content: {
        "desc": "Every Mahjong Success training level is designed to provide a structured, engaging, and practical learning experience that combines instruction, strategy, and gameplay.",
        "img1": "/uploads/receive-banner-1.jpg",
        "img2": "/uploads/receive-banner-2.jpg",
        "title": "What You Receive at Each Training Level",
        "cards1": [
          {
            "desc": "Learn through a detailed trainer-led presentation that covers the concepts, rules, strategies, techniques, and gameplay principles relevant to that level.",
            "icon": "BookOpen",
            "title": "Comprehensive Training & Instruction"
          },
          {
            "desc": "Gain clarity through detailed explanations and answers to commonly asked questions, helping you better understand the game and avoid common mistakes.",
            "icon": "HelpCircle",
            "title": "Frequently Asked Questions & Expert Guidance"
          },
          {
            "desc": "Learn about the tiles used at each level, their significance, how they interact within different hands, and how to maximise their value during gameplay.",
            "icon": "Layers",
            "title": "Understand the Tiles & Their Uses"
          }
        ],
        "cards2": [
          {
            "desc": "Master the key concepts, hand-building techniques, strategic approaches, and decision-making skills introduced at that level.",
            "icon": "Target",
            "title": "Learn New Concepts & Strategies"
          },
          {
            "desc": "Play carefully selected Mahjong games designed to reinforce the concepts taught during training. Each game includes detailed explanations, practical examples, and strategic insights to accelerate learning.",
            "icon": "GraduationCap",
            "title": "Guided Learning Games"
          },
          {
            "desc": "Put theory into practice by applying newly learned concepts, tile knowledge, and strategies during gameplay, helping you build experience and confidence.",
            "icon": "Users",
            "title": "Apply Learning Through Practical Play"
          }
        ],
        "subtitle": "The Mahjong Success Experience",
        "buttonClickLink": "/book-session",
        "buttonTextLabel": "Learn. Play. Apply. Succeed."
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'journey' } },
    update: { content: {
      "desc1": "From beginner foundations to advanced gameplay, Mahjong Success combines expert instruction, guided games, practical experience, and a vibrant community to help players of all ages build confidence, develop strategy, and enjoy the game.",
      "desc2": "Whether you're learning individually, with friends, or as a family, your journey to Mahjong success starts here.",
      "title": "A structured pathway to learning, playing, and succeeding at Mahjong.",
      "subtitle": "The Journey",
      "buttonClickLink": "/book-session",
      "buttonTextLabel": "Learn. Play. Strategize. Speed. Succeed."
    } },
    create: {
      key: 'journey',
      name: 'The Journey',
      pageId: page.id,
      content: {
        "desc1": "From beginner foundations to advanced gameplay, Mahjong Success combines expert instruction, guided games, practical experience, and a vibrant community to help players of all ages build confidence, develop strategy, and enjoy the game.",
        "desc2": "Whether you're learning individually, with friends, or as a family, your journey to Mahjong success starts here.",
        "title": "A structured pathway to learning, playing, and succeeding at Mahjong.",
        "subtitle": "The Journey",
        "buttonClickLink": "/book-session",
        "buttonTextLabel": "Learn. Play. Strategize. Speed. Succeed."
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'who' } },
    update: { content: {
      "img": "/uploads/seat-everyone.jpg",
      "desc": "Whether you're discovering Mahjong for the first time or looking to deepen your skills, Mahjong Success welcomes players from all backgrounds, age groups, and experience levels.",
      "items": [
        "Complete beginners",
        "Casual players",
        "Experienced Mahjong enthusiasts",
        "Social players",
        "Families and friends",
        "Young adults and working professionals",
        "Seniors and lifelong learners",
        "Community groups",
        "Social clubs and associations",
        "Corporate teams",
        "Event organisers",
        "Anyone seeking a unique social, learning, or team-building experience"
      ],
      "title": "A Seat for Everyone.",
      "italic": "For Every Player. At Every Level.",
      "subtitle": "Who Is It For?",
      "buttonClickLink": "/book-session",
      "buttonTextLabel": "Your Seat. Your Game. Your Mahjong Success."
    } },
    create: {
      key: 'who',
      name: 'Who Is It For',
      pageId: page.id,
      content: {
        "img": "/uploads/seat-everyone.jpg",
        "desc": "Whether you're discovering Mahjong for the first time or looking to deepen your skills, Mahjong Success welcomes players from all backgrounds, age groups, and experience levels.",
        "items": [
          "Complete beginners",
          "Casual players",
          "Experienced Mahjong enthusiasts",
          "Social players",
          "Families and friends",
          "Young adults and working professionals",
          "Seniors and lifelong learners",
          "Community groups",
          "Social clubs and associations",
          "Corporate teams",
          "Event organisers",
          "Anyone seeking a unique social, learning, or team-building experience"
        ],
        "title": "A Seat for Everyone.",
        "italic": "For Every Player. At Every Level.",
        "subtitle": "Who Is It For?",
        "buttonClickLink": "/book-session",
        "buttonTextLabel": "Your Seat. Your Game. Your Mahjong Success."
      }
    }
  });
}
