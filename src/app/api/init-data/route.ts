import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    
    const [tasks, transactions, adminSettings, totalCompletedTasks, totalWorkers, totalUsers, ratedTasks] = await Promise.all([
      db.task.findMany({ orderBy: { createdAt: 'desc' } }),
      db.transaction.findMany({ orderBy: { createdAt: 'desc' } }),
      db.adminSettings.findUnique({ where: { id: 'global' } }),
      db.task.count({ where: { status: 'completed' } }),
      db.user.count({ where: { role: 'worker' } }),
      db.user.count(),
      db.task.findMany({
        where: {
          status: 'completed',
          OR: [
            { clientRating: { not: null } },
            { workerRating: { not: null } }
          ]
        },
        select: { clientRating: true, workerRating: true }
      })
    ]);

    // Calculate average rating
    let averageRating = 5.0;
    const allRatings: number[] = [];
    ratedTasks.forEach(t => {
      if (t.clientRating) allRatings.push(t.clientRating);
      if (t.workerRating) allRatings.push(t.workerRating);
    });
    if (allRatings.length > 0) {
      averageRating = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
    }

    let currentUser: any = null;
    let users: any[] = [];

    if (session && session.id) {
      currentUser = await db.user.findUnique({
        where: { id: session.id as string },
      });
      
      if (currentUser?.role === 'admin') {
        users = await db.user.findMany();
      } else {
        users = currentUser ? [currentUser] : [];
      }
    }

    // Helper to serialize dates
    const serialize = (obj: any) => JSON.parse(JSON.stringify(obj));

    return NextResponse.json({
      currentUser: serialize(currentUser),
      users: serialize(users),
      tasks: serialize(tasks),
      transactions: serialize(transactions),
      adminSettings: serialize(adminSettings),
      publicStats: {
        totalCompletedTasks,
        totalWorkers,
        totalUsers,
        averageRating: parseFloat(averageRating.toFixed(1)),
      }
    });
  } catch (error) {
    console.error('Init data error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
