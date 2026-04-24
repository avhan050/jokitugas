#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$SCRIPT_DIR"
cd "$APP_DIR"

normalize_database_url() {
  if [ -z "${DATABASE_URL:-}" ]; then
    return
  fi

  case "$DATABASE_URL" in
    file:./*)
      export DATABASE_URL="file:$APP_DIR/${DATABASE_URL#file:./}"
      ;;
    file:/*)
      ;;
    file:*)
      export DATABASE_URL="file:$APP_DIR/${DATABASE_URL#file:}"
      ;;
  esac
}

if [ -z "${DATABASE_URL:-}" ]; then
  if [ -d "/data" ]; then
    mkdir -p /data
    export DATABASE_URL="file:/data/dev.db"
  else
    mkdir -p "$APP_DIR/prisma"
    export DATABASE_URL="file:$APP_DIR/prisma/dev.db"
  fi
fi

normalize_database_url

echo "Using DATABASE_URL=${DATABASE_URL}"

# 1. Jalankan migrasi database ke Volume permanen
echo "Syncing database..."
npx prisma generate
npx prisma db push
node prisma/bootstrap-demo.mjs

# 2. Jalankan Socket Server di background (Port 3003)
echo "Starting Socket Server..."
SOCKET_PORT="${SOCKET_PORT:-3003}"
if [ "${ENABLE_SOCKET_SERVER:-false}" = "true" ] && node -e "require.resolve('socket.io')" >/dev/null 2>&1; then
  SOCKET_PORT="$SOCKET_PORT" node "$APP_DIR/mini-services/socket-server/index.mjs" &
else
  echo "Socket server dilewati. Set ENABLE_SOCKET_SERVER=true jika ingin mengaktifkannya."
fi

echo "Starting Telegram Bot..."
if [ "${ENABLE_TELEGRAM_BOT:-false}" = "true" ] && [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_ADMIN_CHAT_ID:-}" ]; then
  node "$APP_DIR/mini-services/telegram-bot/index.mjs" &
else
  echo "Telegram bot dilewati. Set ENABLE_TELEGRAM_BOT=true serta TELEGRAM_BOT_TOKEN dan TELEGRAM_ADMIN_CHAT_ID untuk mengaktifkannya."
fi

# 3. Persiapkan file statis untuk Standalone Mode
echo "Syncing static assets..."
if [ ! -f ".next/standalone/server.js" ]; then
  echo "Build output .next/standalone/server.js tidak ditemukan. Menjalankan build sekarang..."
  cd "$APP_DIR"
  npm run build
fi

if [ ! -f ".next/standalone/server.js" ]; then
  echo "Build output .next/standalone/server.js tetap tidak ditemukan setelah build."
  echo "Periksa log build Railway untuk error Next.js."
  exit 1
fi

mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/ || true
cp -r public .next/standalone/ || true

# 4. Jalankan Next.js (Standalone mode)
echo "Starting Next.js..."
# Railway menyediakan variabel PORT secara otomatis
cd "$APP_DIR"
HOSTNAME="0.0.0.0" PORT="${PORT:-3000}" node .next/standalone/server.js
