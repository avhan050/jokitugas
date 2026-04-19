import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const transactions = await db.transaction.findMany({
      where: { userId: session.id as string },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { type, amount, desc, proofUrl, bankDetails, note } = await request.json();

    if (type === 'withdraw') {
      const user = await db.user.findUnique({ where: { id: session.id as string } });
      if (!user || user.balance < Math.abs(amount)) {
        return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
      }
    }

    const transaction = await db.transaction.create({
      data: {
        userId: session.id as string,
        type,
        amount,
        desc,
        status: 'pending',
        proofUrl,
        bankDetails,
        note,
      },
    });

    return NextResponse.json({ transaction });
  } catch (error) {
    console.error('Create transaction error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
