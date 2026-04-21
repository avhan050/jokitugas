'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { XCircle } from 'lucide-react';

export default function RejectTransactionModal({
  transactionId,
  transactionType,
}: {
  transactionId: string;
  transactionType: 'topup' | 'withdraw';
}) {
  const { rejectTransaction, closeModal } = useAppStore();
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReject = async () => {
    setError('');

    if (!reason.trim()) {
      setError('Alasan penolakan wajib diisi.');
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await rejectTransaction(transactionId, reason.trim());
      if (!success) {
        setError('Gagal menolak transaksi. Silakan coba lagi.');
        return;
      }
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: 'var(--danger-dim)' }}
        >
          <XCircle size={22} style={{ color: 'var(--danger)' }} />
        </div>
        <div>
          <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Tolak {transactionType === 'topup' ? 'Top Up' : 'Penarikan Dana'}
          </h3>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Alasan ini akan ditampilkan kepada pengguna.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Alasan Penolakan</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="form-input"
          rows={4}
          placeholder="Contoh: Bukti transfer tidak sesuai nominal yang diajukan."
        />
      </div>

      {error && (
        <p className="text-sm font-medium" style={{ color: 'var(--danger)' }}>
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={closeModal}
          className="flex-1 py-3 rounded-xl text-sm font-bold"
          style={{ background: 'var(--bg)', color: 'var(--muted-foreground)', border: '1px solid var(--border)' }}
        >
          Batal
        </button>
        <button
          onClick={handleReject}
          disabled={isSubmitting}
          className="flex-1 py-3 rounded-xl text-sm font-bold disabled:opacity-60"
          style={{ background: 'var(--danger)', color: '#fff' }}
        >
          {isSubmitting ? 'Memproses...' : 'Tolak Transaksi'}
        </button>
      </div>
    </div>
  );
}
