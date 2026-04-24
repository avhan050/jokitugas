'use client';

import { createElement } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDateShort, statusLabel, statusBadgeClass, categoryIcon } from '@/lib/helpers';
import { PlusCircle, Inbox } from 'lucide-react';
import type { Task } from '@/lib/types';
import TaskDetailModal from './TaskDetailModal';

const filters = [
  { key: 'all', label: 'Semua' },
  { key: 'open', label: 'Terbuka' },
  { key: 'active', label: 'Aktif' },
  { key: 'under_review', label: 'Ditinjau' },
  { key: 'dispute', label: 'Sengketa' },
  { key: 'completed', label: 'Selesai' },
];

export default function MyTasksPage() {
  const { currentUser, tasks, setPage, openModal, pageState } = useAppStore();
  const filter = pageState.myTasksFilter ?? 'all';

  if (!currentUser) return null;

  const myTasks = tasks.filter((t) => t.clientId === currentUser.id);
  const filteredTasks = filter === 'all'
    ? myTasks
    : filter === 'active'
      ? myTasks.filter((t) => t.status === 'in_progress' || t.status === 'under_review' || t.status === 'dispute')
      : myTasks.filter((t) => t.status === filter);
  const sortedTasks = [...filteredTasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Tugas Saya
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Kelola semua tugas yang Anda posting
          </p>
        </div>
        <button
          onClick={() => setPage('posttask')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{ background: 'var(--accent)', color: '#0B1120' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <PlusCircle size={18} />
          Posting Tugas
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setPage('mytasks', { ...pageState, myTasksFilter: f.key as typeof filter })}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: filter === f.key ? 'var(--accent-dim)' : 'var(--card)',
              color: filter === f.key ? 'var(--accent)' : 'var(--muted-foreground)',
              border: filter === f.key ? '1px solid var(--accent)' : '1px solid var(--border)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tasks list */}
      <div className="space-y-3">
        {sortedTasks.length === 0 && (
          <div className="stat-card text-center py-12">
              <Inbox size={48} className="mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
              <p className="font-semibold text-lg" style={{ color: 'var(--muted-foreground)' }}>
              {filter === 'all' ? 'Belum ada tugas' : filter === 'active' ? 'Tidak ada tugas aktif' : `Tidak ada tugas ${statusLabel(filter).toLowerCase()}`}
              </p>
            {filter === 'all' && (
              <button
                onClick={() => setPage('posttask')}
                className="mt-3 text-sm font-semibold"
                style={{ color: 'var(--accent)' }}
              >
                Posting tugas pertama →
              </button>
            )}
          </div>
        )}
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => openModal(<TaskDetailModal taskId={task.id} />)}
          />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const catIconEl = categoryIcon(task.category);
  return (
    <div className="task-card" onClick={onClick}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--info-dim)' }}
          >
            {createElement(catIconEl, { size: 18, style: { color: 'var(--info)' } })}
          </div>
          <div>
            <p className="font-semibold">{task.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="cat-badge">{task.category}</span>
              <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                {formatDateShort(task.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <span className={`badge ${statusBadgeClass(task.status)}`}>
          {statusLabel(task.status)}
        </span>
      </div>

      {/* Progress steps */}
      {task.status !== 'cancelled' && (
        <div className="flex items-center gap-0 mt-4 px-1">
          {(['open', 'in_progress', 'under_review', 'dispute', 'completed'] as const).map((step, i, allSteps) => {
            const statusOrder = ['open', 'in_progress', 'under_review', 'dispute', 'completed'];
            const currentIdx = statusOrder.indexOf(task.status);
            const stepIdx = i;
            const isDone = stepIdx < currentIdx;
            const isCurrent = stepIdx === currentIdx;

            return (
              <div key={step} className="flex items-center flex-1">
                <div className={`step-dot ${isDone ? 'done' : ''} ${isCurrent ? 'active' : ''}`}>
                  {isDone ? '✓' : i + 1}
                </div>
                {i < allSteps.length - 1 && (
                  <div className={`step-line ${stepIdx < currentIdx ? 'filled' : ''}`} />
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Deadline:</span>
          <span className="text-xs font-semibold">{formatDateShort(task.deadline)}</span>
        </div>
        <span className="text-lg font-bold">{formatRupiah(task.budget)}</span>
      </div>
    </div>
  );
}
