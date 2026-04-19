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
    const workerId = session.id as string;

    const task = await db.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (task.status !== 'open') {
      return NextResponse.json({ error: 'Task is no longer open' }, { status: 400 });
    }

    if (task.clientId === workerId) {
      return NextResponse.json({ error: 'You cannot take your own task' }, { status: 400 });
    }

    const worker = await db.user.findUnique({
      where: { id: workerId },
    });

    if (!worker || worker.role !== 'worker') {
      return NextResponse.json({ error: 'Only workers can take tasks' }, { status: 403 });
    }

    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: {
        workerId,
        status: 'in_progress',
        takenAt: new Date(),
        escrowHeld: true,
      },
    });

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error('Take task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
