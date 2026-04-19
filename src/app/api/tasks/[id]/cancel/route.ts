import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id: taskId } = await params;
    const userId = session.id as string;

    const task = await db.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (task.clientId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (task.status !== 'open' && task.status !== 'in_progress') {
      return NextResponse.json({ error: 'Task cannot be cancelled in current status' }, { status: 400 });
    }

    const refundAmount = Math.ceil(task.budget * 1.05);

    await db.$transaction([
      db.task.update({
        where: { id: taskId },
        data: {
          status: 'cancelled',
          escrowHeld: false,
        },
      }),
      db.user.update({
        where: { id: userId },
        data: {
          balance: { increment: refundAmount },
        },
      }),
      db.transaction.create({
        data: {
          userId: userId,
          type: 'refund',
          amount: refundAmount,
          taskId: task.id,
          desc: `Refund pembatalan tugas: ${task.title}`,
          status: 'approved',
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cancel task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
