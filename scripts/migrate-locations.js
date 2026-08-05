const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  console.log("Migrating locations using raw SQL...");
  const result = await prisma.$executeRawUnsafe(`
    INSERT INTO "_JoinCircleRequestToLocation" ("A", "B")
    SELECT id, "locationId"
    FROM "JoinCircleRequest"
    WHERE "locationId" IS NOT NULL
    ON CONFLICT DO NOTHING;
  `);
  console.log(`Migrated locations. Rows affected:`, result);
  console.log('Migration complete!');
}

run()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
