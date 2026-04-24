# Worklog

## Task 5: Proteksi Hasil Kerja dan Panel Admin Sengketa

**Date:** 2026-04-24

### Summary
Mengubah alur setelah pekerja mengirim hasil kerja agar client tidak bisa lagi melakukan refund sepihak. Tombol `Tolak & Refund` diganti menjadi `Ajukan Sengketa ke Admin`, lalu admin memutuskan dari halaman terpisah apakah escrow dibayarkan ke pekerja atau direfund ke client.

### Masalah yang Diselesaikan

Sebelumnya ada celah bisnis:
- pekerja mengirim hasil kerja
- client melihat hasil
- client bisa menolak lalu refund
- pekerja tidak dibayar walaupun pekerjaan sudah dikirim

Perubahan ini menutup celah tersebut dengan memindahkan keputusan final ke admin.

### Perubahan Utama

1. **Status tugas baru: `dispute`**
   - Tugas yang disengketakan tidak langsung dibatalkan.
   - Dana escrow tetap ditahan sampai admin memutuskan.

2. **Field sengketa ditambahkan ke task**
   - `disputeReason`
   - `disputedAt`

3. **Alur review client diubah**
   - `Terima Hasil Kerja` tetap menyelesaikan tugas dan membayar pekerja.
   - `Minta Revisi` tetap mengembalikan tugas ke status pengerjaan.
   - `Tolak & Refund` dihapus.
   - Diganti menjadi `Ajukan Sengketa ke Admin`.

4. **Refund otomatis setelah hasil dikirim dihapus**
   - Client tidak bisa lagi mengembalikan dana sendiri saat tugas sudah `under_review`.
   - Refund atau pembayaran hanya bisa diputuskan admin pada status `dispute`.

5. **Panel admin baru dibuat**
   - Menambah halaman khusus `Sengketa Tugas`.
   - Admin dapat melihat semua tugas yang disengketakan.
   - Admin dapat memilih:
     - `Putuskan Bayar Pekerja`
     - `Putuskan Refund Client`

6. **API admin sengketa ditambahkan**
   - Route baru untuk menyelesaikan sengketa tugas oleh admin.

7. **UI status sengketa diperluas**
   - Badge status `Sengketa`
   - Filter tugas `Sengketa` pada halaman client dan pekerja
   - Detail tugas menampilkan alasan sengketa dan waktu pengajuan
   - Dashboard admin menampilkan jumlah sengketa dan shortcut ke halaman sengketa

### File yang Diubah

1. **`prisma/schema.prisma`**
   - Menambah field `disputeReason` dan `disputedAt` pada model `Task`

2. **`prisma/dev.db`**
   - Schema database lokal ikut diperbarui

3. **`prisma/migrations/20260424010000_add_task_disputes/migration.sql`**
   - Migration baru untuk field sengketa pada tugas

4. **`src/lib/types.ts`**
   - Menambah status `dispute`
   - Menambah field `disputeReason` dan `disputedAt`
   - Menambah page `admin-disputes`

5. **`src/lib/helpers.ts`**
   - Menambah label dan badge untuk status `dispute`

6. **`src/lib/store.ts`**
   - `reviewWork` diubah menjadi menerima aksi `dispute`
   - Menambah action `resolveTaskDispute`

7. **`src/app/api/tasks/[id]/review/route.ts`**
   - Aksi `reject` dihapus
   - Menambah aksi `dispute`

8. **`src/app/api/admin/tasks/[id]/resolve/route.ts`**
   - Route baru untuk keputusan admin atas sengketa

9. **`src/components/pages/ReviewWorkModal.tsx`**
   - Tombol `Tolak & Refund` diganti menjadi `Ajukan Sengketa ke Admin`
   - Menambah field alasan sengketa

10. **`src/components/pages/AdminDisputesPage.tsx`**
    - Halaman admin baru khusus pengelolaan sengketa tugas

11. **`src/components/app/Sidebar.tsx`**
    - Menambah menu admin `Sengketa Tugas`

12. **`src/components/app/TopBar.tsx`**
    - Menambah judul halaman `Sengketa Tugas`

