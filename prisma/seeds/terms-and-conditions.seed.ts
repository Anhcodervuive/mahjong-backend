import { PrismaClient } from '@prisma/client';

export async function seedTermsAndConditionsPage(prisma: PrismaClient) {
  console.log('Seeding terms-and-conditions page with dedicated Play Days Terms section...');

  const page = await prisma.cmsPage.upsert({
    where: { slug: 'terms-and-conditions' },
    update: {
      title: 'Terms & Conditions',
      metaTitle: 'Terms and Conditions | Mahjong Success',
      metaDescription:
        'Read the terms and conditions governing use of the Mahjong Success website, course bookings, guided games, events, payments and participation.',
    },
    create: {
      slug: 'terms-and-conditions',
      title: 'Terms & Conditions',
      metaTitle: 'Terms and Conditions | Mahjong Success',
      metaDescription:
        'Read the terms and conditions governing use of the Mahjong Success website, course bookings, guided games, events, payments and participation.',
    },
  });

  const GENERAL_TERMS_ACCORDIONS = [
    {
      title: '1. Registration & Participation',
      body: 'Participation in Mahjong Success programmes is subject to availability and confirmation of registration. Mahjong Success reserves the right to refuse or cancel registrations where necessary for operational, safety, or behavioural reasons.',
    },
    {
      title: '2. Age Requirements',
      body: 'Mahjong Success welcomes participants aged 18 years and above.',
    },
    {
      title: '3. Programme Structure',
      body: 'Mahjong Success offers a variety of programmes, including Training Levels, Guided Games, Mahjong Success Circle, Mahjong Mania Events, The Thinking Table Corporate Programmes, Private Coaching, Community Activities, Tournaments and Special Events.',
    },
    {
      title: '4. Bookings & Payments',
      body: 'Full payment is required to confirm a booking. Bookings are only considered confirmed upon receipt of payment and confirmation from Mahjong Success.',
    },
    {
      title: '5. Cancellation & Rescheduling',
      body: 'Participants who are unable to attend should provide as much notice as possible. Requests for rescheduling will be considered on a case-by-case basis and subject to availability.',
    },
    {
      title: '6. Participant Conduct',
      body: 'All participants are expected to conduct themselves respectfully and professionally. Treat trainers and fellow participants with respect and follow Mahjong etiquette.',
    },
    {
      title: '7. Learning Outcomes',
      body: 'Mahjong Success provides training, guidance, coaching, and learning opportunities. Individual learning outcomes, skill levels, and playing ability may vary.',
    },
    {
      title: '8. Photography & Media',
      body: 'From time to time, photographs, videos, testimonials, and event recordings may be taken during programmes and events. Participants who do not wish to appear in photographs or videos should notify us.',
    },
    {
      title: '9. Intellectual Property',
      body: 'All Mahjong Success training materials, presentations, handouts, programme content, methodologies, branding, logos, graphics, and educational resources remain the intellectual property of Mahjong Success.',
    },
    {
      title: '10. Health & Wellbeing',
      body: 'Participants are responsible for their own health and wellbeing while attending Mahjong Success activities. Mahjong Success is not liable for personal injury, loss, or damage.',
    },
    {
      title: '11. Community Participation',
      body: 'Participation in the Mahjong Success Circle, Mahjong Mania events, or other community activities is voluntary.',
    },
    {
      title: '12. Privacy',
      body: 'Personal information collected during registration will be used for programme administration, communication, customer service, and operational purposes.',
    },
    {
      title: '13. Changes to Terms & Conditions',
      body: 'Mahjong Success reserves the right to update or amend these Terms & Conditions at any time.',
    },
    {
      title: '14. Contact Us',
      body: 'For questions relating to these Terms & Conditions, please contact us at info@mahjongsuccess.com.',
    },
  ];

  const PLAYDAYS_TERMS_ACCORDIONS = [
    {
      title: '15. Purpose of Mahjong Playdays',
      body: 'Mahjong Playdays are organised as friendly, recreational social gatherings where players can meet, connect and enjoy playing Mahjong together.\n\nTo maintain a welcoming, respectful and enjoyable environment for everyone, discussions relating to politics or religion should be avoided during Playdays. Offensive, abusive or inappropriate language, including profanities, are not allowed.\n\nMahjong Playdays, and any associated Mahjong Success groups or communication channels, must not be used to promote, advertise, arrange or communicate any illegal or unlawful activity.\n\nPlayers are expected to treat fellow participants, venue staff and Mahjong Success representatives with courtesy and respect at all times.',
    },
    {
      title: '16. Third-Party Venues',
      body: 'Mahjong Playdays are hosted at selected third-party venues, including cafés, restaurants and other hospitality establishments. These venues are independently owned and operated and are not owned or managed by Mahjong Success.\n\nAll Playday bookings are therefore subject to availability and confirmation by the selected venue.\n\nBookings should be made at least 48 hours (two days) in advance to allow sufficient time for venue confirmation and game setup.\n\nOn rare occasions, a confirmed venue may become unavailable at short notice due to circumstances outside the control of Mahjong Success, where reasonably possible, Mahjong Success will try to offer an alternative time, date or venue.',
    },
    {
      title: '17. Venue Minimum Spend',
      body: "Participating venues may require a minimum food and/or beverage spend in return for the use of the venue for the two-hour Playday.\n\nThe person making the booking and participating players are responsible for complying with the venue’s applicable minimum-spend requirement.\n\nThe minimum spend is payable directly to the venue and is separate from any fees charged by Mahjong Success.\n\nAny food, beverages or other services ordered at the venue are the responsibility of the individual ordering them.",
    },
    {
      title: '18. Mahjong Success Playday Fee',
      body: 'A separate Playday Fee is payable to Mahjong Success to confirm the booking.\n\nThe fee covers the administration and organisation of the Playday together with the rental, provision and setup of Mahjong equipment, which may include:\n\nMahjong sets, racks, rulers/pushers, Mahjong mats, dice and other equipment required for the game.\n\nThe applicable Playday Fee must be paid in advance to secure the booking. A Playday is not considered confirmed until the required payment has been received and the venue has been confirmed.\n\nAll Mahjong equipment remains the property of Mahjong Success and must be handled responsibly. Players will be held responsible for equipment that is lost or damaged through misuse or negligence.',
    },
    {
      title: '19. Duration',
      body: 'Unless otherwise stated, each Mahjong Playday booking provides for two hours of social play.\n\nPlayers should arrive on time & leave on time. Late arrival does not automatically extend the booked Playday or the venue reservation.',
    },
    {
      title: '20. Social Play',
      body: 'Mahjong Playdays are intended for social and recreational play.\n\nUnless specifically advertised otherwise, a Playday is not a Mahjong training session, guided game, tournament or professionally supervised game. Players participating in social Playdays should therefore already understand the rules of the Mahjong variant being played.\n\nPlayers are responsible for agreeing on the applicable Mahjong variant, rules and any house rules before beginning their game.',
    },
    {
      title: '21. Conduct & Venue Rules',
      body: "All participants must comply with the rules, policies and reasonable instructions of the venue.\n\nMahjong Success reserves the right to refuse or discontinue participation where a person’s behaviour is disruptive, disrespectful, abusive, unlawful or adversely affects other players, venue staff or the Playday experience.",
    },
    {
      title: '22. Cancellations & Refunds',
      body: 'All cancellations, changes, refunds, credits and no-shows are governed by the Mahjong Success Cancellation & Refund Policy applicable at the time of booking.\n\nPlease refer to our Cancellation & Refund Policy for full details.',
    },
    {
      title: '23. Acceptance of Terms',
      body: 'By booking or participating in a Mahjong Playday, the person making the booking and participating players acknowledge and agree to these Terms & Conditions and any applicable venue requirements.',
    },
  ];

  const sections = [
    {
      key: 'hero',
      name: 'Hero Section',
      order: 0,
      content: {
        badge: 'Mahjong Success',
        title: 'Terms & Conditions',
        subtitle: 'The terms governing participation, bookings, payments, conduct, and use of Mahjong Success programmes and services.',
        tags: ['Clear Booking Terms', 'Participant Safety', 'Transparent Policy'],
      },
    },
    {
      key: 'summary',
      name: 'Terms Summary Bullets',
      order: 1,
      content: {
        title: 'Terms Summary',
        bullets: [
          'Open to adult participants aged 18 and above',
          'Full payment required to confirm booking',
          'Respectful conduct is expected at all times',
          'Photography opt-out available on request',
          'Training materials remain property of Mahjong Success',
          'Privacy governed by our Privacy Policy',
        ],
      },
    },
    {
      key: 'overview',
      name: 'Overview Summary Grid',
      order: 2,
      content: {
        tag: 'Terms',
        title: 'Using Mahjong Success Services',
        desc: 'By registering for or participating in any Mahjong Success activity, you agree to these Terms & Conditions.',
        overviewGrid: [
          {
            title: 'Services',
            body: 'Mahjong Success provides training programmes, guided games, events, community activities, corporate experiences, private coaching, and educational programmes.',
          },
          {
            title: 'Payment',
            body: 'Bookings are confirmed only after successful payment is received and acknowledged by Mahjong Success.',
          },
          {
            title: 'Participant Conduct',
            body: 'All participants must treat trainers and fellow participants with respect. Mahjong Success reserves the right to remove participants for disruptive or inappropriate behaviour.',
          },
          {
            title: 'Cancellation & Refunds',
            body: 'Cancellation and refund rights are governed by the separate Refund & Rescheduling Policy.',
          },
        ],
      },
    },
    {
      key: 'details',
      name: 'Terms in Detail Accordions',
      order: 3,
      content: {
        tag: 'Full Terms',
        title: 'Terms in Detail',
        desc: 'These Terms & Conditions govern participation in all Mahjong Success programmes, training sessions, guided games, events, community activities, educational programmes, and corporate experiences.',
        termsAccordions: GENERAL_TERMS_ACCORDIONS,
      },
    },
    {
      key: 'playdays_terms',
      name: 'Play Days Terms',
      order: 4,
      content: {
        tag: 'Play Days',
        title: 'Play Days Terms',
        desc: 'Specific terms and conditions governing Mahjong Playday bookings, venue arrangements, fees, conduct, and participation.',
        items: PLAYDAYS_TERMS_ACCORDIONS,
      },
    },
    {
      key: 'contact',
      name: 'Business Contact',
      order: 5,
      content: {
        businessName: 'Mahjong Success',
        email: 'mahjongsuccess@gmail.com',
        web: 'www.mahjongsuccess.com',
        effectiveDate: '2026',
      },
    },
  ];

  for (const sec of sections) {
    await prisma.cmsSection.upsert({
      where: {
        pageId_key: {
          pageId: page.id,
          key: sec.key,
        },
      },
      update: {
        name: sec.name,
        order: sec.order,
        content: sec.content,
      },
      create: {
        pageId: page.id,
        key: sec.key,
        name: sec.name,
        order: sec.order,
        content: sec.content,
      },
    });
  }

  console.log('✅ Terms & Conditions page seeded successfully with Play Days Terms!');
}
