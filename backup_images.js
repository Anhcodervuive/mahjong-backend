const fs = require('fs');
const https = require('https');

// 1. THAY ĐỔI ĐƯỜNG LINK NÀY THÀNH LINK BACKEND RENDER CỦA BẠN 
// (Ví dụ: https://mahjong-backend-xyz.onrender.com - TUYỆT ĐỐI KHÔNG CÓ DẤU / Ở CUỐI)
const BACKEND_URL = "https://mahjong-backend-q76k.onrender.com".replace(/\/$/, ''); // Tự động xóa dấu /

async function run() {
  if (BACKEND_URL.includes("thay-link")) {
    console.log("❌ LỖI: Bạn chưa thay đổi biến BACKEND_URL ở đầu file backup_images.js!");
    return;
  }

  console.log("Đang quét toàn bộ ảnh từ Backend Render...");
  
  try {
    // 1. Quét từ nhiều API endpoints khác nhau để vét cạn ảnh
    const endpoints = [
      '/cms/pages',
      '/games',
      '/categories',
      '/sessions',
      '/service-options'
    ];
    
    let allMatches = [];
    
    for (const ep of endpoints) {
      try {
        const res = await fetch(`${BACKEND_URL}${ep}`);
        if (res.ok) {
          const data = await res.json();
          const jsonStr = JSON.stringify(data);
          const regex = /\/uploads\/[a-zA-Z0-9_-]+\.(png|jpg|jpeg|gif|webp|svg)/gi;
          const matches = jsonStr.match(regex) || [];
          allMatches.push(...matches);
        }
      } catch (e) {
        console.log(`Bỏ qua endpoint ${ep} do lỗi kết nối.`);
      }
    }
    
    let matches = [...new Set(allMatches)];
    
    if (matches.length === 0) {
      console.log("Không tìm thấy ảnh nào!");
      return;
    }
    
    console.log(`Tìm thấy ${matches.length} tấm ảnh. Bắt đầu tải về máy...`);
    
    if (!fs.existsSync('./uploads_backup')) {
      fs.mkdirSync('./uploads_backup');
    }
    
    let successCount = 0;
    
    for (const path of matches) {
      const filename = path.split('/').pop();
      const url = `${BACKEND_URL}${path}`;
      
      await new Promise((resolve) => {
        https.get(url, (response) => {
          if (response.statusCode === 200) {
            const file = fs.createWriteStream(`./uploads_backup/${filename}`);
            response.pipe(file);
            file.on('finish', () => {
              file.close();
              console.log(`✅ Đã tải: ${filename}`);
              successCount++;
              resolve();
            });
          } else {
             console.log(`❌ Bỏ qua (hoặc lỗi): ${filename} (HTTP ${response.statusCode})`);
             resolve();
          }
        }).on('error', err => {
          console.log(`❌ Lỗi kết nối ${filename}:`, err.message);
          resolve();
        });
      });
    }
    
    console.log(`\n🎉 HOÀN TẤT! Đã tải thành công ${successCount}/${matches.length} ảnh.`);
    console.log(`Hãy mở thư mục "uploads_backup" ngay trong thư mục mahjong-backend để kiểm tra thành quả!`);
    
  } catch (error) {
    console.error("❌ Lỗi khi chạy script:", error.message);
  }
}

run();
