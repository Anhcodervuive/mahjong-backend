const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const page = await prisma.cmsPage.findUnique({
    where: { slug: 'fast-track-bundles' },
    include: { sections: true }
  });
  if (!page) return console.log('Page not found');
  page.sections.forEach(s => {
    console.log('Section:', s.name, JSON.stringify(s.content, null, 2));
  });
  await prisma.$disconnect();
}
run();
