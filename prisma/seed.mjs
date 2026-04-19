import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const andiPassword = await bcrypt.hash('andi123', 10);
  const budiPassword = await bcrypt.hash('budi123', 10);

  // Clear existing data
  console.log('Cleaning up existing data...');
  try {
    await prisma.transaction.deleteMany();
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
    await prisma.adminSettings.deleteMany();
  } catch (e) {
    console.log('Cleanup warning (might be first run):', e.message);
  }

  // Admin
  console.log('Creating admin user...');
  await prisma.user.create({
    data: {
      name: 'Admin JokiTugas',
      email: 'admin@jokitugas.id',
      password: hashedPassword,
      role: 'admin',
      isAdmin: true,
    },
  });

  // Client
  console.log('Creating client user...');
  await prisma.user.create({
    data: {
      name: 'Andi Pratama',
      email: 'andi@email.com',
      password: andiPassword,
      role: 'client',
      balance: 850000,
      rating: 5.0,
      completedJobs: 3,
    },
  });

  // Worker
  console.log('Creating worker user...');
  await prisma.user.create({
    data: {
      name: 'Budi Santoso',
      email: 'budi@email.com',
      password: budiPassword,
      role: 'worker',
      balance: 1750000,
      rating: 4.9,
      completedJobs: 12,
    },
  });

  // Admin Settings
  console.log('Creating admin settings...');
  await prisma.adminSettings.create({
    data: {
      id: 'global',
      bank_name: 'Bank BCA',
      bank_account: '1234567890',
      bank_owner: 'PT JokiTugas Indonesia',
      e_wallet: 'jokitugas@ovo.id',
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
