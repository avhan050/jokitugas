import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear all localStorage keys related to the app
    const keysToRemove = ['jt_seeded', 'jt_users', 'jt_tasks', 'jt_transactions', 'jt_adminSettings', 'jt_session'];
    
    // In a Next.js API route, we can't directly access localStorage
  // but we can return a response that tells the client to clear it
    return NextResponse.json({ 
      success: true, 
      message: 'Clear localStorage keys: jt_seeded, jt_users, jt_tasks, jt_transactions, jt_adminSettings, jt_session',
      keys: keysToRemove 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to clear storage' }, { status: 500 });
  }
}