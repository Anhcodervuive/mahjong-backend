import { PrismaClient } from '@prisma/client';
import { seedPlaydaysPage } from '../prisma/seeds/playdays.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Running Playdays Page Seeder...');
  await seedPlaydaysPage(prisma);
  console.log('🎉 Done!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding playdays page:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
