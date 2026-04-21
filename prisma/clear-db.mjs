import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.task.deleteMany();

  console.log('Operational data cleared. Demo users are preserved.');
}

main()
  .catch((error) => {
    console.error('Clear DB error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
