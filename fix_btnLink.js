const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.cmsPage.findUnique({ where: { slug: 'guided-games' } });
  if (!page) {
    console.log('Page not found');
    return;
  }
  
  const heroSec = await prisma.cmsSection.findUnique({ where: { pageId_key: { pageId: page.id, key: 'guided-games_hero' } } });
  if (heroSec && heroSec.content) {
    heroSec.content.btnLink = '/guided-games-booking';
    await prisma.cmsSection.update({ where: { id: heroSec.id }, data: { content: heroSec.content } });
    console.log('Updated guided-games_hero btnLink to /guided-games-booking');
  }
  
  const heroOld = await prisma.cmsSection.findUnique({ where: { pageId_key: { pageId: page.id, key: 'hero' } } });
  if (heroOld && heroOld.content) {
    heroOld.content.btnLink = '/guided-games-booking';
    await prisma.cmsSection.update({ where: { id: heroOld.id }, data: { content: heroOld.content } });
    console.log('Updated hero btnLink to /guided-games-booking');
  }
}

main().then(() => console.log('Done')).catch(console.error).finally(() => prisma.$disconnect());
