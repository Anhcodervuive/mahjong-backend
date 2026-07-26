import { PrismaClient } from '@prisma/client';

export async function seedProducts(prisma: PrismaClient) {
  console.log('Seeding Games, Categories, and Sessions...');

  // 1. International Goulash
  let goulash = await prisma.game.findFirst({ where: { name: 'International Goulash' } });
  if (!goulash) {
    goulash = await prisma.game.create({
      data: {
        name: 'International Goulash',
        description: 'The standard modern Mahjong style.',
        categories: {
          create: [
            {
              name: 'Training Levels',
              description: 'Structured training levels for International Goulash.',
              sessions: {
                create: [
                  { title: 'Level 1: Foundation', pricePerPerson: 50, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 2: Joker Strategy', pricePerPerson: 55, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 3: Advanced Hand Building', pricePerPerson: 60, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 4: Partnership Play', pricePerPerson: 65, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 5: Concealed Hand Mastery', pricePerPerson: 70, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 6: Scoring & Game Management', pricePerPerson: 75, duration: 120, minPlayers: 1, maxPlayers: 4 },
                ]
              }
            },
            {
              name: 'Guided Games',
              description: 'Practical play sessions with guidance.',
              sessions: {
                create: [
                  { title: '2-Game Session', pricePerPerson: 40, duration: 60, minPlayers: 1, maxPlayers: 4 },
                  { title: '4-Game Session', pricePerPerson: 75, duration: 120, minPlayers: 1, maxPlayers: 4 },
                ]
              }
            }
          ]
        }
      }
    });
  }

  // 2. American Mahjong
  let american = await prisma.game.findFirst({ where: { name: 'American Mahjong' } });
  if (!american) {
    american = await prisma.game.create({
      data: {
        name: 'American Mahjong',
        description: 'Using the National Mah Jongg League rules and cards.',
        categories: {
          create: [
            {
              name: 'Training Levels',
              description: 'Structured training levels for American Mahjong.',
              sessions: {
                create: [
                  { title: 'Level 1: Foundation', pricePerPerson: 50, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 2: Charleston & Passing Strategy', pricePerPerson: 55, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 3: Joker Strategy', pricePerPerson: 60, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 4: Card Reading & Hand Selection', pricePerPerson: 65, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 5: Defensive Play', pricePerPerson: 70, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 6: Competitive Play & Scoring', pricePerPerson: 75, duration: 120, minPlayers: 1, maxPlayers: 4 },
                ]
              }
            },
            {
              name: 'Guided Games',
              description: 'Practical play sessions with guidance.',
              sessions: {
                create: [
                  { title: '2-Game Session', pricePerPerson: 40, duration: 60, minPlayers: 1, maxPlayers: 4 },
                  { title: '4-Game Session', pricePerPerson: 75, duration: 120, minPlayers: 1, maxPlayers: 4 },
                ]
              }
            }
          ]
        }
      }
    });
  }

  // 3. Asian Traditional Format (ATF)
  let atf = await prisma.game.findFirst({ where: { name: 'Asian Traditional Format (ATF)' } });
  if (!atf) {
    atf = await prisma.game.create({
      data: {
        name: 'Asian Traditional Format (ATF)',
        description: 'Classic Mahjong formats popular in Asia.',
        categories: {
          create: [
            {
              name: 'Training Levels',
              description: 'Structured training levels for ATF.',
              sessions: {
                create: [
                  { title: 'Level 1: ATF Foundation', pricePerPerson: 50, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 2: Fast-Paced Gameplay', pricePerPerson: 55, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 3: Advanced Hand Building (ATF)', pricePerPerson: 60, duration: 120, minPlayers: 1, maxPlayers: 4 },
                  { title: 'Level 4: Defensive & Discard Strategies', pricePerPerson: 65, duration: 120, minPlayers: 1, maxPlayers: 4 },
                ]
              }
            },
            {
              name: 'Guided Games',
              description: 'Practical play sessions with guidance.',
              sessions: {
                create: [
                  { title: '2-Game Session', pricePerPerson: 40, duration: 60, minPlayers: 1, maxPlayers: 4 },
                  { title: '4-Game Session', pricePerPerson: 75, duration: 120, minPlayers: 1, maxPlayers: 4 },
                ]
              }
            }
          ]
        }
      }
    });
  }

  // 5. Age Groups
  const ageGroups = [
    "10–17 years (accompanied by an adult)",
    "Young Adults (18–29)",
    "30–40 years",
    "40–50 years",
    "50–60 years",
    "60 and above",
  ];
  for (const name of ageGroups) {
    const existingAgeGroup = await prisma.ageGroup.findFirst({ where: { name } });
    if (!existingAgeGroup) {
      await prisma.ageGroup.create({ data: { name } });
    }
  }

  // 6. Service Options (Experience)
  const serviceOptions = [
    { name: "Regular", description: "Standard booking", price: 0 },
    { name: "Play at your convenience", description: "Flexible timing", price: 100 },
    { name: "Travelling Tutor", description: "Tutor travels to your location", price: 100 }
  ];
  
  for (const option of serviceOptions) {
    const existingOption = await prisma.serviceOption.findFirst({ where: { name: option.name } });
    if (!existingOption) {
      await prisma.serviceOption.create({ data: option });
    }
  }

  console.log('Finished seeding Games, Categories, Sessions, Age Groups, and Service Options.');
}
