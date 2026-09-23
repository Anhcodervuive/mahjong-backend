import { PrismaClient } from '@prisma/client';
import { seedFastTrackSplitPages } from '../prisma/seeds/fast-track-split.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Running Fast-Track Split Pages Seeder...');
  await seedFastTrackSplitPages(prisma);
  console.log('🎉 Done!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding fast-track split pages:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
