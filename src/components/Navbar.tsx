'use client';

import { useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="nav-blur fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--accent)' }}
          >
            <Zap className="w-5 h-5" style={{ color: '#0B1120' }} />
          </div>
          <span className="text-lg font-semibold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            JokiTugas
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#fitur"
            className="text-sm transition-colors hover:text-white"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Fitur
          </a>
          <a
            href="#cara-kerja"
            className="text-sm transition-colors hover:text-white"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Cara Kerja
          </a>
          <a
            href="#keamanan"
            className="text-sm transition-colors hover:text-white"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Keamanan
          </a>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-medium transition-colors hover:text-white"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Masuk
          </a>
          <Button
            className="text-sm font-semibold px-5 py-2 rounded-lg transition-all hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#0B1120' }}
          >
            Mulai Sekarang
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" style={{ color: 'var(--fg)' }} />
          ) : (
            <Menu className="w-5 h-5" style={{ color: 'var(--fg)' }} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 flex flex-col gap-3"
          style={{ background: 'rgba(11, 17, 32, 0.95)', borderBottom: '1px solid var(--border)' }}
        >
          <a href="#fitur" className="text-sm py-2" style={{ color: 'var(--muted-foreground)' }} onClick={() => setMobileOpen(false)}>
            Fitur
          </a>
          <a href="#cara-kerja" className="text-sm py-2" style={{ color: 'var(--muted-foreground)' }} onClick={() => setMobileOpen(false)}>
            Cara Kerja
          </a>
          <a href="#keamanan" className="text-sm py-2" style={{ color: 'var(--muted-foreground)' }} onClick={() => setMobileOpen(false)}>
            Keamanan
          </a>
          <div className="flex flex-col gap-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
            <a href="#" className="text-sm font-medium py-2" style={{ color: 'var(--muted-foreground)' }}>
              Masuk
            </a>
            <Button
              className="text-sm font-semibold px-5 py-2 rounded-lg w-full"
              style={{ background: 'var(--accent)', color: '#0B1120' }}
            >
              Mulai Sekarang
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
