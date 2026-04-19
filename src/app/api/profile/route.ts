import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { name } = await request.json();

    const user = await db.user.update({
      where: { id: session.id as string },
      data: { name },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
