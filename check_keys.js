const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const page = await prisma.cmsPage.findUnique({ where: { slug: 'fast-track-bundles' }, include: { sections: true } });
  const contentSection = page.sections.find(s => s.key === 'fast-track-bundles_content');
  if (contentSection) {
    const content = typeof contentSection.content === 'string' ? JSON.parse(contentSection.content) : contentSection.content;
    console.log('Keys in content:', Object.keys(content));
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
