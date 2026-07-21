const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const page = await prisma.cmsPage.findUnique({ where: { slug: 'fast-track-bundles' }, include: { sections: true } });
  console.log(JSON.stringify(page.sections, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
