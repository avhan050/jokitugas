'use client';

import { createElement } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDate, statusLabel, statusBadgeClass, categoryIcon } from '@/lib/helpers';
import {
  TrendingUp,
  Users,
  ListChecks,
  Hourglass,
  CheckCircle,
  Wallet,
  Coins,
  ClipboardList,
  ChevronRight,
} from 'lucide-react';
import type { Task } from '@/lib/types';
import TaskDetailModal from './TaskDetailModal';

function StatCard({
  icon,
  label,
  value,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  onClick?: () => void;
}) {
  const isClickable = Boolean(onClick);

  return (
    <button
      type="button"
      className="stat-card w-full text-left transition-all"
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
      onClick={onClick}
      disabled={!isClickable}
      aria-label={isClickable ? `${label}: ${value}` : undefined}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{ background: color + '18' }}
      >
        {icon}
      </div>
      <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        {value}
      </p>
      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
        {label}
      </p>
      {isClickable && (
        <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color }}>
          Lihat detail
          <ChevronRight size={14} />
        </div>
      )}
    </button>
  );
}

function TaskRow({ task, onClick }: { task: Task; onClick: () => void }) {
  const catIconEl = categoryIcon(task.category);
  return (
    <div
      className="task-card flex items-center gap-4"
      onClick={onClick}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--info-dim)' }}
      >
        {createElement(catIconEl, { size: 18, style: { color: 'var(--info)' } })}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{task.title}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
          {formatDate(task.createdAt)}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold">{formatRupiah(task.budget)}</p>
        <span className={`badge ${statusBadgeClass(task.status)} text-xs mt-1`}>
          {statusLabel(task.status)}
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { currentUser, tasks, transactions, users, openModal, setPage } = useAppStore();

  if (!currentUser) return null;

  if (currentUser.role === 'admin') {
    const pendingTx = transactions.filter(
      (t) => t.status === 'pending' && (t.type === 'topup' || t.type === 'withdraw')
    );
    const disputedTasks = tasks.filter((t) => t.status === 'dispute');
    const totalRevenue = transactions
      .filter((t) => t.type === 'fee' && t.status === 'approved')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <StatCard
            icon={<Coins size={24} style={{ color: 'var(--accent)' }} />}
            label="Pendapatan Aplikasi"
            value={formatRupiah(totalRevenue)}
            color="var(--accent)"
            onClick={() => setPage('admin', { adminSection: 'overview' })}
          />
          <StatCard
            icon={<Users size={24} style={{ color: 'var(--info)' }} />}
            label="Total Pengguna"
            value={users.filter((u) => u.role !== 'admin').length.toString()}
            color="var(--info)"
            onClick={() => setPage('admin-users')}
          />
          <StatCard
            icon={<ListChecks size={24} style={{ color: 'var(--gold)' }} />}
            label="Total Tugas"
            value={tasks.length.toString()}
            color="var(--gold)"
            onClick={() => setPage('admin', { adminSection: 'overview' })}
          />
          <StatCard
            icon={<Hourglass size={24} style={{ color: 'var(--danger)' }} />}
            label="Menunggu Verifikasi"
            value={pendingTx.length.toString()}
            color="var(--danger)"
            onClick={() => setPage('admin', { adminSection: 'pending' })}
          />
          <StatCard
            icon={<Hourglass size={24} style={{ color: 'var(--gold)' }} />}
            label="Sengketa Tugas"
            value={disputedTasks.length.toString()}
            color="var(--gold)"
            onClick={() => setPage('admin-disputes')}
          />
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Tugas Terbaru
          </h3>
          <div className="space-y-3">
            {recentTasks.length === 0 && (
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Belum ada tugas.</p>
            )}
            {recentTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onClick={() => openModal(<TaskDetailModal taskId={task.id} />)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Client dashboard
  if (currentUser.role === 'client') {
    const myTasks = tasks.filter((t) => t.clientId === currentUser.id);
    const openCount = myTasks.filter((t) => t.status === 'open').length;
    const activeCount = myTasks.filter((t) => t.status === 'in_progress' || t.status === 'under_review' || t.status === 'dispute').length;
    const completedCount = myTasks.filter((t) => t.status === 'completed').length;
    const totalSpent = transactions
      .filter((t) => t.userId === currentUser.id && (t.type === 'escrow' || t.type === 'fee') && t.status === 'approved')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const recentTasks = [...myTasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Wallet size={24} style={{ color: 'var(--accent)' }} />}
            label="Total Pengeluaran"
            value={formatRupiah(totalSpent)}
            color="var(--accent)"
            onClick={() => setPage('transactions', { transactionsFilter: 'expense' })}
          />
          <StatCard
            icon={<ClipboardList size={24} style={{ color: 'var(--info)' }} />}
            label="Tugas Terbuka"
            value={openCount.toString()}
            color="var(--info)"
            onClick={() => setPage('mytasks', { myTasksFilter: 'open' })}
          />
          <StatCard
            icon={<TrendingUp size={24} style={{ color: 'var(--gold)' }} />}
            label="Sedang Aktif"
            value={activeCount.toString()}
            color="var(--gold)"
            onClick={() => setPage('mytasks', { myTasksFilter: 'active' })}
          />
          <StatCard
            icon={<CheckCircle size={24} style={{ color: '#00D68F' }} />}
            label="Selesai"
            value={completedCount.toString()}
            color="#00D68F"
            onClick={() => setPage('mytasks', { myTasksFilter: 'completed' })}
          />
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Tugas Terbaru
          </h3>
          <div className="space-y-3">
            {recentTasks.length === 0 && (
              <div className="stat-card text-center py-8">
                <ClipboardList size={40} className="mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
                <p className="font-semibold" style={{ color: 'var(--muted-foreground)' }}>Belum ada tugas</p>
                <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Mulai posting tugas pertama Anda!</p>
              </div>
            )}
            {recentTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onClick={() => openModal(<TaskDetailModal taskId={task.id} />)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Worker dashboard
  const myWork = tasks.filter((t) => t.workerId === currentUser.id);
  const openTasks = tasks.filter((t) => t.status === 'open');
  const activeCount = myWork.filter((t) => t.status === 'in_progress' || t.status === 'under_review' || t.status === 'dispute').length;
  const completedCount = myWork.filter((t) => t.status === 'completed').length;
  const totalEarned = transactions
    .filter((t) => t.userId === currentUser.id && t.type === 'earning' && t.status === 'approved')
    .reduce((sum, t) => sum + t.amount, 0);
  const recentWork = [...myWork].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Coins size={24} style={{ color: 'var(--accent)' }} />}
          label="Total Pendapatan Anda"
          value={formatRupiah(totalEarned)}
          color="var(--accent)"
          onClick={() => setPage('transactions', { transactionsFilter: 'income' })}
        />
        <StatCard
          icon={<ListChecks size={24} style={{ color: 'var(--info)' }} />}
          label="Tugas Tersedia"
          value={openTasks.length.toString()}
          color="var(--info)"
          onClick={() => setPage('marketplace')}
        />
        <StatCard
          icon={<TrendingUp size={24} style={{ color: 'var(--gold)' }} />}
          label="Sedang Dikerjakan"
          value={activeCount.toString()}
          color="var(--gold)"
          onClick={() => setPage('mywork', { myWorkFilter: 'active' })}
        />
        <StatCard
          icon={<CheckCircle size={24} style={{ color: '#00D68F' }} />}
          label="Selesai"
          value={completedCount.toString()}
          color="#00D68F"
          onClick={() => setPage('mywork', { myWorkFilter: 'completed' })}
        />
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Pekerjaan Terbaru
        </h3>
        <div className="space-y-3">
          {recentWork.length === 0 && (
            <div className="stat-card text-center py-8">
              <ListChecks size={40} className="mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
              <p className="font-semibold" style={{ color: 'var(--muted-foreground)' }}>Belum ada pekerjaan</p>
              <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Cari tugas di Marketplace!</p>
            </div>
          )}
          {recentWork.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onClick={() => openModal(<TaskDetailModal taskId={task.id} />)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
