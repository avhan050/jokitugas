'use client';

import { useAppStore } from '@/lib/store';
import { X } from 'lucide-react';

export default function Modal() {
  const { modalOpen, modalContent, closeModal } = useAppStore();

  if (!modalOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1 rounded-lg transition-colors"
          style={{ color: 'var(--muted-foreground)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
        >
          <X size={20} />
        </button>
        {modalContent}
      </div>
    </div>
  );
}
