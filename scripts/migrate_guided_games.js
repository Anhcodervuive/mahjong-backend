const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting Guided Games Data Migration...');

  // Find all active games that have a category named "Guided Games" or similar
  const games = await prisma.game.findMany({
    where: { isDeleted: false },
    include: {
      categories: {
        where: { name: { contains: 'Guided', mode: 'insensitive' }, isDeleted: false }
      }
    }
  });

  let migratedCount = 0;

  for (const game of games) {
    if (game.categories.length === 0) continue; // No guided games category to move

    console.log(`Processing Game: ${game.name} (ID: ${game.id})`);

    // 1. Create a duplicate game for GUIDED_GAME type
    const newGame = await prisma.game.create({
      data: {
        name: game.name,
        description: game.description,
        coverImageId: game.coverImageId,
        iconImageId: game.iconImageId,
        order: game.order, // You could adjust the order if needed
        type: 'GUIDED_GAME',
      }
    });

    console.log(`  -> Created new Game for Guided Games: ${newGame.name} (ID: ${newGame.id})`);

    // 2. Move categories to the new game
    for (const category of game.categories) {
      const updatedCategory = await prisma.sessionCategory.update({
        where: { id: category.id },
        data: {
          gameId: newGame.id,
          name: 'Social Play', // Rename per client request
          type: 'GUIDED_GAME',
        }
      });
      console.log(`  -> Moved & Renamed Category: ${category.name} -> Social Play (ID: ${updatedCategory.id})`);

      // 3. Update all sessions inside this category
      const { count } = await prisma.session.updateMany({
        where: { categoryId: updatedCategory.id },
        data: { type: 'GUIDED_GAME' }
      });
      console.log(`  -> Updated ${count} Sessions to type GUIDED_GAME`);
    }

    migratedCount++;
  }

  console.log(`Migration completed successfully! Processed ${migratedCount} games.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
