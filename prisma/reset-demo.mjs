import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function upsertUser(data) {
  const { email, password, ...rest } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      ...rest,
      password: hashedPassword,
    },
    create: {
      ...rest,
      email,
      password: hashedPassword,
    },
  });
}

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.task.deleteMany();

  await upsertUser({
    name: 'Admin JokiTugas',
    email: 'admin@jokitugas.id',
    password: 'admin123',
    role: 'admin',
    balance: 0,
    rating: 0,
    completedJobs: 0,
    isAdmin: true,
  });

  await upsertUser({
    name: 'Andi Pratama',
    email: 'andi@email.com',
    password: 'andi123',
    role: 'client',
    balance: 850000,
    rating: 5,
    completedJobs: 3,
    isAdmin: false,
  });

  await upsertUser({
    name: 'Budi Santoso',
    email: 'budi@email.com',
    password: 'budi123',
    role: 'worker',
    balance: 1750000,
    rating: 4.9,
    completedJobs: 12,
    isAdmin: false,
  });

  await prisma.adminSettings.upsert({
    where: { id: 'global' },
    update: {
      bank_name: 'Bank BCA',
      bank_account: '1234567890',
      bank_owner: 'PT JokiTugas Indonesia',
      e_wallet: 'jokitugas@ovo.id',
    },
    create: {
      id: 'global',
      bank_name: 'Bank BCA',
      bank_account: '1234567890',
      bank_owner: 'PT JokiTugas Indonesia',
      e_wallet: 'jokitugas@ovo.id',
    },
  });

  console.log('Demo state reset.');
}

main()
  .catch((error) => {
    console.error('Reset demo error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
