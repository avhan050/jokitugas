'use client';

import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';

export default function CTASection() {
  const { setShowAuth } = useAppStore();
  return (
    <section id="keamanan" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden px-6 py-14 sm:px-12 sm:py-20 text-center"
          style={{
            background: 'linear-gradient(135deg, #00D68F 0%, #059669 100%)',
          }}
        >
          {/* Dot pattern overlay */}
          <div className="dot-pattern absolute inset-0 opacity-30" />

          {/* Content */}
          <div className="relative z-10">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#0B1120' }}
            >
              Siap Selesaikan Tugas Anda Hari Ini?
            </h2>
            <p
              className="text-base sm:text-lg mb-8 max-w-xl mx-auto"
              style={{ color: 'rgba(11, 17, 32, 0.7)' }}
            >
              Bergabung dengan ribuan mahasiswa yang sudah merasakan kemudahan JokiTugas. Gratis untuk memulai.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={() => setShowAuth(true)}
                size="lg"
                className="font-semibold px-6 py-3 rounded-xl transition-all hover:opacity-90 text-base"
                style={{ background: '#0B1120', color: '#FFFFFF' }}
              >
                Coba Demo Sekarang
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold px-6 py-3 rounded-xl transition-all hover:bg-white/30 text-base"
                style={{ background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)', color: '#0B1120' }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Hubungi Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
