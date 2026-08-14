const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Fetch all age groups and fix encoding of en-dash characters
  const ageGroups = await prisma.ageGroup.findMany();
  
  for (const ag of ageGroups) {
    // Replace common broken dash encodings with proper en-dash
    const fixedName = ag.name
      .replace(/\u00e2\u0080\u0093/g, '\u2013')  // UTF-8 en-dash misread as Latin-1
      .replace(/\?\?\?/g, '\u2013')               // literal ??? 
      .replace(/\?\?/g, '\u2013');                 // literal ??

    if (fixedName !== ag.name) {
      await prisma.ageGroup.update({
        where: { id: ag.id },
        data: { name: fixedName }
      });
      console.log(`Fixed: "${ag.name}" -> "${fixedName}"`);
    } else {
      console.log(`OK: "${ag.name}"`);
    }
  }
  console.log('Done!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
