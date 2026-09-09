-- =========================================================================
-- PATCH 03: Clean Production / Staging Dummy Data
-- Order of Deletion:
-- 1. Payments & Booking Participants & Bookings
-- 2. Join Circle Requests & Relation tables
-- 3. Regular Users (role != 'ADMIN' - Preserving ALL Admin Accounts)
-- =========================================================================

-- Step 1: Delete all Booking related data (Payments, Participants, Bookings)
DELETE FROM "Payment";
DELETE FROM "Participant";
DELETE FROM "Booking";

-- Reset Booking related sequences to start fresh from ID 1
ALTER SEQUENCE IF EXISTS "Payment_id_seq" RESTART WITH 1;
ALTER SEQUENCE IF EXISTS "Participant_id_seq" RESTART WITH 1;
ALTER SEQUENCE IF EXISTS "Booking_id_seq" RESTART WITH 1;

-- Step 2: Delete all Join Circle Inquiries
DELETE FROM "_JoinCircleRequestToLocation";
DELETE FROM "JoinCircleRequest";

-- Reset Join Circle sequence
ALTER SEQUENCE IF EXISTS "JoinCircleRequest_id_seq" RESTART WITH 1;

-- Step 3: Delete Dummy / Non-Admin Users (Preserve all ADMIN accounts)
DELETE FROM "User" WHERE "role" != 'ADMIN';

-- =========================================================================
-- Verification Queries (Expected: 0 bookings, 0 requests, only admin users)
-- =========================================================================
SELECT 'Bookings remaining:' AS table_name, COUNT(*) AS count FROM "Booking"
UNION ALL
SELECT 'Payments remaining:', COUNT(*) FROM "Payment"
UNION ALL
SELECT 'Participants remaining:', COUNT(*) FROM "Participant"
UNION ALL
SELECT 'Join Circle Requests remaining:', COUNT(*) FROM "JoinCircleRequest"
UNION ALL
SELECT 'Admin Users kept:', COUNT(*) FROM "User" WHERE "role" = 'ADMIN'
UNION ALL
SELECT 'Non-Admin Users remaining (should be 0):', COUNT(*) FROM "User" WHERE "role" != 'ADMIN';
