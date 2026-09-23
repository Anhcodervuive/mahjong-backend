-- =========================================================================
-- PATCH 05: Seed Playdays, Terms & Conditions & 4 Fast-Track Split Pages
-- Compatible with PostgreSQL on cPanel / phpPgAdmin
-- =========================================================================

-- ── CmsPage: playdays ──
INSERT INTO "CmsPage" ("slug", "title", "metaTitle", "metaDescription")
VALUES (
  'playdays',
  'Playdays',
  'PLAYDAYS | Mahjong Success - Any Day. Any Time. Any Place.',
  'Breakfast, school drop-offs, lunch, coffee, evening, or weekend social. Join Mahjong Playdays designed around your day.'
)
ON CONFLICT ("slug") DO UPDATE SET
  "title" = EXCLUDED."title",
  "metaTitle" = EXCLUDED."metaTitle",
  "metaDescription" = EXCLUDED."metaDescription";

DELETE FROM "CmsSection" WHERE "pageId" = (SELECT id FROM "CmsPage" WHERE slug = 'playdays');

-- Section: hero (Hero Section)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'playdays'),
  'hero',
  'Hero Section',
  0,
  '{"subtitle":"PLAYDAYS by Mahjong Success","title":"Any Day. Any Time.\nAny Place."}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: breakfast (Morning Playdays)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'playdays'),
  'breakfast',
  'Morning Playdays',
  1,
  '{"label":"Morning Playdays","heading":"Breakfast. Friends. Mahjong.","intro":"Start your day with good company and a great game.","paragraphs":["Get your friends together, enjoy breakfast and Mahjong.","Mahjong Success takes care of the organisation — the venue, tables, tiles and racks are set up and ready.","You bring the friends. We bring the Mahjong."],"times":["Breakfast Playdays: 10 AM – 12 NOON"],"tagline":"Breakfast Mahjong → A great start to the day.","image":"/playdays/breakfast-friends-mahjong.png","imageAlt":"Friends gathered around a Mahjong table in a bright morning setting","ctaLink":"/play-days-booking"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: school_drop_off (Mid-Morning Playdays)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'playdays'),
  'school_drop_off',
  'Mid-Morning Playdays',
  2,
  '{"label":"Mid-Morning Playdays","heading":"Kids at School. Mums at Mahjong.","intro":"You organise their day. We organise your Playday.","paragraphs":["Uniforms. School bags. Lunch boxes. Drop-offs. You spend your morning getting everyone else organised.","Let Mahjong Success organise a well-deserved break for you! A couple of hours to unwind, meet your friends and enjoy some Mahjong before the next school pick-up.","We organise. You play."],"times":["10 AM – 12 PM","12 PM – 2 PM"],"tagline":"School Drop-Off → Mahjong → School Pick-Up","image":"/playdays/kids-at-school-mums-at-mahjong.png","imageAlt":"A relaxed group of friends enjoying Mahjong together","ctaLink":"/play-days-booking"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: lunch (Afternoon Playdays)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'playdays'),
  'lunch',
  'Afternoon Playdays',
  3,
  '{"label":"Afternoon Playdays","heading":"Lunch. Laugh. Mahjong.","intro":"Good food. Good friends. Great games.","paragraphs":["Enjoy lunch, conversation, laughter and a game with friends, all in one afternoon.","You choose your friends. Mahjong Success takes care of the Playday. We organise the venue and have the tables, tiles and racks ready for you.","You lunch. You laugh. You play."],"times":["1 PM – 3 PM","2 PM – 4 PM"],"tagline":"We set up. You show up.","image":"/playdays/lunch-laugh-mahjong-v2.png","imageAlt":"A lively afternoon Mahjong gathering with friends","ctaLink":"/play-days-booking"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: coffee (Late Afternoon Playdays)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'playdays'),
  'coffee',
  'Late Afternoon Playdays',
  4,
  '{"label":"Late Afternoon Playdays","heading":"Coffee. Catch-Up. Mahjong.","intro":"Your coffee just got more interesting.","paragraphs":["Meet your friends over coffee, catch up on everything you''ve missed, and enjoy a game of Mahjong together.","We organise the Playday, you simply enjoy your coffee, your friends and play."],"times":["4 PM – 6 PM"],"tagline":"Coffee. Conversation. And a little Competition.","image":"/playdays/coffee-catch-up-mahjong.png","imageAlt":"Friends catching up over coffee and a game of Mahjong","ctaLink":"/play-days-booking"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: after_work (Evening Playdays)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'playdays'),
  'after_work',
  'Evening Playdays',
  5,
  '{"label":"Evening Playdays","heading":"Work Done. Mahjong On.","intro":"You Handle the Workday. We''ll Handle the Playday.","paragraphs":["The meetings. The calls. The emails. The deadlines. Now close the laptop, step away from the phone and make some time for you.","Let Mahjong Success organise your Playday. We arrange the venue and have the tables, tiles and racks ready and waiting.","Come straight from work. Meet your Mahjong friends. Switch off. Unwind."],"times":["3 PM – 5 PM","4 PM – 6 PM","6 PM – 8 PM"],"tagline":"We set up. You show up.","image":"/playdays/work-done-mahjong-on-v2.png","imageAlt":"An evening Mahjong session to unwind after work","ctaLink":"/play-days-booking"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: saturday_social (Weekend Playdays)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'playdays'),
  'saturday_social',
  'Weekend Playdays',
  6,
  '{"label":"Weekend Playdays","heading":"Saturday Social","intro":"Start the weekend around the Mahjong table.","paragraphs":["No school runs. No meetings. No deadlines.","It''s Saturday, time to slow down, meet your friends and enjoy a relaxed morning of Mahjong.","Mahjong Success takes care of the organisation. The venue is arranged, the tables are set and the tiles and racks are ready.","You bring the friends. We set the table."],"times":["Saturday | 10 AM – 12 PM"],"tagline":"Your weekend. Your friends. Your game.","image":"/playdays/saturday-social-v2.png","imageAlt":"A cheerful weekend Mahjong social","ctaLink":"/play-days-booking"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: cta (Call to Action Section)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'playdays'),
  'cta',
  'Call to Action Section',
  7,
  '{"title":"Ready to Plan Your Playday?","desc":"Choose your occasion, gather your friends, and let Mahjong Success take care of the rest.","buttonText":"Book a Playday","buttonLink":"/play-days-booking"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- ── CmsPage: terms-and-conditions ──
