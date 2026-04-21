#!/bin/bash
set -e

# 1. Jalankan migrasi database ke Volume permanen
echo "Syncing database..."
npx prisma generate
npx prisma db push

# 2. Jalankan Socket Server di background (Port 3003)
echo "Starting Socket Server..."
SOCKET_PORT="${SOCKET_PORT:-3003}"
cd mini-services/socket-server && SOCKET_PORT="$SOCKET_PORT" node index.mjs &
cd ../..

# 3. Persiapkan file statis untuk Standalone Mode
echo "Syncing static assets..."
cp -r .next/static .next/standalone/.next/ || true
cp -r public .next/standalone/ || true

# 4. Jalankan Next.js (Standalone mode)
echo "Starting Next.js..."
# Railway menyediakan variabel PORT secara otomatis
HOSTNAME="0.0.0.0" PORT="${PORT:-3000}" node .next/standalone/server.js
