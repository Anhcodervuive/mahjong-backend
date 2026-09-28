-- 07_add_user_preferences_columns.sql
-- Adds profile preference fields (game, level, ageGroup, preferredLocations, preferredTimings) to User table

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "preferredGame" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "level" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "ageGroup" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "preferredLocations" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "preferredTimings" TEXT[] DEFAULT ARRAY[]::TEXT[];
