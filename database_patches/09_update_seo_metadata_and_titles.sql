-- ==============================================================================
-- 09_update_seo_metadata_and_titles.sql
-- Description: Update SEO Meta Titles, Descriptions, OG tags and clear obsolete
--              meta keywords across all CMS pages according to the SEO Audit.
-- Target DB:   PostgreSQL (phpPgAdmin / psql)
-- ==============================================================================

BEGIN;

-- Helper CTE / Updates for all core pages
UPDATE "CmsPage"
SET 
  "metaTitle" = 'Mahjong Classes in Dubai | Learn & Play | Mahjong Success',
  "metaDescription" = 'A structured pathway to learning, playing, and succeeding at Mahjong in Dubai — structured lessons, guided play sessions, and a vibrant community.',
  "ogMetaTitle" = 'Mahjong Classes in Dubai | Learn & Play | Mahjong Success',
  "ogMetaDescription" = 'A structured pathway to learning, playing, and succeeding at Mahjong in Dubai — structured lessons, guided play sessions, and a vibrant community.',
  "twitterMetaTitle" = 'Mahjong Classes in Dubai | Learn & Play | Mahjong Success',
  "twitterMetaDescription" = 'A structured pathway to learning, playing, and succeeding at Mahjong in Dubai — structured lessons, guided play sessions, and a vibrant community.',
  "metaKeyword" = NULL
WHERE "slug" = 'home';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Goulash Mahjong Classes in Dubai | Mahjong Success',
  "metaDescription" = 'Learn International Goulash Mahjong in Dubai. Structured classes from beginner to advanced with expert instruction and hands-on gameplay.',
  "ogMetaTitle" = 'Goulash Mahjong Classes in Dubai | Mahjong Success',
  "ogMetaDescription" = 'Learn International Goulash Mahjong in Dubai. Structured classes from beginner to advanced with expert instruction and hands-on gameplay.',
  "twitterMetaTitle" = 'Goulash Mahjong Classes in Dubai | Mahjong Success',
  "twitterMetaDescription" = 'Learn International Goulash Mahjong in Dubai. Structured classes from beginner to advanced with expert instruction and hands-on gameplay.',
  "metaKeyword" = NULL
WHERE "slug" = 'goulash';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'American Mahjong Classes in Dubai | NMJL Card & Charleston',
  "metaDescription" = 'Master American Mahjong in Dubai. Learn the official NMJL card rules, Charleston trading, and winning strategies in guided classes.',
  "ogMetaTitle" = 'American Mahjong Classes in Dubai | NMJL Card & Charleston',
  "ogMetaDescription" = 'Master American Mahjong in Dubai. Learn the official NMJL card rules, Charleston trading, and winning strategies in guided classes.',
  "twitterMetaTitle" = 'American Mahjong Classes in Dubai | NMJL Card & Charleston',
  "twitterMetaDescription" = 'Master American Mahjong in Dubai. Learn the official NMJL card rules, Charleston trading, and winning strategies in guided classes.',
  "metaKeyword" = NULL
WHERE "slug" = 'american-mahjong';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Taiwanese Mahjong Classes in Dubai | 16-Tile Lessons',
  "metaDescription" = 'Learn 16-tile Taiwanese Mahjong in Dubai. Dynamic and fast-paced gameplay instruction for all skill levels.',
  "ogMetaTitle" = 'Taiwanese Mahjong Classes in Dubai | 16-Tile Lessons',
  "ogMetaDescription" = 'Learn 16-tile Taiwanese Mahjong in Dubai. Dynamic and fast-paced gameplay instruction for all skill levels.',
  "twitterMetaTitle" = 'Taiwanese Mahjong Classes in Dubai | 16-Tile Lessons',
  "twitterMetaDescription" = 'Learn 16-tile Taiwanese Mahjong in Dubai. Dynamic and fast-paced gameplay instruction for all skill levels.',
  "metaKeyword" = NULL
