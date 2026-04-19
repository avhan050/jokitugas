'use client';

import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDate, formatDateShort, statusLabel, statusBadgeClass, categoryIcon } from '@/lib/helpers';
import { Calendar, User, Star, Clock, Shield, Send, RotateCcw, X, MessageSquare } from 'lucide-react';
import ReviewWorkModal from './ReviewWorkModal';
import SubmitWorkModal from './SubmitWorkModal';
import RatingModal from './RatingModal';
import TakeTaskModal from './TakeTaskModal';

export default function TaskDetailModal({ taskId }: { taskId: string }) {
  const { tasks, users, currentUser, closeModal, openModal, cancelTask } = useAppStore();

  const task = tasks.find((t) => t.id === taskId);
  if (!task || !currentUser) return null;

  const client = users.find((u) => u.id === task.clientId);
  const worker = task.workerId ? users.find((u) => u.id === task.workerId) : null;
  const Icon = categoryIcon(task.category);

  const isClient = currentUser.id === task.clientId;
  const isWorker = currentUser.id === task.workerId;
  const isAdmin = currentUser.role === 'admin';

  const statusSteps = ['open', 'in_progress', 'under_review', 'completed'] as const;
  const statusOrder = ['open', 'in_progress', 'under_review', 'completed'];
  const currentIdx = statusOrder.indexOf(task.status);

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className={`badge ${statusBadgeClass(task.status)}`}>
            {statusLabel(task.status)}
          </span>
          <span className="cat-badge">{task.category}</span>
        </div>
        <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          {task.title}
        </h3>
      </div>

      {/* Progress steps */}
      {task.status !== 'cancelled' && (
        <div className="flex items-center gap-0 px-2">
          {statusSteps.map((step, i) => {
            const stepIdx = i;
            const isDone = stepIdx < currentIdx;
            const isCurrent = stepIdx === currentIdx;
            const labels = ['Terbuka', 'Dikerjakan', 'Ditinjau', 'Selesai'];

            return (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center" style={{ minWidth: 50 }}>
                  <div className={`step-dot ${isDone ? 'done' : ''} ${isCurrent ? 'active' : ''}`}>
                    {isDone ? '✓' : i + 1}
                  </div>
                  <span className="text-xs mt-1 text-center" style={{ color: isDone || isCurrent ? 'var(--accent)' : 'var(--muted-foreground)' }}>
                    {labels[i]}
                  </span>
                </div>
                {i < 3 && (
                  <div className={`step-line ${stepIdx < currentIdx ? 'filled' : ''} mt-[-12px]`} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Description */}
      <div>
        <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--muted-foreground)' }}>Deskripsi</h4>
        <p className="text-sm leading-relaxed">{task.description}</p>
      </div>

      {/* Details grid */}
      <div
        className="grid grid-cols-2 gap-3 rounded-xl p-4"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2">
          <Calendar size={16} style={{ color: 'var(--muted-foreground)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Deadline</p>
            <p className="text-sm font-semibold">{formatDateShort(task.deadline)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star size={16} style={{ color: 'var(--gold)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Budget</p>
            <p className="text-sm font-bold">{formatRupiah(task.budget)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} style={{ color: 'var(--info)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Client</p>
            <p className="text-sm font-semibold">{client?.name || '-'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} style={{ color: 'var(--muted-foreground)' }} />
          <div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Dibuat</p>
            <p className="text-sm font-semibold">{formatDateShort(task.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Worker info */}
      {worker && (
        <div
          className="flex items-center gap-3 rounded-xl p-4"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
          >
            {worker.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{worker.name}</p>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <span className="flex items-center gap-1">
                <Star size={12} style={{ color: 'var(--gold)' }} />
                {worker.rating > 0 ? worker.rating.toFixed(1) : '-'}
              </span>
              <span>•</span>
              <span>{worker.completedJobs} tugas selesai</span>
            </div>
          </div>
        </div>
      )}

      {/* Escrow */}
      {task.escrowHeld && (
        <div
          className="flex items-center gap-2 rounded-xl p-3"
          style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold)' }}
        >
          <Shield size={16} style={{ color: 'var(--gold)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--gold)' }}>
            {formatRupiah(task.budget)} dalam escrow — dilindungi
          </span>
        </div>
      )}

      {/* Submission note & file */}
      {(task.submissionNote || task.submissionUrl) && (
        <div
          className="rounded-xl p-4 space-y-3"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          {task.submissionNote && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={16} style={{ color: 'var(--accent)' }} />
                <span className="text-sm font-semibold">Catatan Pengiriman</span>
              </div>
              <p className="text-sm">{task.submissionNote}</p>
            </div>
          )}
          
          {task.submissionUrl && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={16} style={{ color: 'var(--accent)' }} />
                <span className="text-sm font-semibold">File Hasil Joki</span>
              </div>
              <a 
                href={task.submissionUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                style={{ background: 'var(--accent)', color: '#0B1120' }}
              >
                Download Hasil
              </a>
            </div>
          )}
        </div>
      )}

      {/* Ratings */}
      {(task.clientRating || task.workerRating) && (
        <div
          className="rounded-xl p-4"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Star size={16} style={{ color: 'var(--gold)' }} />
            <span className="text-sm font-semibold">Rating</span>
          </div>
          <div className="space-y-1 text-sm">
            {task.clientRating && (
              <p>Client: {'★'.repeat(task.clientRating)}{'☆'.repeat(5 - task.clientRating)}</p>
            )}
            {task.workerRating && (
              <p>Pekerja: {'★'.repeat(task.workerRating)}{'☆'.repeat(5 - task.workerRating)}</p>
            )}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="space-y-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
        {/* Worker actions */}
        {isWorker && task.status === 'open' && (
          <button
            onClick={() => { closeModal(); setTimeout(() => openModal(<TakeTaskModal taskId={task.id} />), 300); }}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all"
            style={{ background: 'var(--accent)', color: '#0B1120' }}
          >
            Ambil Tugas
          </button>
        )}
        {isWorker && task.status === 'in_progress' && (
          <button
            onClick={() => { closeModal(); setTimeout(() => openModal(<SubmitWorkModal taskId={task.id} />), 300); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
            style={{ background: 'var(--accent)', color: '#0B1120' }}
          >
            <Send size={16} /> Kirim Hasil Kerja
          </button>
        )}

        {/* Client actions */}
        {isClient && task.status === 'under_review' && (
          <button
            onClick={() => { closeModal(); setTimeout(() => openModal(<ReviewWorkModal taskId={task.id} />), 300); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
            style={{ background: 'var(--gold)', color: '#0B1120' }}
          >
            Review Hasil Kerja
          </button>
        )}
        {isClient && (task.status === 'open' || task.status === 'in_progress') && (
          <button
            onClick={() => { cancelTask(task.id); closeModal(); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
            style={{ background: 'var(--danger-dim)', color: 'var(--danger)', border: '1px solid var(--danger)' }}
          >
            <X size={16} /> Batalkan Tugas
          </button>
        )}

        {/* Rating */}
        {isClient && task.status === 'completed' && !task.clientRating && (
          <button
            onClick={() => { closeModal(); setTimeout(() => openModal(<RatingModal taskId={task.id} fromRole="client" />), 300); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
            style={{ background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid var(--gold)' }}
          >
            <Star size={16} /> Beri Rating
          </button>
        )}
        {isWorker && task.status === 'completed' && !task.workerRating && (
          <button
            onClick={() => { closeModal(); setTimeout(() => openModal(<RatingModal taskId={task.id} fromRole="worker" />), 300); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
            style={{ background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid var(--gold)' }}
          >
            <Star size={16} /> Beri Rating
          </button>
        )}
      </div>
    </div>
  );
}
