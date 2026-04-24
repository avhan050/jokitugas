'use client';

import { useAppStore } from '@/lib/store';
import { formatDate, formatRupiah, statusBadgeClass, statusLabel } from '@/lib/helpers';
import { AlertTriangle, CheckCircle2, ShieldAlert, Undo2 } from 'lucide-react';
import TaskDetailModal from './TaskDetailModal';

export default function AdminDisputesPage() {
  const { tasks, users, resolveTaskDispute, openModal } = useAppStore();

  const disputedTasks = tasks
    .filter((task) => task.status === 'dispute')
    .sort((a, b) => new Date(b.disputedAt || b.createdAt).getTime() - new Date(a.disputedAt || a.createdAt).getTime());

  const getUserName = (userId: string | null) => {
    if (!userId) return '-';
    return users.find((user) => user.id === userId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Sengketa Tugas
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Putuskan apakah dana escrow dibayarkan ke pekerja atau dikembalikan ke client.
        </p>
      </div>

      {disputedTasks.length === 0 ? (
        <div className="stat-card text-center py-12">
          <CheckCircle2 size={44} className="mx-auto mb-3" style={{ color: 'var(--accent)' }} />
          <p className="text-lg font-semibold">Belum ada sengketa aktif</p>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Semua tugas yang sedang direview berjalan normal.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {disputedTasks.map((task) => (
            <div key={task.id} className="task-card" style={{ cursor: 'default' }}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`badge ${statusBadgeClass(task.status)}`}>
                        {statusLabel(task.status)}
                      </span>
                      <span className="cat-badge">{task.category}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        {task.title}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        Client: {getUserName(task.clientId)} • Pekerja: {getUserName(task.workerId)} • Budget: {formatRupiah(task.budget)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal(<TaskDetailModal taskId={task.id} />)}
                    className="px-4 py-2 rounded-xl text-sm font-bold"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                  >
                    Lihat Detail Tugas
                  </button>
                </div>

                <div
                  className="rounded-xl p-4 space-y-2"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={16} style={{ color: 'var(--danger)' }} />
                    <span className="text-sm font-semibold">Alasan Sengketa</span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{task.disputeReason || 'Tidak ada alasan tertulis.'}</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    Diajukan pada {formatDate(task.disputedAt || task.createdAt)}
                  </p>
                </div>

                <div
                  className="flex items-start gap-2 rounded-xl p-3"
                  style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold)' }}
                >
                  <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                  <p className="text-xs" style={{ color: 'var(--gold)' }}>
                    Keputusan admin akan langsung mengakhiri sengketa dan melepaskan dana escrow sesuai hasil keputusan.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => resolveTaskDispute(task.id, 'pay_worker')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                    style={{ background: 'var(--accent)', color: '#0B1120' }}
                  >
                    <CheckCircle2 size={18} />
                    Putuskan Bayar Pekerja
                  </button>
                  <button
                    type="button"
                    onClick={() => resolveTaskDispute(task.id, 'refund_client')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                    style={{ background: 'var(--danger-dim)', color: 'var(--danger)', border: '1px solid var(--danger)' }}
                  >
                    <Undo2 size={18} />
                    Putuskan Refund Client
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
