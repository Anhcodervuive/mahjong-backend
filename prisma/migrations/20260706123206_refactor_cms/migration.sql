-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CmsPage" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "CmsPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CmsSection" (
    "id" SERIAL NOT NULL,
    "pageId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT,
    "content" JSONB NOT NULL,

    CONSTRAINT "CmsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coverImageId" INTEGER,
    "iconImageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionCategory" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "thumbnailId" INTEGER,
    "pricePerPerson" DECIMAL(10,2) NOT NULL,
    "duration" INTEGER NOT NULL,
    "minPlayers" INTEGER NOT NULL DEFAULT 1,
    "maxPlayers" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklySchedule" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 4,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeeklySchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateOverride" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "customStartTime" TEXT,
    "customEndTime" TEXT,
    "customCapacity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DateOverride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgeGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "serviceOptionId" INTEGER NOT NULL,
    "bookingDate" DATE NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "ageGroupId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "transactionId" TEXT,
    "paymentUrl" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'AED',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CmsPage_slug_key" ON "CmsPage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CmsSection_pageId_key_key" ON "CmsSection"("pageId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklySchedule_dayOfWeek_startTime_endTime_key" ON "WeeklySchedule"("dayOfWeek", "startTime", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "DateOverride_date_key" ON "DateOverride"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_bookingId_key" ON "Payment"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "Payment"("transactionId");

-- AddForeignKey
ALTER TABLE "CmsSection" ADD CONSTRAINT "CmsSection_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "CmsPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionCategory" ADD CONSTRAINT "SessionCategory_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SessionCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceOptionId_fkey" FOREIGN KEY ("serviceOptionId") REFERENCES "ServiceOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "AgeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
