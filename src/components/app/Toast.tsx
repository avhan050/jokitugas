'use client';

import { useAppStore } from '@/lib/store';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

export default function ToastContainer() {
  const { toasts, removeToast } = useAppStore();

  return (
    <div className="toast-container">
      {toasts.map((t) => {
        const Icon = icons[t.type];
        return (
          <div
            key={t.id}
            className={`toast toast-${t.type} ${t.exiting ? 'out' : ''}`}
            onClick={() => removeToast(t.id)}
          >
            <Icon size={18} style={{ flexShrink: 0 }} />
            <span>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
