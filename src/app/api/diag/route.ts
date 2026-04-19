import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // 1. Check DB Connection
    const userCount = await db.user.count();
    
    // 2. Check for demo users
    const demoUsers = await db.user.findMany({
      select: { email: true, role: true },
      take: 5
    });

    // 3. Check ENV presence (masked)
    const envStatus = {
      DB_URL: !!process.env.DB_URL,
      DIRECT_DB_URL: !!process.env.DIRECT_DB_URL,
      JWT_SECRET: !!process.env.JWT_SECRET,
      NODE_ENV: process.env.NODE_ENV
    };

    return NextResponse.json({
      status: 'success',
      database: {
        connected: true,
        userCount,
        availableUsers: demoUsers
      },
      environment: envStatus
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      stack: error.stack,
      env_check: {
        DB_URL_PREFIX: process.env.DB_URL?.substring(0, 15),
        DIRECT_DB_URL_PREFIX: process.env.DIRECT_DB_URL?.substring(0, 15),
      }
    }, { status: 500 });
  }
}
