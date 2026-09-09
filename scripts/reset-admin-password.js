const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Lấy email và mật khẩu mới từ tham số dòng lệnh nếu có
  // Cú pháp: node scripts/reset-admin-password.js [email] [newPassword]
  const args = process.argv.slice(2);
  const targetEmail = args[0] || null;
  const newPassword = args[1] || 'Mahjong@Admin2026!#';

  console.log('----------------------------------------------------');
  console.log('🔑 TOOL ĐỔI MẬT KHẨU TÀI KHOẢN ADMIN - MAHJONG SUCCESS');
  console.log('----------------------------------------------------');

  let adminUser = null;

  if (targetEmail) {
    adminUser = await prisma.user.findUnique({
      where: { email: targetEmail }
    });
  } else {
    // Tìm tài khoản có role ADMIN đầu tiên
    adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN', isDeleted: false }
    });
  }

  if (!adminUser) {
    console.error('❌ Không tìm thấy tài khoản Admin nào trong Database!');
    return;
  }

  console.log(`👤 Tìm thấy tài khoản: ${adminUser.email} (ID: ${adminUser.id}, Tên: ${adminUser.name}, Role: ${adminUser.role})`);

  // Băm mật khẩu mới bằng bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // Cập nhật vào DB
  await prisma.user.update({
    where: { id: adminUser.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    }
  });

  console.log('✅ ĐÃ ĐỔI MẬT KHẨU THÀNH CÔNG!');
  console.log('----------------------------------------------------');
  console.log(`📧 Email đăng nhập:  ${adminUser.email}`);
  console.log(`🔒 Mật khẩu mới:     ${newPassword}`);
  console.log('----------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Có lỗi xảy ra:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