INSERT INTO "CmsPage" ("slug", "title", "metaTitle", "metaDescription")
VALUES (
  'terms-and-conditions',
  'Terms & Conditions',
  'Terms and Conditions | Mahjong Success',
  'Read the terms and conditions governing use of the Mahjong Success website, course bookings, guided games, events, payments and participation.'
)
ON CONFLICT ("slug") DO UPDATE SET
  "title" = EXCLUDED."title",
  "metaTitle" = EXCLUDED."metaTitle",
  "metaDescription" = EXCLUDED."metaDescription";

-- Section: hero (Hero Section)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'terms-and-conditions'),
  'hero',
  'Hero Section',
  0,
  '{"badge":"Mahjong Success","title":"Terms & Conditions","subtitle":"The terms governing participation, bookings, payments, conduct, and use of Mahjong Success programmes and services.","tags":["Clear Booking Terms","Participant Safety","Transparent Policy"]}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: summary (Terms Summary Bullets)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'terms-and-conditions'),
  'summary',
  'Terms Summary Bullets',
  1,
  '{"title":"Terms Summary","bullets":["Open to adult participants aged 18 and above","Full payment required to confirm booking","Respectful conduct is expected at all times","Photography opt-out available on request","Training materials remain property of Mahjong Success","Privacy governed by our Privacy Policy"]}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: overview (Overview Summary Grid)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'terms-and-conditions'),
  'overview',
  'Overview Summary Grid',
  2,
  '{"tag":"Terms","title":"Using Mahjong Success Services","desc":"By registering for or participating in any Mahjong Success activity, you agree to these Terms & Conditions.","overviewGrid":[{"title":"Services","body":"Mahjong Success provides training programmes, guided games, events, community activities, corporate experiences, private coaching, and educational programmes."},{"title":"Payment","body":"Bookings are confirmed only after successful payment is received and acknowledged by Mahjong Success."},{"title":"Participant Conduct","body":"All participants must treat trainers and fellow participants with respect. Mahjong Success reserves the right to remove participants for disruptive or inappropriate behaviour."},{"title":"Cancellation & Refunds","body":"Cancellation and refund rights are governed by the separate Refund & Rescheduling Policy."}]}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: details (Terms in Detail Accordions)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'terms-and-conditions'),
  'details',
  'Terms in Detail Accordions',
  3,
  '{"tag":"Full Terms","title":"Terms in Detail","desc":"These Terms & Conditions govern participation in all Mahjong Success programmes, training sessions, guided games, events, community activities, educational programmes, and corporate experiences.","termsAccordions":[{"title":"1. Registration & Participation","body":"Participation in Mahjong Success programmes is subject to availability and confirmation of registration. Mahjong Success reserves the right to refuse or cancel registrations where necessary for operational, safety, or behavioural reasons."},{"title":"2. Age Requirements","body":"Mahjong Success welcomes participants aged 18 years and above."},{"title":"3. Programme Structure","body":"Mahjong Success offers a variety of programmes, including Training Levels, Guided Games, Mahjong Success Circle, Mahjong Mania Events, The Thinking Table Corporate Programmes, Private Coaching, Community Activities, Tournaments and Special Events."},{"title":"4. Bookings & Payments","body":"Full payment is required to confirm a booking. Bookings are only considered confirmed upon receipt of payment and confirmation from Mahjong Success."},{"title":"5. Cancellation & Rescheduling","body":"Participants who are unable to attend should provide as much notice as possible. Requests for rescheduling will be considered on a case-by-case basis and subject to availability."},{"title":"6. Participant Conduct","body":"All participants are expected to conduct themselves respectfully and professionally. Treat trainers and fellow participants with respect and follow Mahjong etiquette."},{"title":"7. Learning Outcomes","body":"Mahjong Success provides training, guidance, coaching, and learning opportunities. Individual learning outcomes, skill levels, and playing ability may vary."},{"title":"8. Photography & Media","body":"From time to time, photographs, videos, testimonials, and event recordings may be taken during programmes and events. Participants who do not wish to appear in photographs or videos should notify us."},{"title":"9. Intellectual Property","body":"All Mahjong Success training materials, presentations, handouts, programme content, methodologies, branding, logos, graphics, and educational resources remain the intellectual property of Mahjong Success."},{"title":"10. Health & Wellbeing","body":"Participants are responsible for their own health and wellbeing while attending Mahjong Success activities. Mahjong Success is not liable for personal injury, loss, or damage."},{"title":"11. Community Participation","body":"Participation in the Mahjong Success Circle, Mahjong Mania events, or other community activities is voluntary."},{"title":"12. Privacy","body":"Personal information collected during registration will be used for programme administration, communication, customer service, and operational purposes."},{"title":"13. Changes to Terms & Conditions","body":"Mahjong Success reserves the right to update or amend these Terms & Conditions at any time."},{"title":"14. Contact Us","body":"For questions relating to these Terms & Conditions, please contact us at info@mahjongsuccess.com."}]}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: playdays_terms (Play Days Terms)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'terms-and-conditions'),
  'playdays_terms',
  'Play Days Terms',
  4,
  '{"tag":"Play Days","title":"Play Days Terms","desc":"Specific terms and conditions governing Mahjong Playday bookings, venue arrangements, fees, conduct, and participation.","items":[{"title":"15. Purpose of Mahjong Playdays","body":"Mahjong Playdays are organised as friendly, recreational social gatherings where players can meet, connect and enjoy playing Mahjong together.\n\nTo maintain a welcoming, respectful and enjoyable environment for everyone, discussions relating to politics or religion should be avoided during Playdays. Offensive, abusive or inappropriate language, including profanities, are not allowed.\n\nMahjong Playdays, and any associated Mahjong Success groups or communication channels, must not be used to promote, advertise, arrange or communicate any illegal or unlawful activity.\n\nPlayers are expected to treat fellow participants, venue staff and Mahjong Success representatives with courtesy and respect at all times."},{"title":"16. Third-Party Venues","body":"Mahjong Playdays are hosted at selected third-party venues, including cafés, restaurants and other hospitality establishments. These venues are independently owned and operated and are not owned or managed by Mahjong Success.\n\nAll Playday bookings are therefore subject to availability and confirmation by the selected venue.\n\nBookings should be made at least 48 hours (two days) in advance to allow sufficient time for venue confirmation and game setup.\n\nOn rare occasions, a confirmed venue may become unavailable at short notice due to circumstances outside the control of Mahjong Success, where reasonably possible, Mahjong Success will try to offer an alternative time, date or venue."},{"title":"17. Venue Minimum Spend","body":"Participating venues may require a minimum food and/or beverage spend in return for the use of the venue for the two-hour Playday.\n\nThe person making the booking and participating players are responsible for complying with the venue’s applicable minimum-spend requirement.\n\nThe minimum spend is payable directly to the venue and is separate from any fees charged by Mahjong Success.\n\nAny food, beverages or other services ordered at the venue are the responsibility of the individual ordering them."},{"title":"18. Mahjong Success Playday Fee","body":"A separate Playday Fee is payable to Mahjong Success to confirm the booking.\n\nThe fee covers the administration and organisation of the Playday together with the rental, provision and setup of Mahjong equipment, which may include:\n\nMahjong sets, racks, rulers/pushers, Mahjong mats, dice and other equipment required for the game.\n\nThe applicable Playday Fee must be paid in advance to secure the booking. A Playday is not considered confirmed until the required payment has been received and the venue has been confirmed.\n\nAll Mahjong equipment remains the property of Mahjong Success and must be handled responsibly. Players will be held responsible for equipment that is lost or damaged through misuse or negligence."},{"title":"19. Duration","body":"Unless otherwise stated, each Mahjong Playday booking provides for two hours of social play.\n\nPlayers should arrive on time & leave on time. Late arrival does not automatically extend the booked Playday or the venue reservation."},{"title":"20. Social Play","body":"Mahjong Playdays are intended for social and recreational play.\n\nUnless specifically advertised otherwise, a Playday is not a Mahjong training session, guided game, tournament or professionally supervised game. Players participating in social Playdays should therefore already understand the rules of the Mahjong variant being played.\n\nPlayers are responsible for agreeing on the applicable Mahjong variant, rules and any house rules before beginning their game."},{"title":"21. Conduct & Venue Rules","body":"All participants must comply with the rules, policies and reasonable instructions of the venue.\n\nMahjong Success reserves the right to refuse or discontinue participation where a person’s behaviour is disruptive, disrespectful, abusive, unlawful or adversely affects other players, venue staff or the Playday experience."},{"title":"22. Cancellations & Refunds","body":"All cancellations, changes, refunds, credits and no-shows are governed by the Mahjong Success Cancellation & Refund Policy applicable at the time of booking.\n\nPlease refer to our Cancellation & Refund Policy for full details."},{"title":"23. Acceptance of Terms","body":"By booking or participating in a Mahjong Playday, the person making the booking and participating players acknowledge and agree to these Terms & Conditions and any applicable venue requirements."}]}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: contact (Business Contact)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'terms-and-conditions'),
  'contact',
  'Business Contact',
  5,
  '{"businessName":"Mahjong Success","email":"mahjongsuccess@gmail.com","web":"www.mahjongsuccess.com","effectiveDate":"2026"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- ── CmsPage: fast-track-international-goulash ──
