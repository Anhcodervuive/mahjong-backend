import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { seedHomePage } from './seeds/home.seed';
import { seedAboutPage } from './seeds/about.seed';
import { seedReceivePage } from './seeds/receive.seed';
import { seedProducts } from './seeds/products.seed';

const prisma = new PrismaClient();

async function main() {
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
  await seedHomePage(prisma);
  await seedAboutPage(prisma);
  await seedReceivePage(prisma);

  // Seed Products (Games, Categories, Sessions)
  await seedProducts(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
