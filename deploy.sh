#!/bin/bash

# Konfigurasi
APP_NAME="jokitugas-web"
SOCKET_NAME="jokitugas-socket"
TELEGRAM_BOT_NAME="jokitugas-telegram-bot"
PORT=3000
SOCKET_PORT=3003

echo "🚀 Memulai proses deployment JokiTugas..."

# 1. Pastikan Node.js & PM2 terinstal
if ! command -v pm2 &> /dev/null; then
    echo "📦 Menginstall PM2 secara global..."
    npm install -g pm2
fi

# 2. Install dependensi untuk Next.js (Root)
echo "📥 Menginstall dependensi aplikasi utama..."
npm install --production=false

# 3. Build Next.js
echo "🏗️ Membangun aplikasi Next.js (Build)..."
# Pastikan database prisma sudah sinkron
npx prisma generate
npm run build

# 4. Install dependensi Socket Server
echo "📥 Menginstall dependensi Socket Server..."
cd mini-services/socket-server
npm install
cd ../..

# 5. Jalankan atau Restart menggunakan PM2
echo "🔄 Menjalankan layanan dengan PM2..."

# Restart Socket Server
pm2 delete $SOCKET_NAME 2>/dev/null || true
pm2 start mini-services/socket-server/index.mjs --name "$SOCKET_NAME" --env PORT=$SOCKET_PORT

# Restart Telegram Bot (opsional)
if [ "${ENABLE_TELEGRAM_BOT:-false}" = "true" ] && [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_ADMIN_CHAT_ID:-}" ]; then
    pm2 delete $TELEGRAM_BOT_NAME 2>/dev/null || true
    pm2 start mini-services/telegram-bot/index.mjs --name "$TELEGRAM_BOT_NAME"
fi

# Restart Next.js Standalone
# Next.js standalone server berada di .next/standalone/server.js
if [ -f ".next/standalone/server.js" ]; then
    pm2 delete $APP_NAME 2>/dev/null || true
    # Next.js standalone butuh menyalin static & public jika belum ada di standalone
    cp -r .next/static .next/standalone/.next/ 2>/dev/null || true
    cp -r public .next/standalone/ 2>/dev/null || true
    
    PORT=$PORT pm2 start .next/standalone/server.js --name "$APP_NAME"
else
    # Fallback ke npm start jika standalone tidak ditemukan
    pm2 delete $APP_NAME 2>/dev/null || true
    PORT=$PORT pm2 start "npm start" --name "$APP_NAME"
fi

# 6. Simpan konfigurasi PM2 agar otomatis jalan saat server reboot
pm2 save

echo "✅ Deployment selesai!"
echo "--------------------------------------------------"
echo "Next.js berjalan di port: $PORT"
echo "Socket.io berjalan di port: $SOCKET_PORT"
echo "Gunakan 'pm2 status' untuk melihat status layanan."
echo "Gunakan 'pm2 logs' untuk melihat log real-time."
echo "--------------------------------------------------"
