import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const runtime = 'nodejs';

type BackupPayload = {
  app: string;
  version: number;
  exportedAt: string;
  data: {
    users: Array<{
      id: string;
      name: string;
      email: string;
      password: string;
      role: string;
      balance: number;
      rating: number;
      completedJobs: number;
      createdAt: string;
      isAdmin?: boolean;
    }>;
    tasks: Array<{
      id: string;
      clientId: string;
      workerId?: string | null;
      title: string;
      description: string;
      category: string;
      deadline: string;
      budget: number;
      status: string;
      createdAt: string;
      completedAt?: string | null;
      clientRating?: number | null;
      workerRating?: number | null;
      escrowHeld: boolean;
      submissionNote?: string | null;
      submissionUrl?: string | null;
      takenAt?: string | null;
    }>;
    transactions: Array<{
      id: string;
      userId: string;
      type: string;
      amount: number;
      taskId?: string | null;
      createdAt: string;
      desc: string;
      status: string;
      proofUrl?: string | null;
      note?: string | null;
      bankDetails?: string | null;
    }>;
    adminSettings: Array<{
      id: string;
      bank_name: string;
      bank_account: string;
      bank_owner: string;
      e_wallet: string;
    }>;
  };
};

function isValidBackup(payload: unknown): payload is BackupPayload {
  if (!payload || typeof payload !== 'object') return false;

  const candidate = payload as Partial<BackupPayload>;
  return (
    candidate.app === 'JokiTugas' &&
    typeof candidate.version === 'number' &&
    !!candidate.data &&
    Array.isArray(candidate.data.users) &&
    Array.isArray(candidate.data.tasks) &&
    Array.isArray(candidate.data.transactions) &&
    Array.isArray(candidate.data.adminSettings)
  );
}

export async function POST(request: Request) {
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
      return NextResponse.json({ error: 'Only admin can import database' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Backup file is required' }, { status: 400 });
    }

    const text = await file.text();
    const payload = JSON.parse(text);

    if (!isValidBackup(payload)) {
      return NextResponse.json({ error: 'Backup file format is invalid' }, { status: 400 });
    }

    const hasAdmin = payload.data.users.some((user) => user.role === 'admin');
    if (!hasAdmin) {
      return NextResponse.json({ error: 'Backup harus memiliki minimal satu akun admin' }, { status: 400 });
    }

    const settings = payload.data.adminSettings.length > 0
      ? payload.data.adminSettings
      : [{
          id: 'global',
          bank_name: 'Bank BCA',
          bank_account: '1234567890',
          bank_owner: 'PT JokiTugas Indonesia',
          e_wallet: 'jokitugas@ovo.id',
        }];

    await db.$transaction(async (tx) => {
      await tx.transaction.deleteMany();
      await tx.task.deleteMany();
      await tx.user.deleteMany();
      await tx.adminSettings.deleteMany();

      if (payload.data.users.length > 0) {
        await tx.user.createMany({
          data: payload.data.users.map((user) => ({
            ...user,
            createdAt: new Date(user.createdAt),
            isAdmin: user.isAdmin ?? user.role === 'admin',
          })),
        });
      }

      if (payload.data.tasks.length > 0) {
        await tx.task.createMany({
          data: payload.data.tasks.map((task) => ({
            ...task,
            deadline: new Date(task.deadline),
            createdAt: new Date(task.createdAt),
            completedAt: task.completedAt ? new Date(task.completedAt) : null,
            takenAt: task.takenAt ? new Date(task.takenAt) : null,
          })),
        });
      }

      if (payload.data.transactions.length > 0) {
        await tx.transaction.createMany({
          data: payload.data.transactions.map((transaction) => ({
            ...transaction,
            createdAt: new Date(transaction.createdAt),
          })),
        });
      }

      await tx.adminSettings.createMany({
        data: settings,
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Backup database berhasil diimport',
    });
  } catch (error) {
    console.error('Import database error:', error);
    return NextResponse.json({ error: 'Failed to import database' }, { status: 500 });
  }
}
