export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'client' | 'worker' | 'admin';
  balance: number;
  rating: number;
  completedJobs: number;
  createdAt: string;
  isAdmin?: boolean;
}

export interface Task {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string;
  deadline: string;
  budget: number;
  status: 'open' | 'in_progress' | 'under_review' | 'completed' | 'cancelled';
  workerId: string | null;
  createdAt: string;
  completedAt: string | null;
  clientRating: number | null;
  workerRating: number | null;
  escrowHeld: boolean;
  submissionNote?: string;
  submissionUrl?: string;
  takenAt?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'topup' | 'withdraw' | 'escrow' | 'earning' | 'refund' | 'fee' | 'admin_adjustment';
  amount: number;
  taskId: string | null;
  createdAt: string;
  desc: string;
  status: 'pending' | 'approved' | 'rejected';
  proofUrl?: string;
  note?: string;
  rejectionReason?: string;
  bankDetails?: string;
}

export interface AdminSettings {
  bank_name: string;
  bank_account: string;
  bank_owner: string;
  e_wallet: string;
}

export interface PublicStats {
  totalCompletedTasks: number;
  totalWorkers: number;
  totalUsers: number;
  averageRating: number;
}

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  exiting?: boolean;
}

export interface PageState {
  myTasksFilter?: 'all' | 'active' | Task['status'];
  myWorkFilter?: 'all' | 'active' | Extract<Task['status'], 'in_progress' | 'under_review' | 'completed'>;
  walletTab?: 'topup' | 'withdraw';
  transactionsFilter?: 'all' | 'income' | 'expense';
  adminSection?: 'overview' | 'pending' | 'users';
}

export type PageName =
  | 'dashboard'
  | 'mytasks'
  | 'posttask'
  | 'marketplace'
  | 'mywork'
  | 'wallet'
  | 'transactions'
  | 'profile'
  | 'admin'
  | 'admin-users';