WHERE "slug" = 'taiwanese-mahjong';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Western Mahjong Classes in Dubai | Hands & Scoring',
  "metaDescription" = 'Discover Western / British Mahjong in Dubai. Master traditional hands, special hands, and scoring with structured coaching.',
  "ogMetaTitle" = 'Western Mahjong Classes in Dubai | Hands & Scoring',
  "ogMetaDescription" = 'Discover Western / British Mahjong in Dubai. Master traditional hands, special hands, and scoring with structured coaching.',
  "twitterMetaTitle" = 'Western Mahjong Classes in Dubai | Hands & Scoring',
  "twitterMetaDescription" = 'Discover Western / British Mahjong in Dubai. Master traditional hands, special hands, and scoring with structured coaching.',
  "metaKeyword" = NULL
WHERE "slug" = 'western-mahjong';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Mahjong Club & Open Play in Dubai | Mahjong Success',
  "metaDescription" = 'Join Dubai''s thriving Mahjong community. Regular club sessions, open play, social games, and friendly competitions across Dubai.',
  "ogMetaTitle" = 'Mahjong Club & Open Play in Dubai | Mahjong Success',
  "ogMetaDescription" = 'Join Dubai''s thriving Mahjong community. Regular club sessions, open play, social games, and friendly competitions across Dubai.',
  "twitterMetaTitle" = 'Mahjong Club & Open Play in Dubai | Mahjong Success',
  "twitterMetaDescription" = 'Join Dubai''s thriving Mahjong community. Regular club sessions, open play, social games, and friendly competitions across Dubai.',
  "metaKeyword" = NULL
WHERE "slug" = 'community';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Private Mahjong Lessons at Home in Dubai | Travelling Tutor',
  "metaDescription" = 'Book private Mahjong coaching at your home or venue in Dubai. Tailored 1-on-1 and small group sessions with a travelling tutor.',
  "ogMetaTitle" = 'Private Mahjong Lessons at Home in Dubai | Travelling Tutor',
  "ogMetaDescription" = 'Book private Mahjong coaching at your home or venue in Dubai. Tailored 1-on-1 and small group sessions with a travelling tutor.',
  "twitterMetaTitle" = 'Private Mahjong Lessons at Home in Dubai | Travelling Tutor',
  "twitterMetaDescription" = 'Book private Mahjong coaching at your home or venue in Dubai. Tailored 1-on-1 and small group sessions with a travelling tutor.',
  "metaKeyword" = NULL
WHERE "slug" = 'premium-experiences';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Mahjong Parties, Socials & Tournaments in Dubai',
  "metaDescription" = 'Experience high-energy Mahjong parties, tournaments, and social game nights across premier venues in Dubai.',
  "ogMetaTitle" = 'Mahjong Parties, Socials & Tournaments in Dubai',
  "ogMetaDescription" = 'Experience high-energy Mahjong parties, tournaments, and social game nights across premier venues in Dubai.',
  "twitterMetaTitle" = 'Mahjong Parties, Socials & Tournaments in Dubai',
  "twitterMetaDescription" = 'Experience high-energy Mahjong parties, tournaments, and social game nights across premier venues in Dubai.',
  "metaKeyword" = NULL
WHERE "slug" = 'mahjong-mania';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Mahjong Team Building for Companies in Dubai',
  "metaDescription" = 'Elevate team communication and strategic thinking with corporate Mahjong team-building workshops in Dubai.',
  "ogMetaTitle" = 'Mahjong Team Building for Companies in Dubai',
  "ogMetaDescription" = 'Elevate team communication and strategic thinking with corporate Mahjong team-building workshops in Dubai.',
  "twitterMetaTitle" = 'Mahjong Team Building for Companies in Dubai',
  "twitterMetaDescription" = 'Elevate team communication and strategic thinking with corporate Mahjong team-building workshops in Dubai.',
  "metaKeyword" = NULL
