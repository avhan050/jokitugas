import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession, comparePassword, hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { oldPassword, newPassword } = await request.json();

    const user = await db.user.findUnique({
      where: { id: session.id as string },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect old password' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(newPassword);

    await db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
