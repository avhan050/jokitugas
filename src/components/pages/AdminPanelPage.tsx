'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDate, statusLabel, statusBadgeClass } from '@/lib/helpers';
import type { User } from '@/lib/types';
import {
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Landmark,
  Settings,
  Users,
  ListChecks,
  Clock,
  Download,
  Upload,
  Database,
  Lock,
  Save,
  UserPlus,
  Pencil,
  Trash2,
} from 'lucide-react';

export default function AdminPanelPage() {
  const { transactions, users, tasks, adminSettings, approveTransaction, rejectTransaction, updateAdminSettings, addToast, openModal, closeModal, pageState, refreshData, changePassword, currentUser } = useAppStore();
  const overviewRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<HTMLDivElement>(null);
  const usersRef = useRef<HTMLDivElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

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
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userFormMode, setUserFormMode] = useState<'create' | 'edit'>('create');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState<'client' | 'worker' | 'admin'>('client');
  const [userBalance, setUserBalance] = useState('0');
  const [userPassword, setUserPassword] = useState('');
  const [userFormError, setUserFormError] = useState('');
  const [isSavingUser, setIsSavingUser] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const handleSaveSettings = () => {
    updateAdminSettings({
      bank_name: bankName,
      bank_account: bankAccount,
      bank_owner: bankOwner,
      e_wallet: eWallet,
    });
    setShowSettings(false);
  };

  const handleChangeAdminPassword = async () => {
    setPasswordError('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError('Semua field password harus diisi.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password baru minimal 6 karakter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi password baru tidak cocok.');
      return;
    }

    const success = await changePassword(oldPassword, newPassword);
    if (!success) {
      setPasswordError('Password admin saat ini salah.');
      return;
    }

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const getUserName = (userId: string) => {
    const u = users.find((u) => u.id === userId);
    return u?.name || 'Unknown';
  };

  const resetUserForm = () => {
    setUserFormMode('create');
    setEditingUserId(null);
    setUserName('');
    setUserEmail('');
    setUserRole('client');
    setUserBalance('0');
    setUserPassword('');
    setUserFormError('');
  };

  const startEditUser = (user: User) => {
    setUserFormMode('edit');
    setEditingUserId(user.id);
    setUserName(user.name);
    setUserEmail(user.email);
    setUserRole(user.role);
    setUserBalance(String(user.balance));
    setUserPassword('');
    setUserFormError('');
    usersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSaveUser = async () => {
    setUserFormError('');

    if (!userName.trim() || !userEmail.trim()) {
      setUserFormError('Nama dan email pengguna wajib diisi.');
      return;
    }

    if (userFormMode === 'create' && userPassword.trim().length < 6) {
      setUserFormError('Password pengguna baru minimal 6 karakter.');
      return;
    }

    if (userFormMode === 'edit' && userPassword.trim() && userPassword.trim().length < 6) {
      setUserFormError('Password baru minimal 6 karakter.');
      return;
    }

    try {
      setIsSavingUser(true);
      const payload = {
        name: userName.trim(),
        email: userEmail.trim(),
        role: userRole,
        balance: Number(userBalance) || 0,
        ...(userPassword.trim() ? { password: userPassword.trim() } : {}),
      };

      const res = await fetch(
        userFormMode === 'create' ? '/api/admin/users' : `/api/admin/users/${editingUserId}`,
        {
          method: userFormMode === 'create' ? 'POST' : 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setUserFormError(data.error || 'Gagal menyimpan pengguna.');
        return;
      }

      await refreshData();
      addToast(userFormMode === 'create' ? 'Pengguna baru berhasil dibuat.' : 'Data pengguna berhasil diperbarui.', 'success');
      resetUserForm();
    } catch (error) {
      console.error('Save user error:', error);
      setUserFormError('Gagal menyimpan pengguna.');
    } finally {
      setIsSavingUser(false);
    }
  };

  const handleDeleteUser = async (user: User) => {
    const confirmed = window.confirm(`Hapus pengguna ${user.name}?`);
    if (!confirmed) return;

    try {
      setDeletingUserId(user.id);
      const res = await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        addToast(data.error || 'Gagal menghapus pengguna.', 'error');
        return;
      }

      await refreshData();
      addToast('Pengguna berhasil dihapus.', 'success');
      if (editingUserId === user.id) {
        resetUserForm();
      }
    } catch (error) {
      console.error('Delete user error:', error);
      addToast('Gagal menghapus pengguna.', 'error');
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleBackupDatabase = async () => {
    try {
      setIsBackingUp(true);
      const res = await fetch('/api/admin/database/backup');

      if (!res.ok) {
        const data = await res.json();
        addToast(data.error || 'Gagal membuat backup database', 'error');
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const disposition = res.headers.get('Content-Disposition');
      const fileName = disposition?.match(/filename="(.+)"/)?.[1] || `jokitugas-backup-${new Date().toISOString().slice(0, 10)}.json`;

      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      addToast('Backup database berhasil diunduh.', 'success');
    } catch (error) {
      console.error('Backup database error:', error);
      addToast('Gagal membuat backup database.', 'error');
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleImportDatabase = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const confirmed = window.confirm(
      'Import database akan mengganti seluruh data aplikasi saat ini. Lanjutkan?'
    );

    if (!confirmed) {
      event.target.value = '';
      return;
    }

    try {
      setIsImporting(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/database/import', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        addToast(data.error || 'Gagal import database', 'error');
        return;
      }

      await refreshData();
      addToast(data.message || 'Database berhasil diimport.', 'success');
    } catch (error) {
      console.error('Import database error:', error);
      addToast('Gagal import database.', 'error');
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

  useEffect(() => {
    if (pageState.adminSection === 'pending') {
      pendingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (pageState.adminSection === 'overview') {
      overviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (pageState.adminSection === 'users') {
      usersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pageState.adminSection]);

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
      <div ref={overviewRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div
        ref={usersRef}
        className="rounded-2xl p-6 space-y-5"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--gold-dim)' }}
          >
            <UserPlus size={22} style={{ color: 'var(--gold)' }} />
          </div>
          <div>
            <h3 className="font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Kelola Pengguna
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Tambah, edit, dan hapus akun pengguna untuk memudahkan pengelolaan aplikasi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nama</label>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Role</label>
            <select value={userRole} onChange={(e) => setUserRole(e.target.value as 'client' | 'worker' | 'admin')} className="form-input">
              <option value="client">Client</option>
              <option value="worker">Joki / Pekerja</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Saldo Awal</label>
            <input type="number" value={userBalance} onChange={(e) => setUserBalance(e.target.value)} className="form-input" min="0" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              {userFormMode === 'create' ? 'Password' : 'Password Baru'}
            </label>
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder={userFormMode === 'create' ? 'Minimal 6 karakter' : 'Kosongkan jika tidak diubah'}
              className="form-input"
            />
          </div>
        </div>

        {userFormError && (
          <p className="text-sm font-medium" style={{ color: 'var(--danger)' }}>
            {userFormError}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSaveUser}
            disabled={isSavingUser}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-60"
            style={{ background: 'var(--accent)', color: '#0B1120' }}
          >
            <Save size={16} />
            {isSavingUser ? 'Menyimpan...' : userFormMode === 'create' ? 'Tambah Pengguna' : 'Simpan Perubahan'}
          </button>
          {userFormMode === 'edit' && (
            <button
              onClick={resetUserForm}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all"
              style={{ background: 'var(--bg)', color: 'var(--fg)', border: '1px solid var(--border)' }}
            >
              Batal Edit
            </button>
          )}
        </div>

        <div className="space-y-3">
          {users.length === 0 && (
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Belum ada pengguna terdaftar.
            </p>
          )}
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-xl p-4 flex flex-col lg:flex-row lg:items-center gap-4"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold">{user.name}</p>
                  <span className={`badge ${user.role === 'admin' ? 'badge-review' : user.role === 'worker' ? 'badge-progress' : 'badge-open'}`}>
                    {user.role === 'admin' ? 'Admin' : user.role === 'worker' ? 'Pekerja' : 'Client'}
                  </span>
                  {currentUser?.id === user.id && (
                    <span className="badge badge-done">Akun Anda</span>
                  )}
                </div>
                <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                  {user.email}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                  Saldo {formatRupiah(user.balance)} • Bergabung {formatDate(user.createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEditUser(user)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: 'var(--info-dim)', color: 'var(--info)' }}
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user)}
                  disabled={deletingUserId === user.id || currentUser?.id === user.id}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                  style={{ background: 'var(--danger-dim)', color: 'var(--danger)' }}
                >
                  <Trash2 size={14} />
                  {deletingUserId === user.id ? 'Menghapus...' : 'Hapus'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl p-6 space-y-4"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-dim)' }}
          >
            <Database size={22} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h3 className="font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Backup & Import Database
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Backup akan mengunduh seluruh data aplikasi dalam file JSON. Import akan mengganti semua data saat ini dengan isi file backup.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleBackupDatabase}
            disabled={isBackingUp || isImporting}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-60"
            style={{ background: 'var(--accent)', color: '#0B1120' }}
          >
            <Download size={18} />
            {isBackingUp ? 'Menyiapkan Backup...' : 'Backup Database'}
          </button>

          <input
            ref={importInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImportDatabase}
          />
          <button
            onClick={() => importInputRef.current?.click()}
            disabled={isBackingUp || isImporting}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-60"
            style={{ background: 'var(--bg)', color: 'var(--fg)', border: '1px solid var(--border)' }}
          >
            <Upload size={18} />
            {isImporting ? 'Mengimport Backup...' : 'Import Database'}
          </button>
        </div>

        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          Simpan file backup dengan aman. File ini berisi seluruh data aplikasi, termasuk akun pengguna dan transaksi.
        </p>
      </div>

      <div
        className="rounded-2xl p-6 space-y-4"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--info-dim)' }}
          >
            <Lock size={22} style={{ color: 'var(--info)' }} />
          </div>
          <div>
            <h3 className="font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Ubah Password Admin
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Gunakan fitur ini untuk mengganti password akun admin utama tanpa keluar dari panel admin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Password Saat Ini</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Password Baru</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Konfirmasi Password Baru</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              onKeyDown={(e) => e.key === 'Enter' && handleChangeAdminPassword()}
            />
          </div>
        </div>

        {passwordError && (
          <p className="text-sm font-medium" style={{ color: 'var(--danger)' }}>
            {passwordError}
          </p>
        )}

        <button
          onClick={handleChangeAdminPassword}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all"
          style={{ background: 'var(--info)', color: '#fff' }}
        >
          <Save size={16} />
          Simpan Password Admin Baru
        </button>
      </div>

      {/* Pending transactions */}
      <div ref={pendingRef}>
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
