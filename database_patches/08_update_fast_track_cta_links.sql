-- ==============================================================================
-- 08_update_fast_track_cta_links.sql
-- Description: Update Hero and Footer CTA links across all Fast-Track bundle pages
--              to route to the game's first fast-track bundle (Launchpad)
-- Target DB:   PostgreSQL (phpPgAdmin / psql)
-- ==============================================================================

BEGIN;

-- 1. Western Mahjong Fast-Track
UPDATE "CmsSection"
SET "content" = jsonb_set("content", '{btnLink}', '"/book-session?game=Western%20Mahjong&category=Fast%20Track%20Bundles&session=Mahjong%20Success%20Launchpad"', true)
WHERE "pageId" = (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-western-mahjong')
  AND "key" IN ('cta', 'hero');

-- 2. American Mahjong Fast-Track
UPDATE "CmsSection"
SET "content" = jsonb_set("content", '{btnLink}', '"/book-session?game=American%20Mahjong&category=Fast%20Track%20Bundles&session=Mahjong%20Success%20Launchpad"', true)
WHERE "pageId" = (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-american-mahjong')
  AND "key" IN ('cta', 'hero');

-- 3. International Goulash Fast-Track
UPDATE "CmsSection"
SET "content" = jsonb_set("content", '{btnLink}', '"/book-session?game=International%20Goulash&category=Fast%20Track%20Bundles&session=Mahjong%20Success%20Launchpad"', true)
WHERE "pageId" = (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-international-goulash')
  AND "key" IN ('cta', 'hero');

-- 4. Taiwanese Mahjong Fast-Track
UPDATE "CmsSection"
SET "content" = jsonb_set("content", '{btnLink}', '"/book-session?game=Taiwanese%20Mahjong&category=Fast%20Track%20Bundles&session=Mahjong%20Success%20Launchpad"', true)
WHERE "pageId" = (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-taiwanese-mahjong')
  AND "key" IN ('cta', 'hero');

-- 5. Fast-Track Bundles (Main Hub Page)
UPDATE "CmsSection"
SET "content" = jsonb_set(
  jsonb_set(
    "content",
    '{btnLink}',
    '"/book-session?game=International%20Goulash&category=Fast%20Track%20Bundles&session=Mahjong%20Success%20Launchpad"',
    true
  ),
  '{ctaBtnLink}',
  '"/book-session?game=International%20Goulash&category=Fast%20Track%20Bundles&session=Mahjong%20Success%20Launchpad"',
  true
)
WHERE "pageId" = (SELECT id FROM "CmsPage" WHERE slug = 'fast-track-bundles')
  AND "key" IN ('hero', 'virtual_cta', 'fast-track-bundles_hero', 'cta');

COMMIT;
