-- =========================================================================
-- PATCH 01: Add Reset Password Columns to User Table
-- Target Environments: Staging & Production
-- Description:
--   Adds resetPasswordToken and resetPasswordExpires columns to "User" table
--   for the Forgot Password / Reset Password authentication flow.
-- =========================================================================

ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "resetPasswordToken" TEXT,
ADD COLUMN IF NOT EXISTS "resetPasswordExpires" TIMESTAMP(3);
