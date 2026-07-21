const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const homePage = await prisma.cmsPage.findUnique({ where: { slug: 'home' } });
  if (homePage) {
    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: homePage.id, key: 'difference' } },
      data: {
        content: {
          title: 'What Makes a Mahjong Success Player Different?',
          subtitle: 'The Mahjong Success Difference',
          desc: '10 qualities that set successful players apart.',
          cards: [
            { num: 1,  title: "Well-Trained & Well-Prepared",     desc: "They have a clear understanding of the games they have learned, including the rules, concepts, strategies, and gameplay instructions.", img: "/diff-1-well-trained.jpg",   icon: "BookOpen"      },
            { num: 2,  title: "Strong Etiquette & Table Manners",  desc: "They understand proper Mahjong etiquette, table conduct, sportsmanship, and respectful gameplay, contributing to a positive experience for everyone.", img: "/diff-2-etiquette.jpg",      icon: "Users"         },
            { num: 3,  title: "Strong Knowledge of the Rules",     desc: "They understand the game mechanics and play confidently without uncertainty or confusion.", img: "/diff-3-rules.jpg",          icon: "FileText"      },
            { num: 4,  title: "Deep Understanding of Tiles",       desc: "They know the value, purpose, and strategic use of different tiles and how they contribute to winning hands.", img: "/diff-4-tiles.jpg",          icon: "Layers"        },
            { num: 5,  title: "Joker Strategy Experts",            desc: "They understand joker rules, joker exchanges, joker optimisation, and how to maximise the value of jokers across different games.", img: "/diff-5-joker.jpg",          icon: "Crown"         },
            { num: 6,  title: "Strategic Thinkers",                desc: "They think ahead, evaluate options, manage risks, and make informed decisions during gameplay.", img: "/diff-6-strategic.jpg",      icon: "Target"        },
            { num: 7,  title: "Familiar with Multiple Variants",   desc: "They are exposed to different Mahjong games and formats, making them adaptable and versatile players.", img: "/diff-7-variants.jpg",       icon: "Shuffle"       },
            { num: 8,  title: "Answers, Not Questions",            desc: "Having completed structured training and FAQs, they spend less time asking basic questions and more time focusing on gameplay and strategy.", img: "/diff-8-answers.jpg",        icon: "MessageSquare" },
            { num: 9,  title: "Smooth & Efficient Gameplay",       desc: "They understand game flow, avoid unnecessary delays, and help maintain an enjoyable pace of play.", img: "/diff-9-smooth.jpg",         icon: "Zap"           },
            { num: 10, title: "Confidence Through Practice",       desc: "Through guided games and practical play, they build confidence, speed, consistency, and real-game experience.", img: "/diff-10-confidence.jpg",    icon: "TrendingUp"    },
          ]
        }
      }
    });

    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: homePage.id, key: 'receive' } },
      data: {
        content: {
          title: 'What You Receive at Each Training Level',
          subtitle: 'The Mahjong Success Experience',
          desc: 'Every Mahjong Success training level is designed to provide a structured, engaging, and practical learning experience that combines instruction, strategy, and gameplay.',
          button: 'Learn. Play. Apply. Succeed.',
          img1: '/receive-banner-1.jpg',
          img2: '/receive-banner-2.jpg',
          cards1: [
                { icon: "BookOpen",    title: "Comprehensive Training & Instruction",          desc: "Learn through a detailed trainer-led presentation that covers the concepts, rules, strategies, techniques, and gameplay principles relevant to that level." },
                { icon: "HelpCircle", title: "Frequently Asked Questions & Expert Guidance",   desc: "Gain clarity through detailed explanations and answers to commonly asked questions, helping you better understand the game and avoid common mistakes." },
                { icon: "Layers",     title: "Understand the Tiles & Their Uses",              desc: "Learn about the tiles used at each level, their significance, how they interact within different hands, and how to maximise their value during gameplay." },
          ],
          cards2: [
                { icon: "Target",       title: "Learn New Concepts & Strategies",        desc: "Master the key concepts, hand-building techniques, strategic approaches, and decision-making skills introduced at that level." },
                { icon: "GraduationCap", title: "Guided Learning Games",                 desc: "Play carefully selected Mahjong games designed to reinforce the concepts taught during training. Each game includes detailed explanations, practical examples, and strategic insights to accelerate learning." },
                { icon: "Users",        title: "Apply Learning Through Practical Play",  desc: "Put theory into practice by applying newly learned concepts, tile knowledge, and strategies during gameplay, helping you build experience and confidence." },
          ]
        }
      }
    });

    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: homePage.id, key: 'community' } },
      data: {
        content: {
          tag: 'Community',
          title: 'Join the Mahjong Success Circle',
          subtitle: 'Learn Together. Play Together. Succeed Together.',
          desc: "Whether you're a beginner, social player, or experienced enthusiast, you'll find a welcoming environment where you can improve your game, meet like-minded people, and enjoy the culture and camaraderie of Mahjong.",
          expectTitle: "What to Expect",
          features: [
            { icon: "CalendarDays", label: "Mahjong social and networking opportunities" },
            { icon: "Users",        label: "Players of all skill levels welcome" },
            { icon: "Heart",        label: "Friendly and supportive community" },
            { icon: "Trophy",       label: "Social events, matches, and tournaments" },
          ],
          footer: "Your Community. Your Table. Your Mahjong Success."
        }
      }
    });
  }

  const wmsPage = await prisma.cmsPage.findUnique({ where: { slug: 'why-mahjong-success' } });
  if (wmsPage) {
    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: wmsPage.id, key: 'structured_path' } },
      data: {
        content: {
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
        }
      }
    });

    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: wmsPage.id, key: 'guided_instruction' } },
      data: {
        content: {
          tag: "02 — Learn Through Guided Instruction",
          title: "Learn It. Play It. Master It.",
          desc1: "At Mahjong Success, learning doesn't stop with understanding the rules. We believe the best way to improve is through a combination of structured instruction and guided gameplay.",
          desc2: "Benefit from expert-led classes, personalised guidance, and practical learning experiences designed to accelerate your progress. Whether through group sessions or one-to-one coaching, you'll receive the support needed to understand the game, improve your strategy, and play with confidence.",
          cardTitle: "Guided Instruction",
          cardDesc: "Learn the fundamentals, strategies, techniques, scoring systems, and Mahjong variants through structured lessons designed to build knowledge progressively.",
          variantsTitle: "Mahjong Variants We Teach",
          variantsDesc: "By learning different Mahjong variants, you'll gain a deeper understanding of the game, discover new strategic approaches, and develop the confidence to play in a wide range of Mahjong environments.",
          variants: ["National Mahjong League", "International Goulash", "Taiwanese", "Partnership Mahjong", "Speciality and Custom Mahjong Formats"]
        }
      }
    });

    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: wmsPage.id, key: 'guided_play' } },
      data: {
        content: {
          tag: "03 — Guided Play Sessions",
          title: "Knowledge Becomes Skill Through Practice",
          desc: "Our expert-led guided play sessions allow players to participate in real games while receiving coaching, feedback, and strategic insights throughout the session.",
          cardTitle: "Guided Play Sessions",
          cardDesc: "Knowledge becomes skill through practice. These small-group sessions provide opportunities to apply what you've learned in a real-game environment with tutor support throughout.",
          bulletsTitle: "These sessions provide opportunities to",
          benefits: ["Apply what you've learned in a real-game environment", "Learn new games and Mahjong variants through play", "Improve strategic decision-making", "Receive guidance from experienced instructors", "Learn from other players at the table", "Build confidence and game awareness", "Develop stronger gameplay habits", "Gain practical experience in a supportive setting"],
          note: "Guided play bridges the gap between learning and mastery, helping players become more confident, capable, and successful at the table."
        }
      }
    });

    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: wmsPage.id, key: 'convenience' } },
      data: {
        content: {
          tag: "04 — We Bring Mahjong to You",
          title: "Learning on Your Terms",
          desc1: "Our travelling instructors can conduct lessons at your home, office, community space, or preferred venue, allowing you to learn in a comfortable and familiar environment.",
          desc2: "Whether you're looking for one-to-one coaching, private group lessons, family learning sessions, or customised training for friends and colleagues, we can tailor the experience to suit your schedule, location, and learning goals.",
          desc3: "Enjoy the flexibility of learning Mahjong where and when it works best for you.",
          idealTitle: "Ideal For",
          ideal: ["Busy professionals", "Families and friends learning together", "Private groups", "Community groups", "Corporate teams", "Students seeking personalised coaching"]
        }
      }
    });

    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: wmsPage.id, key: 'variety' } },
      data: {
        content: {
          tag: "05 — Experience a Variety of Mahjong Games",
          title: "More Games. More Strategies. More Growth.",
          desc1: "At each level, students are introduced to a carefully selected range of Mahjong games and formats designed to expand their thinking, challenge their decision-making, and develop new strategic skills. Rather than repeatedly playing the same game, you'll experience a variety of Mahjong styles — each with its own unique rules, objectives, and strategic considerations. Each level typically includes five or more game variations.",
          desc2: "By learning through a variety of games, players remain engaged, challenged, and continuously growing throughout their Mahjong journey.",
          benefits: ["Explore different styles of play", "Develop new strategic approaches", "Strengthen analytical thinking", "Improve problem-solving skills", "Adapt to changing game situations", "Discover the Mahjong formats they enjoy most"]
        }
      }
    });

    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: wmsPage.id, key: 'community' } },
      data: {
        content: {
          tag: "06 — Join the Mahjong Success Community",
          title: "Learning is Better Together",
          desc: "When you join Mahjong Success, you become part of a welcoming community of like-minded players who share a passion for learning, playing, networking, and growing together. Whether you're a beginner or an experienced player, you'll always find a friendly table waiting for you.",
          featuresTitle: "The Community Experience",
          features: ["Weekly Mahjong gatherings and social play sessions", "Opportunities to practise and improve your skills", "A supportive and welcoming learning environment", "Meet fellow Mahjong enthusiasts and build lasting friendships", "Learn from players with different experiences and playing styles", "Access to community events and special gatherings"]
        }
      }
    });

    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: wmsPage.id, key: 'events' } },
      data: {
        content: {
          tag: "07 — Exclusive Events, Socials & Tournaments",
          title: "Beyond the Training Room",
          desc: "Mahjong is a game meant to be enjoyed, shared, and celebrated. As a Mahjong Success player, you'll have opportunities to participate in exclusive events and gatherings designed to enhance your playing experience.",
          benefitsTitle: "Gain access to",
          benefits: ["Mahjong social and networking opportunities", "Friendly matches and practice games", "Organised tournaments and competitions", "Mahjong meetups and community gatherings", "Mahjong-themed events", "Mahjong offsites and retreats"]
        }
      }
    });

    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: wmsPage.id, key: 'mind' } },
      data: {
        content: {
          tag: "08 — Strengthen Your Mind & Enrich Your Life",
          title: "More Than Just a Game",
          desc1: "The benefits of playing Mahjong extend far beyond the table. Engaging in structured gameplay provides a valuable mental workout that supports cognitive health, focus, and overall wellbeing.",
          desc2: "Learning and playing Mahjong requires players to memorise rules, recognise patterns, assess risks, anticipate moves, and make strategic decisions—all of which stimulate brain function and promote lifelong mental engagement.",
          benefitsTitle: "Skills Developed",
          benefits: ["Improve concentration and focus", "Strengthen memory and recall", "Enhance analytical and strategic thinking", "Develop problem-solving abilities", "Improve decision-making skills", "Promote adaptability and mental agility", "Encourage patience and discipline", "Support lifelong learning and cognitive wellbeing", "Foster meaningful social connections", "Build confidence and resilience"]
        }
      }
    });
  }
}
main().then(() => console.log('Done')).catch(console.error);
