'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah, formatDate, formatDateShort, statusLabel, statusBadgeClass, getInitials } from '@/lib/helpers';
import { Calendar, User, Star, Clock, Shield, Send, X, MessageSquare } from 'lucide-react';
import ReviewWorkModal from './ReviewWorkModal';
import SubmitWorkModal from './SubmitWorkModal';
import RatingModal from './RatingModal';
import TakeTaskModal from './TakeTaskModal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

const MIME_EXTENSION_MAP: Record<string, string> = {
  'application/msword': 'doc',
  'application/pdf': 'pdf',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/zip': 'zip',
  'image/gif': 'gif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'text/csv': 'csv',
  'text/plain': 'txt',
};

function sanitizeFileName(name: string) {
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '-').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function getFileExtension(submissionUrl: string) {
  if (submissionUrl.startsWith('data:')) {
    const mime = submissionUrl.slice(5, submissionUrl.indexOf(';'));
    return MIME_EXTENSION_MAP[mime] || 'bin';
  }

  try {
    const pathname = new URL(submissionUrl, window.location.origin).pathname;
    const lastSegment = pathname.split('/').pop() || '';
    const extension = lastSegment.split('.').pop();
    return extension && extension !== lastSegment ? extension : 'bin';
  } catch {
    return 'bin';
  }
}

function buildDownloadName(taskTitle: string, submissionUrl: string) {
  const baseName = sanitizeFileName(taskTitle) || 'hasil-joki';
  const extension = getFileExtension(submissionUrl);
  return `${baseName}.${extension}`;
}

export default function TaskDetailModal({ taskId }: { taskId: string }) {
  const { tasks, users, currentUser, closeModal, openModal, cancelTask, taskMessages, sendTaskMessage } = useAppStore();
  const [messageDraft, setMessageDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const task = tasks.find((t) => t.id === taskId);
  const client = task ? users.find((u) => u.id === task.clientId) : null;
  const worker = task?.workerId ? users.find((u) => u.id === task.workerId) : null;
  const isClient = Boolean(task && currentUser && currentUser.id === task.clientId);
  const isWorker = Boolean(task && currentUser && currentUser.id === task.workerId);
  const canChat = Boolean(task?.workerId) && (isClient || isWorker);
  const messages = task ? taskMessages.filter((message) => message.taskId === task.id) : [];

  const statusSteps = ['open', 'in_progress', 'under_review', 'dispute', 'completed'] as const;
  const statusOrder = ['open', 'in_progress', 'under_review', 'dispute', 'completed'];
  const currentIdx = task ? statusOrder.indexOf(task.status) : -1;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  if (!task || !currentUser) return null;

  const handleDownloadSubmission = async () => {
    if (!task.submissionUrl) return;

    const fileName = buildDownloadName(task.title, task.submissionUrl);

    try {
      const link = document.createElement('a');

      if (task.submissionUrl.startsWith('data:')) {
        const response = await fetch(task.submissionUrl);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(objectUrl);
        return;
      }

      link.href = task.submissionUrl;
      link.download = fileName;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download submission error:', error);
      useAppStore.getState().addToast('Gagal mengunduh file hasil joki.', 'error');
    }
  };

  const handleSendMessage = async () => {
    const content = messageDraft.trim();
    if (!content || isSending) return;

    setIsSending(true);
    const success = await sendTaskMessage(task.id, content);
    if (success) {
      setMessageDraft('');
    }
    setIsSending(false);
  };

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
            const labels = ['Terbuka', 'Dikerjakan', 'Ditinjau', 'Sengketa', 'Selesai'];

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
                {i < statusSteps.length - 1 && (
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
            {getInitials(worker.name)}
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

      {task.status === 'dispute' && (
        <div
          className="rounded-xl p-4 space-y-2"
          style={{ background: 'var(--danger-dim)', border: '1px solid var(--danger)' }}
        >
          <div className="flex items-center gap-2">
            <MessageSquare size={16} style={{ color: 'var(--danger)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--danger)' }}>Tugas Dalam Sengketa</span>
          </div>
          <p className="text-sm">{task.disputeReason || 'Client mengajukan sengketa dan admin sedang meninjau tugas ini.'}</p>
          {task.disputedAt && (
            <p className="text-xs" style={{ color: 'var(--danger)' }}>
              Diajukan pada {formatDate(task.disputedAt)}
            </p>
          )}
        </div>
      )}

      {canChat && (
        <div
          className="rounded-xl p-4 space-y-4"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare size={16} style={{ color: 'var(--accent)' }} />
                <span className="text-sm font-semibold">Chat Tugas</span>
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                Komunikasi langsung antara client dan pekerja untuk tugas ini.
              </p>
            </div>
            <span className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>
              {messages.length} pesan
            </span>
          </div>

          <ScrollArea
            className="h-72 rounded-xl"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <div className="space-y-3 p-3">
              {messages.length === 0 && (
                <div className="rounded-xl px-4 py-8 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Belum ada pesan. Mulai percakapan untuk koordinasi tugas ini.
                </div>
              )}

              {messages.map((message) => {
                const sender = users.find((user) => user.id === message.senderId);
                const isOwnMessage = message.senderId === currentUser.id;
                const roleLabel = message.senderId === task.clientId ? 'Client' : 'Pekerja';

                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isOwnMessage && (
                      <div
                        className="mt-1 h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                        style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
                      >
                        {getInitials(sender?.name || roleLabel)}
                      </div>
                    )}
                    <div
                      className="max-w-[85%] rounded-2xl px-4 py-3"
                      style={{
                        background: isOwnMessage ? 'var(--accent)' : 'var(--bg)',
                        color: isOwnMessage ? '#0B1120' : 'var(--foreground)',
                        border: isOwnMessage ? 'none' : '1px solid var(--border)',
                      }}
                    >
                      <div className="flex items-center gap-2 text-[11px] font-semibold mb-1" style={{ color: isOwnMessage ? '#0B1120' : 'var(--muted-foreground)' }}>
                        <span>{sender?.name || roleLabel}</span>
                        <span>•</span>
                        <span>{roleLabel}</span>
                        <span>•</span>
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                    {isOwnMessage && (
                      <div
                        className="mt-1 h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                        style={{ background: 'var(--accent)', color: '#0B1120' }}
                      >
                        {getInitials(sender?.name || currentUser.name)}
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="space-y-3">
            <Textarea
              value={messageDraft}
              onChange={(event) => setMessageDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void handleSendMessage();
                }
              }}
              placeholder="Tulis pesan untuk client / pekerja..."
              maxLength={2000}
              className="min-h-24 resize-none"
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                Enter untuk kirim, Shift+Enter untuk baris baru.
              </span>
              <button
                type="button"
                onClick={() => void handleSendMessage()}
                disabled={isSending || !messageDraft.trim()}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all disabled:cursor-not-allowed disabled:opacity-50"
                style={{ background: 'var(--accent)', color: '#0B1120' }}
              >
                <Send size={16} />
                {isSending ? 'Mengirim...' : 'Kirim'}
              </button>
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
              <button
                type="button"
                onClick={handleDownloadSubmission}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                style={{ background: 'var(--accent)', color: '#0B1120' }}
              >
                Download Hasil
              </button>
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
