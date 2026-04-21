import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession, hashPassword } from '@/lib/auth';

async function requireAdmin() {
  const session = await getSession();
  if (!session?.id) {
    return { error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }) };
  }

  const admin = await db.user.findUnique({
    where: { id: session.id as string },
    select: { id: true, role: true },
  });

  if (!admin || admin.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Only admin can manage users' }, { status: 403 }) };
  }

  return { admin };
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { id } = await params;
    const { name, email, role, balance, password } = await request.json();

    const existingUser = await db.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan' }, { status: 404 });
    }

    if (email) {
      const emailOwner = await db.user.findUnique({
        where: { email: email.toLowerCase() },
        select: { id: true },
      });

      if (emailOwner && emailOwner.id !== id) {
        return NextResponse.json({ error: 'Email sudah digunakan pengguna lain' }, { status: 409 });
      }
    }

    const data: Record<string, unknown> = {
      name: typeof name === 'string' ? name.trim() : undefined,
      email: typeof email === 'string' ? email.toLowerCase().trim() : undefined,
      role: typeof role === 'string' ? role : undefined,
      balance: typeof balance === 'number' ? balance : undefined,
      isAdmin: role === 'admin',
    };

    if (typeof password === 'string' && password.trim()) {
      data.password = await hashPassword(password.trim());
    }

    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined)
    );

    const user = await db.user.update({
      where: { id },
      data: cleanedData,
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui pengguna' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { id } = await params;

    if (auth.admin.id === id) {
      return NextResponse.json({ error: 'Admin yang sedang login tidak bisa dihapus' }, { status: 400 });
    }

    const [user, clientTasks, workerTasks, transactions] = await Promise.all([
      db.user.findUnique({ where: { id }, select: { id: true } }),
      db.task.count({ where: { clientId: id } }),
      db.task.count({ where: { workerId: id } }),
      db.transaction.count({ where: { userId: id } }),
    ]);

    if (!user) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan' }, { status: 404 });
    }

    if (clientTasks > 0 || workerTasks > 0 || transactions > 0) {
      return NextResponse.json({
        error: 'Pengguna ini tidak bisa dihapus karena masih memiliki tugas atau transaksi terkait',
      }, { status: 400 });
    }

    await db.user.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Gagal menghapus pengguna' }, { status: 500 });
  }
}
