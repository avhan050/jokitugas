import { BookOpen, Users, Star, Headphones } from 'lucide-react';

const stats = [
  {
    icon: BookOpen,
    value: '10k+',
    label: 'Tugas Selesai',
  },
  {
    icon: Users,
    value: '500+',
    label: 'Joki Berbakat',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Rating Kepuasan',
  },
  {
    icon: Headphones,
    value: '24/7',
    label: 'Dukungan Sistem',
  },
];

export default function StatsSection() {
  return (
    <section
      className="py-8"
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 justify-center md:justify-start">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'var(--accent-dim)' }}
              >
                <stat.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--fg)' }}>
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm" style={{ color: 'var(--muted)' }}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