INSERT INTO "CmsPage" ("slug", "title", "metaTitle", "metaDescription")
VALUES (
  'fast-track-international-goulash',
  'Fast-Track: International Goulash',
  'International Goulash Fast-Track Bundles | Mahjong Success',
  'Accelerate your International Goulash journey. Bundled learning packages from foundation to joker strategy and advanced hand mastery.'
)
ON CONFLICT ("slug") DO UPDATE SET
  "title" = EXCLUDED."title",
  "metaTitle" = EXCLUDED."metaTitle",
  "metaDescription" = EXCLUDED."metaDescription";

DELETE FROM "CmsSection" WHERE "pageId" = (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-international-goulash');

-- Section: hero (Hero Section)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-international-goulash'),
  'hero',
  'Hero Section',
  0,
  '{"subtitle":"MAHJONG SUCCESS","title":"International Goulash Fast-Track Bundles","description":"Accelerate your journey to International Goulash Mahjong Success. Bundled learning pathways and packages that combine multiple training levels into a structured programme — for players ready to progress faster.","btnLabel":"Book a Bundle Session","btnLink":"/book-session?game=International%20Goulash"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: bundles (Bundles List)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-international-goulash'),
  'bundles',
  'Bundles List',
  1,
  '{"bundles":[{"id":"launchpad","emoji":"🚀","title":"Mahjong Success Launchpad","subtitle":"FOUNDATION WITH STRATEGY","tagline":"The quickest path from beginner to player","body":"The Mahjong Success Launchpad combines Level 1 – Foundation and Level 2 – Joker Strategy into one comprehensive learning bundle, giving players the essential knowledge, skills, and confidence needed to begin their Mahjong journey successfully.\n\nLearn the tiles, suits, winds, dragons, jokers, hand-building fundamentals, winning conditions, and the strategic use of jokers to improve decision-making and gameplay.","includes":["Level 1 – Foundation","Level 2 – Joker Strategy"],"regularPrice":"AED 700","bundlePrice":"AED 500","saving":"Save AED 200","pricingNote":null,"individualPricing":["Foundation- AED 500","Joker Strategy- AED 200","Total - AED 700"],"courseDuration":["4 hours"],"perfectFor":["Complete beginners","New Mahjong players","Casual players looking for structured learning","Social Players","Anyone wanting a strong foundation and strategic understanding"],"outcome":"By the end of the Launchpad Bundle, players will confidently understand the Mahjong tiles, hand-building principles, winning conditions, and joker strategies, providing a strong foundation for future progression through the Mahjong Success pathway.","cta":"LEARN. THINK. SUCCEED."},{"id":"masterclass","emoji":"🀄","title":"Mahjong Success Masterclass","subtitle":"ADVANCE HANDS","tagline":"Take your Mahjong skills beyond the basics","body":"The Hand Mastery Series helps players develop advanced hand-building techniques, improve decision-making, and gain the confidence needed to recognise and pursue a wider range of winning opportunities.\n\nThe series is delivered through five specialised hand-building modules, allowing players to focus on the hand types they wish to learn, strengthen, and master.","includes":["Module 1 – Crochet","Module 2 – Chows & Mixed Chows","Module 3 – Dragons & Winds","Module 4 – Advanced Kongs Play","Module 5 – Concealed Hands"],"regularPrice":"AED 1,250","bundlePrice":"AED 1,000","saving":"Save AED 250","pricingNote":"Bundle Price: AED 200 per module","individualPricing":["Original Price: AED 250 per module","Number of modules- 5","Total - AED 1,250"],"courseDuration":["Each module is for 2 hours","Number of modules- 5","Total 10 hours"],"perfectFor":["Players who have completed the Launchpad Bundle or have a strong foundation","Players looking to expand their hand-building knowledge","Players who want to improve strategic thinking and decision-making","Players seeking greater confidence in recognising winning opportunities","Players looking to become more adaptable and versatile at the table"],"outcome":"By the end of this bundle, players will have a deeper understanding of advanced hand construction, stronger strategic awareness, and greater confidence in building and adapting hands during gameplay.","cta":"CONSTRUCT. STRATEGISE. SUCCEED."},{"id":"partnership","emoji":"🤝","title":"Mahjong Success Partnership Discount","subtitle":"LEARN TOGETHER. PLAY TOGETHER. SUCCEED TOGETHER.","tagline":"Master the art of Partnership Mahjong","body":"The Mahjong Success Partnership Bundle is designed for players who want to master the art of Partnership Mahjong. Learn how to play effectively with a partner, understand partnership dynamics, develop coordinated strategies, and maximise opportunities through teamwork and communication at the Mahjong table.\n\n4 players required to avail this special offer. Book a Partnership Table of 4 together and enjoy a AED 50 discount per player.","includes":["Understanding Partnership Mahjong","Roles and Responsibilities in Partnership Play","Partnership Strategies and Tactics","Communication and Table Awareness","Coordinated Decision-Making","Supporting Your Partner''s Game","Recognising Team Opportunities","Guided Partnership Gameplay"],"regularPrice":"AED 800 for 4 players","bundlePrice":"AED 600 for 4 players","saving":"Save AED 200","pricingNote":"Bring a Partner & Save, Bundle Price: AED 150 per person","individualPricing":["AED 200 per person","Number of players - 4","Total- AED 800"],"courseDuration":["2 hours"],"perfectFor":["Existing Mahjong players","Couples and spouses","Family members","Friends who play together","Regular Mahjong partners"],"outcome":"By the end of this bundle, players will understand the principles of partnership Mahjong, develop stronger teamwork and communication skills, and gain the confidence to play strategically and effectively with a partner.","cta":"LEARN TOGETHER. PLAY TOGETHER. SUCCEED TOGETHER."}]}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: cta (Call to Action)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-international-goulash'),
  'cta',
  'Call to Action',
  2,
  '{"tag":"Ready to Progress Faster?","title":"Choose Your Bundle and Begin","description":"All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience, then choose your bundle on the booking screen.","btnLabel":"Book a Session","btnLink":"/book-session?game=International%20Goulash"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- ── CmsPage: fast-track-american-mahjong ──
