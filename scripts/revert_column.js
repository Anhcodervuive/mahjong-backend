const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`ALTER TABLE "Location" RENAME COLUMN "parking" TO "daysAndTime";`);
  console.log("Column reverted successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
