'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { CheckCircle, RotateCcw, XCircle, AlertTriangle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default function ReviewWorkModal({ taskId }: { taskId: string }) {
  const { tasks, reviewWork, closeModal } = useAppStore();
  const [disputeReason, setDisputeReason] = useState('');

  const task = tasks.find((t) => t.id === taskId);

  const handleAction = (decision: 'accept' | 'revision' | 'dispute') => {
    if (decision === 'dispute' && !disputeReason.trim()) {
      return;
    }

    reviewWork(taskId, decision, disputeReason);
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
          Jika Anda menerima, pembayaran akan langsung diproses ke pekerja. Jika ada masalah serius, ajukan sengketa agar admin meninjau tanpa refund otomatis.
        </p>
      </div>

      <div
        className="rounded-xl p-4 space-y-2"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
      >
        <p className="text-sm font-semibold">Alasan Sengketa</p>
        <Textarea
          value={disputeReason}
          onChange={(event) => setDisputeReason(event.target.value)}
          placeholder="Jelaskan alasan sengketa jika hasil tidak sesuai, misalnya file rusak, hasil tidak lengkap, atau pekerjaan tidak sesuai brief."
          className="min-h-24 resize-none"
          maxLength={1000}
        />
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          Field ini hanya wajib diisi jika Anda memilih ajukan sengketa.
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
          onClick={() => handleAction('dispute')}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
          style={{ background: 'var(--danger-dim)', color: 'var(--danger)', border: '1px solid var(--danger)' }}
          disabled={!disputeReason.trim()}
        >
          <XCircle size={18} />
          Ajukan Sengketa ke Admin
        </button>
      </div>
    </div>
  );
}
