import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

export async function seedPointsCalculatorPage(prisma: PrismaClient) {
  console.log('Seeding points-calculator...');
  
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'points-calculator' },
    update: { title: 'Points Calculator' },
    create: { slug: 'points-calculator', title: 'Points Calculator' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'hero' } },
    update: { content: {
      "title": "Taiwanese Mahjong",
      "subtitle": "Calculate your Taiwanese Mahjong score instantly. Select your combinations and let the calculator do the math for you.",
      "backgroundImage": "/uploads/images/playing-mahjong-table_1781599451923.jpg"
    } },
    create: {
      key: 'hero',
      name: 'Hero Section',
      pageId: page.id,
      content: {
        "title": "Taiwanese Mahjong",
        "subtitle": "Calculate your Taiwanese Mahjong score instantly. Select your combinations and let the calculator do the math for you.",
        "backgroundImage": "/uploads/images/playing-mahjong-table_1781599451923.jpg"
      }
    }
  });

  // Read scoringData from frontend JSON file
  const scoringDataPath = path.resolve(__dirname, '../../../mahjong-frontend-ssr/src/data/mahjong-scoring.json');
  let scoringData = {};
  if (fs.existsSync(scoringDataPath)) {
    scoringData = JSON.parse(fs.readFileSync(scoringDataPath, 'utf8'));
  }

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'scoring-data' } },
    update: { content: scoringData },
    create: {
      key: 'scoring-data',
      name: 'Scoring Data',
      pageId: page.id,
      content: scoringData
    }
  });
}
