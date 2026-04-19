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
    const { rating, fromRole } = await request.json(); // rating: 1-5, fromRole: 'client' or 'worker'

    const task = await db.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.status !== 'completed') {
      return NextResponse.json({ error: 'Task not found or not completed' }, { status: 404 });
    }

    let targetUserId = '';
    if (fromRole === 'client') {
      if (task.clientId !== userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      targetUserId = task.workerId!;
      await db.task.update({
        where: { id: taskId },
        data: { clientRating: rating },
      });
    } else {
      if (task.workerId !== userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      targetUserId = task.clientId;
      await db.task.update({
        where: { id: taskId },
        data: { workerRating: rating },
      });
    }

    // Recalculate average rating for target user
    const tasksAsWorker = await db.task.findMany({
      where: { workerId: targetUserId, clientRating: { not: null } },
      select: { clientRating: true },
    });
    
    const tasksAsClient = await db.task.findMany({
      where: { clientId: targetUserId, workerRating: { not: null } },
      select: { workerRating: true },
    });

    const allRatings = [
      ...tasksAsWorker.map(t => t.clientRating!),
      ...tasksAsClient.map(t => t.workerRating!)
    ];

    const avgRating = allRatings.length > 0 
      ? allRatings.reduce((a, b) => a + b, 0) / allRatings.length 
      : 0;

    await db.user.update({
      where: { id: targetUserId },
      data: { rating: avgRating },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Rate task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
