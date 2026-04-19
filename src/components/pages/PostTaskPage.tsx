'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah, CATEGORIES } from '@/lib/helpers';
import { Send, Info } from 'lucide-react';

export default function PostTaskPage() {
  const { currentUser, createTask, setPage } = useAppStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [deadline, setDeadline] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');

  if (!currentUser) return null;

  const budgetNum = parseInt(budget) || 0;
  const serviceFee = Math.ceil(budgetNum * 0.05);
  const totalCost = budgetNum + serviceFee;

  const handleSubmit = async () => {
    setError('');
    if (!title.trim()) { setError('Judul tugas harus diisi'); return; }
    if (!description.trim()) { setError('Deskripsi harus diisi'); return; }
    if (!deadline) { setError('Deadline harus diisi'); return; }
    if (budgetNum < 10000) { setError('Budget minimal Rp 10.000'); return; }
    if (new Date(deadline) <= new Date()) { setError('Deadline harus di masa depan'); return; }

    const success = await createTask({
      clientId: currentUser.id,
      title: title.trim(),
      description: description.trim(),
      category,
      deadline: new Date(deadline).toISOString(),
      budget: budgetNum,
    });

    if (success) {
      setPage('mytasks');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Posting Tugas Baru
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Isi detail tugas Anda dan temukan pekerja terbaik
        </p>
      </div>

      <div
        className="rounded-2xl p-6 space-y-5"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-2">Judul Tugas</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Buat Aplikasi React Sederhana"
            className="form-input"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan detail tugas, requirement, dan ekspektasi hasil..."
            className="form-input"
            rows={4}
            style={{ resize: 'vertical' }}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-2">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} style={{ background: '#162032', color: '#E8ECF1' }}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-semibold mb-2">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="form-input"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold mb-2">Budget (Rp)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Contoh: 150000"
            className="form-input"
            min="10000"
          />
        </div>

        {/* Cost summary */}
        <div
          className="rounded-xl p-4 space-y-2"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--muted-foreground)' }}>Budget tugas</span>
            <span>{budgetNum > 0 ? formatRupiah(budgetNum) : '-'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--muted-foreground)' }}>Biaya layanan (5%)</span>
            <span>{budgetNum > 0 ? formatRupiah(serviceFee) : '-'}</span>
          </div>
          <div className="flex justify-between text-sm font-bold pt-2" style={{ borderTop: '1px solid var(--border)' }}>
            <span>Total</span>
            <span style={{ color: 'var(--accent)' }}>{budgetNum > 0 ? formatRupiah(totalCost) : '-'}</span>
          </div>
          <div className="flex items-start gap-2 mt-2">
            <Info size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} />
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Saldo Anda saat ini: {formatRupiah(currentUser.balance)}. Dana escrow akan ditahan dari client dan dibayarkan ke pekerja setelah pekerjaan diterima.
            </p>
          </div>
        </div>

        {error && (
          <p className="text-sm font-medium" style={{ color: 'var(--danger)' }}>
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
          style={{ background: 'var(--accent)', color: '#0B1120' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <Send size={18} />
          Posting Tugas — {budgetNum > 0 ? formatRupiah(totalCost) : '...'}
        </button>
      </div>
    </div>
  );
}
