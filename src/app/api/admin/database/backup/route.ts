import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const currentUser = await db.user.findUnique({
      where: { id: session.id as string },
      select: { id: true, role: true },
    });

    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'Only admin can backup database' }, { status: 403 });
    }

    const [users, tasks, transactions, adminSettings] = await Promise.all([
      db.user.findMany({ orderBy: { createdAt: 'asc' } }),
      db.task.findMany({ orderBy: { createdAt: 'asc' } }),
      db.transaction.findMany({ orderBy: { createdAt: 'asc' } }),
      db.adminSettings.findMany(),
    ]);

    const exportedAt = new Date().toISOString();
    const backup = {
      app: 'JokiTugas',
      version: 1,
      exportedAt,
      data: {
        users,
        tasks,
        transactions,
        adminSettings,
      },
    };

    return new NextResponse(JSON.stringify(backup, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="jokitugas-backup-${exportedAt.slice(0, 10)}.json"`,
      },
    });
  } catch (error) {
    console.error('Backup database error:', error);
    return NextResponse.json({ error: 'Failed to backup database' }, { status: 500 });
  }
}
