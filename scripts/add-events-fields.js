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
    'Players looking for casual, pressure-free Mahjong sessions',
    'Friends and families wanting a unique and engaging activity',
    'Corporate teams seeking a fresh approach to team-building',
    'Anyone wanting to meet new people in a relaxed environment',
    'Mahjong enthusiasts eager to join a growing community',
    'Groups celebrating special occasions with a memorable experience',
  ];
  const DEFAULT_DEFAULT_MANIA_SERVICES = [
    { title: 'Community Play Sessions', desc: 'Regular open play sessions where you can meet, mingle, and play Mahjong in a relaxed setting.' },
    { title: 'Social Mixers', desc: 'Themed events and casual gatherings that combine Mahjong with food, drinks, and networking.' },
    { title: 'Beginner-Friendly Socials', desc: 'Low-pressure environments where newer players can practise and learn in a supportive atmosphere.' },
    { title: 'Private Group Bookings', desc: 'Customised Mahjong sessions for birthdays, celebrations, or private gatherings.' },
    { title: 'Casual Competitions', desc: 'Friendly, non-intimidating tournaments for players who enjoy a little competitive spirit without the pressure.' },
    { title: 'Corporate Social Events', desc: 'Engaging, interactive Mahjong activities designed to bring teams together outside the traditional office setting.' },
  ];
  const DEFAULT_DEFAULT_THINKING_BENEFITS = [
    { title: 'Strategic Thinking', desc: 'Learn to anticipate opponents moves, assess risks, and adapt strategies in real-time.' },
    { title: 'Decision-Making Under Pressure', desc: 'Develop the ability to make calculated decisions efficiently in a dynamic and ever-changing environment.' },
    { title: 'Pattern Recognition', desc: 'Enhance cognitive skills by identifying patterns, probabilities, and opportunities within complex scenarios.' },
    { title: 'Adaptability & Resilience', desc: 'Practise adjusting strategies on the fly when plans change or opponents take an unexpected approach.' },
    { title: 'Communication & Collaboration', desc: 'Build stronger relationships and better communication through interactive gameplay and post-game discussions.' },
    { title: 'Executive Presence', desc: 'Develop focus, composure, and emotional intelligence while navigating complex game situations.' },
  ];
  const DEFAULT_DEFAULT_THINKING_IDEAL = [
    'Corporate teams looking for a challenging and intellectually stimulating offsite activity.',
    'Professionals aiming to sharpen their strategic thinking, problem-solving, and decision-making skills.',
    'Leadership groups seeking an interactive alternative to traditional workshops or seminars.',
    'Individuals interested in the cognitive, psychological, and strategic aspects of Mahjong.',
    'Teams looking to improve communication, collaboration, and adaptability in a dynamic environment.',
    'Organisations wanting a unique, engaging, and memorable team-building experience.',
  ];
  const DEFAULT_DEFAULT_THINKING_PROGRAMMES = [
    'Corporate Strategy Workshops',
    'Executive Leadership Development',
    'Team-Building Offsites',
    'Analytical Thinking Masterclasses',
    'Networking and Client Engagement Events',
    'Bespoke Mahjong-based Learning Experiences',
  ];

  await prisma.cmsSection.update({
    where: { pageId_key: { pageId: 367, key: 'events_content' } },
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
  console.log('Seeded default content for events page.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
