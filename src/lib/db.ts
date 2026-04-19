import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Ensure the path is absolute or consistently relative from the root.
// We use the absolute path for maximum reliability in this environment.
const dbUrl = "file:/home/avhan/Dokumen/PROGRAM/NEXT JS/jokitugas/db/custom.db";

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
