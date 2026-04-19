'use client';

import { createElement, useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDateShort, CATEGORIES, categoryIcon, statusBadgeClass, statusLabel } from '@/lib/helpers';
import { Search, Filter, ClipboardList } from 'lucide-react';
import TaskDetailModal from './TaskDetailModal';
import TakeTaskModal from './TakeTaskModal';

type SortOption = 'newest' | 'budget_high' | 'budget_low' | 'deadline';

export default function MarketplacePage() {
  const { currentUser, tasks, openModal } = useAppStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortOption>('newest');

  const openTasks = useMemo(() => {
    if (!currentUser) return [];
    let result = tasks.filter((t) => t.status === 'open');

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (category !== 'all') {
      result = result.filter((t) => t.category === category);
    }

    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'budget_high':
        result.sort((a, b) => b.budget - a.budget);
        break;
      case 'budget_low':
        result.sort((a, b) => a.budget - b.budget);
        break;
      case 'deadline':
        result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        break;
    }

    return result;
  }, [tasks, search, category, sort, currentUser]);

  const isWorker = currentUser?.role === 'worker';

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Marketplace
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          {openTasks.length} tugas tersedia
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari tugas..."
            className="form-input"
            style={{ paddingLeft: 44 }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input text-sm"
              style={{ paddingLeft: 40 }}
            >
              <option value="all" style={{ background: '#162032' }}>Semua Kategori</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} style={{ background: '#162032' }}>{cat}</option>
              ))}
            </select>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="form-input text-sm sm:w-48"
          >
            <option value="newest" style={{ background: '#162032' }}>Terbaru</option>
            <option value="budget_high" style={{ background: '#162032' }}>Budget Tertinggi</option>
            <option value="budget_low" style={{ background: '#162032' }}>Budget Terendah</option>
            <option value="deadline" style={{ background: '#162032' }}>Deadline Terdekat</option>
          </select>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {openTasks.length === 0 && (
          <div className="stat-card text-center py-12">
            <ClipboardList size={48} className="mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
            <p className="font-semibold text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Tidak ada tugas tersedia
            </p>
          </div>
        )}
        {openTasks.map((task) => (
          <div key={task.id} className="task-card" onClick={() => openModal(<TaskDetailModal taskId={task.id} />)}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--info-dim)' }}
                >
                  {createElement(categoryIcon(task.category), { size: 18, style: { color: 'var(--info)' } })}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="cat-badge">{task.category}</span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      Deadline: {formatDateShort(task.deadline)}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-lg font-bold flex-shrink-0">{formatRupiah(task.budget)}</span>
            </div>
            <p
              className="text-sm mb-3 line-clamp-2"
              style={{ color: 'var(--muted-foreground)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {task.description}
            </p>
            {isWorker && (
              <button
                className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ background: 'var(--accent)', color: '#0B1120' }}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(<TakeTaskModal taskId={task.id} />);
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Ambil Tugas
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
