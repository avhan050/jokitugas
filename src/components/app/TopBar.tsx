'use client';

import { useAppStore } from '@/lib/store';
import { Menu, Wallet, ChevronDown } from 'lucide-react';
import { formatRupiah } from '@/lib/helpers';

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  mytasks: 'Tugas Saya',
  posttask: 'Posting Tugas Baru',
  marketplace: 'Marketplace',
  mywork: 'Pekerjaan Saya',
  wallet: 'Dompet',
  transactions: 'Riwayat Transaksi',
  profile: 'Profil Saya',
  admin: 'Admin Panel',
};

export default function TopBar() {
  const { currentUser, currentPage, setMobileSidebarOpen } = useAppStore();

  if (!currentUser) return null;

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-4"
      style={{
        background: 'rgba(11, 17, 32, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMobileSidebarOpen(true)}
          style={{ color: 'var(--fg)' }}
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          {pageTitles[currentPage] || 'Dashboard'}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Wallet quick view */}
        {currentUser.role !== 'admin' && (
          <div
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <Wallet size={16} style={{ color: 'var(--accent)' }} />
            <span className="text-sm font-semibold">{formatRupiah(currentUser.balance)}</span>
          </div>
        )}

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer"
          style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
          onClick={() => useAppStore.getState().setPage('profile')}
        >
          {currentUser.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
        </div>
      </div>
    </header>
  );
}
