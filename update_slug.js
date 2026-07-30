const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const page = await prisma.cmsPage.findUnique({ where: { slug: 'points-calculator' } });
    if (page) {
      await prisma.cmsPage.update({
        where: { slug: 'points-calculator' },
        data: { 
          slug: 'taiwanese-points-calculator',
          title: 'Taiwanese Points Calculator'
        }
      });
      console.log('Successfully updated slug from points-calculator to taiwanese-points-calculator');
    } else {
      console.log('Page with slug points-calculator not found');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
