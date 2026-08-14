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

  const THINKING_PROGRAMMES = [
    "Leadership and management development sessions",
    "Employee engagement activities",
    "Corporate offsites and retreats",
    "Learning & Development initiatives",
    "Networking and client engagement events",
    "Bespoke Mahjong-based learning experiences",
  ];

  await prisma.cmsSection.update({
    where: { pageId_key: { pageId: page.id, key: 'events_thinking_programmes' } },
    data: {
      content: {
        title: "Ready to Transform Your Team?",
        desc: "We design customised experiences tailored to your organisation's goals — adaptable to different team sizes, learning objectives, and event formats.",
        subtitle: "Let's build a programme that works for your team",
        items: THINKING_PROGRAMMES,
        btnLabel: "Contact Us Today",
        btnLink: "/contact"
      }
    }
  });

  console.log('Successfully updated events_thinking_programmes section.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
