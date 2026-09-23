import { PrismaClient } from '@prisma/client';

export async function seedPlaydaysPage(prisma: PrismaClient) {
  console.log('Seeding playdays with distinct editable sections...');
  const page = await prisma.cmsPage.upsert({
    where: { slug: 'playdays' },
    update: {
      title: 'Playdays',
      metaTitle: 'PLAYDAYS | Mahjong Success - Any Day. Any Time. Any Place.',
      metaDescription:
        'Breakfast, school drop-offs, lunch, coffee, evening, or weekend social. Join Mahjong Playdays designed around your day.',
    },
    create: {
      slug: 'playdays',
      title: 'Playdays',
      metaTitle: 'PLAYDAYS | Mahjong Success - Any Day. Any Time. Any Place.',
      metaDescription:
        'Breakfast, school drop-offs, lunch, coffee, evening, or weekend social. Join Mahjong Playdays designed around your day.',
    },
  });

  // Delete any old legacy sections if they exist
  await prisma.cmsSection.deleteMany({
    where: {
      pageId: page.id,
      key: { in: ['playdays_content'] },
    },
  });

  const sections = [
    {
      key: 'hero',
      name: 'Hero Section',
      order: 0,
      content: {
        subtitle: 'PLAYDAYS by Mahjong Success',
        title: 'Any Day. Any Time.\nAny Place.',
      },
    },
    {
      key: 'breakfast',
      name: 'Morning Playdays',
      order: 1,
      content: {
        label: 'Morning Playdays',
        heading: 'Breakfast. Friends. Mahjong.',
        intro: 'Start your day with good company and a great game.',
        paragraphs: [
          'Get your friends together, enjoy breakfast and Mahjong.',
          'Mahjong Success takes care of the organisation — the venue, tables, tiles and racks are set up and ready.',
          'You bring the friends. We bring the Mahjong.',
        ],
        times: ['Breakfast Playdays: 10 AM – 12 NOON'],
        tagline: 'Breakfast Mahjong → A great start to the day.',
        image: '/playdays/breakfast-friends-mahjong.png',
        imageAlt: 'Friends gathered around a Mahjong table in a bright morning setting',
        ctaLink: '/play-days-booking',
      },
    },
    {
      key: 'school_drop_off',
      name: 'Mid-Morning Playdays',
      order: 2,
      content: {
        label: 'Mid-Morning Playdays',
        heading: 'Kids at School. Mums at Mahjong.',
        intro: 'You organise their day. We organise your Playday.',
        paragraphs: [
          'Uniforms. School bags. Lunch boxes. Drop-offs. You spend your morning getting everyone else organised.',
          'Let Mahjong Success organise a well-deserved break for you! A couple of hours to unwind, meet your friends and enjoy some Mahjong before the next school pick-up.',
          'We organise. You play.',
        ],
        times: ['10 AM – 12 PM', '12 PM – 2 PM'],
        tagline: 'School Drop-Off → Mahjong → School Pick-Up',
        image: '/playdays/kids-at-school-mums-at-mahjong.png',
        imageAlt: 'A relaxed group of friends enjoying Mahjong together',
        ctaLink: '/play-days-booking',
      },
    },
    {
      key: 'lunch',
      name: 'Afternoon Playdays',
      order: 3,
      content: {
        label: 'Afternoon Playdays',
        heading: 'Lunch. Laugh. Mahjong.',
        intro: 'Good food. Good friends. Great games.',
        paragraphs: [
          'Enjoy lunch, conversation, laughter and a game with friends, all in one afternoon.',
          'You choose your friends. Mahjong Success takes care of the Playday. We organise the venue and have the tables, tiles and racks ready for you.',
          'You lunch. You laugh. You play.',
        ],
        times: ['1 PM – 3 PM', '2 PM – 4 PM'],
        tagline: 'We set up. You show up.',
        image: '/playdays/lunch-laugh-mahjong-v2.png',
        imageAlt: 'A lively afternoon Mahjong gathering with friends',
        ctaLink: '/play-days-booking',
      },
    },
    {
      key: 'coffee',
      name: 'Late Afternoon Playdays',
      order: 4,
      content: {
        label: 'Late Afternoon Playdays',
        heading: 'Coffee. Catch-Up. Mahjong.',
        intro: 'Your coffee just got more interesting.',
        paragraphs: [
          "Meet your friends over coffee, catch up on everything you've missed, and enjoy a game of Mahjong together.",
          'We organise the Playday, you simply enjoy your coffee, your friends and play.',
        ],
        times: ['4 PM – 6 PM'],
        tagline: 'Coffee. Conversation. And a little Competition.',
        image: '/playdays/coffee-catch-up-mahjong.png',
        imageAlt: 'Friends catching up over coffee and a game of Mahjong',
        ctaLink: '/play-days-booking',
      },
    },
    {
      key: 'after_work',
      name: 'Evening Playdays',
      order: 5,
      content: {
        label: 'Evening Playdays',
        heading: 'Work Done. Mahjong On.',
        intro: "You Handle the Workday. We'll Handle the Playday.",
        paragraphs: [
          'The meetings. The calls. The emails. The deadlines. Now close the laptop, step away from the phone and make some time for you.',
          'Let Mahjong Success organise your Playday. We arrange the venue and have the tables, tiles and racks ready and waiting.',
          'Come straight from work. Meet your Mahjong friends. Switch off. Unwind.',
        ],
        times: ['3 PM – 5 PM', '4 PM – 6 PM', '6 PM – 8 PM'],
        tagline: 'We set up. You show up.',
        image: '/playdays/work-done-mahjong-on-v2.png',
        imageAlt: 'An evening Mahjong session to unwind after work',
        ctaLink: '/play-days-booking',
      },
    },
    {
      key: 'saturday_social',
      name: 'Weekend Playdays',
      order: 6,
      content: {
        label: 'Weekend Playdays',
        heading: 'Saturday Social',
        intro: 'Start the weekend around the Mahjong table.',
        paragraphs: [
          'No school runs. No meetings. No deadlines.',
          "It's Saturday, time to slow down, meet your friends and enjoy a relaxed morning of Mahjong.",
          'Mahjong Success takes care of the organisation. The venue is arranged, the tables are set and the tiles and racks are ready.',
          'You bring the friends. We set the table.',
        ],
        times: ['Saturday | 10 AM – 12 PM'],
        tagline: 'Your weekend. Your friends. Your game.',
        image: '/playdays/saturday-social-v2.png',
        imageAlt: 'A cheerful weekend Mahjong social',
        ctaLink: '/play-days-booking',
      },
    },
    {
      key: 'cta',
      name: 'Call to Action Section',
      order: 7,
      content: {
        title: 'Ready to Plan Your Playday?',
        desc: 'Choose your occasion, gather your friends, and let Mahjong Success take care of the rest.',
        buttonText: 'Book a Playday',
        buttonLink: '/play-days-booking',
      },
    },
  ];

  for (const s of sections) {
    await prisma.cmsSection.upsert({
      where: {
        pageId_key: { pageId: page.id, key: s.key },
      },
      update: {
        name: s.name,
        order: s.order,
        content: s.content,
      },
      create: {
        pageId: page.id,
        key: s.key,
        name: s.name,
        order: s.order,
        content: s.content,
      },
    });
  }
}
