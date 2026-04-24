import { PrismaClient } from '../src/generated/prisma/index.js';
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
    balance: 0,
    rating: 0,
    completedJobs: 0,
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

  console.log('Initial admin account ensured.');
}

main()
  .catch((error) => {
    console.error('Bootstrap demo error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
