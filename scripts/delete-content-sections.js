const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sections = await prisma.cmsSection.findMany({
    where: {
      key: { endsWith: '_content' },
      page: { slug: { not: 'community' } }
    },
    include: { page: true }
  });

  console.log(`Found ${sections.length} unused _content sections.`);
  for (const s of sections) {
    await prisma.cmsSection.delete({ where: { id: s.id } });
    console.log(`Deleted section ${s.key} on page ${s.page.slug} (ID: ${s.id})`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
