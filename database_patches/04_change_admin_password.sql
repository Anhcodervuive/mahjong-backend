-- =========================================================================
-- PATCH 04: Update Admin Password
-- Password: Mahjong@Admin2026!
-- Hash: $2b$10$UBuFRnDXTmeBGRrlRPgHUOhFLEIZ9Frx.YnjzLNiECeutPw1wuUmi
-- =========================================================================

UPDATE "User" 
SET "password" = '$2b$10$UBuFRnDXTmeBGRrlRPgHUOhFLEIZ9Frx.YnjzLNiECeutPw1wuUmi',
    "updatedAt" = NOW()
WHERE "role" = 'ADMIN';
