import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding guided-games-booking...');
  
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'guided-games-booking' },
    update: { title: 'Guided Games Booking' },
    create: { slug: 'guided-games-booking', title: 'Guided Games Booking' },
  });

  console.log('Created CMS Page:', page);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
