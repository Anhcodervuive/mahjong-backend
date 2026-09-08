-- =========================================================================
-- PATCH 02: Perfectly Structured Founder CMS Page (In Exact Visual Order)
-- 0: Hero Section
-- 1: Photo & Profile Biography
-- 2: The Founder Story
-- 3: Moments Behind Mahjong Success Gallery
-- 4: Call to Action (Book a Session)
-- =========================================================================

DELETE FROM "CmsSection" WHERE "pageId" IN (SELECT id FROM "CmsPage" WHERE slug = 'founder');

-- 0. Hero Section
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
SELECT 
    id, 
    'hero', 
    '1. Hero Section', 
    0,
    '{"badge": "Meet the Founder", "title": "Hashmat Pereira", "subtitle": "Founder, Mahjong Success", "desc": "A passionate advocate of lifelong learning, strategic thinking, and community building through Mahjong."}'::jsonb
FROM "CmsPage" WHERE slug = 'founder';

-- 1. Photo & Profile Biography
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
SELECT 
    id, 
    'bio', 
    '2. Photo & Profile Biography', 
    1,
    '{"image": "/hashmat-pereira.jpg", "bioBadge": "25+ Years of Leadership Experience", "bioTitle": "Hashmat Pereira", "bioSubtitle": "Founder, Mahjong Success", "bioDesc1": "Hashmat Pereira is the Founder of Mahjong Success and a passionate advocate of lifelong learning, strategic thinking, and community building through Mahjong.", "bioDesc2": "With more than 25 years of leadership experience, Hashmat has built, launched, and managed successful businesses, led large teams, developed products, training programmes, and delivered coaching and mentorship across multiple industries. Her career includes senior leadership roles with leading global and regional organisations including Mastercard, Citibank, Mashreq Bank, and Samba Financial Group.", "bioDesc3": "Drawing on this extensive experience in strategy, training, customer engagement, and business development, Hashmat created Mahjong Success to provide a structured and enjoyable pathway for players to learn, play, and master the board game Mahjong."}'::jsonb
FROM "CmsPage" WHERE slug = 'founder';

-- 2. The Founder Story
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
SELECT 
    id, 
    'story', 
    '3. The Founder Story', 
    2,
    '{"badge": "The Story", "title": "From Corporate Leadership to Social Community Building", "desc1": "Hashmat''s vision is to make the board game Mahjong accessible to people of all ages and backgrounds while building a vibrant community that brings together families, friends, students, professionals, and lifelong learners.", "desc2": "Through Mahjong Success, she combines her expertise in training, events, strategy, and community building to create a unique learning and social experience that helps players connect, grow, and succeed.", "desc3": "Her belief is simple: Mahjong is more than a game. It is a way to connect, learn, think strategically, and build relationships that last a lifetime.", "quote": "\"Through Mahjong Success, we bring together families, friends, students, professionals, and lifelong learners through the timeless game of Mahjong.\"", "tagline": "Learn. Play. Strategise. Speed. Succeed.", "author": "Hashmat Pereira", "authorTitle": "— Founder, Mahjong Success"}'::jsonb
FROM "CmsPage" WHERE slug = 'founder';

-- 3. Moments Gallery
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
SELECT 
    id, 
    'gallery', 
    '4. Moments Gallery', 
    3,
    '{"subtitle": "Moments Behind Mahjong Success", "title": "A Glimpse Into the Journey", "images": [{"src": "/moments/moment-1.png", "alt": "Hashmat Pereira arranging Mahjong tiles"}, {"src": "/moments/moment-2.png", "alt": "Hashmat Pereira playing Mahjong at the table"}, {"src": "/moments/moment-3.png", "alt": "Hashmat Pereira seated at a Mahjong table"}, {"src": "/moments/moment-4.png", "alt": "Hashmat Pereira holding a Mahjong tile"}, {"src": "/moments/moment-5.png", "alt": "Hashmat Pereira showing a Mahjong tile"}, {"src": "/moments/moment-6.png", "alt": "Hashmat Pereira portrait"}]}'::jsonb
FROM "CmsPage" WHERE slug = 'founder';

-- 4. Call to Action
INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
SELECT 
    id, 
    'cta', 
    '5. Call to Action', 
    4,
    '{"title": "Learn with Hashmat", "desc": "Book your first session and experience the Mahjong Success approach — structured, enjoyable, and designed to give you confidence at the table.", "btnText": "Book a Session", "btnLink": "/book-session"}'::jsonb
FROM "CmsPage" WHERE slug = 'founder';
