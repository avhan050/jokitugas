'use client';

import { useAppStore } from '@/lib/store';
import type { PageName } from '@/lib/types';
import {
  Zap,
  LayoutGrid,
  ClipboardList,
  PlusCircle,
  Store,
  Wallet,
  ArrowLeftRight,
  UserCircle,
  ShieldUser,
  Users,
  LogOut,
} from 'lucide-react';

interface NavItem {
  page: PageName;
  label: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  { page: 'dashboard', label: 'Dashboard', icon: <LayoutGrid size={20} />, roles: ['client', 'worker', 'admin'] },
  { page: 'mytasks', label: 'Tugas Saya', icon: <ClipboardList size={20} />, roles: ['client'] },
  { page: 'posttask', label: 'Posting Tugas', icon: <PlusCircle size={20} />, roles: ['client'] },
  { page: 'marketplace', label: 'Marketplace', icon: <Store size={20} />, roles: ['client', 'worker'] },
  { page: 'mywork', label: 'Pekerjaan Saya', icon: <ClipboardList size={20} />, roles: ['worker'] },
  { page: 'wallet', label: 'Dompet', icon: <Wallet size={20} />, roles: ['client', 'worker'] },
  { page: 'transactions', label: 'Transaksi', icon: <ArrowLeftRight size={20} />, roles: ['client', 'worker'] },
  { page: 'profile', label: 'Profil', icon: <UserCircle size={20} />, roles: ['client', 'worker', 'admin'] },
  { page: 'admin', label: 'Admin Panel', icon: <ShieldUser size={20} />, roles: ['admin'] },
  { page: 'admin-users', label: 'Kelola Pengguna', icon: <Users size={20} />, roles: ['admin'] },
];

export default function Sidebar() {
  const { currentUser, currentPage, setPage, logout, mobileSidebarOpen, setMobileSidebarOpen } = useAppStore();

  if (!currentUser) return null;

  const filteredNav = navItems.filter((item) => item.roles.includes(currentUser.role));

  return (
    <>
      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--accent)' }}
            >
              <Zap size={20} style={{ color: '#0B1120' }} />
            </div>
            <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              JokiTugas
            </span>
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
            {currentUser.role === 'admin' ? 'Administrator' : currentUser.role === 'client' ? 'Client' : 'Joki / Pekerja'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-0 pb-6">
          {filteredNav.map((item) => (
            <div
              key={item.page}
              className={`sidebar-link ${currentPage === item.page ? 'active' : ''}`}
              onClick={() => setPage(item.page)}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 mt-auto" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3 mb-3 px-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
            >
              {currentUser.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{currentUser.name}</p>
              <p className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>
                {currentUser.email}
              </p>
            </div>
          </div>
          <div
            className="sidebar-link"
            onClick={async () => {
              await logout();
            }}
            style={{ color: 'var(--danger)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--danger-dim)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <LogOut size={20} />
            <span className="text-sm">Keluar</span>
          </div>
        </div>
      </aside>
    </>
  );
}
