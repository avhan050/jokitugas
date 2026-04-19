'use client';

import { Shield, GraduationCap, Zap, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Sistem Escrow Aman',
    description:
      'Dana Anda ditahan secara aman dan baru dibayarkan setelah Anda menyetujui hasil pekerjaan. Tidak ada risiko penipuan.',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
  },
  {
    icon: GraduationCap,
    title: 'Pengerja Terverifikasi',
    description:
      'Setiap joki telah melalui proses verifikasi ketat. Lihat rating, review, dan portofolio sebelum memilih.',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.12)',
  },
  {
    icon: Zap,
    title: 'Hasil Instan & Tepat',
    description:
      'Tugas selesai tepat waktu dengan kualitas terjamin. Kami menjamin kepuasan Anda dengan garansi revisi gratis.',
    color: '#A855F7',
    bgColor: 'rgba(168, 85, 247, 0.12)',
  },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>
            Fitur Unggulan
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--fg)' }}
          >
            Kenapa Memilih JokiTugas?
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Platform terpercaya dengan sistem keamanan terbaik untuk melindungi setiap transaksi Anda.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = feature.color + '44';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: feature.bgColor }}
              >
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--fg)' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                {feature.description}
              </p>
              <div className="flex items-center gap-1 text-sm font-medium transition-colors group-hover:gap-2"
                style={{ color: feature.color }}>
                Pelajari lebih lanjut
                <ArrowRight className="w-4 h-4 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
