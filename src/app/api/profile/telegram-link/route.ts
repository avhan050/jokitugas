import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

function generateLinkCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const linkCode = generateLinkCode();

    const user = await db.user.update({
      where: { id: session.id as string },
      data: {
        telegramLinkCode: linkCode,
      },
    });

    return NextResponse.json({
      linkCode: user.telegramLinkCode,
      telegramChatId: user.telegramChatId,
    });
  } catch (error) {
    console.error('Generate telegram link code error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await db.user.update({
      where: { id: session.id as string },
      data: {
        telegramChatId: null,
        telegramLinkCode: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unlink telegram error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
