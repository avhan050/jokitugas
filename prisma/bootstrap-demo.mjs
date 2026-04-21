import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function upsertDemoUser({ email, password, ...data }) {
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existing) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      ...data,
      email,
      password: hashedPassword,
    },
  });
}

async function main() {
  await upsertDemoUser({
    name: 'Admin JokiTugas',
    email: 'admin@jokitugas.id',
    password: 'admin123',
    role: 'admin',
    isAdmin: true,
  });

  await upsertDemoUser({
    name: 'Andi Pratama',
    email: 'andi@email.com',
    password: 'andi123',
    role: 'client',
    balance: 850000,
    rating: 5,
    completedJobs: 3,
  });

  await upsertDemoUser({
    name: 'Budi Santoso',
    email: 'budi@email.com',
    password: 'budi123',
    role: 'worker',
    balance: 1750000,
    rating: 4.9,
    completedJobs: 12,
  });

  await prisma.adminSettings.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      bank_name: 'Bank BCA',
      bank_account: '1234567890',
      bank_owner: 'PT JokiTugas Indonesia',
      e_wallet: 'jokitugas@ovo.id',
    },
  });

  console.log('Demo accounts ensured.');
}

main()
  .catch((error) => {
    console.error('Bootstrap demo error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
