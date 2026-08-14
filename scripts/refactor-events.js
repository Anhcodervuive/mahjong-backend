const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.cmsPage.findUnique({
    where: { slug: 'events' },
    include: { sections: true }
  });

  if (!page) {
    console.error("Events page not found.");
    return;
  }

  // Find existing sections to preserve their list data
  const maniaSection = page.sections.find(s => s.key === 'events_mania');
  const thinkingSection = page.sections.find(s => s.key === 'events_thinking');

  const OFFERINGS = maniaSection?.content?.OFFERINGS || [
    { icon: 'Users', title: 'Mahjong Socials', desc: 'Regular social gatherings where players of all skill levels can meet, play, and connect with fellow Mahjong enthusiasts.' },
    { icon: 'PartyPopper', title: 'Private Mahjong Parties', desc: 'Celebrate birthdays, anniversaries, family gatherings, and special occasions with a unique Mahjong-themed experience tailored to your guests.' },
    { icon: 'Building2', title: 'Corporate & Team-Building', desc: 'Bring colleagues together through interactive Mahjong sessions that encourage communication, teamwork, strategic thinking, and fun.' },
    { icon: 'Plane', title: 'Mahjong Offsites', desc: 'Organised Mahjong retreats, outings, and special events designed to create memorable experiences beyond the traditional game table.' },
    { icon: 'Heart', title: 'Community Get-Togethers', desc: 'Casual and themed Mahjong events that foster friendships, learning, and community engagement.' },
    { icon: 'Trophy', title: 'Tournaments & Competitions', desc: 'Structured events for players looking to challenge themselves and test their skills in a fun and supportive atmosphere.' },
  ];

  const MANIA_FOR = maniaSection?.content?.MANIA_FOR || [
    "Complete beginners",
    "Casual players",
    "Experienced Mahjong enthusiasts",
    "Corporate teams",
    "Community groups",
    "Families and friends",
    "Event organisers",
    "Anyone looking for a unique social experience",
  ];

  const MANIA_SERVICES = maniaSection?.content?.MANIA_SERVICES || [
    "Organise and manage Mahjong-themed events",
    "Provide Mahjong tables, mats, and equipment",
    "Facilitate games and activities",
    "Host social and corporate gatherings",
    "Design customised Mahjong experiences",
    "Coordinate tournaments and competitions",
    "Create memorable celebrations centred around Mahjong",
  ];

  const THINKING_BENEFITS = thinkingSection?.content?.THINKING_BENEFITS || [
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

  const THINKING_IDEAL = thinkingSection?.content?.THINKING_IDEAL || [
    "Corporate teams",
    "Leadership groups",
    "Human Resources (HR) professionals",
    "Learning & Development (L&D) managers",
    "Employee engagement specialists",
    "Event organisers",
    "Anyone looking for a strategic team-building activity",
  ];

  const THINKING_PROGRAMMES = thinkingSection?.content?.THINKING_PROGRAMMES || [
    "Leadership and management development sessions",
    "Employee engagement activities",
    "Corporate offsites and retreats",
    "Learning & Development initiatives",
    "Networking and client engagement events",
    "Bespoke Mahjong-based learning experiences",
  ];

  const newSections = [
    {
      key: 'events_hero',
      name: 'Hero Section',
      content: {
        title: "Events & Social Gatherings",
        desc: "From lively socials and celebrations to strategic team-building, we craft memorable Mahjong experiences for every occasion."
      },
      order: 1
    },
    {
      key: 'events_mania_intro',
      name: 'Mahjong Mania: Intro',
      content: {
        title: "Mahjong Mania",
        tagline: "Play. Connect. Celebrate.",
        desc1: "Mahjong Mania is a social events and experiences platform dedicated to bringing people together through the joy of Mahjong. Whether you're looking to meet new players, host a memorable celebration, organise a corporate gathering, or simply enjoy a fun afternoon around the table, Mahjong Mania creates engaging and unforgettable Mahjong experiences for all occasions.",
        desc2: "We believe Mahjong is more than just a game. It is a way to connect, celebrate, learn, and build meaningful relationships. Our events combine friendly competition, social interaction, and shared experiences in a welcoming and inclusive environment."
      },
      order: 2
    },
    {
      key: 'events_mania_offerings',
      name: 'Mahjong Mania: What We Offer',
      content: {
        tag: "WHAT WE OFFER",
        title: "Experiences for Every Occasion",
        items: OFFERINGS
      },
      order: 3
    },
    {
      key: 'events_mania_who_for',
      name: 'Mahjong Mania: Who Is It For',
      content: {
        tag: "WHO IS IT FOR?",
        title: "A Seat for Everyone",
        items: MANIA_FOR
      },
      order: 4
    },
    {
      key: 'events_mania_services',
      name: 'Mahjong Mania: Event Services',
      content: {
        tag: "EVENT SERVICES",
        title: "We Can Help You",
        items: MANIA_SERVICES
      },
      order: 5
    },
    {
      key: 'events_mania_philosophy',
      name: 'Mahjong Mania: Philosophy',
      content: {
        quote: "\"Every Mahjong tile tells a story, and every game creates an opportunity to connect.\"",
        desc: "Whether you're celebrating a birthday, hosting a company event, gathering with friends, or joining one of our social sessions, Mahjong Mania brings people together through shared experiences, meaningful conversations, and the timeless enjoyment of Mahjong.",
        footer: "Come for the Mahjong. Stay for the memories. 🀄"
      },
      order: 6
    },
    {
      key: 'events_offsites',
      name: 'Mahjong Offsites',
      content: {
        tag: "MAHJONG OFFSITES",
        title: "Take Your Event to the Next Level",
        desc: "Looking to host an offsite event, company retreat, or large-scale gathering? Our Mahjong offsites are designed to provide a unique and engaging experience outside the office or traditional venues.",
        btnLabel: "Enquire About Offsites",
        btnLink: "/contact",
        img: "/mahjong-offsite.png",
        imgAlt: "Corporate team playing Mahjong at an offsite event"
      },
      order: 7
    },
    {
      key: 'events_thinking_intro',
      name: 'The Thinking Table: Intro',
      content: {
        title: "The Thinking Table",
        tagline: "Building Stronger Teams Through Strategic Play",
        desc: "Empowering organisations to develop sharper thinkers, stronger communicators, and more connected teams through the timeless strategy of Mahjong."
      },
      order: 8
    },
    {
      key: 'events_thinking_why',
      name: 'The Thinking Table: Why Choose Us',
      content: {
        tag: "WHY HR & L&D PROFESSIONALS CHOOSE US",
        title: "A Smarter Way to Develop People",
        desc1: "In today's workplace, organisations are looking for innovative ways to develop people, strengthen teams, and improve employee engagement. Our strategic Mahjong-based learning experiences provide a unique alternative to traditional training programmes by combining learning, collaboration, and fun in a highly interactive environment.",
        desc2: "Designed for Human Resources, Learning & Development, Employee Engagement, and Corporate Wellness teams, these programmes help participants develop valuable workplace skills while fostering stronger relationships across teams."
      },
      order: 9
    },
    {
      key: 'events_thinking_benefits',
      name: 'The Thinking Table: Key Benefits',
      content: {
        tag: "KEY BENEFITS",
        title: "What Your Organisation Gains",
        items: THINKING_BENEFITS
      },
      order: 10
    },
    {
      key: 'events_thinking_ideal',
      name: 'The Thinking Table: Ideal For',
      content: {
        tag: "IDEAL FOR",
        title: "Who Can Benefit",
        items: THINKING_IDEAL
      },
      order: 11
    },
    {
      key: 'events_thinking_programmes',
      name: 'The Thinking Table: Programmes',
      content: {
        tag: "PROGRAMMES",
        title: "Available Formats",
        items: THINKING_PROGRAMMES
      },
      order: 12
    },
    {
      key: 'events_cta',
      name: 'Bottom CTA',
      content: {
        title: "Join a Mahjong Mania Event",
        desc: "Whether you're a beginner, casual player, or experienced enthusiast, our socials, meetups, and celebrations are a great way to meet new people, enjoy the game, and build lasting friendships.",
        btn1Text: "Plan an Event",
        btn1Link: "/contact",
        btn2Text: "Explore the Community",
        btn2Link: "/community"
      },
      order: 13
    }
  ];

  // 1. Delete all existing sections for this page to start fresh
  await prisma.cmsSection.deleteMany({
    where: { pageId: page.id }
  });

  // 2. Insert new well-structured sections
  for (const s of newSections) {
    await prisma.cmsSection.create({
      data: {
        pageId: page.id,
        key: s.key,
        name: s.name,
        content: s.content,
        order: s.order
      }
    });
  }

  console.log('Successfully refactored events page sections without data loss.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
