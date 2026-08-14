const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.cmsPage.findUnique({
    where: { slug: 'events' },
  });

  if (!page) {
    console.error("Events page not found.");
    return;
  }

  // Insert the missing approach section
  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page.id, key: 'events_thinking_approach' } },
    update: {},
    create: {
      pageId: page.id,
      key: 'events_thinking_approach',
      name: 'The Thinking Table: Approach',
      content: {
        tag: "A DIFFERENT APPROACH TO LEARNING",
        title: "Experiential, Not Classroom-Based",
        desc1: "Unlike traditional classroom-based training, our programmes use experiential learning to engage participants through strategic play, real-time decision-making, observation, communication, and collaboration.",
        desc2: "The result is a highly engaging experience that participants remember long after the event is over.",
        items: [
          { icon: 'Target', title: "Strategic Play" },
          { icon: 'Lightbulb', title: "Real-Time Decisions" },
          { icon: 'MessageCircle', title: "Communication" },
          { icon: 'Users', title: "Collaboration" },
        ]
      },
      order: 11
    }
  });

  console.log('Successfully added events_thinking_approach section.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
