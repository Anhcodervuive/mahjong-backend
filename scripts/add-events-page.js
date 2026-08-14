const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'events' },
    update: {},
    create: {
      slug: 'events',
      title: 'Events',
      sections: {
        create: [
          {
            key: 'events_content',
            name: 'Page Content',
            content: {}
          }
        ]
      }
    }
  });
  console.log('Created events page in CMS:', page);
}

main().catch(console.error).finally(() => prisma.$disconnect());