13. **`src/components/app/AppLayout.tsx`**
    - Mendaftarkan page baru `admin-disputes`

14. **`src/components/pages/DashboardPage.tsx`**
    - Menambah ringkasan jumlah sengketa pada dashboard admin
    - Mengikutkan status `dispute` sebagai tugas aktif untuk client dan pekerja

15. **`src/components/pages/MyTasksPage.tsx`**
    - Menambah filter `Sengketa`
    - Menyesuaikan progress step untuk status sengketa

16. **`src/components/pages/MyWorkPage.tsx`**
    - Menambah filter `Sengketa`
    - Menyesuaikan progress step untuk status sengketa

17. **`src/components/pages/TaskDetailModal.tsx`**
    - Menampilkan panel informasi sengketa pada detail tugas
    - Menyesuaikan progress step agar mencakup status sengketa

### Perilaku Baru

- Setelah pekerja mengirim hasil, client hanya punya 3 jalur:
  - terima hasil
  - minta revisi
  - ajukan sengketa

- Jika client mengajukan sengketa:
  - tugas masuk status `dispute`
  - alasan sengketa disimpan
  - escrow tetap ditahan
  - admin memutuskan hasil akhir

- Jika admin memilih `Putuskan Bayar Pekerja`:
  - tugas selesai
  - pekerja menerima pembayaran

- Jika admin memilih `Putuskan Refund Client`:
  - tugas dibatalkan
  - client menerima refund

### Verifikasi

- `npm run db:push` berhasil.
- `npm run db:generate` berhasil.
- `git diff --check` bersih.

### Catatan

- Sekarang sengketa dan verifikasi transaksi dipisah menjadi dua area admin yang berbeda agar aksesnya tidak membingungkan.

---

## Task 4: Fitur Chat Tugas antara Client dan Pekerja

**Date:** 2026-04-24

### Summary
Menambahkan fitur chat per tugas agar client dan pekerja bisa berkomunikasi langsung setelah tugas diambil. Chat ditampilkan di detail tugas, pesan disimpan di database, dan pembaruan pesan ikut ter-refresh lewat socket ke user yang terkait.

### Perubahan Utama

1. **Model database chat ditambahkan**
   - Menambah model `TaskMessage` pada Prisma untuk menyimpan pesan berdasarkan `taskId`, `senderId`, `content`, dan `createdAt`.
   - Relasi baru dihubungkan ke `User` dan `Task`.

2. **API chat per tugas dibuat**
   - Menambah endpoint `GET/POST /api/tasks/[id]/messages`.
   - Validasi akses dibatasi hanya untuk client dan pekerja yang terlibat pada tugas.
   - Chat hanya aktif setelah tugas sudah memiliki `workerId`.

3. **State aplikasi diperluas**
   - Menambah tipe `TaskMessage`.
   - Menambah `taskMessages` ke Zustand store.
   - Menambah action `sendTaskMessage(taskId, content)`.

4. **UI chat ditambahkan ke detail tugas**
   - Chat muncul di modal detail tugas.
   - Menampilkan daftar pesan, nama pengirim, peran, waktu kirim, dan form kirim pesan.
   - Enter mengirim pesan, `Shift+Enter` membuat baris baru.

5. **Realtime notifikasi diperbaiki**
   - Socket server ditambah event `notify-users`.
   - Refresh data untuk chat tidak lagi harus broadcast ke semua user, tetapi bisa diarahkan ke room user yang terkait dengan tugas.

6. **Prisma client dipindahkan ke folder project**
   - Generator Prisma diarahkan ke `src/generated/prisma`.
   - `src/lib/db.ts` diperbarui agar mengambil `PrismaClient` dari folder generated lokal.
   - Perubahan ini dilakukan karena generated client lama di `node_modules/.prisma` terkendala permission.

### File yang Diubah

1. **`prisma/schema.prisma`**
   - Menambah model `TaskMessage`
   - Menyesuaikan output Prisma client ke `src/generated/prisma`

2. **`prisma/dev.db`**
   - Schema SQLite lokal sudah ikut ter-update

3. **`prisma/migrations/20260424000000_add_task_messages/migration.sql`**
   - Migration baru untuk tabel chat tugas

