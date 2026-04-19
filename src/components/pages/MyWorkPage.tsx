'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDateShort, statusLabel, statusBadgeClass, categoryIcon } from '@/lib/helpers';
import { Inbox, Send } from 'lucide-react';
import type { Task } from '@/lib/types';
import TaskDetailModal from './TaskDetailModal';
import SubmitWorkModal from './SubmitWorkModal';

const filters = [
  { key: 'all', label: 'Semua' },
  { key: 'in_progress', label: 'Berjalan' },
  { key: 'under_review', label: 'Ditinjau' },
  { key: 'completed', label: 'Selesai' },
];

export default function MyWorkPage() {
  const { currentUser, tasks, openModal } = useAppStore();
  const [filter, setFilter] = useState('all');

  if (!currentUser) return null;

  const myWork = tasks.filter((t) => t.workerId === currentUser.id);
  const filtered = filter === 'all' ? myWork : myWork.filter((t) => t.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Pekerjaan Saya
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          {myWork.length} pekerjaan total
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
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

      {/* Work list */}
      <div className="space-y-3">
        {sorted.length === 0 && (
          <div className="stat-card text-center py-12">
            <Inbox size={48} className="mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
            <p className="font-semibold text-lg" style={{ color: 'var(--muted-foreground)' }}>
              {filter === 'all' ? 'Belum ada pekerjaan' : `Tidak ada pekerjaan ${statusLabel(filter).toLowerCase()}`}
            </p>
          </div>
        )}
        {sorted.map((task) => (
          <div
            key={task.id}
            className="task-card"
            onClick={() => openModal(<TaskDetailModal taskId={task.id} />)}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--info-dim)' }}
                >
                  {(() => {
                    const Icon = categoryIcon(task.category);
                    return <Icon size={18} style={{ color: 'var(--info)' }} />;
                  })()}
                </div>
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="cat-badge">{task.category}</span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      Deadline: {formatDateShort(task.deadline)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-lg font-bold">{formatRupiah(task.budget)}</span>
                <div className="mt-1">
                  <span className={`badge ${statusBadgeClass(task.status)}`}>
                    {statusLabel(task.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress steps */}
            {task.status !== 'cancelled' && (
              <div className="flex items-center gap-0 mt-2 px-1">
                {(['open', 'in_progress', 'under_review', 'completed'] as const).map((step, i) => {
                  const statusOrder = ['open', 'in_progress', 'under_review', 'completed'];
                  const currentIdx = statusOrder.indexOf(task.status);
                  const stepIdx = i;
                  const isDone = stepIdx < currentIdx;
                  const isCurrent = stepIdx === currentIdx;

                  return (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`step-dot ${isDone ? 'done' : ''} ${isCurrent ? 'active' : ''}`}>
                        {isDone ? '✓' : i + 1}
                      </div>
                      {i < 3 && (
                        <div className={`step-line ${stepIdx < currentIdx ? 'filled' : ''}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Action buttons */}
            {task.status === 'in_progress' && (
              <button
                className="w-full mt-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                style={{ background: 'var(--accent)', color: '#0B1120' }}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(<SubmitWorkModal taskId={task.id} />);
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <Send size={16} />
                Kirim Hasil Kerja
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
