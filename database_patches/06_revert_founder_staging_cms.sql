-- =========================================================================
-- PATCH 06: Founder CMS Page Matching Verified Layout (No Story Timeline)
-- Compatible with PostgreSQL on cPanel / phpPgAdmin
-- Sections:
-- 0: Hero Section (with Founder Profile & Bio)
-- 1: Experience & Background (6 cards)
-- 2: Vision Behind Mahjong Success (with Tile Talk & Thinking Table)
-- 3: Moments Gallery (3 images before CTA: moment-1, moment-4, moment-5)
-- 4: Call to Action (Book a Session)
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
  '{"EXPERIENCE_CARDS":[{"icon":"Briefcase","title":"Senior Leadership","desc":"25+ years across global and regional organisations including Mastercard, Citibank, Mashreq Bank, and Samba Financial Group."},{"icon":"CalendarDays","title":"Events & Experiences","desc":"Partner at a leading events management company in the UAE, bringing deep expertise in corporate experiences, community events, and social gatherings."},{"icon":"BookOpen","title":"Training & Coaching","desc":"Combines professional teaching methodologies with a structured learning framework to build knowledge, sharpen strategic thinking, foster personal development, and build confidence."},{"icon":"Users","title":"Networking Advocate","desc":"Dedicated to community building and bringing people of all ages and backgrounds together to strengthen communication, build meaningful connections, and develop networking skills."},{"icon":"Lightbulb","title":"Strategic Thinker","desc":"Passionate about developing strategic and analytical thinking, encouraging individuals to sharpen decision-making, problem-solving, focus and adaptability through engaging learning experiences."},{"icon":"Award","title":"Lifelong Learner","desc":"Believes in continuous learning and personal growth, inspiring individuals to stay curious, challenge themselves, develop new skills and build confidence at every stage of life."}]}'::jsonb
);

-- 2. Vision Behind Mahjong Success (4 pillars & quote)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'founder'),
  'vision',
  '3. Vision Behind Mahjong Success',
  2,
  '{"title":"The Vision Behind Mahjong Success","desc1":"Hashmat’s vision is to use Mahjong as an engaging learning tool to help individuals and corporates develop valuable personal, social and professional skills.","desc2":"Through Mahjong, she aims to strengthen strategic thinking, decision-making, adaptability, focus and problem-solving, while exercising the brain, encouraging personal development and building confidence.","desc3":"Ultimately, her vision is to make Mahjong accessible to people of all ages and backgrounds, while building a vibrant and inclusive community.","VISION_PILLARS":[{"label":"Mahjong Success Training","desc":"Structured training across different versions of Mahjong, including American, Western and Taiwanese Mahjong, taking players from beginner foundations through to advanced hands, strategy and scoring."},{"label":"Tile Talk by Mahjong Success","desc":"Watch. Learn. Play. Succeed. Quick Mahjong training, tips and strategies through short videos on YouTube @TileTalkbyMahjongSuccess."},{"label":"The Thinking Table","desc":"The Corporate Training Program by Mahjong Success. The Thinking Table takes Mahjong beyond the game and into the workplace, using its strategic elements to create an engaging and interactive team experience."},{"label":"The Mahjong Success Circle","desc":"A vibrant social and networking community that brings together like-minded people through a shared love of Mahjong. Connect, build new relationships, and enjoy social events, matches, tournaments and offsites."}],"quoteText":"\"Through Mahjong Success, we bring together families, friends, professionals, and lifelong learners through the timeless game of Mahjong.\"","quoteBtnText":"Learn. Play. Strategise. Speed. Succeed.","quoteBtnLink":"/book-session","author":"Hashmat Pereira","authorTitle":"— Founder, Mahjong Success"}'::jsonb
);

-- 3. Moments Gallery (3 images before CTA: moment-1, moment-4, moment-5)
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'founder'),
  'gallery',
  '4. Moments Gallery (3 Images)',
  3,
  '{"subtitle":"MOMENTS BEHIND MAHJONG SUCCESS","title":"A Glimpse Into the Journey","images":[{"src":"/moments/moment-1.png","alt":"Hashmat Pereira arranging Mahjong table setup"},{"src":"/moments/moment-4.png","alt":"Hashmat Pereira playing with Mahjong tiles"},{"src":"/moments/moment-5.png","alt":"Hashmat Pereira with Mahjong tiles at table"}]}'::jsonb
);

-- 4. Call to Action
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  (SELECT id FROM "CmsPage" WHERE slug = 'founder'),
  'cta',
  '5. Call to Action',
  4,
  '{"title":"Learn with Hashmat","desc":"Book your first session and experience the Mahjong Success approach — structured, enjoyable, and designed to give you confidence at the table.","btnText":"Book a Session","btnLink":"/book-session"}'::jsonb
);
