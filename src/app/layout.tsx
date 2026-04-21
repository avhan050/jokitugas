import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "JokiTugas — Solusi Jasa Joki Tugas Terpercaya & Aman",
  description:
    "Dapatkan bantuan tugas dari ribuan pengerja profesional. Transaksi aman dengan sistem escrow, hasil terjamin, dan deadline terjaga.",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "JokiTugas — Solusi Jasa Joki Tugas Terpercaya & Aman",
    description:
      "Dapatkan bantuan tugas dari ribuan pengerja profesional. Transaksi aman dengan sistem escrow, hasil terjamin, dan deadline terjaga.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className="antialiased"
        style={{ background: "#0B1120", color: "#E8ECF1" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
