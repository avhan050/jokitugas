import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const admin = await db.user.findUnique({
      where: { id: session.id as string },
    });

    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can update settings' }, { status: 403 });
    }

    const data = await request.json();

    const settings = await db.adminSettings.upsert({
      where: { id: 'global' },
      update: data,
      create: {
        id: 'global',
        ...data,
      },
    });

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
