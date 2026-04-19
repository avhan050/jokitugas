import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Muat variabel lingkungan dari .env
dotenv.config();

async function testConnection() {
  console.log('--- Database Connection Test ---');
  console.log('URL:', process.env.DB_URL ? 'Ditemukan (Dimasker: ' + process.env.DB_URL.substring(0, 20) + '...)' : 'TIDAK DITEMUKAN');
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DB_URL,
      },
    },
  });

  try {
    console.log('Mencoba menghubungkan ke Supabase...');
    
    // Test 1: Ping Database
    await prisma.$connect();
    console.log('✅ Berhasil terhubung ke server database!');

    // Test 2: Cek Tabel User
    const userCount = await prisma.user.count();
    console.log(`✅ Berhasil membaca tabel User. Total user: ${userCount}`);

    // Test 3: Cek Akun Demo
    const demoUsers = await prisma.user.findMany({
      where: {
        email: { in: ['admin@jokitugas.id', 'andi@email.com', 'budi@email.com'] }
      },
      select: { email: true, role: true }
    });

    if (demoUsers.length > 0) {
      console.log('✅ Akun demo ditemukan:');
      demoUsers.forEach(u => console.log(`   - ${u.email} (${u.role})`));
    } else {
      console.log('⚠️ Peringatan: Koneksi berhasil tapi akun demo tidak ditemukan. Jalankan "npx prisma db seed"');
    }

  } catch (error) {
    console.error('❌ Gagal terhubung ke database!');
    console.error('Pesan Error:', error.message);
    
    if (error.message.includes('Can\'t reach database server')) {
      console.log('\nSARAN:');
      console.log('1. Pastikan Anda menggunakan host "pooler.supabase.com" (IPv4) jika koneksi internet Anda tidak mendukung IPv6.');
      console.log('2. Cek apakah IP Anda diblokir oleh firewall Supabase (biasanya defaultnya diizinkan semua).');
      console.log('3. Pastikan format URL sudah benar (postgres://user:pass@host:port/db).');
    }
  } finally {
    await prisma.$disconnect();
    console.log('--------------------------------');
  }
}

testConnection();
