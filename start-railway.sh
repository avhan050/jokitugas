#!/bin/bash

# 1. Jalankan migrasi database ke Volume permanen
echo "Syncing database..."
npx prisma generate
npx prisma db push

# 2. Jalankan Socket Server di background (Port 3003)
echo "Starting Socket Server..."
cd mini-services/socket-server && node index.mjs &
cd ../..

# 3. Jalankan Next.js (Standalone mode)
echo "Starting Next.js..."
# Railway menyediakan variabel PORT secara otomatis
PORT=$PORT node .next/standalone/server.js
