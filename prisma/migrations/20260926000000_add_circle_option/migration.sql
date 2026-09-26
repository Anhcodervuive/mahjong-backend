-- CreateTable
CREATE TABLE IF NOT EXISTS "CircleOption" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CircleOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "CircleOption_type_order_idx" ON "CircleOption"("type", "order");

-- Seed default Preferred Days
INSERT INTO "CircleOption" ("type", "value", "order", "isActive") 
SELECT 'DAY', 'Monday', 1, true
WHERE NOT EXISTS (SELECT 1 FROM "CircleOption" WHERE "type" = 'DAY' AND "value" = 'Monday');

INSERT INTO "CircleOption" ("type", "value", "order", "isActive") 
SELECT 'DAY', 'Tuesday', 2, true
WHERE NOT EXISTS (SELECT 1 FROM "CircleOption" WHERE "type" = 'DAY' AND "value" = 'Tuesday');

INSERT INTO "CircleOption" ("type", "value", "order", "isActive") 
SELECT 'DAY', 'Wednesday', 3, true
WHERE NOT EXISTS (SELECT 1 FROM "CircleOption" WHERE "type" = 'DAY' AND "value" = 'Wednesday');

INSERT INTO "CircleOption" ("type", "value", "order", "isActive") 
SELECT 'DAY', 'Thursday', 4, true
WHERE NOT EXISTS (SELECT 1 FROM "CircleOption" WHERE "type" = 'DAY' AND "value" = 'Thursday');

INSERT INTO "CircleOption" ("type", "value", "order", "isActive") 
SELECT 'DAY', 'Friday', 5, true
WHERE NOT EXISTS (SELECT 1 FROM "CircleOption" WHERE "type" = 'DAY' AND "value" = 'Friday');

INSERT INTO "CircleOption" ("type", "value", "order", "isActive") 
SELECT 'DAY', 'Saturday', 6, true
WHERE NOT EXISTS (SELECT 1 FROM "CircleOption" WHERE "type" = 'DAY' AND "value" = 'Saturday');

-- Seed default Preferred Times (Exact 5 slots matching Playdays requested by client)
INSERT INTO "CircleOption" ("type", "value", "order", "isActive") 
SELECT 'TIME', '10 am-12 pm', 1, true
WHERE NOT EXISTS (SELECT 1 FROM "CircleOption" WHERE "type" = 'TIME' AND "value" = '10 am-12 pm');

INSERT INTO "CircleOption" ("type", "value", "order", "isActive") 
SELECT 'TIME', '1 pm-3 pm', 2, true
WHERE NOT EXISTS (SELECT 1 FROM "CircleOption" WHERE "type" = 'TIME' AND "value" = '1 pm-3 pm');

INSERT INTO "CircleOption" ("type", "value", "order", "isActive") 
SELECT 'TIME', '2 pm- 4 pm', 3, true
WHERE NOT EXISTS (SELECT 1 FROM "CircleOption" WHERE "type" = 'TIME' AND "value" = '2 pm- 4 pm');

INSERT INTO "CircleOption" ("type", "value", "order", "isActive") 
SELECT 'TIME', '4 pm - 6 pm', 4, true
WHERE NOT EXISTS (SELECT 1 FROM "CircleOption" WHERE "type" = 'TIME' AND "value" = '4 pm - 6 pm');

INSERT INTO "CircleOption" ("type", "value", "order", "isActive") 
SELECT 'TIME', '6 pm-8 pm', 5, true
WHERE NOT EXISTS (SELECT 1 FROM "CircleOption" WHERE "type" = 'TIME' AND "value" = '6 pm-8 pm');
