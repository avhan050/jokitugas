'use client';

import Image from 'next/image';
import { Play, ChevronRight, Code, Calculator, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Decorative glow blurs */}
      <div className="glow-blur animate-pulse-glow" style={{ top: '-100px', left: '-200px' }} />
      <div className="glow-blur animate-pulse-glow" style={{ bottom: '-150px', right: '-150px', animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              Platform Joki Tugas #1 di Indonesia
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Tugas Menumpuk?{' '}
              <span style={{ color: 'var(--accent)' }}>Serahkan</span>{' '}
              pada Ahlinya.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg max-w-lg" style={{ color: 'var(--muted)' }}>
              Dapatkan bantuan tugas dari ribuan pengerja profesional. Transaksi aman dengan sistem escrow, hasil terjamin, dan deadline terjaga.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="font-semibold px-6 py-3 rounded-xl transition-all hover:opacity-90 text-base"
                style={{ background: 'var(--accent)', color: '#0B1120' }}
              >
                Posting Tugas Sekarang
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold px-6 py-3 rounded-xl transition-all hover:bg-white/5 text-base"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              >
                <Play className="w-4 h-4 mr-2" />
                Lihat Demo
              </Button>
            </div>

            {/* Trust Avatars */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex -space-x-3">
                <Image
                  src="https://i.pravatar.cc/80?img=12"
                  alt="User avatar"
                  width={36}
                  height={36}
                  unoptimized
                  className="rounded-full border-2"
                  style={{ borderColor: 'var(--bg)' }}
                />
                <Image
                  src="https://i.pravatar.cc/80?img=33"
                  alt="User avatar"
                  width={36}
                  height={36}
                  unoptimized
                  className="rounded-full border-2"
                  style={{ borderColor: 'var(--bg)' }}
                />
                <Image
                  src="https://i.pravatar.cc/80?img=59"
                  alt="User avatar"
                  width={36}
                  height={36}
                  unoptimized
                  className="rounded-full border-2"
                  style={{ borderColor: 'var(--bg)' }}
                />
                <div
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
                  style={{ borderColor: 'var(--bg)', background: 'var(--accent)', color: '#0B1120' }}
                >
                  +2k
                </div>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>Dipercaya 2,000+ mahasiswa</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>dari seluruh Indonesia</p>
              </div>
            </div>
          </div>

          {/* Right Side - Floating Dashboard Card (hidden on mobile) */}
          <div className="hidden lg:block relative">
            <div className="animate-float">
              <div
                className="rounded-2xl p-6 shadow-2xl max-w-md ml-auto"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.4)'
                }}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Total Pendapatan</p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--fg)', fontFamily: 'var(--font-space-grotesk)' }}>
                      Rp 4.250.000
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-dim)' }}>
                    <TrendingUp className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  </div>
                </div>

                {/* Task Items */}
                <div className="flex flex-col gap-3">
                  {/* Task 1 */}
                  <div
                    className="rounded-xl p-3.5 flex items-center justify-between"
                    style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.12)' }}>
                        <Code className="w-4 h-4" style={{ color: '#3B82F6' }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>Analisis Data Python</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>Deadline 2 hari</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Rp 350.000</span>
                  </div>

                  {/* Task 2 */}
                  <div
                    className="rounded-xl p-3.5 flex items-center justify-between"
                    style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.12)' }}>
                        <Calculator className="w-4 h-4" style={{ color: '#A855F7' }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>Kalkulus Lanjut</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>Selesai</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Rp 150.000</span>
                      <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                    </div>
                  </div>

                  {/* Task 3 */}
                  <div
                    className="rounded-xl p-3.5 flex items-center justify-between"
                    style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)' }}>
                        <TrendingUp className="w-4 h-4" style={{ color: '#F59E0B' }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>Makalah Ekonomi</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>Deadline 5 hari</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Rp 200.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
