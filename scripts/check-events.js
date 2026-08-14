const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const page = await prisma.cmsPage.findUnique({
    where: { slug: 'events' },
    include: { sections: true }
  });
  console.log(JSON.stringify(page.sections, null, 2));
}
run().catch(console.error).finally(() => prisma.$disconnect());
