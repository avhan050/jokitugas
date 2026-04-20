import React from 'react';
import { create } from 'zustand';
import type { User, Task, Transaction, ToastItem, AdminSettings, PageName, PublicStats } from './types';
import { genId } from './helpers';
import { io, Socket } from 'socket.io-client';

interface AppState {
  // Session
  currentUser: User | null;
  currentPage: PageName;
  showAuth: boolean;

  // Data
  users: User[];
  tasks: Task[];
  transactions: Transaction[];
  adminSettings: AdminSettings;
  publicStats: PublicStats;

  // UI
  mobileSidebarOpen: boolean;
  modalOpen: boolean;
  modalContent: React.ReactNode;
  toasts: ToastItem[];
  
  // Real-time
  socket: Socket | null;

  // Actions - Session
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setPage: (page: PageName) => void;
  setShowAuth: (show: boolean) => void;
  
  // Actions - Data Fetching
  fetchInitData: () => Promise<void>;
  refreshData: () => Promise<void>;

  // Actions - UI
  setMobileSidebarOpen: (open: boolean) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Actions - Tasks
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'completedAt' | 'clientRating' | 'workerRating' | 'escrowHeld' | 'workerId' | 'status' | 'takenAt' | 'submissionNote' | 'submissionUrl'>) => Promise<boolean>;
  takeTask: (taskId: string) => Promise<boolean>;
  submitWork: (taskId: string, note: string, fileUrl?: string) => Promise<boolean>;
  reviewWork: (taskId: string, action: 'accept' | 'revision' | 'reject') => Promise<boolean>;
  cancelTask: (taskId: string) => Promise<boolean>;
  rateTask: (taskId: string, rating: number, fromRole: 'client' | 'worker') => Promise<boolean>;

  // Actions - Transactions & Profile
  createTopup: (userId: string, amount: number, note: string, proofUrl?: string) => Promise<boolean>;
  createWithdraw: (userId: string, amount: number, bankDetails: string) => Promise<boolean>;
  approveTransaction: (transactionId: string) => Promise<boolean>;
  rejectTransaction: (transactionId: string) => Promise<boolean>;
  updateProfile: (name: string) => Promise<boolean>;
  changePassword: (oldPass: string, newPass: string) => Promise<boolean>;
  updateAdminSettings: (settings: AdminSettings) => Promise<boolean>;
  
  // Real-time
  initRealtime: (userId: string) => void;
  emitDataUpdate: (type: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  currentPage: 'dashboard',
  showAuth: false,
  users: [],
  tasks: [],
  transactions: [],
  adminSettings: {
    bank_name: 'Bank BCA',
    bank_account: '1234567890',
    bank_owner: 'PT JokiTugas Indonesia',
    e_wallet: 'jokitugas@ovo.id',
  },
  publicStats: {
    totalCompletedTasks: 0,
    totalWorkers: 0,
    totalUsers: 0,
    averageRating: 5.0,
  },
  mobileSidebarOpen: false,
  modalOpen: false,
  modalContent: null,
  toasts: [],
  socket: null,

  initRealtime: (userId) => {
    if (get().socket) return;

    // Detect if we're on port 3000, if so, point directly to 3003 for socket
    let socketUrl = '/?XTransformPort=3003';
    if (typeof window !== 'undefined' && (window.location.port === '3000' || !window.location.port)) {
      socketUrl = `${window.location.protocol}//${window.location.hostname}:3003`;
    }

    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      path: '/socket.io/',
    });

    newSocket.on('connect', () => {
      console.log('Real-time connected to:', socketUrl);
      newSocket.emit('join-user', userId);
    });

    newSocket.on('refresh-required', (data) => {
      console.log('Real-time refresh trigger:', data);
      get().refreshData();
      if (data.message) {
        get().addToast(data.message, 'info');
      }
    });

    set({ socket: newSocket });
  },

  emitDataUpdate: (type: string, message?: string) => {
    const socket = get().socket;
    if (socket) {
      socket.emit('data-updated', { type, message, timestamp: Date.now() });
    }
  },


  fetchInitData: async () => {
    try {
      const res = await fetch('/api/init-data');
      const data = await res.json();
      if (res.ok) {
        set({
          currentUser: data.currentUser,
          users: data.users,
          tasks: data.tasks,
          transactions: data.transactions,
          adminSettings: data.adminSettings || get().adminSettings,
          publicStats: data.publicStats || get().publicStats,
        });

        if (data.currentUser) {
          get().initRealtime(data.currentUser.id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch init data:', error);
    }
  },

  refreshData: async () => {
    await get().fetchInitData();
  },

  login: async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        set({ currentUser: data.user, currentPage: 'dashboard' });
        await get().refreshData();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  register: async (name, email, password, role) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        set({ currentUser: data.user, currentPage: 'dashboard' });
        await get().refreshData();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: 'Koneksi gagal' };
    }
  },

  logout: async () => {
    if (get().channel) {
      get().channel?.unsubscribe();
      set({ channel: null });
    }
    await fetch('/api/auth/logout', { method: 'POST' });
    set({ currentUser: null, currentPage: 'dashboard', mobileSidebarOpen: false, showAuth: false });
  },

  setPage: (page) => set({ currentPage: page, mobileSidebarOpen: false }),

  setShowAuth: (show) => set({ showAuth: show }),

  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),

  openModal: (content) => set({ modalOpen: true, modalContent: content }),
  closeModal: () => set({ modalOpen: false, modalContent: null }),

  addToast: (message, type = 'success') => {
    const id = genId();
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((s) => ({
        toasts: s.toasts.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
      }));
      setTimeout(() => {
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
      }, 300);
    }, 3200);
  },

  removeToast: (id) => {
    set((s) => ({
      toasts: s.toasts.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
    }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 300);
  },

  createTask: async (taskData) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      const data = await res.json();
      if (res.ok) {
        await get().refreshData();
        get().emitDataUpdate('tasks', 'Ada tugas baru di Marketplace!');
        get().addToast('Tugas berhasil diposting!', 'success');
        return true;
      }
      get().addToast(data.error || 'Gagal posting tugas', 'error');
      return false;
    } catch (error) {
      return false;
    }
  },

  takeTask: async (taskId) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/take`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        await get().refreshData();
        get().emitDataUpdate('tasks', 'Tugas Anda telah diambil oleh Joki.');
        get().addToast('Tugas berhasil diambil!', 'success');
        return true;
      }
      get().addToast(data.error || 'Gagal mengambil tugas', 'error');
      return false;
    } catch (error) {
      return false;
    }
  },

  submitWork: async (taskId, note, fileUrl) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note, fileUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        await get().refreshData();
        get().emitDataUpdate('tasks', 'Joki telah mengirimkan hasil kerja tugas Anda.');
        get().addToast('Hasil kerja berhasil dikirim!', 'success');
        return true;
      }
      get().addToast(data.error || 'Gagal mengirim hasil kerja', 'error');
      return false;
    } catch (error) {
      return false;
    }
  },

  reviewWork: async (taskId, action) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (res.ok) {
        await get().refreshData();
        const msgs = { accept: 'Tugas selesai!', revision: 'Revisi dikirim!', reject: 'Tugas dibatalkan & refund diproses' };
        const socketMsgs = { accept: 'Tugas Anda telah diterima oleh Client!', revision: 'Client meminta revisi untuk tugas Anda.', reject: 'Tugas dibatalkan oleh Client.' };
        get().emitDataUpdate('tasks', socketMsgs[action]);
        get().addToast(msgs[action], 'success');
        return true;
      }
      get().addToast(data.error || 'Gagal memproses review', 'error');
      return false;
    } catch (error) {
      return false;
    }
  },

  cancelTask: async (taskId) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/cancel`, { method: 'POST' });
      if (res.ok) {
        await get().refreshData();
        get().addToast('Tugas berhasil dibatalkan!', 'success');
        return true;
      }
      const data = await res.json();
      get().addToast(data.error || 'Gagal membatalkan tugas', 'error');
      return false;
    } catch (error) {
      return false;
    }
  },

  rateTask: async (taskId, rating, fromRole) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, fromRole }),
      });
      if (res.ok) {
        await get().refreshData();
        get().addToast('Terima kasih atas ratingnya!', 'success');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  createTopup: async (userId, amount, note, proofUrl) => {
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'topup', amount, desc: `Top Up Saldo: ${note}`, note, proofUrl }),
      });
      if (res.ok) {
        await get().refreshData();
        get().emitDataUpdate('transactions');
        get().addToast('Permintaan top up dikirim!', 'success');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  createWithdraw: async (userId, amount, bankDetails) => {
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'withdraw', amount: -amount, desc: `Penarikan Saldo: ${bankDetails}`, bankDetails }),
      });
      if (res.ok) {
        await get().refreshData();
        get().emitDataUpdate('transactions');
        get().addToast('Permintaan penarikan dikirim!', 'success');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  approveTransaction: async (transactionId) => {
    try {
      const res = await fetch(`/api/transactions/${transactionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });
      if (res.ok) {
        await get().refreshData();
        get().emitDataUpdate('transactions', 'Permintaan saldo telah disetujui!');
        get().addToast('Transaksi disetujui!', 'success');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  rejectTransaction: async (transactionId) => {
    try {
      const res = await fetch(`/api/transactions/${transactionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });
      if (res.ok) {
        await get().refreshData();
        get().emitDataUpdate('transactions', 'Permintaan saldo ditolak.');
        get().addToast('Transaksi ditolak', 'warning');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  updateProfile: async (name) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        await get().refreshData();
        get().addToast('Profil berhasil diperbarui!', 'success');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  changePassword: async (oldPassword, newPassword) => {
    try {
      const res = await fetch('/api/profile/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (res.ok) {
        get().addToast('Password berhasil diubah!', 'success');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  updateAdminSettings: async (settings) => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        await get().refreshData();
        get().addToast('Pengaturan diperbarui!', 'success');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

}));
