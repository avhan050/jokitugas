import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { notifyUserDisputeDecision } from '@/lib/telegram';

export async function POST(
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
      return NextResponse.json({ error: 'Only admins can resolve disputes' }, { status: 403 });
    }

    const { id: taskId } = await params;
    const { action } = await request.json();

    const task = await db.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (task.status !== 'dispute') {
      return NextResponse.json({ error: 'Task is not in dispute status' }, { status: 400 });
    }

    if (!task.workerId) {
      return NextResponse.json({ error: 'Task has no assigned worker' }, { status: 400 });
    }

    if (action === 'pay_worker') {
      await db.$transaction([
        db.task.update({
          where: { id: taskId },
          data: {
            status: 'completed',
            completedAt: new Date(),
            escrowHeld: false,
            disputeReason: null,
            disputedAt: null,
          },
        }),
        db.user.update({
          where: { id: task.workerId },
          data: {
            balance: { increment: task.budget },
            completedJobs: { increment: 1 },
          },
        }),
        db.transaction.create({
          data: {
            userId: task.workerId,
            type: 'earning',
            amount: task.budget,
            taskId: task.id,
            desc: `Pendapatan tugas (Sengketa disetujui admin): ${task.title}`,
            status: 'approved',
          },
        }),
      ]);
    } else if (action === 'refund_client') {
      const refundAmount = Math.ceil(task.budget * 1.05);

      await db.$transaction([
        db.task.update({
          where: { id: taskId },
          data: {
            status: 'cancelled',
            escrowHeld: false,
            disputeReason: null,
            disputedAt: null,
          },
        }),
        db.user.update({
          where: { id: task.clientId },
          data: {
            balance: { increment: refundAmount },
          },
        }),
        db.transaction.create({
          data: {
            userId: task.clientId,
            type: 'refund',
            amount: refundAmount,
            taskId: task.id,
            desc: `Refund tugas (Sengketa diputus admin): ${task.title}`,
            status: 'approved',
          },
        }),
      ]);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const updatedTask = await db.task.findUnique({ where: { id: taskId } });

    try {
      const [client, worker] = await Promise.all([
        db.user.findUnique({ where: { id: task.clientId } }),
        db.user.findUnique({ where: { id: task.workerId } }),
      ]);

      if (action === 'pay_worker') {
        await notifyUserDisputeDecision({
          user: worker ? { ...worker, createdAt: worker.createdAt.toISOString() } : null,
          task: {
            ...task,
            deadline: task.deadline.toISOString(),
            createdAt: task.createdAt.toISOString(),
            completedAt: task.completedAt ? task.completedAt.toISOString() : null,
            takenAt: task.takenAt ? task.takenAt.toISOString() : undefined,
            disputedAt: task.disputedAt ? task.disputedAt.toISOString() : null,
          },
          outcome: 'pay_worker',
        });
      } else {
        await notifyUserDisputeDecision({
          user: client ? { ...client, createdAt: client.createdAt.toISOString() } : null,
          task: {
            ...task,
            deadline: task.deadline.toISOString(),
            createdAt: task.createdAt.toISOString(),
            completedAt: task.completedAt ? task.completedAt.toISOString() : null,
            takenAt: task.takenAt ? task.takenAt.toISOString() : undefined,
            disputedAt: task.disputedAt ? task.disputedAt.toISOString() : null,
          },
          outcome: 'refund_client',
        });
      }
    } catch (telegramError) {
      console.error('Telegram dispute decision notification error:', telegramError);
    }

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error('Resolve dispute error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
