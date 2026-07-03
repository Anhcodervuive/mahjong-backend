import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const weekly = await prisma.weeklySchedule.findMany();
  console.log('Weekly:', weekly);
  
  const overrides = await prisma.dateOverride.findMany();
  console.log('Overrides:', overrides);
}

main().finally(() => prisma.$disconnect());
