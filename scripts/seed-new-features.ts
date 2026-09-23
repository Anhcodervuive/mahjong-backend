import { PrismaClient } from '@prisma/client';
import { seedPlaydaysPage } from '../prisma/seeds/playdays.seed';
import { seedTermsAndConditionsPage } from '../prisma/seeds/terms-and-conditions.seed';
import { seedFastTrackSplitPages } from '../prisma/seeds/fast-track-split.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Running Seeder for All New Features (Playdays, Terms, Fast-Track Split)...');
  
  console.log('\n--- 1. Playdays ---');
  await seedPlaydaysPage(prisma);

  console.log('\n--- 2. Terms & Conditions ---');
  await seedTermsAndConditionsPage(prisma);

  console.log('\n--- 3. Fast-Track Split Pages ---');
  await seedFastTrackSplitPages(prisma);

  console.log('\n🎉 All new features seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
