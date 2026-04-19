'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import AuthPage from '@/components/app/AuthPage';
import AppLayout from '@/components/app/AppLayout';
import Modal from '@/components/app/Modal';
import ToastContainer from '@/components/app/Toast';

export default function Home() {
  const { currentUser, _seedIfNeeded, _loadFromStorage } = useAppStore();

  useEffect(() => {
    _seedIfNeeded();
    _loadFromStorage();
  }, [_seedIfNeeded, _loadFromStorage]);

  return (
    <div className="min-h-screen" style={{ background: '#0B1120' }}>
      {currentUser ? <AppLayout /> : <AuthPage />}
      <Modal />
      <ToastContainer />
    </div>
  );
}
