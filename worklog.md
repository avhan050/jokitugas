# Worklog

## Task 2: JokiTugas Landing Page — HTML to Next.js TypeScript Conversion

**Date:** 2026-04-19

### Summary
Converted a complete JokiTugas landing page from static HTML into a Next.js 16 App Router project with TypeScript. Created 7 reusable components with a custom dark theme, smooth scroll navigation, responsive design, and interactive hover effects.

### Files Created/Modified

1. **`src/app/globals.css`** — Added JokiTugas custom dark theme CSS variables (--bg, --bg2, --card, --border, --fg, --muted, --accent, --accent-dim), custom animations (float, pulse-glow), utility classes (glow-blur, nav-blur, dot-pattern), custom scrollbar styling, and smooth scroll behavior. Overrode shadcn theme variables to match the dark palette.

2. **`src/app/layout.tsx`** — Replaced Geist fonts with Space Grotesk and DM Sans via `next/font/google`. Updated metadata with Indonesian language title/description. Set lang="id" on HTML element.

3. **`src/components/Navbar.tsx`** — Fixed top navbar with blur backdrop, logo with Zap icon, anchor links (Fitur, Cara Kerja, Keamanan), login/register buttons. Mobile-responsive hamburger menu with full navigation.

4. **`src/components/HeroSection.tsx`** — Two-column hero with badge, heading ("Serahkan" in accent color), description, dual CTA buttons, trust avatars from pravatar.cc, and a floating animated dashboard card showing mock task items with earnings.

5. **`src/components/StatsSection.tsx`** — Stats bar with 4 metrics (10k+ Tugas Selesai, 500+ Joki Berbakat, 4.9/5 Rating, 24/7 Support) in responsive 2x2/4-col grid.

6. **`src/components/FeaturesSection.tsx`** — 3 feature cards (Escrow, Terverifikasi, Hasil Instan) with unique color-coded icons, hover effects (border glow, translateY), and "learn more" links.

7. **`src/components/HowItWorksSection.tsx`** — Two-column layout with 3 numbered steps on left and a sign-up card on right offering Client/Worker role selection.

8. **`src/components/CTASection.tsx`** — Large gradient card (green to emerald) with dot pattern overlay, heading, and dual CTA buttons.

9. **`src/components/Footer.tsx`** — Footer with logo, legal links, social icons (Instagram, Twitter/X, LinkedIn as inline SVGs), and copyright text.

10. **`src/app/page.tsx`** — Composed all 7 components in order: Navbar → Hero → Stats → Features → HowItWorks → CTA → Footer.

### Technical Details
- All icons from `lucide-react` (no Font Awesome CDN)
- Social icons (Instagram, Twitter/X, LinkedIn) implemented as inline SVGs
- Avatar images use `next/image` with `unoptimized` prop and pravatar.cc URLs
- All components properly typed with TypeScript
- Mobile-first responsive design using Tailwind breakpoints
- Smooth scroll behavior via CSS `scroll-behavior: smooth`
- Custom CSS variables used throughout via inline styles
- ESLint passes with zero errors

### Verification
- `bun run lint` — 0 errors, 0 warnings
- Dev server compiles successfully, page returns HTTP 200
