import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const games = await prisma.game.findMany({
    where: { type: 'GUIDED_GAME', isDeleted: false },
    include: { categories: true }
  });
  console.log(`Found ${games.length} guided games.`);
  for (const g of games) {
    console.log(`- Game ${g.id}: ${g.name} (Categories: ${g.categories.length})`);
  }
}

check().then(() => prisma.$disconnect());
