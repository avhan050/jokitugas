import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { notifyTaskDispute } from '@/lib/telegram';

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
    const clientId = session.id as string;
    const { action, reason } = await request.json(); // 'accept', 'revision', 'dispute'

    const task = await db.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (task.clientId !== clientId || task.status !== 'under_review') {
      return NextResponse.json({ error: 'Unauthorized or task not under review' }, { status: 400 });
    }

    if (action === 'accept') {
      if (!task.workerId) return NextResponse.json({ error: 'No worker assigned' }, { status: 400 });

      await db.$transaction([
        db.task.update({
          where: { id: taskId },
          data: {
            status: 'completed',
            completedAt: new Date(),
            escrowHeld: false,
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
            desc: `Pendapatan tugas: ${task.title}`,
            status: 'approved',
          },
        }),
      ]);
    } else if (action === 'revision') {
      await db.task.update({
        where: { id: taskId },
        data: {
          status: 'in_progress',
        },
      });
    } else if (action === 'dispute') {
      const disputeReason = typeof reason === 'string' ? reason.trim() : '';

      if (!disputeReason) {
        return NextResponse.json({ error: 'Alasan sengketa wajib diisi' }, { status: 400 });
      }

      await db.task.update({
        where: { id: taskId },
        data: {
          status: 'dispute',
          disputeReason,
          disputedAt: new Date(),
        },
      });

      try {
        const [client, worker] = await Promise.all([
          db.user.findUnique({ where: { id: task.clientId } }),
          task.workerId ? db.user.findUnique({ where: { id: task.workerId } }) : Promise.resolve(null),
        ]);

        await notifyTaskDispute(
          {
            ...task,
            status: 'dispute',
            disputeReason,
            disputedAt: new Date().toISOString(),
            deadline: task.deadline.toISOString(),
            createdAt: task.createdAt.toISOString(),
            completedAt: task.completedAt ? task.completedAt.toISOString() : null,
            takenAt: task.takenAt ? task.takenAt.toISOString() : undefined,
          },
          client
            ? { ...client, createdAt: client.createdAt.toISOString() }
            : null,
          worker
            ? { ...worker, createdAt: worker.createdAt.toISOString() }
            : null
        );
      } catch (telegramError) {
        console.error('Telegram dispute notification error:', telegramError);
      }
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const updatedTask = await db.task.findUnique({ where: { id: taskId } });
    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error('Review work error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
