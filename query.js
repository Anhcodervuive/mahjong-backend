const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  console.log('Session:', await prisma.session.findFirst());
  console.log('ServiceOption:', await prisma.serviceOption.findFirst());
  console.log('AgeGroup:', await prisma.ageGroup.findFirst());
}
main().catch(console.error).finally(() => prisma.$disconnect());
