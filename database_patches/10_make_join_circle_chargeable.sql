-- ==============================================================================
-- 10_make_join_circle_chargeable.sql
-- Description: Add payment and fee columns to JoinCircleRequest, support
--              linking Payment records to JoinCircleRequest, and seed initial
--              circle_flat_fee setting.
-- Target DB:   PostgreSQL (phpPgAdmin / psql)
-- ==============================================================================

BEGIN;

-- 1. Allow Payment to be linked to either Booking or JoinCircleRequest
ALTER TABLE "Payment" ALTER COLUMN "bookingId" DROP NOT NULL;

ALTER TABLE "Payment" ADD COLUMN IF NOT EXISTS "joinCircleRequestId" INTEGER;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Payment_joinCircleRequestId_fkey'
  ) THEN
    ALTER TABLE "Payment" ADD CONSTRAINT "Payment_joinCircleRequestId_fkey"
      FOREIGN KEY ("joinCircleRequestId") REFERENCES "JoinCircleRequest"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "Payment_joinCircleRequestId_key"
  ON "Payment"("joinCircleRequestId")
  WHERE "joinCircleRequestId" IS NOT NULL;

-- 2. Add Fee and Payment tracking to JoinCircleRequest
ALTER TABLE "JoinCircleRequest" ADD COLUMN IF NOT EXISTS "fee" DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE "JoinCircleRequest" ADD COLUMN IF NOT EXISTS "paymentStatus" "PaymentStatus" DEFAULT 'PENDING';
ALTER TABLE "JoinCircleRequest" ADD COLUMN IF NOT EXISTS "orderReference" TEXT;
ALTER TABLE "JoinCircleRequest" ADD COLUMN IF NOT EXISTS "paymentUrl" TEXT;

-- 3. Seed default flat fee setting in Setting table (e.g. 100 AED, customizable via admin/db)
INSERT INTO "Setting" ("key", "value", "createdAt", "updatedAt")
VALUES ('circle_flat_fee', '100', NOW(), NOW())
ON CONFLICT ("key") DO NOTHING;

COMMIT;
