-- =========================================================================
-- PATCH 04: Update Admin Password
-- =========================================================================

-- Lựa chọn 1 (Mặc định): Mật khẩu là "admin123456"
UPDATE "User" 
SET "password" = '$2b$10$/svPGYeAgDbaHnbPyBjiHen4oB.CSAk3HsUub03hpR0cVIwmPMmDe',
    "updatedAt" = NOW()
WHERE "role" = 'ADMIN';

-- Các lựa chọn đơn giản khác (chỉ cần bỏ dấu -- ở đầu dòng muốn dùng):

-- Mật khẩu "mahjong123":
-- UPDATE "User" SET "password" = '$2b$10$3Y.H/Nv278IyDkzQI671VuWirbV2u9WMMLNQm6WvuMLU53i0U.yZy', "updatedAt" = NOW() WHERE "role" = 'ADMIN';

-- Mật khẩu "mahjong2026":
-- UPDATE "User" SET "password" = '$2b$10$zJxhR5SwxV/jScmh/tpVzOYNYQbgq6Ral7mknGYe31HzoL0sxgiQO', "updatedAt" = NOW() WHERE "role" = 'ADMIN';

-- Mật khẩu "admin2026":
-- UPDATE "User" SET "password" = '$2b$10$zIengFIBu43LAbKc.uJm4enPVtjBkgdsFcyjHN0bnVj92u3/KPfh6', "updatedAt" = NOW() WHERE "role" = 'ADMIN';

-- Mật khẩu "admin@123":
-- UPDATE "User" SET "password" = '$2b$10$UcrEZVDZYaTfmFWsxq6G4O82c1bziXwH3U.StnZobjf5y5X1uJDwC', "updatedAt" = NOW() WHERE "role" = 'ADMIN';
