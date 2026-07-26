import { PrismaClient } from '@prisma/client';

export async function seed_points_calculator(prisma: PrismaClient) {
  console.log('Seeding points-calculator...');
  
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'points-calculator' },
    update: { title: 'Points Calculator' },
    create: { slug: 'points-calculator', title: 'Points Calculator' },
  });


  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'category_winning_conditions' } },
    update: { content: {
      "id": "winning-conditions",
      "icon": "🏆",
      "name": "Winning Conditions",
      "color": "#ECFDF5",
      "items": [
        {
          "id": "dealer-win",
          "name": "Dealer Win",
          "type": "toggle",
          "points": 10,
          "default": false
        },
        {
          "id": "self-draw",
          "name": "Self Draw",
          "type": "toggle",
          "points": 10,
          "default": false
        },
        {
          "id": "human-hand",
          "name": "Human Hand",
          "type": "toggle",
          "points": 5,
          "default": false
        },
        {
          "id": "heavenly-tile",
          "name": "Heavenly Tile",
          "type": "toggle",
          "points": 50,
          "default": false,
          "instantWin": true
        },
        {
          "id": "earthly-tile",
          "name": "Earthly Tile",
          "type": "toggle",
          "points": 50,
          "default": false,
          "instantWin": true
        },
        {
          "id": "seabed-tile",
          "name": "Seabed Tile",
          "type": "toggle",
          "points": 10,
          "default": false
        },
        {
          "id": "calling-ding",
          "name": "Calling / Ding Ding",
          "type": "toggle",
          "points": 10,
          "default": false
        },
        {
          "id": "true-single-wait",
          "name": "True Single Wait",
          "type": "toggle",
          "points": 10,
          "default": false
        },
        {
          "id": "calling-by-pairs",
          "name": "Calling by Pairs",
          "type": "toggle",
          "points": 15,
          "default": false
        }
      ]
    } },
    create: {
      key: 'category_winning_conditions',
      name: 'Scoring Category: Winning Conditions',
      pageId: page.id,
      content: {
        "id": "winning-conditions",
        "icon": "🏆",
        "name": "Winning Conditions",
        "color": "#ECFDF5",
        "items": [
          {
            "id": "dealer-win",
            "name": "Dealer Win",
            "type": "toggle",
            "points": 10,
            "default": false
          },
          {
            "id": "self-draw",
            "name": "Self Draw",
            "type": "toggle",
            "points": 10,
            "default": false
          },
          {
            "id": "human-hand",
            "name": "Human Hand",
            "type": "toggle",
            "points": 5,
            "default": false
          },
          {
            "id": "heavenly-tile",
            "name": "Heavenly Tile",
            "type": "toggle",
            "points": 50,
            "default": false,
            "instantWin": true
          },
          {
            "id": "earthly-tile",
            "name": "Earthly Tile",
            "type": "toggle",
            "points": 50,
            "default": false,
            "instantWin": true
          },
          {
            "id": "seabed-tile",
            "name": "Seabed Tile",
            "type": "toggle",
            "points": 10,
            "default": false
          },
          {
            "id": "calling-ding",
            "name": "Calling / Ding Ding",
            "type": "toggle",
            "points": 10,
            "default": false
          },
          {
            "id": "true-single-wait",
            "name": "True Single Wait",
            "type": "toggle",
            "points": 10,
            "default": false
          },
          {
            "id": "calling-by-pairs",
            "name": "Calling by Pairs",
            "type": "toggle",
            "points": 15,
            "default": false
          }
        ]
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'category_winds_dragons' } },
    update: { content: {
      "id": "winds-dragons",
      "icon": "🀄",
      "name": "Winds & Dragons",
      "color": "#FEF3E7",
      "items": [
        {
          "id": "pong-winds",
          "name": "Pong of Winds",
          "type": "chip",
          "points": 5,
          "default": false
        },
        {
          "id": "pong-dragons",
          "name": "Pong of Dragons",
          "type": "chip",
          "points": 10,
          "default": false
        },
        {
          "id": "little-3-winds",
          "name": "Little 3 Winds",
          "type": "chip",
          "points": 30,
          "default": false
        },
        {
          "id": "big-3-winds",
          "name": "Big 3 Winds",
          "type": "chip",
          "points": 50,
          "default": false
        },
        {
          "id": "little-4-winds",
          "name": "Little 4 Winds",
          "type": "chip",
          "points": 80,
          "default": false
        },
        {
          "id": "big-4-winds",
          "name": "Big 4 Winds",
          "type": "chip",
          "points": 100,
          "default": false
        },
        {
          "id": "little-dragons",
          "name": "Little Dragons",
          "type": "chip",
          "points": 40,
          "default": false
        },
        {
          "id": "big-dragons",
          "name": "Big Dragons",
          "type": "chip",
          "points": 80,
          "default": false
        }
      ]
    } },
    create: {
      key: 'category_winds_dragons',
      name: 'Scoring Category: Winds & Dragons',
      pageId: page.id,
      content: {
        "id": "winds-dragons",
        "icon": "🀄",
        "name": "Winds & Dragons",
        "color": "#FEF3E7",
        "items": [
          {
            "id": "pong-winds",
            "name": "Pong of Winds",
            "type": "chip",
            "points": 5,
            "default": false
          },
          {
            "id": "pong-dragons",
            "name": "Pong of Dragons",
            "type": "chip",
            "points": 10,
            "default": false
          },
          {
            "id": "little-3-winds",
            "name": "Little 3 Winds",
            "type": "chip",
            "points": 30,
            "default": false
          },
          {
            "id": "big-3-winds",
            "name": "Big 3 Winds",
            "type": "chip",
            "points": 50,
            "default": false
          },
          {
            "id": "little-4-winds",
            "name": "Little 4 Winds",
            "type": "chip",
            "points": 80,
            "default": false
          },
          {
            "id": "big-4-winds",
            "name": "Big 4 Winds",
            "type": "chip",
            "points": 100,
            "default": false
          },
          {
            "id": "little-dragons",
            "name": "Little Dragons",
            "type": "chip",
            "points": 40,
            "default": false
          },
          {
            "id": "big-dragons",
            "name": "Big Dragons",
            "type": "chip",
            "points": 80,
            "default": false
          }
        ]
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'hero' } },
    update: { content: {
      "desc": "Calculate your Taiwanese Mahjong score instantly. Select your combinations and let the calculator do the math for you. 213",
      "badge": "Taiwanese Mahjong. 312",
      "title": "Points Calculator. 213",
      "subtitle": "Score with Confidence. Play with Precision 123"
    } },
    create: {
      key: 'hero',
      name: 'Hero Section',
      pageId: page.id,
      content: {
        "desc": "Calculate your Taiwanese Mahjong score instantly. Select your combinations and let the calculator do the math for you. 213",
        "badge": "Taiwanese Mahjong. 312",
        "title": "Points Calculator. 213",
        "subtitle": "Score with Confidence. Play with Precision 123"
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'multipliers' } },
    update: { content: {
      "basePoints": 5,
      "instantWinMultiplier": 1
    } },
    create: {
      key: 'multipliers',
      name: 'Calculator Settings & Multipliers',
      pageId: page.id,
      content: {
        "basePoints": 5,
        "instantWinMultiplier": 1
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'category_flowers' } },
    update: { content: {
      "id": "flowers",
      "icon": "🌸",
      "name": "Flowers 1",
      "color": "#E7F3EE",
      "items": [
        {
          "id": "flower-count",
          "max": 8,
          "min": 0,
          "name": "Number of Flowers",
          "type": "stepper",
          "default": 0,
          "pointsPerUnit": 1
        },
        {
          "id": "seat-flower",
          "name": "Seat Flower",
          "type": "toggle",
          "points": 6,
          "default": false
        },
        {
          "id": "mixed-bouquet",
          "name": "Mixed Bouquet",
          "type": "toggle",
          "points": 10,
          "default": false
        },
        {
          "id": "full-bouquet",
          "name": "Full Bouquet",
          "type": "toggle",
          "points": 20,
          "default": false
        },
        {
          "id": "seven-flowers",
          "name": "7 Flowers Instant Win",
          "type": "toggle",
          "points": 50,
          "default": false,
          "instantWin": true
        },
        {
          "id": "eight-flowers",
          "name": "8 Flowers Instant Win",
          "type": "toggle",
          "points": 100,
          "default": false,
          "instantWin": true
        }
      ]
    } },
    create: {
      key: 'category_flowers',
      name: 'Scoring Category: Flowers',
      pageId: page.id,
      content: {
        "id": "flowers",
        "icon": "🌸",
        "name": "Flowers 1",
        "color": "#E7F3EE",
        "items": [
          {
            "id": "flower-count",
            "max": 8,
            "min": 0,
            "name": "Number of Flowers",
            "type": "stepper",
            "default": 0,
            "pointsPerUnit": 1
          },
          {
            "id": "seat-flower",
            "name": "Seat Flower",
            "type": "toggle",
            "points": 6,
            "default": false
          },
          {
            "id": "mixed-bouquet",
            "name": "Mixed Bouquet",
            "type": "toggle",
            "points": 10,
            "default": false
          },
          {
            "id": "full-bouquet",
            "name": "Full Bouquet",
            "type": "toggle",
            "points": 20,
            "default": false
          },
          {
            "id": "seven-flowers",
            "name": "7 Flowers Instant Win",
            "type": "toggle",
            "points": 50,
            "default": false,
            "instantWin": true
          },
          {
            "id": "eight-flowers",
            "name": "8 Flowers Instant Win",
            "type": "toggle",
            "points": 100,
            "default": false,
            "instantWin": true
          }
        ]
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'category_gongs' } },
    update: { content: {
      "id": "gongs",
      "icon": "🀫",
      "name": "Gongs",
      "color": "#F0FDF4",
      "items": [
        {
          "id": "open-gongs",
          "max": 4,
          "min": 0,
          "name": "Open Gongs",
          "type": "stepper",
          "default": 0,
          "pointsPerUnit": 5
        },
        {
          "id": "concealed-gongs",
          "max": 4,
          "min": 0,
          "name": "Concealed Gongs",
          "type": "stepper",
          "default": 0,
          "pointsPerUnit": 10
        },
        {
          "id": "robbing-gong",
          "name": "Robbing a Gong",
          "type": "toggle",
          "points": 15,
          "default": false
        },
        {
          "id": "self-draw-gong",
          "name": "Self Draw Gong",
          "type": "toggle",
          "points": 10,
          "default": false
        }
      ]
    } },
    create: {
      key: 'category_gongs',
      name: 'Scoring Category: Gongs',
      pageId: page.id,
      content: {
        "id": "gongs",
        "icon": "🀫",
        "name": "Gongs",
        "color": "#F0FDF4",
        "items": [
          {
            "id": "open-gongs",
            "max": 4,
            "min": 0,
            "name": "Open Gongs",
            "type": "stepper",
            "default": 0,
            "pointsPerUnit": 5
          },
          {
            "id": "concealed-gongs",
            "max": 4,
            "min": 0,
            "name": "Concealed Gongs",
            "type": "stepper",
            "default": 0,
            "pointsPerUnit": 10
          },
          {
            "id": "robbing-gong",
            "name": "Robbing a Gong",
            "type": "toggle",
            "points": 15,
            "default": false
          },
          {
            "id": "self-draw-gong",
            "name": "Self Draw Gong",
            "type": "toggle",
            "points": 10,
            "default": false
          }
        ]
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'category_hand_structure' } },
    update: { content: {
      "id": "hand-structure",
      "icon": "🧩",
      "name": "Hand Structure",
      "color": "#FDF4FF",
      "items": [
        {
          "id": "all-sheung",
          "name": "All Sheung Hand",
          "type": "card",
          "points": 20,
          "default": false,
          "description": "All sequences, no triplets"
        },
        {
          "id": "all-pong",
          "name": "All Pong Hand",
          "type": "card",
          "points": 30,
          "default": false,
          "description": "All triplets, no sequences"
        },
        {
          "id": "pure-suit",
          "name": "Pure Suit Hand",
          "type": "card",
          "points": 50,
          "default": false,
          "description": "One suit only + honors"
        },
        {
          "id": "semi-pure",
          "name": "Semi Pure Hand",
          "type": "card",
          "points": 30,
          "default": false,
          "description": "One suit + honors"
        },
        {
          "id": "two-suit",
          "name": "2 Suit Hand",
          "type": "card",
          "points": 15,
          "default": false,
          "description": "Two suits only"
        },
        {
          "id": "all-5-suit",
          "name": "All 5 Suit Hand",
          "type": "card",
          "points": 40,
          "default": false,
          "description": "All three suits + winds + dragons"
        },
        {
          "id": "step-up",
          "name": "Step Up Hand",
          "type": "card",
          "points": 25,
          "default": false,
          "description": "Sequences in steps of 1-2-3, 4-5-6, 7-8-9"
        },
        {
          "id": "sequential-pongs",
          "name": "Sequential Pongs",
          "type": "card",
          "points": 35,
          "default": false,
          "description": "Pongs in consecutive numbers"
        }
      ]
    } },
    create: {
      key: 'category_hand_structure',
      name: 'Scoring Category: Hand Structure',
      pageId: page.id,
      content: {
        "id": "hand-structure",
        "icon": "🧩",
        "name": "Hand Structure",
        "color": "#FDF4FF",
        "items": [
          {
            "id": "all-sheung",
            "name": "All Sheung Hand",
            "type": "card",
            "points": 20,
            "default": false,
            "description": "All sequences, no triplets"
          },
          {
            "id": "all-pong",
            "name": "All Pong Hand",
            "type": "card",
            "points": 30,
            "default": false,
            "description": "All triplets, no sequences"
          },
          {
            "id": "pure-suit",
            "name": "Pure Suit Hand",
            "type": "card",
            "points": 50,
            "default": false,
            "description": "One suit only + honors"
          },
          {
            "id": "semi-pure",
            "name": "Semi Pure Hand",
            "type": "card",
            "points": 30,
            "default": false,
            "description": "One suit + honors"
          },
          {
            "id": "two-suit",
            "name": "2 Suit Hand",
            "type": "card",
            "points": 15,
            "default": false,
            "description": "Two suits only"
          },
          {
            "id": "all-5-suit",
            "name": "All 5 Suit Hand",
            "type": "card",
            "points": 40,
            "default": false,
            "description": "All three suits + winds + dragons"
          },
          {
            "id": "step-up",
            "name": "Step Up Hand",
            "type": "card",
            "points": 25,
            "default": false,
            "description": "Sequences in steps of 1-2-3, 4-5-6, 7-8-9"
          },
          {
            "id": "sequential-pongs",
            "name": "Sequential Pongs",
            "type": "card",
            "points": 35,
            "default": false,
            "description": "Pongs in consecutive numbers"
          }
        ]
      }
    }
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'category_special_hands' } },
    update: { content: {
      "id": "special-hands",
      "icon": "⭐",
      "name": "Special Hands",
      "color": "#FFF7ED",
      "items": [
        {
          "id": "nico-nico",
          "name": "Nico Nico",
          "type": "large-card",
          "points": 100,
          "default": false,
          "description": "Seven pairs hand"
        },
        {
          "id": "13-orphans",
          "name": "13 Orphans",
          "type": "large-card",
          "points": 200,
          "default": false,
          "description": "One of each terminal and honor, plus a pair"
        },
        {
          "id": "16-orphans",
          "name": "16 Orphans",
          "type": "large-card",
          "points": 300,
          "default": false,
          "description": "Extended 13 orphans with extra tiles"
        },
        {
          "id": "chicken-hand",
          "name": "Chicken Hand",
          "type": "large-card",
          "points": 5,
          "default": false,
          "description": "Basic winning hand with no special patterns"
        },
        {
          "id": "jade-hand",
          "name": "Jade Hand",
          "type": "large-card",
          "points": 80,
          "default": false,
          "description": "All green tiles"
        },
        {
          "id": "ruby-hand",
          "name": "Ruby Hand",
          "type": "large-card",
          "points": 80,
          "default": false,
          "description": "All red tiles"
        },
        {
          "id": "diamond-hand",
          "name": "Diamond Hand",
          "type": "large-card",
          "points": 80,
          "default": false,
          "description": "All white tiles"
        },
        {
          "id": "sapphire-hand",
          "name": "Sapphire Hand",
          "type": "large-card",
          "points": 80,
          "default": false,
          "description": "All blue/black tiles"
        }
      ]
    } },
    create: {
      key: 'category_special_hands',
      name: 'Scoring Category: Special Hands',
      pageId: page.id,
      content: {
        "id": "special-hands",
        "icon": "⭐",
        "name": "Special Hands",
        "color": "#FFF7ED",
        "items": [
          {
            "id": "nico-nico",
            "name": "Nico Nico",
            "type": "large-card",
            "points": 100,
            "default": false,
            "description": "Seven pairs hand"
          },
          {
            "id": "13-orphans",
            "name": "13 Orphans",
            "type": "large-card",
            "points": 200,
            "default": false,
            "description": "One of each terminal and honor, plus a pair"
          },
          {
            "id": "16-orphans",
            "name": "16 Orphans",
            "type": "large-card",
            "points": 300,
            "default": false,
            "description": "Extended 13 orphans with extra tiles"
          },
          {
            "id": "chicken-hand",
            "name": "Chicken Hand",
            "type": "large-card",
            "points": 5,
            "default": false,
            "description": "Basic winning hand with no special patterns"
          },
          {
            "id": "jade-hand",
            "name": "Jade Hand",
            "type": "large-card",
            "points": 80,
            "default": false,
            "description": "All green tiles"
          },
          {
            "id": "ruby-hand",
            "name": "Ruby Hand",
            "type": "large-card",
            "points": 80,
            "default": false,
            "description": "All red tiles"
          },
          {
            "id": "diamond-hand",
            "name": "Diamond Hand",
            "type": "large-card",
            "points": 80,
            "default": false,
            "description": "All white tiles"
          },
          {
            "id": "sapphire-hand",
            "name": "Sapphire Hand",
            "type": "large-card",
            "points": 80,
            "default": false,
            "description": "All blue/black tiles"
          }
        ]
      }
    }
  });
}
