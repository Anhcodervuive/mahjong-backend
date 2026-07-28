import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function assignOrders() {
  console.log('Assigning orders to existing data to preserve current visual sequence...');

  // 1. Games (Currently ordered by createdAt DESC)
  const games = await prisma.game.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  for (let i = 0; i < games.length; i++) {
    await prisma.game.update({
      where: { id: games[i].id },
      data: { order: i + 1 }
    });
  }
  console.log(`✅ Assigned order to ${games.length} Games.`);

  // 2. Categories (Currently ordered by createdAt ASC in findByGame, let's preserve that per game)
  for (const game of games) {
    const categories = await prisma.sessionCategory.findMany({
      where: { gameId: game.id },
      orderBy: { createdAt: 'asc' }
    });
    
    for (let i = 0; i < categories.length; i++) {
      await prisma.sessionCategory.update({
        where: { id: categories[i].id },
        data: { order: i + 1 }
      });
    }
  }
  console.log(`✅ Assigned order to Categories.`);

  // 3. Sessions (Currently ordered by createdAt DESC per category)
  const categoriesAll = await prisma.sessionCategory.findMany();
  for (const category of categoriesAll) {
    const sessions = await prisma.session.findMany({
      where: { categoryId: category.id, parentId: null },
      orderBy: { createdAt: 'desc' }
    });
    
    for (let i = 0; i < sessions.length; i++) {
      await prisma.session.update({
        where: { id: sessions[i].id },
        data: { order: i + 1 }
      });
      
      // Handle child sessions (if any)
      const children = await prisma.session.findMany({
        where: { parentId: sessions[i].id },
        orderBy: { createdAt: 'desc' }
      });
      for (let j = 0; j < children.length; j++) {
        await prisma.session.update({
          where: { id: children[j].id },
          data: { order: j + 1 }
        });
      }
    }
  }
  console.log(`✅ Assigned order to Sessions.`);

  console.log('Done!');
}

assignOrders()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
