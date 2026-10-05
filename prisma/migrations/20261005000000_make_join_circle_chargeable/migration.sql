-- AlterTable Payment: make bookingId optional and add joinCircleRequestId
ALTER TABLE "Payment" ALTER COLUMN "bookingId" DROP NOT NULL;
ALTER TABLE "Payment" ADD COLUMN IF NOT EXISTS "joinCircleRequestId" INTEGER;

-- AlterTable JoinCircleRequest: add fee, paymentStatus, orderReference, paymentUrl
ALTER TABLE "JoinCircleRequest" ADD COLUMN IF NOT EXISTS "fee" DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE "JoinCircleRequest" ADD COLUMN IF NOT EXISTS "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
ALTER TABLE "JoinCircleRequest" ADD COLUMN IF NOT EXISTS "orderReference" TEXT;
ALTER TABLE "JoinCircleRequest" ADD COLUMN IF NOT EXISTS "paymentUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Payment_joinCircleRequestId_key" ON "Payment"("joinCircleRequestId");

-- AddForeignKey
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

-- Seed default circle_flat_fee setting if not exists
INSERT INTO "Setting" ("key", "value", "createdAt", "updatedAt")
VALUES ('circle_flat_fee', '100', NOW(), NOW())
ON CONFLICT ("key") DO NOTHING;
