-- =========================================================================
-- PATCH 06: Revert Founder CMS Page to Early September Layout for Staging
-- Compatible with PostgreSQL on cPanel / phpPgAdmin
-- Sections:
-- 0: Hero Section (with Founder Profile & Bio)
-- 1: Experience & Background (6 cards)
-- 2: The Story Timeline (5 milestones)
-- 3: Vision Behind Mahjong Success (4 pillars & quote)
-- 4: Moments Gallery (3 images before CTA: moment-1, moment-4, moment-5)
-- 5: Call to Action (Book a Session)
-- =========================================================================

-- Ensure CmsPage founder exists
INSERT INTO "CmsPage" ("slug", "title", "metaTitle", "metaDescription")
VALUES (
  'founder',
  'Founder',
  'Meet the Founder | Mahjong Success',
  'Learn about Hashmat Pereira, founder of Mahjong Success, with 25+ years of leadership, corporate training, and community building.'
)
ON CONFLICT ("slug") DO UPDATE SET
  "title" = EXCLUDED."title",
  "metaTitle" = EXCLUDED."metaTitle",
  "metaDescription" = EXCLUDED."metaDescription";

-- Clear existing sections for founder to ensure clean order and structure
DELETE FROM "CmsSection" WHERE "pageId" = (SELECT id FROM "CmsPage" WHERE slug = 'founder');

-- 0. Hero Section
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'founder'),
  'hero',
  '1. Hero & Profile Section',
  0,
  '{"badge":"Meet the Founder","title":"Hashmat Pereira","subtitle":"Founder, Mahjong Success","desc":"A passionate advocate of lifelong learning, strategic thinking, and community building through Mahjong.","image":"/hashmat-pereira.jpg","bioBadge":"25+ Years of Leadership Experience","bioTitle":"Hashmat Pereira","bioSubtitle":"Founder, Mahjong Success","bioDesc1":"Hashmat Pereira is the Founder of Mahjong Success and a passionate advocate of lifelong learning, strategic thinking, and community building through Mahjong.","bioDesc2":"With more than 25 years of leadership experience, Hashmat has built, launched, and managed successful businesses, led large teams, developed products, training programmes, and delivered coaching and mentorship across multiple industries. Her career includes senior leadership roles with leading global and regional organisations including Mastercard, Citibank, Mashreq Bank, and Samba Financial Group.","bioDesc3":"Drawing on this extensive experience in strategy, training, customer engagement, and business development, Hashmat created Mahjong Success to provide a structured and enjoyable pathway for players to learn, play, and master the board game Mahjong."}'::jsonb
);

-- 1. Experience & Background (6 cards)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'founder'),
  'experience',
  '2. Experience & Background',
  1,
  '{"EXPERIENCE_CARDS":[{"icon":"Briefcase","title":"Senior Leadership","desc":"25+ years across global and regional organisations including Mastercard, Citibank, Mashreq Bank, and Samba Financial Group."},{"icon":"CalendarDays","title":"Events & Experiences","desc":"Partner at Flagship Events LLC — a leading events and experiences company in the UAE — bringing deep expertise in corporate experiences, community events, and social gatherings."},{"icon":"UserCheck","title":"Licensed Private Tutor","desc":"Combines professional teaching methodologies with a structured learning framework to build Mahjong knowledge, strategic thinking, and gameplay skills."},{"icon":"Users","title":"Community Builder","desc":"Passionate advocate for lifelong learning, community building, and bringing people of all ages and backgrounds together through Mahjong."},{"icon":"BookOpen","title":"Training & Coaching","desc":"Built, launched, and managed successful businesses; led large teams; developed products, training programmes, and delivered coaching and mentorship across multiple industries."},{"icon":"Lightbulb","title":"Strategic Thinker","desc":"Deep expertise in strategy, customer engagement, business development, and creating structured pathways that make complex skills accessible and enjoyable."}]}'::jsonb
);

