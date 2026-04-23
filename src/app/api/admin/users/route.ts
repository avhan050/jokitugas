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

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { name, email, password, role, balance } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Nama, email, password, dan role wajib diisi' }, { status: 400 });
    }

    if (!['client', 'worker', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Role pengguna tidak valid' }, { status: 400 });
    }

    const initialBalance =
      balance === undefined || balance === null || balance === ''
        ? 0
        : Number(balance);
    if (!Number.isFinite(initialBalance) || initialBalance < 0) {
      return NextResponse.json({ error: 'Saldo awal harus berupa angka valid minimal 0' }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email sudah digunakan pengguna lain' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const user = await db.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role,
        balance: initialBalance,
        rating: 0,
        completedJobs: 0,
        isAdmin: role === 'admin',
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json({ error: 'Gagal membuat pengguna baru' }, { status: 500 });
  }
}
