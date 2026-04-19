import {
  Zap,
  LayoutGrid,
  ClipboardList,
  Laptop,
  BookOpen,
  Palette,
  PenTool,
  Folder,
  Code,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  type LucideIcon,
} from 'lucide-react';

export function formatRupiah(n: number): string {
  return 'Rp ' + Math.abs(n).toLocaleString('id-ID');
}

export function formatDate(d: string): string {
  const date = new Date(d);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateShort(d: string): string {
  const date = new Date(d);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function categoryIcon(cat: string): LucideIcon {
  const map: Record<string, LucideIcon> = {
    'Pemrograman': Code,
    'Web Development': Laptop,
    'Desain Grafis': Palette,
    'Penulisan': PenTool,
    'Sains & Riset': FlaskConical,
    'Presentasi': LayoutGrid,
    'Matematika': Calculator,
    'Fisika': Atom,
    'Biologi': Dna,
    'Kimia': FlaskConical,
    'Lainnya': Folder,
  };
  return map[cat] || ClipboardList;
}

export function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export const CATEGORIES = [
  'Pemrograman',
  'Web Development',
  'Desain Grafis',
  'Penulisan',
  'Sains & Riset',
  'Presentasi',
  'Matematika',
  'Fisika',
  'Biologi',
  'Kimia',
  'Lainnya',
];

export function statusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    open: 'badge-open',
    in_progress: 'badge-progress',
    under_review: 'badge-review',
    completed: 'badge-done',
    cancelled: 'badge-cancelled',
    pending: 'badge-open',
    approved: 'badge-done',
    rejected: 'badge-cancelled',
  };
  return map[status] || 'badge-open';
}

export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    open: 'Terbuka',
    in_progress: 'Dikerjakan',
    under_review: 'Ditinjau',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
    pending: 'Menunggu',
    approved: 'Sukses',
    rejected: 'Ditolak',
  };
  return map[status] || status;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
