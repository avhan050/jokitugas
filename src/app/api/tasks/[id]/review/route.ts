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
    const clientId = session.id as string;
    const { action } = await request.json(); // 'accept', 'revision', 'reject'

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
    } else if (action === 'reject') {
      await db.$transaction([
        db.task.update({
          where: { id: taskId },
          data: {
            status: 'cancelled',
            escrowHeld: false,
          },
        }),
        db.user.update({
          where: { id: task.clientId },
          data: {
            balance: { increment: task.budget },
          },
        }),
        db.transaction.create({
          data: {
            userId: task.clientId,
            type: 'refund',
            amount: task.budget,
            taskId: task.id,
            desc: `Refund tugas (Ditolak): ${task.title}`,
            status: 'approved',
          },
        }),
      ]);
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
