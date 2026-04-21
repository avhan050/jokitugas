import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const admin = await db.user.findUnique({
      where: { id: session.id as string },
    });

    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can manage transactions' }, { status: 403 });
    }

    const { id: transactionId } = await params;
    const { status, reason } = await request.json(); // 'approved' or 'rejected'

    const tx = await db.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!tx || tx.status !== 'pending') {
      return NextResponse.json({ error: 'Transaction not found or already processed' }, { status: 400 });
    }

    if (status === 'approved') {
      await db.$transaction([
        db.transaction.update({
          where: { id: transactionId },
          data: { status: 'approved', rejectionReason: null },
        }),
        db.user.update({
          where: { id: tx.userId },
          data: {
            balance: {
              increment: tx.amount, // amount is positive for topup, negative for withdraw
            },
          },
        }),
      ]);
    } else {
      if (!reason || !String(reason).trim()) {
        return NextResponse.json({ error: 'Alasan penolakan wajib diisi' }, { status: 400 });
      }

      await db.transaction.update({
        where: { id: transactionId },
        data: { status: 'rejected', rejectionReason: String(reason).trim() },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update transaction error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
