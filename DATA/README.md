# 🗄️ Database Backup & Rollback Guide

Thư mục `DATA/` lưu trữ toàn bộ các bản snapshot backup định kỳ của hệ thống Database (Staging & Production).

---

## 📌 1. Quy tắc bắt buộc trước khi Deploy Production (Mandatory Rules)

> [!CAUTION]
> **QUY TẮC SỐ 1: LUÔN BACKUP TRƯỚC KHI CHẠY MIGRATION HOẶC SEED TRÊN PRODUCTION.**
> Tuyệt đối không thực thi bất kỳ câu lệnh SQL patch, migration (`prisma migrate deploy`), hoặc seed dữ liệu nào trên Production khi **chưa chạy script backup**.

1. **Rule 1 - Chạy Backup ngay trước Deploy:**
   Chạy lệnh:
   ```bash
   npm run db:backup:prod
   ```
2. **Rule 2 - Kiểm tra tính toàn vẹn của bản Backup:**
   Vào thư mục ngày tương ứng `DATA/YYYY-MM-DD/`, mở file `BACKUP_INFO.md` để kiểm tra:
   - File `.sql` có dung lượng hợp lệ (> 300KB).
   - Các bảng cốt lõi (`User`, `Booking`, `CmsPage`, `CmsSection`, `Session`, `Game`,...) đều có số dòng (`Row Count`) đầy đủ.
3. **Rule 3 - Quy ước đặt tên thư mục & file:**
   - Mỗi ngày backup được lưu vào thư mục có định dạng: `DATA/YYYY-MM-DD/` (Ví dụ: `DATA/2026-09-28/`).
   - Trong mỗi thư mục chứa:
     - `mahjong_prod_backup.sql`: File SQL dump mới nhất trong ngày (chuẩn cú pháp tương thích hoàn toàn phpPgAdmin, cPanel, psql, Neon).
     - `mahjong_prod_backup_<YYYYMMDD_HHmmss>.sql`: Bản lưu snapshot theo mốc thời gian để so sánh lịch sử.
     - `mahjong_prod_backup.json`: Dữ liệu dạng JSON của toàn bộ bảng.
     - `BACKUP_INFO.md`: Nhật ký thống kê số bảng, số dòng và mốc thời gian thực hiện.
4. **Rule 4 - Lưu trữ an toàn:**
   Không xóa các bản backup gần nhất. Tối thiểu lưu giữ lịch sử backup trong vòng 30 ngày.

---

## 🚀 2. Lệnh thực thi Backup

### Backup Database Production:
```bash
npm run db:backup:prod
```
*(Script sẽ đọc chuỗi kết nối từ `.env.production`, tự động tạo thư mục `DATA/YYYY-MM-DD/` và trích xuất toàn bộ bảng)*

### Backup Database Development (Local):
```bash
npm run db:backup:dev
```
*(Script sẽ đọc chuỗi kết nối từ `.env`)*

---

## 🔄 3. Hướng dẫn Khôi phục dữ liệu (Rollback)

Khi cần rollback Database về trạng thái trước khi deploy:

### Cách 1: Qua phpPgAdmin trên cPanel (Đơn giản nhất)
1. Đăng nhập vào cPanel -> Mở **phpPgAdmin**.
2. Chọn Database Production ở menu bên trái.
3. Bấm vào tab **SQL** ở thanh công cụ phía trên.
4. Mở file `DATA/YYYY-MM-DD/mahjong_prod_backup.sql` bằng VS Code / Notepad, copy toàn bộ nội dung và dán vào ô SQL Editor.
5. Nhấn nút **Execute**. Dữ liệu sẽ được khôi phục nguyên vẹn và các sequence ID tự động được reset chuẩn xác.

### Cách 2: Qua dòng lệnh `psql` (Terminal)
```bash
psql -d "<PRODUCTION_DATABASE_URL>" -f "DATA/YYYY-MM-DD/mahjong_prod_backup.sql"
```

---

## 📁 4. Lịch sử các bản Backup gần nhất
- `DATA/2026-09-28/`: Bản backup Production trước khi cập nhật feature Play Days & Founder CMS (16 tables, 417 KB).
- `DATA/2026-08-21/`: Bản backup chuẩn hóa cho cPanel.
- `DATA/2026-08-18/`: Bản backup Staging & Test DB.
