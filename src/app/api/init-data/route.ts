import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getSession();
    const currentUser = session?.id
      ? await db.user.findUnique({
          where: { id: session.id as string },
        })
      : null;

    const taskScope = currentUser?.role === 'admin'
      ? {}
      : currentUser
        ? {
            OR: [
              { clientId: currentUser.id },
              { workerId: currentUser.id },
            ],
          }
        : undefined;

    const [
      tasks,
      transactions,
      adminSettings,
      totalCompletedTasks,
      totalWorkers,
      totalUsers,
      ratedTasks,
      taskMessages,
    ] = await Promise.all([
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
      }),
      taskScope
        ? db.taskMessage.findMany({
            where: {
              task: taskScope,
            },
            orderBy: { createdAt: 'asc' },
          })
        : Promise.resolve([]),
    ]);

    // Calculate average rating with proper type handling
    let averageRating = 5.0;
    if (ratedTasks && ratedTasks.length > 0) {
      const allRatings: number[] = [];
      
      ratedTasks.forEach(task => {
        if (task.clientRating !== null && task.clientRating !== undefined) {
          allRatings.push(task.clientRating);
        }
        if (task.workerRating !== null && task.workerRating !== undefined) {
          allRatings.push(task.workerRating);
        }
      });
      
      if (allRatings.length > 0) {
        const sum = allRatings.reduce((acc, rating) => acc + rating, 0);
        averageRating = sum / allRatings.length;
      }
    }

    let users: any[] = [];

    if (currentUser?.role === 'admin') {
      users = await db.user.findMany();
    } else if (currentUser) {
      const participantIds = new Set<string>([currentUser.id]);
      tasks.forEach((task) => {
        if (task.clientId === currentUser.id || task.workerId === currentUser.id) {
          participantIds.add(task.clientId);
          if (task.workerId) {
            participantIds.add(task.workerId);
          }
        }
      });

      users = await db.user.findMany({
        where: {
          id: {
            in: Array.from(participantIds),
          },
        },
      });
    }

    // Helper to safely serialize objects (handles Date objects, etc.)
    const serialize = (obj: any): any => {
      if (obj === null || obj === undefined) return null;
      try {
        return JSON.parse(JSON.stringify(obj));
      } catch (error) {
        console.error('Serialization error:', error);
        return obj;
      }
    };

    return NextResponse.json({
      currentUser: serialize(currentUser ? { ...currentUser, password: undefined } : null),
      users: serialize(users.map(({ password, ...user }) => user)),
      tasks: serialize(tasks),
      taskMessages: serialize(taskMessages),
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
    // Return more specific error message in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? (error as Error).message 
      : 'Internal server error';
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
