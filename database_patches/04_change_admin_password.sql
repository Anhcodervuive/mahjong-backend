-- =========================================================================
-- PATCH 04: Update Admin Password (Bcrypt Hash)
-- Password: Mahjong@Admin2026!
-- Hash: $2b$10$UBuFRnDXTmeBGRrlRPgHUOhFLEIZ9Frx.YnjzLNiECeutPw1wuUmi
-- =========================================================================

-- Update password for all ADMIN users:
UPDATE "User" 
SET "password" = '$2b$10$UBuFRnDXTmeBGRrlRPgHUOhFLEIZ9Frx.YnjzLNiECeutPw1wuUmi',
    "updatedAt" = NOW()
WHERE "role" = 'ADMIN';

-- Or specify a specific email if needed:
-- UPDATE "User" 
-- SET "password" = '$2b$10$UBuFRnDXTmeBGRrlRPgHUOhFLEIZ9Frx.YnjzLNiECeutPw1wuUmi',
--     "updatedAt" = NOW()
-- WHERE "email" = 'admin@example.com';
