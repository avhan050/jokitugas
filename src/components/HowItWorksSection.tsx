'use client';

import { ClipboardList, UserCheck, CheckCircle2, ArrowRight, User, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Posting Tugas',
    description: 'Unggah detail tugas, deadline, dan budget. Kami akan mencarikan joki terbaik untuk Anda.',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Pilih Joki Terbaik',
    description: 'Bandingkan profil, rating, dan penawaran dari joki-joki terverifikasi kami.',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Review & Selesai',
    description: 'Terima hasil kerja, ajukan revisi jika diperlukan, dan rilis pembayaran.',
  },
];

export default function HowItWorksSection() {
  const { setShowAuth } = useAppStore();

  return (
    <section id="cara-kerja" className="py-20" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Steps */}
          <div>
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>
              Cara Kerja
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--fg)' }}
            >
              Semudah 3 Langkah
            </h2>
            <p className="text-base mb-10" style={{ color: 'var(--muted-foreground)' }}>
              Proses yang simpel dan transparan dari awal hingga akhir.
            </p>

            <div className="flex flex-col gap-6">
              {steps.map((step, index) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'var(--accent-dim)' }}
                    >
                      <step.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className="w-px flex-1 mt-2"
                        style={{ background: 'var(--border)' }}
                      />
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>
                        LANGKAH {step.number}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-semibold mb-1.5"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--fg)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Sign Up Card */}
          <div className="lg:sticky lg:top-24">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--fg)' }}
              >
                Bergabung dengan JokiTugas
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
                Daftar gratis dan mulai selesaikan atau kerjakan tugas hari ini.
              </p>

              <div className="flex flex-col gap-3 mb-6">
                {/* Client Option */}
                <div
                  className="rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.01]"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(59,130,246,0.12)' }}
                  >
                    <User className="w-5 h-5" style={{ color: '#3B82F6' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Saya butuh bantuan tugas</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Posting tugas & temukan joki terbaik</p>
                  </div>
                  <ArrowRight className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                </div>

                {/* Worker Option */}
                <div
                  className="rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.01]"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--accent-dim)' }}
                  >
                    <Laptop className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Saya ingin jadi Joki</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Kerjakan tugas & dapatkan penghasilan</p>
                  </div>
                  <ArrowRight className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                </div>
              </div>

              <Button
                onClick={() => setShowAuth(true)}
                className="w-full font-semibold py-3 rounded-xl transition-all hover:opacity-90 text-base"
                style={{ background: 'var(--accent)', color: '#0B1120' }}
              >
                Daftar Akun Gratis
              </Button>

              <p className="text-xs text-center mt-4" style={{ color: 'var(--muted-foreground)' }}>
                Sudah punya akun?{' '}
                <button onClick={() => setShowAuth(true)} className="font-medium" style={{ color: 'var(--accent)' }}>
                  Masuk di sini
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
