import { create } from 'zustand';
import type { User, Task, Transaction, ToastItem, AdminSettings, PageName } from './types';
import { createSeedData } from './seed';
import { genId } from './helpers';

interface AppState {
  // Session
  currentUser: User | null;
  currentPage: PageName;

  // Data
  users: User[];
  tasks: Task[];
  transactions: Transaction[];
  adminSettings: AdminSettings;

  // UI
  mobileSidebarOpen: boolean;
  modalOpen: boolean;
  modalContent: React.ReactNode;
  toasts: ToastItem[];

  // Actions - Session
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, role: 'client' | 'worker') => boolean;
  logout: () => void;
  setPage: (page: PageName) => void;

  // Actions - UI
  setMobileSidebarOpen: (open: boolean) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  addToast: (message: string, type?: ToastItem['type']) => void;
  removeToast: (id: string) => void;

  // Actions - Tasks
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'completedAt' | 'clientRating' | 'workerRating' | 'escrowHeld' | 'workerId' | 'status' | 'takenAt' | 'submissionNote'>) => Task | null;
  takeTask: (taskId: string, workerId: string) => boolean;
  submitWork: (taskId: string, note: string) => boolean;
  reviewWork: (taskId: string, decision: 'accept' | 'revise' | 'reject') => boolean;
  cancelTask: (taskId: string) => boolean;
  rateTask: (taskId: string, rating: number, fromRole: 'client' | 'worker') => boolean;

  // Actions - Transactions
  createTopup: (userId: string, amount: number, note: string, proofUrl?: string) => Transaction | null;
  createWithdraw: (userId: string, amount: number, bankDetails: string) => Transaction | null;
  approveTransaction: (txId: string) => boolean;
  rejectTransaction: (txId: string) => boolean;

  // Actions - Profile
  updateProfile: (name: string) => boolean;
  changePassword: (oldPass: string, newPass: string) => boolean;

  // Actions - Admin
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;

  // Internal
  _loadFromStorage: () => void;
  _saveToStorage: () => void;
  _seedIfNeeded: () => void;
}

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  currentUser: null,
  currentPage: 'dashboard',
  users: [],
  tasks: [],
  transactions: [],
  adminSettings: {
    bank_name: 'Bank BCA',
    bank_account: '1234567890',
    bank_owner: 'PT JokiTugas Indonesia',
    e_wallet: 'jokitugas@ovo.id',
  },
  mobileSidebarOpen: false,
  modalOpen: false,
  modalContent: null,
  toasts: [],

  _loadFromStorage: () => {
    const session = safeGet<string | null>('jt_session', null);
    if (session) {
      const users = safeGet<User[]>('jt_users', []);
      const user = users.find((u) => u.id === session);
      if (user) {
        set({
          currentUser: user,
          users,
          tasks: safeGet<Task[]>('jt_tasks', []),
          transactions: safeGet<Transaction[]>('jt_transactions', []),
          adminSettings: safeGet<AdminSettings>('jt_adminSettings', get().adminSettings),
        });
      }
    }
  },

  _seedIfNeeded: () => {
    if (localStorage.getItem('jt_seeded')) return;
    const seed = createSeedData();
    set({
      users: seed.users,
      tasks: seed.tasks,
      transactions: seed.transactions,
      adminSettings: seed.adminSettings,
    });
    localStorage.setItem('jt_seeded', 'true');
    get()._saveToStorage();
  },

  _saveToStorage: () => {
    const { users, tasks, transactions, adminSettings, currentUser } = get();
    safeSet('jt_users', users);
    safeSet('jt_tasks', tasks);
    safeSet('jt_transactions', transactions);
    safeSet('jt_adminSettings', adminSettings);
    if (currentUser) {
      localStorage.setItem('jt_session', currentUser.id);
    } else {
      localStorage.removeItem('jt_session');
    }
  },

  login: (email, password) => {
    const { users } = get();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return false;
    set({ currentUser: user, currentPage: 'dashboard' });
    get()._saveToStorage();
    return true;
  },

  register: (name, email, password, role) => {
    const { users } = get();
    if (users.find((u) => u.email === email)) return false;
    const newUser: User = {
      id: genId(),
      name,
      email,
      password,
      role,
      balance: 0,
      rating: 0,
      completedJobs: 0,
      createdAt: new Date().toISOString(),
    };
    set({ users: [...users, newUser], currentUser: newUser, currentPage: 'dashboard' });
    get()._saveToStorage();
    return true;
  },

  logout: () => {
    set({ currentUser: null, currentPage: 'dashboard', mobileSidebarOpen: false });
    localStorage.removeItem('jt_session');
  },

  setPage: (page) => set({ currentPage: page, mobileSidebarOpen: false }),

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

  createTask: (taskData) => {
    const { currentUser, users, tasks } = get();
    if (!currentUser || currentUser.balance < taskData.budget * 1.05) return null;

    const totalFee = Math.ceil(taskData.budget * 1.05);
    const taskId = genId();
    const now = new Date().toISOString();

    const task: Task = {
      ...taskData,
      id: taskId,
      status: 'open',
      workerId: null,
      createdAt: now,
      completedAt: null,
      clientRating: null,
      workerRating: null,
      escrowHeld: false,
      takenAt: undefined,
      submissionNote: undefined,
    };

    const tx: Transaction = {
      id: genId(),
      userId: currentUser.id,
      type: 'fee',
      amount: -Math.ceil(taskData.budget * 0.05),
      taskId,
      createdAt: now,
      desc: `Biaya layanan 5%: ${taskData.title}`,
      status: 'approved',
    };

    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? { ...u, balance: u.balance - totalFee } : u
    );

    set({
      tasks: [...tasks, task],
      transactions: [...get().transactions, tx],
      users: updatedUsers,
      currentUser: { ...currentUser, balance: currentUser.balance - totalFee },
    });

    get()._saveToStorage();
    get().addToast('Tugas berhasil diposting!', 'success');
    return task;
  },

  takeTask: (taskId, workerId) => {
    const { tasks, users, transactions } = get();
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status !== 'open') return false;

    const worker = users.find((u) => u.id === workerId);
    if (!worker) return false;

    const client = users.find((u) => u.id === task.clientId);
    if (!client || client.balance < task.budget) return false;

    const now = new Date().toISOString();

    const escrowTx: Transaction = {
      id: genId(),
      userId: task.clientId,
      type: 'escrow',
      amount: -task.budget,
      taskId,
      createdAt: now,
      desc: `Escrow: ${task.title}`,
      status: 'approved',
    };

    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? { ...t, status: 'in_progress' as const, workerId, escrowHeld: true, takenAt: now }
        : t
    );

    const updatedUsers = users.map((u) => {
      if (u.id === task.clientId) return { ...u, balance: u.balance - task.budget };
      return u;
    });

    set({
      tasks: updatedTasks,
      transactions: [...transactions, escrowTx],
      users: updatedUsers,
      currentUser: updatedUsers.find((u) => u.id === get().currentUser?.id) || get().currentUser,
    });

    get()._saveToStorage();
    get().addToast('Tugas berhasil diambil!', 'success');
    return true;
  },

  submitWork: (taskId, note) => {
    const { tasks } = get();
    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? { ...t, status: 'under_review' as const, submissionNote: note }
        : t
    );
    set({ tasks: updatedTasks });
    get()._saveToStorage();
    get().addToast('Hasil kerja berhasil dikirim!', 'success');
    return true;
  },

  reviewWork: (taskId, decision) => {
    const { tasks, users, transactions } = get();
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status !== 'under_review' || !task.workerId) return false;

    const now = new Date().toISOString();

    if (decision === 'accept') {
      const earning = Math.floor(task.budget * 0.95);
      const fee = Math.ceil(task.budget * 0.05);

      const earningTx: Transaction = {
        id: genId(),
        userId: task.workerId,
        type: 'earning',
        amount: earning,
        taskId,
        createdAt: now,
        desc: `Pendapatan: ${task.title}`,
        status: 'approved',
      };

      const feeTx: Transaction = {
        id: genId(),
        userId: task.workerId,
        type: 'fee',
        amount: -fee,
        taskId,
        createdAt: now,
        desc: `Biaya layanan: ${task.title}`,
        status: 'approved',
      };

      const updatedTasks = tasks.map((t) =>
        t.id === taskId
          ? { ...t, status: 'completed' as const, completedAt: now, escrowHeld: false }
          : t
      );

      const updatedUsers = users.map((u) => {
        if (u.id === task.workerId) return { ...u, balance: u.balance + earning, completedJobs: u.completedJobs + 1 };
        return u;
      });

      set({
        tasks: updatedTasks,
        transactions: [...transactions, earningTx, feeTx],
        users: updatedUsers,
        currentUser: updatedUsers.find((u) => u.id === get().currentUser?.id) || get().currentUser,
      });

      get().addToast('Hasil kerja diterima! Pembayaran telah diproses.', 'success');
    } else if (decision === 'revise') {
      const updatedTasks = tasks.map((t) =>
        t.id === taskId
          ? { ...t, status: 'in_progress' as const, submissionNote: undefined }
          : t
      );
      set({ tasks: updatedTasks });
      get().addToast('Tugas dikembalikan untuk direvisi.', 'info');
    } else {
      // reject
      const refundTx: Transaction = {
        id: genId(),
        userId: task.clientId,
        type: 'refund',
        amount: task.budget,
        taskId,
        createdAt: now,
        desc: `Refund: ${task.title}`,
        status: 'approved',
      };

      const updatedTasks = tasks.map((t) =>
        t.id === taskId
          ? { ...t, status: 'cancelled' as const, completedAt: now, escrowHeld: false }
          : t
      );

      const updatedUsers = users.map((u) => {
        if (u.id === task.clientId) return { ...u, balance: u.balance + task.budget };
        return u;
      });

      set({
        tasks: updatedTasks,
        transactions: [...transactions, refundTx],
        users: updatedUsers,
        currentUser: updatedUsers.find((u) => u.id === get().currentUser?.id) || get().currentUser,
      });

      get().addToast('Tugas ditolak. Dana dikembalikan ke client.', 'warning');
    }

    get()._saveToStorage();
    return true;
  },

  cancelTask: (taskId) => {
    const { tasks, users, transactions } = get();
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return false;

    const now = new Date().toISOString();
    let updatedTransactions = [...transactions];
    let updatedUsers = [...users];

    // Refund escrow if held
    if (task.escrowHeld) {
      const refundTx: Transaction = {
        id: genId(),
        userId: task.clientId,
        type: 'refund',
        amount: task.budget,
        taskId,
        createdAt: now,
        desc: `Refund pembatalan: ${task.title}`,
        status: 'approved',
      };
      updatedTransactions = [...updatedTransactions, refundTx];
      updatedUsers = updatedUsers.map((u) =>
        u.id === task.clientId ? { ...u, balance: u.balance + task.budget } : u
      );
    }

    // Refund service fee if task was just posted (no worker yet)
    if (task.status === 'open') {
      const feeRefund = Math.ceil(task.budget * 0.05);
      const feeRefundTx: Transaction = {
        id: genId(),
        userId: task.clientId,
        type: 'refund',
        amount: feeRefund,
        taskId,
        createdAt: now,
        desc: `Refund biaya layasan: ${task.title}`,
        status: 'approved',
      };
      updatedTransactions = [...updatedTransactions, feeRefundTx];
      updatedUsers = updatedUsers.map((u) =>
        u.id === task.clientId ? { ...u, balance: u.balance + feeRefund } : u
      );
    }

    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? { ...t, status: 'cancelled' as const, completedAt: now, escrowHeld: false }
        : t
    );

    set({
      tasks: updatedTasks,
      transactions: updatedTransactions,
      users: updatedUsers,
      currentUser: updatedUsers.find((u) => u.id === get().currentUser?.id) || get().currentUser,
    });

    get()._saveToStorage();
    get().addToast('Tugas berhasil dibatalkan.', 'info');
    return true;
  },

  rateTask: (taskId, rating, fromRole) => {
    const { tasks } = get();
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        if (fromRole === 'client') return { ...t, clientRating: rating };
        return { ...t, workerRating: rating };
      }
      return t;
    });
    set({ tasks: updatedTasks });
    get()._saveToStorage();
    get().addToast('Rating berhasil diberikan!', 'success');
    return true;
  },

  createTopup: (userId, amount, note, proofUrl) => {
    const tx: Transaction = {
      id: genId(),
      userId,
      type: 'topup',
      amount,
      taskId: null,
      createdAt: new Date().toISOString(),
      desc: `Top up saldo - ${note}`,
      status: 'pending',
      note,
      proofUrl,
    };
    set((s) => ({ transactions: [...s.transactions, tx] }));
    get()._saveToStorage();
    get().addToast('Permintaan top up berhasil diajukan. Menunggu verifikasi admin.', 'info');
    return tx;
  },

  createWithdraw: (userId, amount, bankDetails) => {
    const { users, transactions } = get();
    const user = users.find((u) => u.id === userId);
    if (!user || user.balance < amount) return null;

    const tx: Transaction = {
      id: genId(),
      userId,
      type: 'withdraw',
      amount: -amount,
      taskId: null,
      createdAt: new Date().toISOString(),
      desc: `Tarik saldo - ${bankDetails}`,
      status: 'pending',
      bankDetails,
    };

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, balance: u.balance - amount } : u
    );

    set({
      transactions: [...transactions, tx],
      users: updatedUsers,
      currentUser: updatedUsers.find((u) => u.id === get().currentUser?.id) || get().currentUser,
    });

    get()._saveToStorage();
    get().addToast('Permintaan tarik saldo berhasil diajukan. Menunggu verifikasi admin.', 'info');
    return tx;
  },

  approveTransaction: (txId) => {
    const { transactions, users } = get();
    const tx = transactions.find((t) => t.id === txId);
    if (!tx) return false;

    let updatedUsers = [...users];

    if (tx.type === 'topup' && tx.status === 'pending') {
      updatedUsers = users.map((u) =>
        u.id === tx.userId ? { ...u, balance: u.balance + tx.amount } : u
      );
    }
    // withdraw already deducted, just approve

    const updatedTx = transactions.map((t) =>
      t.id === txId ? { ...t, status: 'approved' as const } : t
    );

    set({
      transactions: updatedTx,
      users: updatedUsers,
      currentUser: updatedUsers.find((u) => u.id === get().currentUser?.id) || get().currentUser,
    });

    get()._saveToStorage();
    get().addToast('Transaksi disetujui.', 'success');
    return true;
  },

  rejectTransaction: (txId) => {
    const { transactions, users } = get();
    const tx = transactions.find((t) => t.id === txId);
    if (!tx) return false;

    let updatedUsers = [...users];

    if (tx.type === 'withdraw' && tx.status === 'pending') {
      // Return balance
      updatedUsers = users.map((u) =>
        u.id === tx.userId ? { ...u, balance: u.balance + Math.abs(tx.amount) } : u
      );
    }

    const updatedTx = transactions.map((t) =>
      t.id === txId ? { ...t, status: 'rejected' as const } : t
    );

    set({
      transactions: updatedTx,
      users: updatedUsers,
      currentUser: updatedUsers.find((u) => u.id === get().currentUser?.id) || get().currentUser,
    });

    get()._saveToStorage();
    get().addToast('Transaksi ditolak.', 'warning');
    return true;
  },

  updateProfile: (name) => {
    const { currentUser, users } = get();
    if (!currentUser) return false;

    const updatedUser = { ...currentUser, name };
    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));

    set({ currentUser: updatedUser, users: updatedUsers });
    get()._saveToStorage();
    get().addToast('Profil berhasil diperbarui!', 'success');
    return true;
  },

  changePassword: (oldPass, newPass) => {
    const { currentUser, users } = get();
    if (!currentUser || currentUser.password !== oldPass) return false;

    const updatedUser = { ...currentUser, password: newPass };
    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));

    set({ currentUser: updatedUser, users: updatedUsers });
    get()._saveToStorage();
    get().addToast('Password berhasil diubah!', 'success');
    return true;
  },

  updateAdminSettings: (settings) => {
    const { adminSettings } = get();
    const updated = { ...adminSettings, ...settings };
    set({ adminSettings: updated });
    get()._saveToStorage();
    get().addToast('Pengaturan admin diperbarui!', 'success');
  },
}));
