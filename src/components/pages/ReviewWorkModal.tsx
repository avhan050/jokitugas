'use client';

import { useAppStore } from '@/lib/store';
import { CheckCircle, RotateCcw, XCircle, AlertTriangle } from 'lucide-react';

export default function ReviewWorkModal({ taskId }: { taskId: string }) {
  const { tasks, reviewWork, closeModal } = useAppStore();

  const task = tasks.find((t) => t.id === taskId);

  const handleAction = (decision: 'accept' | 'revision' | 'reject') => {
    reviewWork(taskId, decision);
    closeModal();
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Review Hasil Kerja
        </h3>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          {task?.title}
        </p>
      </div>

      {task?.submissionNote && (
        <div
          className="rounded-xl p-4"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          <p className="text-sm font-semibold mb-1">Catatan Pekerja:</p>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{task.submissionNote}</p>
        </div>
      )}

      <div
        className="flex items-start gap-2 rounded-xl p-3"
        style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold)' }}
      >
        <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
        <p className="text-xs" style={{ color: 'var(--gold)' }}>
          Jika Anda menerima, pembayaran akan langsung diproses ke pekerja. Jika menolak, dana escrow akan dikembalikan ke saldo Anda.
        </p>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => handleAction('accept')}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
          style={{ background: 'var(--accent)', color: '#0B1120' }}
        >
          <CheckCircle size={18} />
          Terima Hasil Kerja
        </button>
        <button
          onClick={() => handleAction('revision')}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
          style={{ background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid var(--gold)' }}
        >
          <RotateCcw size={18} />
          Minta Revisi
        </button>
        <button
          onClick={() => handleAction('reject')}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
          style={{ background: 'var(--danger-dim)', color: 'var(--danger)', border: '1px solid var(--danger)' }}
        >
          <XCircle size={18} />
          Tolak & Refund
        </button>
      </div>
    </div>
  );
}
