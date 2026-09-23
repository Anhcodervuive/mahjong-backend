# Database SQL Patches & Migrations Log

Thư mục này lưu trữ toàn bộ các file SQL patch đã được áp dụng vào Database (Staging) để phục vụ việc **đồng bộ sang Production** hoặc khôi phục dữ liệu một cách an toàn và nhất quán.

---

## 📑 Danh Sách Patches Theo Thứ Tự:

| Patch File | Mục đích | Áp dụng Staging | Áp dụng Production |
| :--- | :--- | :---: | :---: |
| **`01_add_reset_password_columns.sql`** | Thêm cột `resetPasswordToken` và `resetPasswordExpires` vào bảng `User` để hỗ trợ tính năng Quên mật khẩu / Đặt lại mật khẩu. | ✅ Đã chạy | ⏳ Chạy khi lên Prod |
| **`02_add_founder_moments_gallery_cms.sql`** | Thêm section `gallery` (6 ảnh Moments) cho trang `founder` trong bảng `CmsSection` để Admin quản lý qua CMS. | ⏳ Đang chạy | ⏳ Chạy khi lên Prod |
| **`05_add_split_bundles_and_new_features_cms.sql`** | Seed CMS cho 3 tính năng mới: Trang Playdays, Terms & Conditions (tách điều khoản Play Days), và 4 trang Fast-Track Bundles tách riêng. | ⏳ Chạy Staging | ⏳ Chạy Prod |

---

## 🛠️ Hướng dẫn thực thi:

### 1. Trên phpPgAdmin (cPanel):
1. Đăng nhập vào **phpPgAdmin** trên cPanel (chọn database tương ứng: Staging hoặc Production).
2. Vào mục **SQL Editor**.
3. Copy toàn bộ nội dung trong file `.sql` tương ứng và nhấn **Execute**.

### 2. Trên Terminal (psql):
```bash
psql -U <username> -d <database_name> -f database_patches/<filename>.sql
```
