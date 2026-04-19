import { Zap, Heart } from 'lucide-react';

const footerLinks = [
  { label: 'Syarat & Ketentuan', href: '#' },
  { label: 'Kebijakan Privasi', href: '#' },
  { label: 'Bantuan', href: '#' },
];

export default function Footer() {
  return (
    <footer
      className="py-12"
      style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--accent)' }}
            >
              <Zap className="w-4 h-4" style={{ color: '#0B1120' }} />
            </div>
            <span className="text-base font-semibold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              JokiTugas
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors hover:text-white"
                style={{ color: 'var(--muted)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="#"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
              style={{ border: '1px solid var(--border)' }}
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" style={{ color: 'var(--muted)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="#"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
              style={{ border: '1px solid var(--border)' }}
              aria-label="Twitter"
            >
              <svg className="w-4 h-4" style={{ color: 'var(--muted)' }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
              style={{ border: '1px solid var(--border)' }}
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" style={{ color: 'var(--muted)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs flex items-center gap-1" style={{ color: 'var(--muted)' }}>
            © 2026 JokiTugas Indonesia. Dibuat dengan{' '}
            <Heart className="w-3 h-3 inline" style={{ color: '#EF4444' }} /> untuk Mahasiswa.
          </p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