4. **`src/lib/types.ts`**
   - Menambah interface `TaskMessage`

5. **`src/lib/store.ts`**
   - Menambah state `taskMessages`
   - Menambah action `sendTaskMessage`
   - Menambah `emitUserScopedUpdate`
   - Menyesuaikan logout agar socket dibersihkan dengan benar

6. **`src/app/api/init-data/route.ts`**
   - Mengikutkan data `taskMessages`
   - Menyesuaikan daftar user yang dimuat agar mencakup partisipan tugas/chat

7. **`src/app/api/tasks/[id]/messages/route.ts`**
   - Route baru untuk membaca dan mengirim pesan tugas

8. **`src/components/pages/TaskDetailModal.tsx`**
   - Menambah panel chat tugas
   - Menambah textarea, daftar pesan, dan tombol kirim

9. **`mini-services/socket-server/index.mjs`**
   - Menambah event socket `notify-users` untuk refresh terbatas ke user terkait

10. **`src/lib/db.ts`**
    - Import `PrismaClient` dipindahkan ke `@/generated/prisma`

11. **`src/generated/`**
    - Folder generated Prisma client baru

### Perilaku Fitur

- Chat tersedia setelah pekerja mengambil tugas.
- Hanya client pemilik tugas dan pekerja yang mengambil tugas yang bisa melihat dan mengirim pesan.
- Pesan disimpan permanen di database dan ikut tampil lagi saat halaman direfresh.
- Pengiriman pesan memicu refresh data ke user yang terkait dengan tugas tersebut.

### Verifikasi

- `npm run db:push` berhasil dan database lokal sinkron.
- `npm run db:generate` berhasil setelah output Prisma client dipindah ke folder project.
- `git diff --check` bersih.
- `npm run lint` dan `npx tsc --noEmit` belum memberi hasil final di environment ini karena proses timeout sebelum output selesai tampil.

### Catatan Operasional

- Setelah deploy perubahan ini, aplikasi Next.js dan socket server perlu direstart.
- Jika nanti ingin dikembangkan lagi, fitur chat ini paling aman dilanjutkan dengan:
  - unread count
  - notifikasi pesan baru
  - attachment file di chat
  - polling / websocket event khusus pesan agar tidak perlu refresh data penuh

---

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

---

## Task 3: JokiTugas Full Application — SPA Conversion to Next.js 16 TypeScript

**Date:** 2026-04-19

### Summary
Converted a full-featured ~2200-line JokiTugas SPA application (joki.html) into a Next.js 16 App Router project with TypeScript. Implemented a complete client-side task marketplace with auth, task CRUD, escrow payments, wallet system, admin panel, and rating system — all managed via Zustand store with localStorage persistence.

### Files Created

#### Data Layer (`src/lib/`)
1. **`types.ts`** — TypeScript interfaces: User, Task, Transaction, AdminSettings, ToastItem, PageName
2. **`helpers.ts`** — Utility functions: formatRupiah, formatDate, categoryIcon, genId, statusLabel, statusBadgeClass, getInitials, CATEGORIES constant
3. **`seed.ts`** — Seed data: 5 users (admin + 2 clients + 2 workers), 5 sample tasks, 8 sample transactions, admin bank settings, DEMO_ACCOUNTS
4. **`store.ts`** — Zustand store with full state management: session (login/register/logout), page navigation, modal/toast system, task CRUD (create/take/submit/review/cancel/rate), transaction CRUD (topup/withdraw/approve/reject), profile management, admin settings. All data persisted to localStorage.

#### App Components (`src/components/app/`)
5. **`AuthPage.tsx`** — Login/register page with tab switching, email+password forms, role selection (client/worker), quick demo buttons (Client/Joki/Admin), Enter key support
6. **`Sidebar.tsx`** — Fixed sidebar with logo, role-based nav links, active state highlighting, mobile responsive (slide-in with backdrop), user info + logout
7. **`TopBar.tsx`** — Sticky header with page title, mobile menu toggle, wallet balance display, user avatar with profile link
8. **`Modal.tsx`** — Modal overlay with backdrop blur, click-outside-to-close, X button, animated content
9. **`Toast.tsx`** — Toast notification container with auto-dismiss (3.2s), exit animation, 4 variants (success/error/info/warning)
10. **`AppLayout.tsx`** — Main layout combining Sidebar + TopBar + dynamic page content router

