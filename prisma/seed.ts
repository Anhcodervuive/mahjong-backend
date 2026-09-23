import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { seed_home } from './seeds/home.seed';
import { seedAboutPage } from './seeds/about.seed';
import { seedReceivePage } from './seeds/receive.seed';
import { seedProducts } from './seeds/products.seed';
import { seedDynamicPages } from './seeds/dynamic_pages.seed';
import { seedFastTrackBundlesPage } from './seeds/fast_track_bundles.seed';
import { seed_points_calculator } from './seeds/points_calculator.seed';
import { seed_international_points_calculator } from './seeds/international_points_calculator.seed';
import { seed_guided_games } from './seeds/guided_games.seed';
import { seedLocations } from './seeds/locations.seed';
import { seedPlaydaysPage } from './seeds/playdays.seed';
import { seedTermsAndConditionsPage } from './seeds/terms-and-conditions.seed';
import { seedFastTrackSplitPages } from './seeds/fast-track-split.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Database Seeding...');

  // Admin user
  const adminEmail = 'admin@example.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Super Admin',
        role: 'ADMIN' as Role,
      },
    });
    console.log('Admin user seeded.');
  } else {
    console.log('Admin already exists.');
  }

  // Seed CMS pages
  console.log('Seeding CMS data...');
  await seed_home(prisma);
  await seedAboutPage(prisma);
  await seedReceivePage(prisma);
  await seedDynamicPages(prisma);
  await seedFastTrackBundlesPage(prisma);
  await seed_points_calculator(prisma);
  await seed_international_points_calculator(prisma);
  await seed_guided_games(prisma);

  // Seed Products (Games, Categories, Sessions)
  await seedProducts(prisma);

  // Seed Locations
  await seedLocations(prisma);

  // Seed New CMS Pages (Playdays, Terms & Conditions, Fast-Track Split Pages)
  await seedPlaydaysPage(prisma);
  await seedTermsAndConditionsPage(prisma);
  await seedFastTrackSplitPages(prisma);

  console.log('✅ Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