WHERE "slug" = 'thinking-table';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Hashmat Pereira | Founder of Mahjong Success Dubai',
  "metaDescription" = 'Meet Hashmat Pereira, founder of Mahjong Success. Dedicated to building Dubai''s leading Mahjong academy and vibrant player community.',
  "ogMetaTitle" = 'Hashmat Pereira | Founder of Mahjong Success Dubai',
  "ogMetaDescription" = 'Meet Hashmat Pereira, founder of Mahjong Success. Dedicated to building Dubai''s leading Mahjong academy and vibrant player community.',
  "twitterMetaTitle" = 'Hashmat Pereira | Founder of Mahjong Success Dubai',
  "twitterMetaDescription" = 'Meet Hashmat Pereira, founder of Mahjong Success. Dedicated to building Dubai''s leading Mahjong academy and vibrant player community.',
  "metaKeyword" = NULL
WHERE "slug" = 'founder';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Mahjong Playdays & Social Games in Dubai | Mahjong Success',
  "metaDescription" = 'Join weekly Mahjong playdays in Dubai. Practice your skills, meet fellow players, and enjoy guided casual gameplay.',
  "ogMetaTitle" = 'Mahjong Playdays & Social Games in Dubai | Mahjong Success',
  "ogMetaDescription" = 'Join weekly Mahjong playdays in Dubai. Practice your skills, meet fellow players, and enjoy guided casual gameplay.',
  "twitterMetaTitle" = 'Mahjong Playdays & Social Games in Dubai | Mahjong Success',
  "twitterMetaDescription" = 'Join weekly Mahjong playdays in Dubai. Practice your skills, meet fellow players, and enjoy guided casual gameplay.',
  "metaKeyword" = NULL
WHERE "slug" = 'playdays';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Guided Mahjong Games & Coaching in Dubai | Mahjong Success',
  "metaDescription" = 'Take your game to the next level with coach-guided Mahjong sessions in Dubai. Real-time feedback and tactical analysis.',
  "ogMetaTitle" = 'Guided Mahjong Games & Coaching in Dubai | Mahjong Success',
  "ogMetaDescription" = 'Take your game to the next level with coach-guided Mahjong sessions in Dubai. Real-time feedback and tactical analysis.',
  "twitterMetaTitle" = 'Guided Mahjong Games & Coaching in Dubai | Mahjong Success',
  "twitterMetaDescription" = 'Take your game to the next level with coach-guided Mahjong sessions in Dubai. Real-time feedback and tactical analysis.',
  "metaKeyword" = NULL
WHERE "slug" = 'guided-games';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Mahjong Fast-Track Course Bundles Dubai | Mahjong Success',
  "metaDescription" = 'Accelerate your Mahjong learning with structured course bundles in Dubai. Save and progress rapidly from novice to confident player.',
  "ogMetaTitle" = 'Mahjong Fast-Track Course Bundles Dubai | Mahjong Success',
  "ogMetaDescription" = 'Accelerate your Mahjong learning with structured course bundles in Dubai. Save and progress rapidly from novice to confident player.',
  "twitterMetaTitle" = 'Mahjong Fast-Track Course Bundles Dubai | Mahjong Success',
  "twitterMetaDescription" = 'Accelerate your Mahjong learning with structured course bundles in Dubai. Save and progress rapidly from novice to confident player.',
  "metaKeyword" = NULL
WHERE "slug" = 'fast-track-bundles';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'What You Receive | Mahjong Success Learning Materials',
  "metaDescription" = 'Discover what is included in Mahjong Success classes: high-quality tiles, rulebooks, reference cards, structured curriculum, and community access.',
  "ogMetaTitle" = 'What You Receive | Mahjong Success Learning Materials',
  "ogMetaDescription" = 'Discover what is included in Mahjong Success classes: high-quality tiles, rulebooks, reference cards, structured curriculum, and community access.',
  "twitterMetaTitle" = 'What You Receive | Mahjong Success Learning Materials',
  "twitterMetaDescription" = 'Discover what is included in Mahjong Success classes: high-quality tiles, rulebooks, reference cards, structured curriculum, and community access.',
  "metaKeyword" = NULL
