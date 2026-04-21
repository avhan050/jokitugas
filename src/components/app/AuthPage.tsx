'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Zap, Mail, Lock, User, UserCheck, HardHat, ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  const { login, register, setShowAuth } = useAppStore();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'client' | 'worker'>('client');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email dan password harus diisi');
      return;
    }
    setError('');
    const success = await login(email, password);
    if (!success) {
      setError('Email atau password salah');
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Semua data harus diisi');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    setError('');
    const result = await register(name, email, password, role);
    if (!result.success) {
      if (result.error === 'Email already exists') {
        setError('Email sudah terdaftar. Gunakan email lain.');
      } else {
        setError(result.error || 'Gagal mendaftar. Silakan coba lagi.');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (tab === 'login') handleLogin();
      else handleRegister();
    }
  };
  return (
    <div className="auth-bg min-h-screen flex items-center justify-center p-4">
      <div className="glow-orb" style={{ width: 300, height: 300, background: 'var(--accent)', top: '10%', left: '10%' }} />
      <div className="glow-orb" style={{ width: 250, height: 250, background: 'var(--info)', bottom: '10%', right: '10%' }} />

      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-8 animate-in"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        {/* Back Button */}
        <button
          onClick={() => setShowAuth(false)}
          className="flex items-center gap-1.5 text-xs font-semibold mb-6 transition-colors hover:text-white"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <ArrowLeft size={14} />
          Kembali ke Beranda
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--accent)' }}
            >
              <Zap size={22} style={{ color: '#0B1120' }} />
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              JokiTugas
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {tab === 'login' ? 'Selamat Datang!' : 'Buat Akun Baru'}
          </h2>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {tab === 'login'
              ? 'Masuk ke akun Anda untuk melanjutkan'
              : 'Daftar akun baru sebelum mulai menggunakan JokiTugas'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl p-1 mb-6" style={{ background: 'var(--bg)' }}>
          {(['login', 'register'] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); }}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: tab === t ? 'var(--accent)' : 'transparent',
                color: tab === t ? '#0B1120' : 'var(--muted-foreground)',
              }}
            >
              {t === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="space-y-4">
          {tab === 'register' && (
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                style={{ paddingLeft: 44 }}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}

          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              style={{ paddingLeft: 44 }}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              style={{ paddingLeft: 44 }}
              onKeyDown={handleKeyDown}
            />
          </div>

          {tab === 'register' && (
            <div className="flex rounded-xl p-1" style={{ background: 'var(--bg)' }}>
              {(['client', 'worker'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  style={{
                    background: role === r ? 'var(--accent-dim)' : 'transparent',
                    color: role === r ? 'var(--accent)' : 'var(--muted-foreground)',
                    border: role === r ? '1px solid var(--accent)' : '1px solid transparent',
                  }}
                >
                  {r === 'client' ? <UserCheck size={16} /> : <HardHat size={16} />}
                  {r === 'client' ? 'Client' : 'Joki (Pekerja)'}
                </button>
              ))}
            </div>
          )}

          {error && (
            <p className="text-sm font-medium" style={{ color: 'var(--danger)' }}>
              {error}
            </p>
          )}

          <button
            onClick={tab === 'login' ? handleLogin : handleRegister}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all"
            style={{
              background: 'var(--accent)',
              color: '#0B1120',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {tab === 'login' ? 'Masuk' : 'Daftar Sekarang'}
          </button>
        </div>
      </div>
    </div>
  );
}
