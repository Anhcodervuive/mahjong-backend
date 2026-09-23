import * as fs from 'fs';
import * as path from 'path';
import { seedPlaydaysPage } from '../prisma/seeds/playdays.seed';
import { seedTermsAndConditionsPage } from '../prisma/seeds/terms-and-conditions.seed';
import { seedFastTrackSplitPages } from '../prisma/seeds/fast-track-split.seed';

async function generate() {
  const statements: string[] = [
    '-- =========================================================================',
    '-- PATCH 05: Seed Playdays, Terms & Conditions & 4 Fast-Track Split Pages',
    '-- Compatible with PostgreSQL on cPanel / phpPgAdmin',
    '-- =========================================================================\n',
  ];

  const mockPrisma: any = {
    cmsPage: {
      upsert: async ({ where, update, create }: any) => {
        statements.push(`-- ── CmsPage: ${create.slug} ──`);
        statements.push(`INSERT INTO "CmsPage" ("slug", "title", "metaTitle", "metaDescription")
VALUES (
  '${create.slug}',
  '${(create.title || '').replace(/'/g, "''")}',
  '${(create.metaTitle || '').replace(/'/g, "''")}',
  '${(create.metaDescription || '').replace(/'/g, "''")}'
)
ON CONFLICT ("slug") DO UPDATE SET
  "title" = EXCLUDED."title",
  "metaTitle" = EXCLUDED."metaTitle",
  "metaDescription" = EXCLUDED."metaDescription";\n`);
        return { id: `(SELECT id FROM "CmsPage" WHERE slug = '${create.slug}')`, slug: create.slug };
      },
      findUnique: async () => null,
    },
    cmsSection: {
      upsert: async ({ where, update, create }: any) => {
        const jsonContent = JSON.stringify(create.content).replace(/'/g, "''");
        statements.push(`-- Section: ${create.key} (${create.name})`);
        statements.push(`INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
VALUES (
  ${create.pageId},
  '${create.key}',
  '${(create.name || '').replace(/'/g, "''")}',
  ${create.order || 0},
  '${jsonContent}'::jsonb
)
ON CONFLICT ("pageId", "key") DO UPDATE SET
  "name" = EXCLUDED."name",
  "order" = EXCLUDED."order",
  "content" = EXCLUDED."content";\n`);
        return {};
      },
      deleteMany: async ({ where }: any) => {
        statements.push(`DELETE FROM "CmsSection" WHERE "pageId" = ${where.pageId};\n`);
        return {};
      },
    },
  };

  await seedPlaydaysPage(mockPrisma);
  await seedTermsAndConditionsPage(mockPrisma);
  await seedFastTrackSplitPages(mockPrisma);

  const outPath = path.join(__dirname, '../database_patches/05_add_split_bundles_and_new_features_cms.sql');
  fs.writeFileSync(outPath, statements.join('\n'), 'utf8');
  console.log('✅ Generated SQL patch successfully at:', outPath);
}

generate().catch(console.error);
