import { PrismaClient } from '@prisma/client';

export async function seed_guided_games(prisma: PrismaClient) {
  console.log('Seeding guided-games...');
  
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'guided-games' },
    update: { title: 'Guided Games' },
    create: { slug: 'guided-games', title: 'Guided Games' },
  });


  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'hero' } },
    update: { content: {
      "badge": "Guided Games",
      "title": "Practice. Play. Improve.",
      "subtitle": "Apply what you’ve learned in a supportive, real-game environment."
    } },
    create: {
      key: 'hero',
      name: 'Hero Section',
      pageId: page.id,
      content: {
        "badge": "Guided Games",
        "title": "Practice. Play. Improve.",
        "subtitle": "Apply what you’ve learned in a supportive, real-game environment."
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'learn' } },
    update: { content: {
      "WHAT_YOULL_LEARN": [
        "Game rules and mechanics",
        "Winning strategies and techniques",
        "Hand-building approaches",
        "Tile selection and discard strategy",
        "Risk assessment and decision-making",
        "Reading the table and anticipating opponents",
        "Scoring opportunities",
        "Common mistakes and how to avoid them",
        "Variant-specific rules and gameplay",
        "Strategic thinking and game awareness"
      ]
    } },
    create: {
      key: 'learn',
      name: 'What You\'ll Learn',
      pageId: page.id,
      content: {
        "WHAT_YOULL_LEARN": [
          "Game rules and mechanics",
          "Winning strategies and techniques",
          "Hand-building approaches",
          "Tile selection and discard strategy",
          "Risk assessment and decision-making",
          "Reading the table and anticipating opponents",
          "Scoring opportunities",
          "Common mistakes and how to avoid them",
          "Variant-specific rules and gameplay",
          "Strategic thinking and game awareness"
        ]
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'sessions' } },
    update: { content: {
      "badge": "Session Options",
      "title": "Choose Your Guided Session",
      "subtitle": "Two formats designed for different stages of your journey — pick the one that fits where you are now."
    } },
    create: {
      key: 'sessions',
      name: 'Sessions Config',
      pageId: page.id,
      content: {
        "badge": "Session Options",
        "title": "Choose Your Guided Session",
        "subtitle": "Two formats designed for different stages of your journey — pick the one that fits where you are now."
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'four_game' } },
    update: { content: {
      "body": "Led by an experienced Mahjong trainer, the session provides opportunities to play multiple games while receiving real-time coaching, strategic guidance, and personalised feedback. Players are exposed to a wider range of game situations, decision-making opportunities, and Mahjong formats, helping them strengthen their overall gameplay and strategic thinking. The focus is on developing confidence, consistency, speed, and proficiency through practical experience.",
      "helps": [
        "Consolidate learning from their current level",
        "Gain a deeper understanding of concepts and strategies",
        "Build gameplay speed and efficiency",
        "Strengthen strategic thinking and decision-making",
        "Develop consistency and game awareness",
        "Practise games introduced during training",
        "Experience a wider variety of gameplay situations",
        "Build confidence before progressing to the next level",
        "Become more adaptable and versatile players"
      ],
      "intro": "Designed for players who are already familiar with Mahjong concepts, rules, and gameplay and are looking to deepen their understanding through extended guided play.",
      "label": "4-Game Session",
      "tagline": "Practice → Play → Strategy → Speed → Succeed",
      "btnLabel": "Book a 4-Game Session",
      "duration": "Extended Session",
      "includes": [
        "Guided play through 4 Mahjong games",
        "Advanced application of concepts learned at the current level",
        "Exposure to additional game variations and formats",
        "Strategy coaching throughout the session",
        "Real-time guidance and feedback",
        "Practical decision-making and gameplay analysis",
        "Increased opportunities to build speed and confidence",
        "Greater exposure to different game situations and challenges"
      ]
    } },
    create: {
      key: 'four_game',
      name: '4-Game Session',
      pageId: page.id,
      content: {
        "body": "Led by an experienced Mahjong trainer, the session provides opportunities to play multiple games while receiving real-time coaching, strategic guidance, and personalised feedback. Players are exposed to a wider range of game situations, decision-making opportunities, and Mahjong formats, helping them strengthen their overall gameplay and strategic thinking. The focus is on developing confidence, consistency, speed, and proficiency through practical experience.",
        "helps": [
          "Consolidate learning from their current level",
          "Gain a deeper understanding of concepts and strategies",
          "Build gameplay speed and efficiency",
          "Strengthen strategic thinking and decision-making",
          "Develop consistency and game awareness",
          "Practise games introduced during training",
          "Experience a wider variety of gameplay situations",
          "Build confidence before progressing to the next level",
          "Become more adaptable and versatile players"
        ],
        "intro": "Designed for players who are already familiar with Mahjong concepts, rules, and gameplay and are looking to deepen their understanding through extended guided play.",
        "label": "4-Game Session",
        "tagline": "Practice → Play → Strategy → Speed → Succeed",
        "btnLabel": "Book a 4-Game Session",
        "duration": "Extended Session",
        "includes": [
          "Guided play through 4 Mahjong games",
          "Advanced application of concepts learned at the current level",
          "Exposure to additional game variations and formats",
          "Strategy coaching throughout the session",
          "Real-time guidance and feedback",
          "Practical decision-making and gameplay analysis",
          "Increased opportunities to build speed and confidence",
          "Greater exposure to different game situations and challenges"
        ]
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'guided-games_hero' } },
    update: { content: {
      "badge": "Guided Games",
      "title": "Practice Builds Confidence. Confidence Builds Success.",
      "btnLink": "/book-session",
      "btnLabel": "Join the circle",
      "subtitle": "At Mahjong Success, understanding the rules is only the beginning. True learning happens when knowledge is applied through practice, experience, and guided play.",
      "text_35_book_now": "Book Now",
      "text_24_join_the_circle": "Join the circle",
      "text_31_join_the_circle": "Join the circle",
      "text_34_join_the_circle": "Join the circle",
      "text_32_ready_to_play_smarter": "Ready to Play Smarter?",
      "text_29_build_through_practice": "Build Through Practice.",
      "text_28_learn_through_instruction": "Learn Through Instruction.",
      "text_30_succeed_through_experience": "Succeed Through Experience.",
      "text_21_because_at_mahjong_success_we": "Because at Mahjong Success, we know that:",
      "text_25_our_recommended_learning_path": "Our Recommended Learning Path",
      "text_22_knowledge_becomes_skill_throug": "Knowledge Becomes Skill Through Practice.",
      "text_23_and_with_practice_comes_confid": "And with practice comes confidence. With confidence comes success.",
      "text_26_a_progressive_journey_to_maste": "A Progressive Journey to Mastery",
      "text_27_mahjong_success_is_designed_as": "Mahjong Success is designed as a progressive learning journey. This pathway allows players to learn new concepts, practise them with support, build confidence through repetition, develop speed and consistency, and ultimately become fully prepared for the next stage of their journey.",
      "text_33_contact_us_today_to_book_a_gui": "Contact us today to book a Guided Games session and discover how expert coaching can help you build confidence, strengthen strategy, and accelerate your journey to Mahjong Success.",
      "text_36_master_mahjong_one_tile_at_a_t": "Master Mahjong One Tile at a Time."
    } },
    create: {
      key: 'guided-games_hero',
      name: 'Hero & CTA',
      pageId: page.id,
      content: {
        "badge": "Guided Games",
        "title": "Practice Builds Confidence. Confidence Builds Success.",
        "btnLink": "/book-session",
        "btnLabel": "Join the circle",
        "subtitle": "At Mahjong Success, understanding the rules is only the beginning. True learning happens when knowledge is applied through practice, experience, and guided play.",
        "text_35_book_now": "Book Now",
        "text_24_join_the_circle": "Join the circle",
        "text_31_join_the_circle": "Join the circle",
        "text_34_join_the_circle": "Join the circle",
        "text_32_ready_to_play_smarter": "Ready to Play Smarter?",
        "text_29_build_through_practice": "Build Through Practice.",
        "text_28_learn_through_instruction": "Learn Through Instruction.",
        "text_30_succeed_through_experience": "Succeed Through Experience.",
        "text_21_because_at_mahjong_success_we": "Because at Mahjong Success, we know that:",
        "text_25_our_recommended_learning_path": "Our Recommended Learning Path",
        "text_22_knowledge_becomes_skill_throug": "Knowledge Becomes Skill Through Practice.",
        "text_23_and_with_practice_comes_confid": "And with practice comes confidence. With confidence comes success.",
        "text_26_a_progressive_journey_to_maste": "A Progressive Journey to Mastery",
        "text_27_mahjong_success_is_designed_as": "Mahjong Success is designed as a progressive learning journey. This pathway allows players to learn new concepts, practise them with support, build confidence through repetition, develop speed and consistency, and ultimately become fully prepared for the next stage of their journey.",
        "text_33_contact_us_today_to_book_a_gui": "Contact us today to book a Guided Games session and discover how expert coaching can help you build confidence, strengthen strategy, and accelerate your journey to Mahjong Success.",
        "text_36_master_mahjong_one_tile_at_a_t": "Master Mahjong One Tile at a Time."
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'guided-games_learn' } },
    update: { content: {
      "tag": "What are Guided Games?",
      "tag2": "What You'll Learn",
      "desc1": "Our Guided Games sessions are designed to bridge the gap between learning and doing. By combining real-game experience with expert coaching, players have the opportunity to strengthen their understanding, refine their strategies, and build confidence at the Mahjong table.",
      "desc2": "Unlike traditional lessons that focus primarily on instruction, Guided Games place you directly into gameplay situations where an experienced Mahjong trainer provides real-time guidance, coaching, feedback, and strategic insights. Players learn not only what to do, but why they should do it.",
      "desc3": "Whether you have just completed a training level, want to reinforce your learning, improve your decision-making, increase your gameplay speed, or prepare for the next stage of your Mahjong journey, Guided Games provide the perfect environment to develop your skills through practical experience.",
      "title": "Bridging Learning and Doing",
      "title2": "Skills Developed Through Guided Play",
      "btnLabel": "Join the circle",
      "WHAT_YOULL_LEARN": [
        "Game rules and mechanics",
        "Winning strategies and techniques",
        "Hand-building approaches",
        "Tile selection and discard strategy",
        "Risk assessment and decision-making",
        "Reading the table and anticipating opponents",
        "Scoring opportunities",
        "Common mistakes and how to avoid them",
        "Variant-specific rules and gameplay",
        "Strategic thinking and game awareness"
      ]
    } },
    create: {
      key: 'guided-games_learn',
      name: 'Learn Section',
      pageId: page.id,
      content: {
        "tag": "What are Guided Games?",
        "tag2": "What You'll Learn",
        "desc1": "Our Guided Games sessions are designed to bridge the gap between learning and doing. By combining real-game experience with expert coaching, players have the opportunity to strengthen their understanding, refine their strategies, and build confidence at the Mahjong table.",
        "desc2": "Unlike traditional lessons that focus primarily on instruction, Guided Games place you directly into gameplay situations where an experienced Mahjong trainer provides real-time guidance, coaching, feedback, and strategic insights. Players learn not only what to do, but why they should do it.",
        "desc3": "Whether you have just completed a training level, want to reinforce your learning, improve your decision-making, increase your gameplay speed, or prepare for the next stage of your Mahjong journey, Guided Games provide the perfect environment to develop your skills through practical experience.",
        "title": "Bridging Learning and Doing",
        "title2": "Skills Developed Through Guided Play",
        "btnLabel": "Join the circle",
        "WHAT_YOULL_LEARN": [
          "Game rules and mechanics",
          "Winning strategies and techniques",
          "Hand-building approaches",
          "Tile selection and discard strategy",
          "Risk assessment and decision-making",
          "Reading the table and anticipating opponents",
          "Scoring opportunities",
          "Common mistakes and how to avoid them",
          "Variant-specific rules and gameplay",
          "Strategic thinking and game awareness"
        ]
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'guided-games_sessions' } },
    update: { content: {
      "desc": "Two formats designed for different stages of your journey — pick the one that fits where you are now.",
      "title": "Session Options",
      "subtitle": "Choose Your Guided Session"
    } },
    create: {
      key: 'guided-games_sessions',
      name: 'Sessions Header',
      pageId: page.id,
      content: {
        "desc": "Two formats designed for different stages of your journey — pick the one that fits where you are now.",
        "title": "Session Options",
        "subtitle": "Choose Your Guided Session"
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'guided-games_two_game' } },
    update: { content: {
      "body": "Each Mahjong Success level introduces new games, new concepts, strategies, techniques, and formats. This session provides an opportunity to apply these lessons in a real-game environment while receiving guidance and support from an experienced Mahjong trainer. Rather than simply learning the theory, players get to play the games taught at their level, ask questions, explore strategies, and gain a deeper understanding of how the game works in practice.",
      "helps": [
        "Strengthen their understanding of the current level",
        "Practise games introduced during training",
        "Build confidence at the table",
        "Improve strategic thinking and decision-making",
        "Gain practical gameplay experience",
        "Become more comfortable with rules and game flow",
        "Learn through expert guidance and feedback"
      ],
      "intro": "Designed for players who have recently completed a Mahjong Success training level and want to strengthen their understanding through practical gameplay.",
      "label": "2-Game Session",
      "tagline": "Learn It. Play It. Understand It.",
      "btnLabel": "Book a 2-Game Session",
      "duration": "Approximately 1 Hour",
      "includes": [
        "Guided play through 2 Mahjong games",
        "Reinforcement of concepts learned during training",
        "Practical application of rules and strategies",
        "Real-time coaching and support",
        "Strategy discussions and gameplay insights",
        "Question-and-answer opportunities",
        "Personalised feedback and game analysis",
        "Opportunities to practise games taught at the current level",
        "Introduction to new games"
      ]
    } },
    create: {
      key: 'guided-games_two_game',
      name: '2-Game Session',
      pageId: page.id,
      content: {
        "body": "Each Mahjong Success level introduces new games, new concepts, strategies, techniques, and formats. This session provides an opportunity to apply these lessons in a real-game environment while receiving guidance and support from an experienced Mahjong trainer. Rather than simply learning the theory, players get to play the games taught at their level, ask questions, explore strategies, and gain a deeper understanding of how the game works in practice.",
        "helps": [
          "Strengthen their understanding of the current level",
          "Practise games introduced during training",
          "Build confidence at the table",
          "Improve strategic thinking and decision-making",
          "Gain practical gameplay experience",
          "Become more comfortable with rules and game flow",
          "Learn through expert guidance and feedback"
        ],
        "intro": "Designed for players who have recently completed a Mahjong Success training level and want to strengthen their understanding through practical gameplay.",
        "label": "2-Game Session",
        "tagline": "Learn It. Play It. Understand It.",
        "btnLabel": "Book a 2-Game Session",
        "duration": "Approximately 1 Hour",
        "includes": [
          "Guided play through 2 Mahjong games",
          "Reinforcement of concepts learned during training",
          "Practical application of rules and strategies",
          "Real-time coaching and support",
          "Strategy discussions and gameplay insights",
          "Question-and-answer opportunities",
          "Personalised feedback and game analysis",
          "Opportunities to practise games taught at the current level",
          "Introduction to new games"
        ]
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'guided-games_four_game' } },
    update: { content: {
      "body": "Led by an experienced Mahjong trainer, the session provides opportunities to play multiple games while receiving real-time coaching, strategic guidance, and personalised feedback. Players are exposed to a wider range of game situations, decision-making opportunities, and Mahjong formats, helping them strengthen their overall gameplay and strategic thinking. The focus is on developing confidence, consistency, speed, and proficiency through practical experience.",
      "helps": [
        "Consolidate learning from their current level",
        "Gain a deeper understanding of concepts and strategies",
        "Build gameplay speed and efficiency",
        "Strengthen strategic thinking and decision-making",
        "Develop consistency and game awareness",
        "Practise games introduced during training",
        "Experience a wider variety of gameplay situations",
        "Build confidence before progressing to the next level",
        "Become more adaptable and versatile players"
      ],
      "intro": "Designed for players who are already familiar with Mahjong concepts, rules, and gameplay and are looking to deepen their understanding through extended guided play.",
      "label": "4-Game Session",
      "tagline": "Practice -> Play -> Strategy -> Speed -> Succeed",
      "btnLabel": "Book a 4-Game Session",
      "duration": "Extended Session",
      "includes": [
        "Guided play through 4 Mahjong games",
        "Advanced application of concepts learned at the current level",
        "Exposure to additional game variations and formats",
        "Strategy coaching throughout the session",
        "Real-time guidance and feedback",
        "Practical decision-making and gameplay analysis",
        "Increased opportunities to build speed and confidence",
        "Greater exposure to different game situations and challenges"
      ]
    } },
    create: {
      key: 'guided-games_four_game',
      name: '4-Game Session',
      pageId: page.id,
      content: {
        "body": "Led by an experienced Mahjong trainer, the session provides opportunities to play multiple games while receiving real-time coaching, strategic guidance, and personalised feedback. Players are exposed to a wider range of game situations, decision-making opportunities, and Mahjong formats, helping them strengthen their overall gameplay and strategic thinking. The focus is on developing confidence, consistency, speed, and proficiency through practical experience.",
        "helps": [
          "Consolidate learning from their current level",
          "Gain a deeper understanding of concepts and strategies",
          "Build gameplay speed and efficiency",
          "Strengthen strategic thinking and decision-making",
          "Develop consistency and game awareness",
          "Practise games introduced during training",
          "Experience a wider variety of gameplay situations",
          "Build confidence before progressing to the next level",
          "Become more adaptable and versatile players"
        ],
        "intro": "Designed for players who are already familiar with Mahjong concepts, rules, and gameplay and are looking to deepen their understanding through extended guided play.",
        "label": "4-Game Session",
        "tagline": "Practice -> Play -> Strategy -> Speed -> Succeed",
        "btnLabel": "Book a 4-Game Session",
        "duration": "Extended Session",
        "includes": [
          "Guided play through 4 Mahjong games",
          "Advanced application of concepts learned at the current level",
          "Exposure to additional game variations and formats",
          "Strategy coaching throughout the session",
          "Real-time guidance and feedback",
          "Practical decision-making and gameplay analysis",
          "Increased opportunities to build speed and confidence",
          "Greater exposure to different game situations and challenges"
        ]
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'two_game' } },
    update: { content: {
      "body": "Each Mahjong Success level introduces new games, new concepts, strategies, techniques, and formats. This session provides an opportunity to apply these lessons in a real-game environment while receiving guidance and support from an experienced Mahjong trainer. Rather than simply learning the theory, players get to play the games taught at their level, ask questions, explore strategies, and gain a deeper understanding of how the game works in practice.",
      "helps": [
        "Strengthen their understanding of the current level",
        "Practise games introduced during training",
        "Build confidence at the table",
        "Improve strategic thinking and decision-making",
        "Gain practical gameplay experience",
        "Become more comfortable with rules and game flow",
        "Learn through expert guidance and feedback"
      ],
      "intro": "Designed for players who have recently completed a Mahjong Success training level and want to strengthen their understanding through practical gameplay.",
      "label": "2-Game Session",
      "tagline": "Learn It. Play It. Understand It.",
      "btnLabel": "Book a 2-Game Session",
      "duration": "Approximately 1 Hour",
      "includes": [
        "Guided play through 2 Mahjong games",
        "Reinforcement of concepts learned during training",
        "Practical application of rules and strategies",
        "Real-time coaching and support",
        "Strategy discussions and gameplay insights",
        "Question-and-answer opportunities",
        "Personalised feedback and game analysis",
        "Opportunities to practise games taught at the current level",
        "Introduction to new games"
      ]
    } },
    create: {
      key: 'two_game',
      name: '2-Game Session',
      pageId: page.id,
      content: {
        "body": "Each Mahjong Success level introduces new games, new concepts, strategies, techniques, and formats. This session provides an opportunity to apply these lessons in a real-game environment while receiving guidance and support from an experienced Mahjong trainer. Rather than simply learning the theory, players get to play the games taught at their level, ask questions, explore strategies, and gain a deeper understanding of how the game works in practice.",
        "helps": [
          "Strengthen their understanding of the current level",
          "Practise games introduced during training",
          "Build confidence at the table",
          "Improve strategic thinking and decision-making",
          "Gain practical gameplay experience",
          "Become more comfortable with rules and game flow",
          "Learn through expert guidance and feedback"
        ],
        "intro": "Designed for players who have recently completed a Mahjong Success training level and want to strengthen their understanding through practical gameplay.",
        "label": "2-Game Session",
        "tagline": "Learn It. Play It. Understand It.",
        "btnLabel": "Book a 2-Game Session",
        "duration": "Approximately 1 Hour",
        "includes": [
          "Guided play through 2 Mahjong games",
          "Reinforcement of concepts learned during training",
          "Practical application of rules and strategies",
          "Real-time coaching and support",
          "Strategy discussions and gameplay insights",
          "Question-and-answer opportunities",
          "Personalised feedback and game analysis",
          "Opportunities to practise games taught at the current level",
          "Introduction to new games"
        ]
      }
    }
  });
}
