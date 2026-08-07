const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`ALTER TABLE "Location" RENAME COLUMN "daysAndTime" TO "parking";`);
  console.log("Column renamed successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
