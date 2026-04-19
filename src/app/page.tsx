'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import AuthPage from '@/components/app/AuthPage';
import AppLayout from '@/components/app/AppLayout';
import Modal from '@/components/app/Modal';
import ToastContainer from '@/components/app/Toast';

import LandingPage from '@/components/pages/LandingPage';

export default function Home() {
  const { currentUser, showAuth, fetchInitData } = useAppStore();

  useEffect(() => {
    fetchInitData();
  }, [fetchInitData]);

  return (
    <div className="min-h-screen" style={{ background: '#0B1120' }}>
      {currentUser ? (
        <AppLayout />
      ) : showAuth ? (
        <AuthPage />
      ) : (
        <LandingPage />
      )}
      <Modal />
      <ToastContainer />
    </div>
  );
}
