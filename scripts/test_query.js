const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRawUnsafe(`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';`);
  console.log("Tables:", result);
}

main().catch(console.error).finally(() => prisma.$disconnect());