#### Page Components (`src/components/pages/`)
11. **`DashboardPage.tsx`** — Role-specific dashboards: Admin (revenue, users, tasks, pending), Client (spent, open/active/completed counts), Worker (earned, available/active/completed counts). Each with stat cards and recent tasks list.
12. **`MyTasksPage.tsx`** — Client's posted tasks with filter tabs (Semua/Terbuka/Dikerjakan/Ditinjau/Selesai), task cards with progress steps, "Posting Tugas" button
13. **`PostTaskPage.tsx`** — New task form (title, description, category select, deadline date, budget), live cost calculation (5% service fee), escrow info
14. **`MarketplacePage.tsx`** — Browse open tasks with search, category filter, sort (newest/budget high-low/deadline), "Ambil Tugas" button for workers
15. **`MyWorkPage.tsx`** — Worker's tasks with filter tabs (Semua/Berjalan/Ditinjau/Selesai), progress steps, "Kirim Hasil" button
16. **`WalletPage.tsx`** — Balance card with escrow info, bank info display, top-up (quick amounts + custom + proof upload), withdraw with bank details
17. **`TransactionsPage.tsx`** — Transaction history with type icons, amounts, status badges, descriptions
18. **`ProfilePage.tsx`** — User profile with editable name, email, role badge, stats (rating/completed/balance), password change form
19. **`AdminPanelPage.tsx`** — Admin panel with stats, pending transaction verification (approve/reject), proof viewing, platform settings (bank/wallet)

#### Modal Components (`src/components/pages/`)
20. **`TaskDetailModal.tsx`** — Full task detail with progress steps, escrow status, worker info, submission notes, ratings, role-based action buttons
21. **`SubmitWorkModal.tsx`** — Worker submits work with note field
22. **`ReviewWorkModal.tsx`** — Client reviews work (Accept/Request Revision/Reject & Refund)
23. **`RatingModal.tsx`** — Interactive star rating (1-5) with hover effects
24. **`TakeTaskModal.tsx`** — Worker confirms task take with budget/deadline/warning info
25. **`TopupConfirmModal.tsx`** — Top-up confirmation with file upload (base64), preview, summary

#### Modified Files
26. **`src/app/globals.css`** — Added CSS variables (--gold, --gold-dim, --danger, --danger-dim, --info, --info-dim, --card-hover), and classes: auth-bg, sidebar, sidebar-link, main-area, form-input, badge system (open/progress/review/done/cancelled), cat-badge, modal-overlay/content, animations (fadeIn, slideInRight, toast-in/out), stat-card, task-card, step-line/dot progress, toast-container/toast variants, glow-orb, star rating, responsive media queries
27. **`src/app/page.tsx`** — Replaced landing page with SPA entry point: seeds data on first load, restores session from localStorage, renders AuthPage or AppLayout based on login state, plus Modal and ToastContainer

### Technical Details
- Single-page app architecture at `/` route with Zustand-managed page navigation
- All state client-side with localStorage persistence (no backend/DB)
- Zustand store handles all CRUD operations with computed updates (balance, ratings, job counts)
- Session management via `jt_session` localStorage key
- Seed data runs once (checked via `jt_seeded` flag)
- 5% service fee on task posting, 95/5 earning/fee split on task completion
- Escrow system: funds held from client on task take, released on acceptance, refunded on rejection/cancellation
- File upload for top-up proof: FileReader → base64 stored in transaction
- All icons from `lucide-react` (mapped from Font Awesome originals)
- `React.createElement` used for dynamic category icons to avoid ESLint static-components rule
- Mobile-first responsive design with sidebar slide-in
- ESLint passes with zero errors and zero warnings

### Verification
- `bun run lint` — 0 errors, 0 warnings
- Dev server compiles successfully, page returns HTTP 200
- All 25 new files created, 2 existing files modified