INSERT INTO "CmsPage" ("slug", "title", "metaTitle", "metaDescription")
VALUES (
  'fast-track-american-mahjong',
  'Fast-Track: American Mahjong',
  'American Mahjong Fast-Track Bundles | Mahjong Success',
  'Fast-track your American Mahjong NMJL journey. Structured packages covering card understanding, Charleston strategy, and advanced mastery.'
)
ON CONFLICT ("slug") DO UPDATE SET
  "title" = EXCLUDED."title",
  "metaTitle" = EXCLUDED."metaTitle",
  "metaDescription" = EXCLUDED."metaDescription";

DELETE FROM "CmsSection" WHERE "pageId" = (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-american-mahjong');

-- Section: hero (Hero Section)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-american-mahjong'),
  'hero',
  'Hero Section',
  0,
  '{"subtitle":"MAHJONG SUCCESS","title":"American Mahjong Fast-Track Bundles","description":"Accelerate your journey to American Mahjong Success. Bundled learning pathways designed for players ready to master NMJL rules, pattern recognition, and advanced gameplay.","btnLabel":"Book a Bundle Session","btnLink":"/book-session?game=American%20Mahjong"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: bundles (Bundles List)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-american-mahjong'),
  'bundles',
  'Bundles List',
  1,
  '{"bundles":[{"id":"american-launchpad","emoji":"🇺🇸","title":"Mahjong Success Launchpad","subtitle":"FOUNDATION TO STRATEGY","tagline":"The quickest path from beginner to player","body":"American Mahjong is a strategic tile game played under the official National Mah Jongg League (NMJL®) rules. Learn American Mahjong through structured training covering the Charleston, jokers, winning hands, and scoring.\n\nThe Mahjong Success Launchpad combines Level 1 – Foundation and Scoring, Level 2 – Joker Strategy; into one comprehensive learning bundle, giving players the essential knowledge, skills, and confidence needed to begin their Mahjong journey successfully. The 5-hour training programme will be delivered over 2 days, with 2.5 hours of focused training each day.","includes":["Level 1 – Foundation","Level 2 – Joker Strategy","Scoring & Scoring Strategy"],"regularPrice":"AED 800","bundlePrice":"AED 600","saving":"Save AED 200","pricingNote":null,"individualPricing":["Foundation- AED 600","Joker Strategy- AED 200","Total AED 800"],"courseDuration":["Day 1- 2.5 hours","Day 2- 2.5 hours","Total - 5 hours"],"perfectFor":["Complete beginners","New Mahjong players","Casual players looking for structured learning","Social Players","Anyone wanting a strong foundation and strategic understanding"],"outcome":"By the end of the Launchpad Bundle, players will confidently understand the Mahjong tiles, hand-building principles, joker strategies and build winning hands. Players will also have a complete understanding of the American Mahjong Scoring system.","cta":"LEARN. THINK. SUCCEED."},{"id":"american-mastery","emoji":"🃏","title":"American Mahjong Mastery","subtitle":"ADVANCE HANDS MASTERY","tagline":"American National Mah Jongg League Card","body":"Take your American Mahjong game to the next level by mastering the wide variety of winning hands featured on the latest NMJL® Card. This fast-track option allows you to learn a wider range of hands, recognise more patterns, and develop stronger strategic thinking.\n\nThe series is delivered through four specialised hand-building modules, allowing players to focus on the hand types they wish to learn, strengthen, and master.","modules":["Odd & Even Hands","Consecutive Runs & Step Up Hands","Any Like Numbers-Pairs, Pungs, Kongs, Quints & Sextets","Singles, Pairs, Winds & Dragons"],"modulesTitle":"WHAT''S INCLUDED","regularPrice":"AED 1000","bundlePrice":"AED 800","saving":"Save AED 200","pricingNote":"Bundle Price: AED 200 per module","individualPricing":["AED 250 per module","Number of Modules- 4","Total AED 1000"],"courseDuration":["Each module is for 2 hours.","Number of modules: 4","Total 8 hours."],"perfectFor":["Players who have completed the Launchpad Bundle or have a strong foundation","Players looking to expand their hand-building knowledge","Players who want to improve strategic thinking and decision-making","Players seeking greater confidence in recognising winning opportunities","Players looking to become more adaptable and versatile at the table"],"outcome":"By the end of this bundle, players will have a deeper understanding of multiple advanced hand categories, stronger pattern recognition, and the strategic confidence to tackle a wider range of American Mahjong hands from the latest NMJL® Card.","cta":"MASTER. ACCELERATE. SUCCEED."}]}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: cta (Call to Action)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-american-mahjong'),
  'cta',
  'Call to Action',
  2,
  '{"tag":"Ready to Progress Faster?","title":"Choose Your Bundle and Begin","description":"All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience, then choose your bundle on the booking screen.","btnLabel":"Book a Session","btnLink":"/book-session?game=American%20Mahjong"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- ── CmsPage: fast-track-western-mahjong ──
