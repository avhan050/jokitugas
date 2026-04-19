import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();

    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.id as string },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
