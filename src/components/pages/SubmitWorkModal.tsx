'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Send } from 'lucide-react';

export default function SubmitWorkModal({ taskId }: { taskId: string }) {
  const { submitWork, closeModal } = useAppStore();
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (!note.trim()) return;
    submitWork(taskId, note.trim());
    closeModal();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'var(--accent-dim)' }}
        >
          <Send size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Kirim Hasil Kerja
          </h3>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Tambahkan catatan untuk client
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Catatan Pengiriman</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Jelaskan ringkasan pekerjaan yang telah selesai..."
          className="form-input"
          rows={4}
          style={{ resize: 'vertical' }}
        />
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
          onClick={handleSubmit}
          disabled={!note.trim()}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
          style={{
            background: note.trim() ? 'var(--accent)' : 'var(--border)',
            color: note.trim() ? '#0B1120' : 'var(--muted-foreground)',
          }}
        >
          <Send size={16} />
          Kirim
        </button>
      </div>
    </div>
  );
}