WHERE "slug" = 'what-you-receive';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Terms and Conditions | Mahjong Success Dubai',
  "metaDescription" = 'Read the terms and conditions governing use of the Mahjong Success website, course bookings, guided games, events, and participation.',
  "ogMetaTitle" = 'Terms and Conditions | Mahjong Success Dubai',
  "ogMetaDescription" = 'Read the terms and conditions governing use of the Mahjong Success website, course bookings, guided games, events, and participation.',
  "twitterMetaTitle" = 'Terms and Conditions | Mahjong Success Dubai',
  "twitterMetaDescription" = 'Read the terms and conditions governing use of the Mahjong Success website, course bookings, guided games, events, and participation.',
  "metaKeyword" = NULL
WHERE "slug" = 'terms-and-conditions';

-- Fast-Track subpages
UPDATE "CmsPage"
SET 
  "metaTitle" = 'International Goulash Fast-Track Bundles Dubai | Mahjong Success',
  "metaDescription" = 'Accelerate your International Goulash journey in Dubai. Bundled learning packages from foundation to joker strategy and advanced hand mastery.',
  "ogMetaTitle" = 'International Goulash Fast-Track Bundles Dubai | Mahjong Success',
  "ogMetaDescription" = 'Accelerate your International Goulash journey in Dubai. Bundled learning packages from foundation to joker strategy and advanced hand mastery.',
  "twitterMetaTitle" = 'International Goulash Fast-Track Bundles Dubai | Mahjong Success',
  "twitterMetaDescription" = 'Accelerate your International Goulash journey in Dubai. Bundled learning packages from foundation to joker strategy and advanced hand mastery.',
  "metaKeyword" = NULL
WHERE "slug" = 'fast-track-international-goulash';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'American Mahjong Fast-Track Bundles Dubai | Mahjong Success',
  "metaDescription" = 'Fast-track your American Mahjong skills in Dubai. Learn the NMJL card, Charleston, and winning combinations with bundled classes.',
  "ogMetaTitle" = 'American Mahjong Fast-Track Bundles Dubai | Mahjong Success',
  "ogMetaDescription" = 'Fast-track your American Mahjong skills in Dubai. Learn the NMJL card, Charleston, and winning combinations with bundled classes.',
  "twitterMetaTitle" = 'American Mahjong Fast-Track Bundles Dubai | Mahjong Success',
  "twitterMetaDescription" = 'Fast-track your American Mahjong skills in Dubai. Learn the NMJL card, Charleston, and winning combinations with bundled classes.',
  "metaKeyword" = NULL
WHERE "slug" = 'fast-track-american-mahjong';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Western Mahjong Fast-Track Bundles Dubai | Mahjong Success',
  "metaDescription" = 'Learn Western Mahjong faster with bundled classes in Dubai. Master calling tiles, special hands, and high-scoring strategies.',
  "ogMetaTitle" = 'Western Mahjong Fast-Track Bundles Dubai | Mahjong Success',
  "ogMetaDescription" = 'Learn Western Mahjong faster with bundled classes in Dubai. Master calling tiles, special hands, and high-scoring strategies.',
  "twitterMetaTitle" = 'Western Mahjong Fast-Track Bundles Dubai | Mahjong Success',
  "twitterMetaDescription" = 'Learn Western Mahjong faster with bundled classes in Dubai. Master calling tiles, special hands, and high-scoring strategies.',
  "metaKeyword" = NULL
WHERE "slug" = 'fast-track-western-mahjong';

UPDATE "CmsPage"
SET 
  "metaTitle" = 'Taiwanese Mahjong Fast-Track Bundles Dubai | Mahjong Success',
  "metaDescription" = 'Accelerate your 16-tile Taiwanese Mahjong skills with fast-track course bundles in Dubai.',
  "ogMetaTitle" = 'Taiwanese Mahjong Fast-Track Bundles Dubai | Mahjong Success',
  "ogMetaDescription" = 'Accelerate your 16-tile Taiwanese Mahjong skills with fast-track course bundles in Dubai.',
  "twitterMetaTitle" = 'Taiwanese Mahjong Fast-Track Bundles Dubai | Mahjong Success',
  "twitterMetaDescription" = 'Accelerate your 16-tile Taiwanese Mahjong skills with fast-track course bundles in Dubai.',
  "metaKeyword" = NULL
WHERE "slug" = 'fast-track-taiwanese-mahjong';

COMMIT;