-- 2. The Story Timeline (5 milestones)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'founder'),
  'story',
  '3. The Story Timeline',
  2,
  '{"badge":"The Story","title":"The Story","subtitle":"From Corporate Leadership to Social Community Building","STORY_TIMELINE":[{"year":"The Foundation","title":"A Career Built on Leadership","desc":"With more than 25 years of experience building businesses, leading large teams, and delivering coaching across multiple industries, Hashmat developed a rare combination of strategic, operational, and people skills."},{"year":"Events & Community","title":"Partner at Flagship Events LLC","desc":"As a Partner at Flagship Events LLC in the UAE, Hashmat gained deep expertise in event management, community engagement, corporate experiences, and social gatherings — capabilities that now directly power Mahjong Success events, tournaments, and community circles."},{"year":"A Passion Ignited","title":"Discovering Mahjong''s Potential","desc":"Beyond the tiles and strategy, Hashmat saw how the board game Mahjong uniquely combined strategic thinking, continuous learning, and genuine human connection — making it a powerful vehicle for community building across all ages and backgrounds."},{"year":"Identifying the Gap","title":"A Structured Learning Pathway","desc":"Many players found Mahjong intimidating or difficult to learn without proper guidance. Drawing on her training and coaching background, Hashmat envisioned a structured, enjoyable approach that would make learning Mahjong an engaging & fulfilling experience from the very first tile."},{"year":"Mahjong Success","title":"Building Something Real","desc":"Combining her expertise in training, events, strategy, and social community building, Hashmat founded Mahjong Success — a unique learning and social experience that helps players connect, grow, and succeed through Mahjong."}]}'::jsonb
);

-- 3. Vision Behind Mahjong Success (4 pillars & quote)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'founder'),
  'vision',
  '4. Vision Behind Mahjong Success',
  3,
  '{"title":"The Vision Behind Mahjong Success","desc1":"Hashmat''s vision is to make the board game Mahjong accessible to people of all ages and backgrounds while building a vibrant community that brings together families, friends, students, professionals, and lifelong learners.","desc2":"Through Mahjong Success, she combines her expertise in training, events, strategy, and community building to create a unique learning and social experience that helps players connect, grow, and succeed.","desc3":"Her belief is simple: Mahjong is more than a game. It is a way to connect, learn, think strategically, and build relationships that last a lifetime.","VISION_PILLARS":[{"label":"Make Mahjong Accessible","desc":"Create structured, enjoyable learning pathways for players of all ages and backgrounds — from complete beginners to advanced players."},{"label":"Build a Vibrant Community","desc":"Bring together families, friends, students, professionals, and lifelong learners through the timeless game of Mahjong."},{"label":"Develop Strategic Thinking","desc":"Help players strengthen decision-making, observation, analytical thinking, and planning skills through structured Mahjong learning."},{"label":"Create Lasting Connections","desc":"Foster a welcoming environment where every player — regardless of age or experience — feels at home at the Mahjong table."}],"quoteText":"\"Through Mahjong Success, we bring together families, friends, students, professionals, and lifelong learners through the timeless game of Mahjong.\"","quoteBtnText":"Learn. Play. Strategise. Speed. Succeed.","quoteBtnLink":"/book-session","author":"Hashmat Pereira","authorTitle":"— Founder, Mahjong Success"}'::jsonb
);

-- 4. Moments Gallery (3 images before CTA: moment-1, moment-4, moment-5)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'founder'),
  'gallery',
  '5. Moments Gallery (3 Images)',
  4,
  '{"subtitle":"MOMENTS BEHIND MAHJONG SUCCESS","title":"A Glimpse Into the Journey","images":[{"src":"/moments/moment-1.png","alt":"Hashmat Pereira with Mahjong table setup"},{"src":"/moments/moment-4.png","alt":"Hashmat Pereira playing with Mahjong tiles"},{"src":"/moments/moment-5.png","alt":"Hashmat Pereira arranging Mahjong tiles"}]}'::jsonb
);

-- 5. Call to Action
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'founder'),
  'cta',
  '6. Call to Action',
  5,
  '{"title":"Learn with Hashmat","desc":"Book your first session and experience the Mahjong Success approach — structured, enjoyable, and designed to give you confidence at the table.","btnText":"Book a Session","btnLink":"/book-session"}'::jsonb
);
