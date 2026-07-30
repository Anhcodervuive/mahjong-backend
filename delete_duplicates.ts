import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function cleanup() {
  const gamesToKeep = [49, 50, 51];
  
  const result = await prisma.game.updateMany({
    where: {
      type: 'GUIDED_GAME',
      id: { notIn: gamesToKeep }
    },
    data: {
      isDeleted: true
    }
  });

  console.log(`Soft deleted ${result.count} duplicate guided games.`);
}

cleanup().then(() => prisma.$disconnect());
