const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const pages = await prisma.cmsPage.findMany();
  console.log("Pages:", pages.map(p => p.slug));
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
