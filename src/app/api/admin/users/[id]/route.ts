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
    const { name, email, role, balance, password, balanceNote } = await request.json();

    const existingUser = await db.user.findUnique({
      where: { id },
      select: { id: true, balance: true },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan' }, { status: 404 });
    }

    const nextName = typeof name === 'string' ? name.trim() : undefined;
    const nextEmail = typeof email === 'string' ? email.toLowerCase().trim() : undefined;
    const nextRole = typeof role === 'string' ? role : undefined;
    const nextBalance = balance === undefined ? undefined : Number(balance);

    if (nextName !== undefined && !nextName) {
      return NextResponse.json({ error: 'Nama pengguna wajib diisi' }, { status: 400 });
    }

    if (nextEmail !== undefined && !nextEmail) {
      return NextResponse.json({ error: 'Email pengguna wajib diisi' }, { status: 400 });
    }

    if (nextRole !== undefined && !['client', 'worker', 'admin'].includes(nextRole)) {
      return NextResponse.json({ error: 'Role pengguna tidak valid' }, { status: 400 });
    }

    if (nextBalance !== undefined && (!Number.isFinite(nextBalance) || nextBalance < 0)) {
      return NextResponse.json({ error: 'Saldo harus berupa angka valid minimal 0' }, { status: 400 });
    }

    if (nextEmail) {
      const emailOwner = await db.user.findUnique({
        where: { email: nextEmail },
        select: { id: true },
      });

      if (emailOwner && emailOwner.id !== id) {
        return NextResponse.json({ error: 'Email sudah digunakan pengguna lain' }, { status: 409 });
      }
    }

    const data: Record<string, unknown> = {
      name: nextName,
      email: nextEmail,
      role: nextRole,
      balance: nextBalance,
      isAdmin: nextRole === undefined ? undefined : nextRole === 'admin',
    };

    if (typeof password === 'string' && password.trim()) {
      data.password = await hashPassword(password.trim());
    }

    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined)
    );

    const balanceChanged =
      nextBalance !== undefined && Math.abs(nextBalance - existingUser.balance) > 0.001;
    const balanceDelta = balanceChanged ? nextBalance - existingUser.balance : 0;
    const adjustmentNote =
      typeof balanceNote === 'string' && balanceNote.trim()
        ? balanceNote.trim()
        : 'Penyesuaian saldo oleh admin';

    const user = await db.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id },
        data: cleanedData,
      });

      if (balanceChanged) {
        await tx.transaction.create({
          data: {
            userId: id,
            type: 'admin_adjustment',
            amount: balanceDelta,
            desc: `Penyesuaian saldo admin: ${formatSignedRupiah(balanceDelta)}`,
            status: 'approved',
            note: adjustmentNote,
          },
        });
      }

      return updatedUser;
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui pengguna' }, { status: 500 });
  }
}

function formatSignedRupiah(amount: number) {
  const sign = amount >= 0 ? '+' : '-';
  return `${sign}Rp ${Math.abs(amount).toLocaleString('id-ID')}`;
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