INSERT INTO "CmsPage" ("slug", "title", "metaTitle", "metaDescription")
VALUES (
  'fast-track-western-mahjong',
  'Fast-Track: Western Mahjong',
  'Western Mahjong Fast-Track Bundles | Mahjong Success',
  'Master Western Mahjong with structured fast-track bundles. Traditional rules, Babcock scoring, and tournament competitive play.'
)
ON CONFLICT ("slug") DO UPDATE SET
  "title" = EXCLUDED."title",
  "metaTitle" = EXCLUDED."metaTitle",
  "metaDescription" = EXCLUDED."metaDescription";

DELETE FROM "CmsSection" WHERE "pageId" = (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-western-mahjong');

-- Section: hero (Hero Section)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-western-mahjong'),
  'hero',
  'Hero Section',
  0,
  '{"subtitle":"MAHJONG SUCCESS","title":"Western Mahjong Fast-Track Bundles","description":"Accelerate your journey to Western Mahjong Success. Classical rules, traditional scoring, and tournament preparation combined into structured learning packages.","btnLabel":"Book a Bundle Session","btnLink":"/book-session?game=Western%20Mahjong"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: bundles (Bundles List)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-western-mahjong'),
  'bundles',
  'Bundles List',
  1,
  '{"bundles":[{"id":"western-launchpad","emoji":"🌍","title":"Mahjong Success Launchpad","subtitle":"HALF LIMIT, LIMIT, MIDDLE LIMIT, DOUBLE LIMIT","tagline":"Learn the highest number and widest range of Mahjong Hands","body":"The Mahjong Success Launchpad combines Level 1 – Foundation, Level 2 – Joker Strategy and Level 3- Scoring & Scoring Strategy, into one comprehensive learning bundle, giving players the essential knowledge, skills, and confidence needed to begin their Mahjong journey successfully. Learn the tiles, suits, winds, dragons, jokers, hand-building fundamentals, winning conditions, and the strategic use of jokers to improve decision-making and gameplay. Master the Western Mahjong scoring system.","includes":["Level 1 – Western Rules Fundamentals","Level 2 – Joker Stragegy","Level 3 - Scoring & Scoring Strategy"],"regularPrice":"AED 1,000","bundlePrice":"AED 800","saving":"Save AED 200","pricingNote":null,"individualPricing":["Foundation- AED 600","Joker Strategy- AED 200","Scoring & Scoring Strategy- AED 200","Total- AED 1,000"],"courseDuration":["Total- 5 hours","Day 1- 2.5 hours","Day 2- 2.5 hours"],"perfectFor":["Complete beginners to Western Mahjong","Players transitioning from other variants","Social Players","Anyone interested in a highest number and wide range of hands"],"outcome":"By the end of this bundle, players will understand Western scoring, observe proper etiquette, build classical hands, and participate confidently in Western Mahjong games.","cta":"LEARN. THINK. SUCCEED."},{"id":"western-mastery","emoji":"🏆","title":"Western Mahjong Mastery","subtitle":"LEARN THE WIDEST RANGE OF WINNING HANDS","tagline":"Master the highest number of hands in Mahjong","body":"Take your Mahjong skills to the next level by mastering the game''s most prestigious Half Limit, Middle Limit, Limit, and Double Limit Hands. This advanced training series focuses on recognizing complex hand patterns, understanding the strategic requirements of high-value hands, and making informed decisions as the game progresses.\n\nThe series is delivered through six specialised hand-building modules, allowing players to focus on the hand types they wish to learn, strengthen, and master.","includes":["Module 1: Pungs & Crochets","Module 2: Chows & Mixed Chows","Module 3: Runs","Module 4: Step Up Runs","Module 5: Pairs & Knitted Pairs","Module 6: Terminals"],"regularPrice":"AED 1500","bundlePrice":"AED 1200","saving":"Save AED 300","pricingNote":"Bundle Price: AED 200 per module","individualPricing":["AED 250 per module","Number of modules: 6","Total AED 1500"],"courseDuration":["Each module is for 2 hours","Number of modules: 6","Total- 12 hours"],"perfectFor":["Players who have completed the Launchpad Bundle or have a strong foundation","Players looking to expand their hand-building knowledge","Players who want to improve strategic thinking and decision-making","Players who love to learn new hands and the highest number of hands","Players looking for the widest range and variety of hands in Mahjong"],"outcome":"By the end of this bundle, players will have a deeper understanding of advanced hand construction, stronger strategic awareness, calculating scores rapidly, and greater confidence in building and adapting hands during gameplay.","cta":"COMPETE. CONQUER. CELEBRATE."}]}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: cta (Call to Action)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-western-mahjong'),
  'cta',
  'Call to Action',
  2,
  '{"tag":"Ready to Progress Faster?","title":"Choose Your Bundle and Begin","description":"All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience, then choose your bundle on the booking screen.","btnLabel":"Book a Session","btnLink":"/book-session?game=Western%20Mahjong"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- ── CmsPage: fast-track-taiwanese-mahjong ──
