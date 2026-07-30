import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'guided-games-booking' },
    update: { title: 'Guided Games Booking' },
    create: { slug: 'guided-games-booking', title: 'Guided Games Booking' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'guided-games-booking_content' } },
    update: {
      content: {
        PREFERRED_LOCATIONS: [
          "Studio 1 (Central)",
          "Studio 2 (Downtown)",
          "Your Location (Extra Fee)"
        ]
      }
    },
    create: {
      pageId: page.id,
      key: 'guided-games-booking_content',
      name: 'Booking Content (Locations, Timings)',
      content: {
        PREFERRED_LOCATIONS: [
          "Studio 1 (Central)",
          "Studio 2 (Downtown)",
          "Your Location (Extra Fee)"
        ]
      }
    }
  });

  console.log('Seeded CMS section for guided-games-booking');
}

seed().then(() => prisma.$disconnect());
