'use client';

import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDateShort } from '@/lib/helpers';
import { Handshake, AlertTriangle, Shield } from 'lucide-react';

export default function TakeTaskModal({ taskId }: { taskId: string }) {
  const { tasks, currentUser, takeTask, closeModal } = useAppStore();

  const task = tasks.find((t) => t.id === taskId);
  if (!task || !currentUser) return null;

  const client = useAppStore.getState().users.find((u) => u.id === task.clientId);

  const handleTake = () => {
    takeTask(taskId, currentUser.id);
    closeModal();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'var(--accent-dim)' }}
        >
          <Handshake size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Ambil Tugas
          </h3>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Konfirmasi pengambilan tugas
          </p>
        </div>
      </div>

      <div
        className="rounded-xl p-4 space-y-2"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
      >
        <p className="font-semibold text-sm">{task.title}</p>
        <div className="flex justify-between text-sm">
          <span style={{ color: 'var(--muted-foreground)' }}>Budget</span>
          <span className="font-bold">{formatRupiah(task.budget)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: 'var(--muted-foreground)' }}>Deadline</span>
          <span className="font-semibold">{formatDateShort(task.deadline)}</span>
        </div>
        {client && (
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--muted-foreground)' }}>Client</span>
            <span className="font-semibold">{client.name}</span>
          </div>
        )}
      </div>

      <div
        className="flex items-start gap-2 rounded-xl p-3"
        style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold)' }}
      >
        <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
        <p className="text-xs" style={{ color: 'var(--gold)' }}>
          Pastikan Anda dapat menyelesaikan tugas ini sebelum deadline. Pembatalan setelah pengambilan perlu persetujuan client.
        </p>
      </div>

      <div
        className="flex items-center gap-2 rounded-xl p-3"
        style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent)' }}
      >
        <Shield size={16} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
        <p className="text-xs" style={{ color: 'var(--accent)' }}>
          Dana {formatRupiah(task.budget)} akan di-hold dalam escrow setelah Anda mengambil tugas, dan dibayarkan setelah client menerima hasil kerja.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={closeModal}
          className="flex-1 py-3 rounded-xl text-sm font-bold"
          style={{ background: 'var(--bg)', color: 'var(--muted-foreground)', border: '1px solid var(--border)' }}
        >
          Batal
        </button>
        <button
          onClick={handleTake}
          className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
          style={{ background: 'var(--accent)', color: '#0B1120' }}
        >
          Ambil Tugas
        </button>
      </div>
    </div>
  );
}