INSERT INTO "CmsPage" ("slug", "title", "metaTitle", "metaDescription")
VALUES (
  'fast-track-taiwanese-mahjong',
  'Fast-Track: Taiwanese Mahjong',
  'Taiwanese Mahjong Fast-Track Bundles | Mahjong Success',
  'Fast-track your Taiwanese Mahjong journey with our 16-tile masterclass and advanced hands bundles designed for rapid, confident progression.'
)
ON CONFLICT ("slug") DO UPDATE SET
  "title" = EXCLUDED."title",
  "metaTitle" = EXCLUDED."metaTitle",
  "metaDescription" = EXCLUDED."metaDescription";

DELETE FROM "CmsSection" WHERE "pageId" = (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-taiwanese-mahjong');

-- Section: hero (Hero Section)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-taiwanese-mahjong'),
  'hero',
  'Hero Section',
  0,
  '{"subtitle":"MAHJONG SUCCESS","title":"Taiwanese Mahjong Fast-Track Bundles","description":"Fast-track your Taiwanese Mahjong journey with this complete bundle series designed to take players from the basics to confident, strategic, and accurate 16-tile play.","btnLabel":"Book a Bundle Session","btnLink":"/book-session?game=Taiwanese%20Mahjong"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: bundles (Bundles List)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-taiwanese-mahjong'),
  'bundles',
  'Bundles List',
  1,
  '{"bundles":[{"id":"taiwanese-launchpad","emoji":"🀄","title":"Mahjong Success Launchpad","subtitle":"FOUNDATION WITH STRATEGY","tagline":"Fast-track your Taiwanese Mahjong journey with this complete 3-level bundle designed to take players from the basics to confident, strategic, and accurate play.","body":"This bundle includes Level 1 Foundation with 5 primary hands, Scoring & Scoring Strategy. Players begin by learning the tiles, suits, honours, flowers, table flow, melds, calling, discarding, winning hands, and Mahjong etiquette. They then progress to hand-building, including Pure hands, Semi Pure hands, 2 Suit hands, 5 Suit Hands and Pure Honors hands. The final level focuses on scoring, bonuses, penalties, dealer bonuses, self-draw wins, dice-on-the-wall, false Mahjong, chasing tiles, and common scoring mistakes.","includes":["Level 1: Foundation – Beginner Taiwanese Mahjong","Level 2: Hands: Pure & Semi Pure Hands, 2 Suit & 5 Suit Hands, and Pure Honors hands","Level 3: Scoring – Scoring, bonuses, and penalties"],"regularPrice":"AED 1100","bundlePrice":"AED 900","saving":"Save AED 200","pricingNote":null,"individualPricing":["Foundation: AED 600","5 Hands: AED 250","Scoring: AED 350","Total: AED 1,100"],"courseDuration":["3 sessions","2.5 hours per session","Total 7.5 hours"],"perfectFor":["Complete beginners to Taiwanese Mahjong","Players transitioning from other variants","Social Players","Anyone wanting a strong foundation and strategic understanding"],"outcome":"By the end of the Taiwanese Mahjong Masterclass Bundle, players will have a complete understanding of Taiwanese Mahjong from foundation to building scoring hands. They will be able to play with confidence, build stronger winning hands, recognise high-scoring opportunities, calculate scores accurately, apply bonuses correctly, and avoid common penalties at the table.","cta":"LEARN. MASTER. WIN."},{"id":"taiwanese-mastery","emoji":"🎯","title":"Taiwanese Mahjong Mastery","subtitle":"SPECIAL FOCUS SESSIONS FOR HIGHER-SCORING MAHJONG HANDS","tagline":"High Scoring Hands","body":"Each session focuses on a specific advanced hand pattern, with clear examples, practical guidance, and table-based understanding so players can apply the hands during real play.\n\nThe Advance Hands Mastery Bundle is designed for players who already understand the basics of Taiwanese Mahjong and want to strengthen their hand-building skills. These focused sessions help players learn, recognise, and confidently build special higher-scoring winning combinations.\n\nThese hands build on the Advanced Hands course content, including Pong hands, Sheung hands, Jewel hands, Step Up hands, Terminal hands and Hands in Pairs.\n\nThe series is delivered through seven specialised hand-building modules, allowing players to focus on the hand types they wish to learn, strengthen, and master.","modules":["Advance Hands- Pure & Semi Pure hands, 2 Suit & 5 Suit hands and Pure Honors hands","Jewel Hands: Jade, Ruby, Diamond and Jade with Ruby hands","Pong Hands: All Pong, Wind Pong, Dragon Pong, Sister Pong & Uncle Pong Hands","Sheung Hands: All Sheung, Sister Sheung, Brother Sheung, Dragon Runs and Four in 2/3/4 ways","Step Up Hands","Terminal hands: Terminal Pongs, Terminal Sheungs, Orphan hands","Concealed Hands: Hands in pairs","Scoring"],"modulesTitle":"MODULES INCLUDED","regularPrice":"AED 2,000","bundlePrice":"AED 1,600","saving":"Save AED 400","pricingNote":"Bundle Price: AED 200 per module","individualPricing":["AED 250 per module","8 modules","Total- AED 2,000"],"courseDuration":["2 hours per module","8 modules","Total: 16 hours"],"perfectFor":["Players who have completed the Launchpad Bundle or have a strong Taiwanese Mahjong foundation","Players looking to expand their hand-building knowledge","Players who want to improve strategic thinking and decision-making","Players who love to learn new hands and the entire range of Taiwanese hands","Players who enjoy learning the scoring for all Taiwanese hands"],"outcome":"By the end of each session, players will understand the structure of the selected advanced hand, recognise the tiles and melds required, and learn how to plan their game towards completing that hand. These sessions help players move beyond basic winning combinations and start aiming for stronger, more rewarding Mahjong hands.","cta":"THINK. LEARN. APPLY."}]}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";

-- Section: cta (Call to Action)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-taiwanese-mahjong'),
  'cta',
  'Call to Action',
  2,
  '{"tag":"Ready to Progress Faster?","title":"Choose Your Bundle and Begin","description":"All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience, then choose your bundle on the booking screen.","btnLabel":"Book a Session","btnLink":"/book-session?game=Taiwanese%20Mahjong"}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";
