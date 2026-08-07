const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.cmsPage.findUnique({
    where: { slug: 'fast-track-bundles' },
    include: { sections: true }
  });

  if (!page) {
    console.log('Page not found');
    return;
  }

  console.log(page.sections.map(s => s.key));
}

main().catch(console.error).finally(() => prisma.$disconnect());
