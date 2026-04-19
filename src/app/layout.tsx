import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

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
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
        style={{ background: "#0B1120", color: "#E8ECF1" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
