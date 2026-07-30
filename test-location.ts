import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  try {
    const loc = await prisma.location.create({
      data: { name: 'Test', description: 'Test desc', price: 50 }
    });
    console.log('Success:', loc);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
