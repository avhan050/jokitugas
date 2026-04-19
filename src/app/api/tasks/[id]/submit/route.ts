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
    const { note, fileUrl } = await request.json();

    const task = await db.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (task.status !== 'in_progress' || task.workerId !== workerId) {
      return NextResponse.json({ error: 'Unauthorized or task not in progress' }, { status: 400 });
    }

    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: {
        status: 'under_review',
        submissionNote: note,
        submissionUrl: fileUrl,
      },
    });

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error('Submit work error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
