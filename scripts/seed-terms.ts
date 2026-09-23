import { PrismaClient } from '@prisma/client';
import { seedTermsAndConditionsPage } from '../prisma/seeds/terms-and-conditions.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Running Terms & Conditions Seeder...');
  await seedTermsAndConditionsPage(prisma);
  console.log('🎉 Done!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding terms:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
