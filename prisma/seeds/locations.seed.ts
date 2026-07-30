import { PrismaClient } from '@prisma/client';

export async function seedLocations(prisma: PrismaClient) {
  const initialLocations = [
    {
      name: "Studio 1 (Central)",
      description: "Our main central location.",
      address: "Central Studio 1",
      price: 0,
    },
    {
      name: "Studio 2 (Downtown)",
      description: "Our downtown branch.",
      address: "Downtown Studio 2",
      price: 0,
    },
    {
      name: "Your Location (Extra Fee)",
      description: "We come to you.",
      address: "",
      price: 50,
    }
  ];

  console.log('Seeding Locations...');
  
  for (const loc of initialLocations) {
    const existing = await prisma.location.findFirst({
      where: { name: loc.name }
    });
    if (!existing) {
      await prisma.location.create({
        data: loc
      });
      console.log(`Created location: ${loc.name}`);
    } else {
      console.log(`Location ${loc.name} already exists. Skipping.`);
    }
  }
}
