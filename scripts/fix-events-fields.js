const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const DEFAULT_DEFAULT_OFFERINGS = [
    { icon: 'Users', title: 'Mahjong Socials', desc: 'Regular social gatherings where players of all skill levels can meet, play, and connect with fellow Mahjong enthusiasts.' },
    { icon: 'PartyPopper', title: 'Private Mahjong Parties', desc: 'Celebrate birthdays, anniversaries, family gatherings, and special occasions with a unique Mahjong-themed experience tailored to your guests.' },
    { icon: 'Building2', title: 'Corporate & Team-Building', desc: 'Bring colleagues together through interactive Mahjong sessions that encourage communication, teamwork, strategic thinking, and fun.' },
    { icon: 'Plane', title: 'Mahjong Offsites', desc: 'Organised Mahjong retreats, outings, and special events designed to create memorable experiences beyond the traditional game table.' },
    { icon: 'Heart', title: 'Community Get-Togethers', desc: 'Casual and themed Mahjong events that foster friendships, learning, and community engagement.' },
    { icon: 'Trophy', title: 'Tournaments & Competitions', desc: 'Structured events for players looking to challenge themselves and test their skills in a fun and supportive atmosphere.' },
  ];

  const DEFAULT_DEFAULT_MANIA_FOR = [
    "Complete beginners",
    "Casual players",
    "Experienced Mahjong enthusiasts",
    "Corporate teams",
    "Community groups",
    "Families and friends",
    "Event organisers",
    "Anyone looking for a unique social experience",
  ];

  const DEFAULT_DEFAULT_MANIA_SERVICES = [
    "Organise and manage Mahjong-themed events",
    "Provide Mahjong tables, mats, and equipment",
    "Facilitate games and activities",
    "Host social and corporate gatherings",
    "Design customised Mahjong experiences",
    "Coordinate tournaments and competitions",
    "Create memorable celebrations centred around Mahjong",
  ];

  const DEFAULT_DEFAULT_THINKING_BENEFITS = [
    "Strengthen analytical and critical thinking skills",
    "Improve strategic decision-making",
    "Enhance problem-solving abilities",
    "Encourage teamwork and collaboration",
    "Build communication and interpersonal skills",
    "Increase employee engagement and participation",
    "Support workplace wellbeing and mental agility",
    "Create memorable team-building experiences",
    "Foster cross-functional relationships and networking",
    "Promote a culture of continuous learning",
  ];

  const DEFAULT_DEFAULT_THINKING_IDEAL = [
    "Corporate teams",
    "Leadership groups",
    "Human Resources (HR) professionals",
    "Learning & Development (L&D) managers",
    "Employee engagement specialists",
    "Event organisers",
    "Anyone looking for a strategic team-building activity",
  ];

  const DEFAULT_DEFAULT_THINKING_PROGRAMMES = [
    "Leadership and management development sessions",
    "Employee engagement activities",
    "Corporate offsites and retreats",
    "Learning & Development initiatives",
    "Networking and client engagement events",
    "Bespoke Mahjong-based learning experiences",
  ];

  // Find the events page id
  const page = await prisma.cmsPage.findUnique({
    where: { slug: 'events' }
  });

  if (page) {
    await prisma.cmsSection.update({
      where: { pageId_key: { pageId: page.id, key: 'events_content' } },
      data: {
        content: {
          OFFERINGS: DEFAULT_DEFAULT_OFFERINGS,
          MANIA_FOR: DEFAULT_DEFAULT_MANIA_FOR,
          MANIA_SERVICES: DEFAULT_DEFAULT_MANIA_SERVICES,
          THINKING_BENEFITS: DEFAULT_DEFAULT_THINKING_BENEFITS,
          THINKING_IDEAL: DEFAULT_DEFAULT_THINKING_IDEAL,
          THINKING_PROGRAMMES: DEFAULT_DEFAULT_THINKING_PROGRAMMES
        }
      }
    });
    console.log('Fixed default content structure for events page.');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
