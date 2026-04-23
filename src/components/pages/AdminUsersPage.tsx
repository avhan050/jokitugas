'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDate } from '@/lib/helpers';
import type { User } from '@/lib/types';
import { UserPlus, Save, Pencil, Trash2, ShieldUser, Users, Search, WalletCards } from 'lucide-react';

export default function AdminUsersPage() {
  const { users, addToast, refreshData, currentUser, emitDataUpdate } = useAppStore();
  const [userFormMode, setUserFormMode] = useState<'create' | 'edit'>('create');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState<'client' | 'worker' | 'admin'>('client');
  const [userBalance, setUserBalance] = useState('0');
  const [balanceNote, setBalanceNote] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userFormError, setUserFormError] = useState('');
  const [isSavingUser, setIsSavingUser] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase().trim();
    if (!keyword) return true;
    return (
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.role.toLowerCase().includes(keyword)
    );
  });

  const resetUserForm = () => {
    setUserFormMode('create');
    setEditingUserId(null);
    setUserName('');
    setUserEmail('');
    setUserRole('client');
    setUserBalance('0');
    setBalanceNote('');
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
    setBalanceNote('');
    setUserPassword('');
    setUserFormError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const parsedBalance = Number(userBalance);
    if (!Number.isFinite(parsedBalance) || parsedBalance < 0) {
      setUserFormError('Saldo harus berupa angka valid minimal 0.');
      return;
    }

    try {
      setIsSavingUser(true);
      const payload = {
        name: userName.trim(),
        email: userEmail.trim(),
        role: userRole,
        balance: parsedBalance,
        ...(userFormMode === 'edit' && balanceNote.trim() ? { balanceNote: balanceNote.trim() } : {}),
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
      emitDataUpdate('users', userFormMode === 'create' ? 'Admin menambahkan pengguna baru.' : 'Admin memperbarui data pengguna.');
      addToast(userFormMode === 'create' ? 'Pengguna baru berhasil dibuat.' : 'Data pengguna berhasil diperbarui.', 'success');
      resetUserForm();
    } catch (error) {
      console.error('Save user error:', error);
      setUserFormError('Gagal menyimpan pengguna.');
    } finally {
      setIsSavingUser(false);
    }
  };

  const selectedUser = editingUserId ? users.find((user) => user.id === editingUserId) : null;
  const parsedBalance = Number(userBalance);
  const balanceDelta = selectedUser && Number.isFinite(parsedBalance)
    ? parsedBalance - selectedUser.balance
    : 0;

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

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--gold-dim)' }}
            >
              <Users size={24} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Kelola Pengguna
              </h2>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Kelola akun client, pekerja, dan admin dari satu tempat.
              </p>
            </div>
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, email, atau role pengguna..."
              className="form-input"
              style={{ paddingLeft: 42 }}
            />
          </div>

          <div className="space-y-3">
            {filteredUsers.length === 0 && (
              <div
                className="rounded-xl p-8 text-center"
                style={{ background: 'var(--bg)', border: '1px dashed var(--border)' }}
              >
                <p className="font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                  Tidak ada pengguna yang cocok.
                </p>
              </div>
            )}

            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="rounded-xl p-4 transition-all"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
              >
                <div className="flex flex-col xl:flex-row xl:items-center gap-4">
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
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      <span>Saldo {formatRupiah(user.balance)}</span>
                      <span>Bergabung {formatDate(user.createdAt)}</span>
                    </div>
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
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-6 space-y-5 lg:sticky lg:top-24"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--accent-dim)' }}
            >
              <UserPlus size={24} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <h3 className="font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {userFormMode === 'create' ? 'Tambah Pengguna Baru' : 'Edit Pengguna'}
              </h3>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                {userFormMode === 'create'
                  ? 'Buat akun baru dengan role dan saldo awal yang sesuai.'
                  : 'Perbarui data pengguna yang dipilih dari daftar.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nama</label>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="form-input" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1">Role</label>
                <select value={userRole} onChange={(e) => setUserRole(e.target.value as 'client' | 'worker' | 'admin')} className="form-input">
                  <option value="client">Client</option>
                  <option value="worker">Joki / Pekerja</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Saldo</label>
                <input
                  type="number"
                  value={userBalance}
                  onChange={(e) => setUserBalance(e.target.value)}
                  className="form-input"
                  min="0"
                  step="1000"
                />
              </div>
            </div>
            {userFormMode === 'edit' && selectedUser && (
              <div
                className="rounded-xl p-4 space-y-3"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--info-dim)' }}
                  >
                    <WalletCards size={18} style={{ color: 'var(--info)' }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">Update saldo pengguna</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                      Saldo saat ini {formatRupiah(selectedUser.balance)}. Perubahan akan dicatat di riwayat transaksi pengguna.
                    </p>
                    {Number.isFinite(parsedBalance) && balanceDelta !== 0 && (
                      <p
                        className="text-xs font-semibold mt-2"
                        style={{ color: balanceDelta > 0 ? 'var(--accent)' : 'var(--danger)' }}
                      >
                        Selisih {balanceDelta > 0 ? '+' : '-'}{formatRupiah(Math.abs(balanceDelta))}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Catatan perubahan saldo</label>
                  <textarea
                    value={balanceNote}
                    onChange={(e) => setBalanceNote(e.target.value)}
                    className="form-input"
                    rows={3}
                    placeholder="Contoh: Koreksi top up manual, bonus, atau penyesuaian saldo."
                  />
                </div>
              </div>
            )}
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

          <div className="flex flex-col gap-3">
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
                <ShieldUser size={16} />
                Batal Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
