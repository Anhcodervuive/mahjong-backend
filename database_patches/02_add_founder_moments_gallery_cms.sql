-- =========================================================================
-- PATCH 02: Add Moments Gallery Section to Founder CMS Page
-- Target Environments: Staging & Production
-- Description:
--   Inserts/Updates the 'gallery' section for slug 'founder' in "CmsSection".
--   Allows the Admin to view and edit the 6 Moments photos in CMS (/admin/cms/founder).
-- =========================================================================

INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
SELECT 
    id, 
    'gallery', 
    'Moments Gallery', 
    4,
    '{
      "title": "A Glimpse Into the Journey",
      "subtitle": "Moments Behind Mahjong Success",
      "images": [
        { "src": "/moments/moment-1.png", "alt": "Hashmat Pereira arranging Mahjong tiles" },
        { "src": "/moments/moment-2.png", "alt": "Hashmat Pereira playing Mahjong at the table" },
        { "src": "/moments/moment-3.png", "alt": "Hashmat Pereira seated at a Mahjong table" },
        { "src": "/moments/moment-4.png", "alt": "Hashmat Pereira holding a Mahjong tile" },
        { "src": "/moments/moment-5.png", "alt": "Hashmat Pereira showing a Mahjong tile" },
        { "src": "/moments/moment-6.png", "alt": "Hashmat Pereira portrait" }
      ]
    }'::jsonb
FROM "CmsPage" 
WHERE slug = 'founder'
ON CONFLICT ("pageId", "key") 
DO UPDATE SET 
    "content" = EXCLUDED."content",
    "name" = EXCLUDED."name";
