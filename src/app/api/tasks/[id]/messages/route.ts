import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

async function getAuthorizedTask(taskId: string, userId: string) {
  const task = await db.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return { error: NextResponse.json({ error: 'Task not found' }, { status: 404 }) };
  }

  const isParticipant = task.clientId === userId || task.workerId === userId;
  if (!isParticipant) {
    return { error: NextResponse.json({ error: 'Akses chat ditolak' }, { status: 403 }) };
  }

  if (!task.workerId) {
    return { error: NextResponse.json({ error: 'Chat belum tersedia sebelum tugas diambil pekerja' }, { status: 400 }) };
  }

  return { task };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    void request;
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id: taskId } = await params;
    const authorized = await getAuthorizedTask(taskId, session.id as string);
    if (authorized.error) {
      return authorized.error;
    }

    const messages = await db.taskMessage.findMany({
      where: { taskId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Get task messages error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    const senderId = session.id as string;
    const authorized = await getAuthorizedTask(taskId, senderId);
    if (authorized.error) {
      return authorized.error;
    }

    const body = await request.json();
    const content = typeof body.content === 'string' ? body.content.trim() : '';

    if (!content) {
      return NextResponse.json({ error: 'Pesan tidak boleh kosong' }, { status: 400 });
    }

    if (content.length > 2000) {
      return NextResponse.json({ error: 'Pesan terlalu panjang' }, { status: 400 });
    }

    const message = await db.taskMessage.create({
      data: {
        taskId,
        senderId,
        content,
      },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Create task message error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
