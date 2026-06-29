import { PrismaClient } from '@prisma/client';

export async function seedProducts(prisma: PrismaClient) {
  console.log('Seeding Games, Categories, and Sessions...');

  // 1. International Goulash
  const goulash = await prisma.game.create({
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

  // 2. American Mahjong
  const american = await prisma.game.create({
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

  // 3. Asian Traditional Format (ATF)
  const atf = await prisma.game.create({
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

  // 4. Taiwanese Mahjong
  const taiwanese = await prisma.game.create({
    data: {
      name: 'Taiwanese Mahjong',
      description: 'The distinctive 16-tile Mahjong variant.',
      categories: {
        create: [
          {
            name: 'Training Levels',
            description: 'Structured training levels for Taiwanese Mahjong.',
            sessions: {
              create: [
                { title: 'Level 1: 16-Tile Foundation', pricePerPerson: 50, duration: 120, minPlayers: 1, maxPlayers: 4 },
                { title: 'Level 2: Special Tai Scoring', pricePerPerson: 55, duration: 120, minPlayers: 1, maxPlayers: 4 },
                { title: 'Level 3: Extra Tile Strategy', pricePerPerson: 60, duration: 120, minPlayers: 1, maxPlayers: 4 },
                { title: 'Level 4: Competitive Taiwanese Play', pricePerPerson: 65, duration: 120, minPlayers: 1, maxPlayers: 4 },
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

  console.log('Finished seeding Games, Categories, and Sessions.');
}
