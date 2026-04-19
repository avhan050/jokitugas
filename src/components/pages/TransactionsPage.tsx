'use client';

import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDate, statusLabel, statusBadgeClass } from '@/lib/helpers';
import {
  ArrowDown,
  ArrowUp,
  ArrowLeftRight,
  Clock,
  CheckCircle,
  XCircle,
  Coins,
  Handshake,
  Receipt,
  Inbox,
} from 'lucide-react';

const txIcons: Record<string, React.ReactNode> = {
  topup: <ArrowDown size={18} style={{ color: 'var(--accent)' }} />,
  withdraw: <ArrowUp size={18} style={{ color: 'var(--danger)' }} />,
  escrow: <Clock size={18} style={{ color: 'var(--info)' }} />,
  earning: <Coins size={18} style={{ color: 'var(--accent)' }} />,
  refund: <Handshake size={18} style={{ color: 'var(--gold)' }} />,
  fee: <Receipt size={18} style={{ color: 'var(--muted-foreground)' }} />,
};

export default function TransactionsPage() {
  const { currentUser, transactions } = useAppStore();

  if (!currentUser) return null;

  const myTx = transactions
    .filter((t) => t.userId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Riwayat Transaksi
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          {myTx.length} transaksi
        </p>
      </div>

      <div className="space-y-3">
        {myTx.length === 0 && (
          <div className="stat-card text-center py-12">
            <Inbox size={48} className="mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
            <p className="font-semibold text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Belum ada transaksi
            </p>
          </div>
        )}
        {myTx.map((tx) => (
          <div
            key={tx.id}
            className="task-card flex items-center gap-4"
            style={{ cursor: 'default' }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--bg)' }}
            >
              {txIcons[tx.type] || <ArrowLeftRight size={18} style={{ color: 'var(--muted-foreground)' }} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{tx.desc}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {formatDate(tx.createdAt)}
                </span>
                {tx.status === 'pending' && (
                  <span className="badge badge-open">Menunggu</span>
                )}
                {tx.status === 'approved' && (
                  <span className="badge badge-done">Sukses</span>
                )}
                {tx.status === 'rejected' && (
                  <span className="badge badge-cancelled">Ditolak</span>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p
                className="text-sm font-bold"
                style={{ color: tx.amount >= 0 ? 'var(--accent)' : 'var(--danger)' }}
              >
                {tx.amount >= 0 ? '+' : '-'}{formatRupiah(Math.abs(tx.amount))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
