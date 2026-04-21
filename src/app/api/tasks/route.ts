import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

function formatRupiah(amount: number) {
  return `Rp ${Math.ceil(amount).toLocaleString('id-ID')}`;
}

export async function GET() {
  try {
    const tasks = await db.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { title, description, category, deadline, budget } = await request.json();

    const user = await db.user.findUnique({
      where: { id: session.id as string },
    });

    if (!user || user.role !== 'client') {
      return NextResponse.json({ error: 'Only clients can post tasks' }, { status: 403 });
    }

    const totalFee = Math.ceil(budget * 1.05);
    if (user.balance < totalFee) {
      const shortfall = totalFee - user.balance;
      return NextResponse.json({
        error: `Saldo Anda belum cukup untuk posting tugas ini. Total yang dibutuhkan adalah ${formatRupiah(totalFee)} (budget + biaya layanan 5%), sedangkan saldo Anda saat ini ${formatRupiah(user.balance)}. Tambahkan saldo minimal ${formatRupiah(shortfall)} lagi lalu coba kembali.`,
      }, { status: 400 });
    }

    // Transaction for fee and budget (escrow is usually held on take)
    // Actually the current store logic deducts totalFee immediately
    
    const [task] = await db.$transaction([
      db.task.create({
        data: {
          clientId: user.id,
          title,
          description,
          category,
          deadline: new Date(deadline),
          budget,
          status: 'open',
        },
      }),
      db.user.update({
        where: { id: user.id },
        data: { balance: { decrement: totalFee } },
      }),
      db.transaction.create({
        data: {
          userId: user.id,
          type: 'fee',
          amount: -Math.ceil(budget * 0.05),
          desc: `Biaya layanan 5%: ${title}`,
          status: 'approved',
        },
      })
    ]);

    return NextResponse.json({ task });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
