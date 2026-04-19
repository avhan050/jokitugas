'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Star } from 'lucide-react';

export default function RatingModal({ taskId, fromRole }: { taskId: string; fromRole: 'client' | 'worker' }) {
  const { tasks, rateTask, closeModal } = useAppStore();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const task = tasks.find((t) => t.id === taskId);
  const targetUser = fromRole === 'client'
    ? task?.workerId
    : task?.clientId;

  const handleSubmit = () => {
    if (rating === 0) return;
    rateTask(taskId, rating, fromRole);
    closeModal();
  };

  return (
    <div className="space-y-5 text-center">
      <div>
        <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Beri Rating
        </h3>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          {task?.title}
        </p>
      </div>

      <div className="flex justify-center gap-2 py-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={36}
            className="star"
            style={{
              color: star <= (hoverRating || rating) ? 'var(--gold)' : 'var(--border)',
              fill: star <= (hoverRating || rating) ? 'var(--gold)' : 'transparent',
            }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ))}
      </div>

      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
        {rating === 0 ? 'Klik bintang untuk memberi rating' :
         rating === 1 ? 'Buruk' :
         rating === 2 ? 'Kurang Baik' :
         rating === 3 ? 'Biasa' :
         rating === 4 ? 'Bagus' :
         'Sangat Bagus!'}
      </p>

      <div className="flex gap-3">
        <button
          onClick={closeModal}
          className="flex-1 py-3 rounded-xl text-sm font-bold"
          style={{ background: 'var(--bg)', color: 'var(--muted-foreground)', border: '1px solid var(--border)' }}
        >
          Nanti
        </button>
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
          style={{
            background: rating > 0 ? 'var(--gold)' : 'var(--border)',
            color: rating > 0 ? '#0B1120' : 'var(--muted-foreground)',
          }}
        >
          Kirim Rating
        </button>
      </div>
    </div>
  );
}
