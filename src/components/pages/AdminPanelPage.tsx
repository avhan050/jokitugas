'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDate, statusLabel, statusBadgeClass } from '@/lib/helpers';
import {
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Landmark,
  Settings,
  Users,
  ListChecks,
  Clock,
} from 'lucide-react';

export default function AdminPanelPage() {
  const { transactions, users, tasks, adminSettings, approveTransaction, rejectTransaction, updateAdminSettings, addToast, openModal, closeModal } = useAppStore();

  const pendingTx = transactions
    .filter((t) => t.status === 'pending' && (t.type === 'topup' || t.type === 'withdraw'))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const allManaged = transactions
    .filter((t) => (t.type === 'topup' || t.type === 'withdraw') && t.status !== 'pending')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  const [showSettings, setShowSettings] = useState(false);
  const [bankName, setBankName] = useState(adminSettings.bank_name);
  const [bankAccount, setBankAccount] = useState(adminSettings.bank_account);
  const [bankOwner, setBankOwner] = useState(adminSettings.bank_owner);
  const [eWallet, setEWallet] = useState(adminSettings.e_wallet);

  const handleSaveSettings = () => {
    updateAdminSettings({
      bank_name: bankName,
      bank_account: bankAccount,
      bank_owner: bankOwner,
      e_wallet: eWallet,
    });
    setShowSettings(false);
  };

  const getUserName = (userId: string) => {
    const u = users.find((u) => u.id === userId);
    return u?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Admin Panel
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Verifikasi transaksi dan kelola platform
          </p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{ background: showSettings ? 'var(--info)' : 'var(--card)', color: showSettings ? '#fff' : 'var(--fg)', border: '1px solid var(--border)' }}
          onMouseEnter={(e) => { if (!showSettings) e.currentTarget.style.borderColor = 'var(--info)'; }}
          onMouseLeave={(e) => { if (!showSettings) e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <Settings size={18} />
          Pengaturan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: 'var(--info-dim)' }}>
            <Users size={24} style={{ color: 'var(--info)' }} />
          </div>
          <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {users.filter((u) => u.role !== 'admin').length}
          </p>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Total Pengguna</p>
        </div>
        <div className="stat-card">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: 'var(--accent-dim)' }}>
            <ListChecks size={24} style={{ color: 'var(--accent)' }} />
          </div>
          <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {tasks.length}
          </p>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Total Tugas</p>
        </div>
        <div className="stat-card">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: 'var(--gold-dim)' }}>
            <Clock size={24} style={{ color: 'var(--gold)' }} />
          </div>
          <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {pendingTx.length}
          </p>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Menunggu Verifikasi</p>
        </div>
        <div className="stat-card">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(0,214,143,0.12)' }}>
            <Landmark size={24} style={{ color: 'var(--accent)' }} />
          </div>
          <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {formatRupiah(transactions.filter((t) => t.type === 'fee' && t.status === 'approved').reduce((s, t) => s + Math.abs(t.amount), 0))}
          </p>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Pendapatan Platform</p>
        </div>
      </div>

      {/* Settings */}
      {showSettings && (
        <div
          className="rounded-2xl p-6 animate-in"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        >
          <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Pengaturan Platform</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nama Bank</label>
              <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">No. Rekening</label>
              <input type="text" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Atas Nama</label>
              <input type="text" value={bankOwner} onChange={(e) => setBankOwner(e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">E-Wallet</label>
              <input type="text" value={eWallet} onChange={(e) => setEWallet(e.target.value)} className="form-input" />
            </div>
          </div>
          <button
            onClick={handleSaveSettings}
            className="px-5 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: 'var(--accent)', color: '#0B1120' }}
          >
            Simpan Pengaturan
          </button>
        </div>
      )}

      {/* Pending transactions */}
      <div>
        <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Menunggu Verifikasi
        </h3>
        <div className="space-y-3">
          {pendingTx.length === 0 && (
            <div className="stat-card text-center py-8">
              <CheckCircle size={36} className="mx-auto mb-2" style={{ color: 'var(--accent)' }} />
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Semua transaksi sudah diproses</p>
            </div>
          )}
          {pendingTx.map((tx) => (
            <div key={tx.id} className="task-card" style={{ cursor: 'default' }}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge ${tx.type === 'topup' ? 'badge-open' : 'badge-review'}`}>
                      {tx.type === 'topup' ? '↓ Top Up' : '↑ Tarik'}
                    </span>
                    <span className="badge badge-open">Menunggu</span>
                  </div>
                  <p className="font-semibold text-sm">{tx.desc}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                    {getUserName(tx.userId)} • {formatDate(tx.createdAt)}
                  </p>
                  {tx.note && (
                    <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>Catatan: {tx.note}</p>
                  )}
                  {tx.bankDetails && (
                    <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>Bank: {tx.bankDetails}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-lg font-bold"
                    style={{ color: tx.type === 'topup' ? 'var(--accent)' : 'var(--danger)' }}
                  >
                    {tx.type === 'topup' ? '+' : '-'}{formatRupiah(Math.abs(tx.amount))}
                  </span>
                  <div className="flex gap-2">
                    {tx.proofUrl !== undefined && tx.type === 'topup' && (
                      <button
                        onClick={() => openModal(
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--info-dim)' }}>
                                <ImageIcon size={20} style={{ color: 'var(--info)' }} />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Bukti Pembayaran</h3>
                                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{getUserName(tx.userId)} • {formatDate(tx.createdAt)}</p>
                              </div>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-border bg-bg">
                              <img 
                                src={tx.proofUrl} 
                                alt="Bukti Pembayaran" 
                                className="w-full h-auto max-h-[70vh] object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1e293b/white?text=Gambar+tidak+ditemukan';
                                }}
                              />
                            </div>
                            <button
                              onClick={closeModal}
                              className="w-full py-3 rounded-xl text-sm font-bold"
                              style={{ background: 'var(--bg)', color: 'var(--muted-foreground)', border: '1px solid var(--border)' }}
                            >
                              Tutup
                            </button>
                          </div>
                        )}
                        className="p-2 rounded-lg"
                        style={{ background: 'var(--info-dim)', color: 'var(--info)' }}
                        title="Lihat bukti"
                      >
                        <ImageIcon size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => approveTransaction(tx.id)}
                      className="p-2 rounded-lg transition-all"
                      style={{ background: 'rgba(0,214,143,0.15)', color: 'var(--accent)' }}
                      title="Setujui"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button
                      onClick={() => rejectTransaction(tx.id)}
                      className="p-2 rounded-lg transition-all"
                      style={{ background: 'var(--danger-dim)', color: 'var(--danger)' }}
                      title="Tolak"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent managed transactions */}
      {allManaged.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Riwayat Verifikasi
          </h3>
          <div className="space-y-3">
            {allManaged.map((tx) => (
              <div key={tx.id} className="task-card flex items-center gap-4" style={{ cursor: 'default' }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge ${tx.type === 'topup' ? 'badge-done' : 'badge-cancelled'}`}>
                      {tx.type === 'topup' ? '↓ Top Up' : '↑ Tarik'}
                    </span>
                    <span className={`badge ${tx.status === 'approved' ? 'badge-done' : 'badge-cancelled'}`}>
                      {tx.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold truncate">{tx.desc}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                    {getUserName(tx.userId)} • {formatDate(tx.createdAt)}
                  </p>
                </div>
                <span
                  className="text-sm font-bold flex-shrink-0"
                  style={{ color: tx.type === 'topup' ? 'var(--accent)' : 'var(--danger)' }}
                >
                  {tx.type === 'topup' ? '+' : '-'}{formatRupiah(Math.abs(tx.amount))}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
