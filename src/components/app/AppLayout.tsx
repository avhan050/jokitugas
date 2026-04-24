'use client';

import { useAppStore } from '@/lib/store';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import DashboardPage from '@/components/pages/DashboardPage';
import MyTasksPage from '@/components/pages/MyTasksPage';
import PostTaskPage from '@/components/pages/PostTaskPage';
import MarketplacePage from '@/components/pages/MarketplacePage';
import MyWorkPage from '@/components/pages/MyWorkPage';
import WalletPage from '@/components/pages/WalletPage';
import TransactionsPage from '@/components/pages/TransactionsPage';
import ProfilePage from '@/components/pages/ProfilePage';
import AdminPanelPage from '@/components/pages/AdminPanelPage';
import AdminUsersPage from '@/components/pages/AdminUsersPage';
import AdminDisputesPage from '@/components/pages/AdminDisputesPage';

const pages: Record<string, React.ComponentType> = {
  dashboard: DashboardPage,
  mytasks: MyTasksPage,
  posttask: PostTaskPage,
  marketplace: MarketplacePage,
  mywork: MyWorkPage,
  wallet: WalletPage,
  transactions: TransactionsPage,
  profile: ProfilePage,
  admin: AdminPanelPage,
  'admin-users': AdminUsersPage,
  'admin-disputes': AdminDisputesPage,
};

export default function AppLayout() {
  const { currentPage } = useAppStore();
  const PageComponent = pages[currentPage] || DashboardPage;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="main-area flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4 md:p-8">
          <div className="animate-in">
            <PageComponent />
          </div>
        </main>
      </div>
    </div>
  );
}
