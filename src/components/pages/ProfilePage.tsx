'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDate, statusLabel } from '@/lib/helpers';
import { Star, CheckCircle, ListChecks, Save, Lock, Send, Unlink } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, updateProfile, changePassword, generateTelegramLinkCode, unlinkTelegram } = useAppStore();
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(currentUser?.name || '');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [telegramCode, setTelegramCode] = useState(currentUser?.telegramLinkCode || '');

  if (!currentUser) return null;

  const handleSaveName = () => {
    if (nameValue.trim()) {
      updateProfile(nameValue.trim());
      setEditingName(false);
    }
  };

  const handleChangePassword = async () => {
    setPassError('');
    if (!oldPass || !newPass || !confirmPass) {
      setPassError('Semua field harus diisi');
      return;
    }
    if (newPass.length < 6) {
      setPassError('Password baru minimal 6 karakter');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('Konfirmasi password tidak cocok');
      return;
    }
    const success = await changePassword(oldPass, newPass);
    if (!success) {
      setPassError('Password lama salah');
      return;
    }
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const roleBadgeColors: Record<string, { bg: string; color: string }> = {
    client: { bg: 'var(--info-dim)', color: 'var(--info)' },
    worker: { bg: 'var(--accent-dim)', color: 'var(--accent)' },
    admin: { bg: 'var(--gold-dim)', color: 'var(--gold)' },
  };

  const roleLabels: Record<string, string> = {
    client: 'Client',
    worker: 'Joki / Pekerja',
    admin: 'Administrator',
  };

  const rb = roleBadgeColors[currentUser.role];

  const handleGenerateTelegramCode = async () => {
    const code = await generateTelegramLinkCode();
    if (code) {
      setTelegramCode(code);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Profil Saya
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Kelola informasi akun Anda
        </p>
      </div>

      {/* Profile card */}
      <div
        className="rounded-2xl p-6"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold"
            style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
          >
            {currentUser.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div className="flex-1">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  className="form-input text-sm"
                  style={{ maxWidth: 200 }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                />
                <button
                  onClick={handleSaveName}
                  className="p-2 rounded-lg"
                  style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
                >
                  <CheckCircle size={18} />
                </button>
              </div>
            ) : (
              <h3 className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {currentUser.name}
                <button
                  onClick={() => { setEditingName(true); setNameValue(currentUser.name); }}
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{ background: 'var(--bg)', color: 'var(--muted-foreground)' }}
                >
                  Edit
                </button>
              </h3>
            )}
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              {currentUser.email}
            </p>
            <span
              className="inline-block mt-1 px-3 py-1 rounded-lg text-xs font-semibold"
              style={{ background: rb.bg, color: rb.color }}
            >
              {roleLabels[currentUser.role]}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star size={16} style={{ color: 'var(--gold)' }} />
              <span className="text-lg font-bold">{currentUser.rating > 0 ? currentUser.rating.toFixed(1) : '-'}</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Rating</p>
          </div>
          <div className="text-center p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle size={16} style={{ color: 'var(--accent)' }} />
              <span className="text-lg font-bold">{currentUser.completedJobs}</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Tugas Selesai</p>
          </div>
          <div className="text-center p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
            <div className="flex items-center justify-center gap-1 mb-1">
              <ListChecks size={16} style={{ color: 'var(--info)' }} />
              <span className="text-lg font-bold">{formatRupiah(currentUser.balance)}</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Saldo</p>
          </div>
        </div>

        <div className="mt-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
          Bergabung sejak {formatDate(currentUser.createdAt)}
        </div>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Send size={18} style={{ color: 'var(--accent)' }} />
          <h3 className="font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Link Telegram</h3>
        </div>

        <div className="space-y-3 text-sm">
          <p style={{ color: 'var(--muted-foreground)' }}>
            Hubungkan akun Telegram agar menerima notifikasi transaksi dan update sengketa.
          </p>

          <div
            className="rounded-xl p-4"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
          >
            <p className="font-semibold">Status</p>
            <p style={{ color: currentUser.telegramChatId ? 'var(--accent)' : 'var(--muted-foreground)' }}>
              {currentUser.telegramChatId ? `Terhubung ke chat ID ${currentUser.telegramChatId}` : 'Belum terhubung'}
            </p>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
          >
            <p className="font-semibold mb-2">Cara menghubungkan</p>
            <p style={{ color: 'var(--muted-foreground)' }}>1. Klik tombol buat kode.</p>
            <p style={{ color: 'var(--muted-foreground)' }}>2. Kirim perintah <code>/link KODE</code> ke bot Telegram admin.</p>
            <p style={{ color: 'var(--muted-foreground)' }}>3. Bot akan menghubungkan chat Telegram Anda ke akun ini.</p>
          </div>

          {telegramCode && (
            <div
              className="rounded-xl p-4"
              style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent)' }}
            >
              <p className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>Kode aktif</p>
              <p className="text-xl font-bold tracking-[0.25em]" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--accent)' }}>
                {telegramCode}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleGenerateTelegramCode}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ background: 'var(--accent)', color: '#0B1120' }}
            >
              <Send size={16} />
              Buat Kode Link
            </button>
            {currentUser.telegramChatId && (
              <button
                onClick={() => void unlinkTelegram()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ background: 'var(--danger-dim)', color: 'var(--danger)', border: '1px solid var(--danger)' }}
              >
                <Unlink size={16} />
                Lepas Telegram
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Change password */}
      {currentUser.role !== 'admin' && (
        <div
          className="rounded-2xl p-6"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Lock size={18} style={{ color: 'var(--info)' }} />
            <h3 className="font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Ubah Password</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold mb-1">Password Lama</label>
              <input
                type="password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Password Baru</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Konfirmasi Password Baru</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="form-input"
                onKeyDown={(e) => e.key === 'Enter' && handleChangePassword()}
              />
            </div>
            {passError && (
              <p className="text-sm font-medium" style={{ color: 'var(--danger)' }}>{passError}</p>
            )}
            <button
              onClick={handleChangePassword}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ background: 'var(--info)', color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Save size={16} />
              Ubah Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
