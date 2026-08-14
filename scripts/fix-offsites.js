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

  // Update the events_offsites section to match the real UI text (no image, split descriptions)
  await prisma.cmsSection.update({
    where: { pageId_key: { pageId: page.id, key: 'events_offsites' } },
    data: {
      content: {
        title: "Mahjong Offsites",
        desc1: "Looking for a unique and engaging offsite experience for your team, organisation, community, or private group?",
        desc2: "Our Mahjong Offsites combine strategic thinking, teamwork, social interaction, and friendly competition in a relaxed and enjoyable environment. Whether you're planning a corporate retreat, team-building session, client appreciation event, community gathering, or private group experience, we'll create a customised Mahjong event tailored to your objectives.",
        desc3: "From venue setup and facilitation to gameplay guidance and event management, we take care of every detail so you can focus on connecting, learning, and having fun.",
        desc4: "Contact us today to discuss a customised Mahjong Offsite experience for your team or group.",
        btnLabel: "Contact Us Today",
        btnLink: "/contact",
        footer: "Think Together. Play Together. Grow Together."
      }
    }
  });

  console.log('Successfully updated events_offsites section.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
