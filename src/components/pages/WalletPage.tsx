'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah } from '@/lib/helpers';
import {
  Wallet,
  ArrowUp,
  ArrowDown,
  Landmark,
  Info,
  Shield,
  UploadCloud,
} from 'lucide-react';
import TopupConfirmModal from './TopupConfirmModal';

export default function WalletPage() {
  const { currentUser, transactions, tasks, adminSettings, openModal } = useAppStore();
  const [tab, setTab] = useState<'topup' | 'withdraw'>('topup');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [error, setError] = useState('');

  if (!currentUser) return null;

  const escrowHeld = tasks
    .filter((t) => t.escrowHeld && t.clientId === currentUser.id)
    .reduce((sum, t) => sum + t.budget, 0);

  const quickAmounts = [50000, 100000, 200000, 500000];

  const handleTopup = () => {
    setError('');
    const num = parseInt(amount) || 0;
    if (num < 10000) { setError('Minimal top up Rp 10.000'); return; }
    if (!note.trim()) { setError('Catatan metode pembayaran harus diisi'); return; }

    openModal(
      <TopupConfirmModal
        amount={num}
        note={note.trim()}
        onConfirm={(proofUrl) => {
          useAppStore.getState().createTopup(currentUser.id, num, note.trim(), proofUrl);
          setAmount('');
          setNote('');
        }}
      />
    );
  };

  const handleWithdraw = () => {
    setError('');
    const num = parseInt(amount) || 0;
    if (num < 50000) { setError('Minimal tarik Rp 50.000'); return; }
    if (num > currentUser.balance) { setError('Saldo tidak mencukupi'); return; }
    if (!bankDetails.trim()) { setError('Detail bank/wallet harus diisi'); return; }

    useAppStore.getState().createWithdraw(currentUser.id, num, bankDetails.trim());
    setAmount('');
    setBankDetails('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Dompet
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Kelola saldo dan transaksi keuangan Anda
        </p>
      </div>

      {/* Balance card */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D6B4F 0%, #0B1120 100%)', border: '1px solid var(--accent)' }}
      >
        <div className="glow-orb" style={{ width: 200, height: 200, background: 'var(--accent)', top: -50, right: -50, opacity: 0.2 }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={20} style={{ color: 'var(--accent)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>Saldo Anda</span>
          </div>
          <p className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {formatRupiah(currentUser.balance)}
          </p>
          {escrowHeld > 0 && (
            <div className="flex items-center gap-2">
              <Shield size={14} style={{ color: 'var(--gold)' }} />
              <span className="text-sm" style={{ color: 'var(--gold)' }}>
                {formatRupiah(escrowHeld)} dalam escrow
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bank info */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Landmark size={18} style={{ color: 'var(--info)' }} />
          <span className="text-sm font-semibold">Info Transfer</span>
        </div>
        <div className="space-y-1 text-sm">
          <p style={{ color: 'var(--muted-foreground)' }}>Bank: <span style={{ color: 'var(--fg)' }}>{adminSettings.bank_name}</span></p>
          <p style={{ color: 'var(--muted-foreground)' }}>No. Rekening: <span style={{ color: 'var(--fg)' }}>{adminSettings.bank_account}</span></p>
          <p style={{ color: 'var(--muted-foreground)' }}>Atas Nama: <span style={{ color: 'var(--fg)' }}>{adminSettings.bank_owner}</span></p>
          <p style={{ color: 'var(--muted-foreground)' }}>E-Wallet: <span style={{ color: 'var(--fg)' }}>{adminSettings.e_wallet}</span></p>
        </div>
      </div>

      {/* Top Up / Withdraw tabs */}
      <div
        className="rounded-2xl p-6"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <div className="flex rounded-xl p-1 mb-5" style={{ background: 'var(--bg)' }}>
          <button
            onClick={() => { setTab('topup'); setError(''); }}
            className="flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            style={{
              background: tab === 'topup' ? 'var(--accent)' : 'transparent',
              color: tab === 'topup' ? '#0B1120' : 'var(--muted-foreground)',
            }}
          >
            <ArrowDown size={16} />
            Top Up
          </button>
          <button
            onClick={() => { setTab('withdraw'); setError(''); }}
            className="flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            style={{
              background: tab === 'withdraw' ? 'var(--danger)' : 'transparent',
              color: tab === 'withdraw' ? '#fff' : 'var(--muted-foreground)',
            }}
          >
            <ArrowUp size={16} />
            Tarik Saldo
          </button>
        </div>

        {tab === 'topup' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Jumlah (Rp)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Contoh: 100000"
                className="form-input"
                min="10000"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((qa) => (
                <button
                  key={qa}
                  onClick={() => setAmount(qa.toString())}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: amount === qa.toString() ? 'var(--accent-dim)' : 'var(--bg)',
                    color: amount === qa.toString() ? 'var(--accent)' : 'var(--muted-foreground)',
                    border: amount === qa.toString() ? '1px solid var(--accent)' : '1px solid var(--border)',
                  }}
                >
                  {formatRupiah(qa)}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Metode Pembayaran</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Contoh: Transfer BCA an. Andi"
                className="form-input"
              />
            </div>

            <div className="flex items-start gap-2">
              <Info size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} />
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                Upload bukti transfer pada langkah berikutnya. Top up akan diproses setelah diverifikasi admin (1x24 jam).
              </p>
            </div>

            {error && <p className="text-sm font-medium" style={{ color: 'var(--danger)' }}>{error}</p>}

            <button
              onClick={handleTopup}
              className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
              style={{ background: 'var(--accent)', color: '#0B1120' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <ArrowDown size={18} />
              Top Up Saldo
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Jumlah Tarik (Rp)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Contoh: 200000"
                className="form-input"
                min="50000"
                max={currentUser.balance}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                Saldo tersedia: {formatRupiah(currentUser.balance)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Detail Bank / E-Wallet</label>
              <textarea
                value={bankDetails}
                onChange={(e) => setBankDetails(e.target.value)}
                placeholder="Nama bank, no rekening, atas nama..."
                className="form-input"
                rows={3}
              />
            </div>

            {error && <p className="text-sm font-medium" style={{ color: 'var(--danger)' }}>{error}</p>}

            <button
              onClick={handleWithdraw}
              className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
              style={{ background: 'var(--danger)', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <ArrowUp size={18} />
              Tarik Saldo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
