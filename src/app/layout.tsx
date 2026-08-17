import type { Metadata } from "next";
import {
  Playfair_Display,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

import { Toaster } from "react-hot-toast";
import "./globals.css";

import LayoutWrapper
from "@/components/LayoutWrapper";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title:
    "SoftIO News — Kabar Hari Ini, Kapan Saja",
  description:
    "Portal berita nasional dan internasional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} bg-paper font-body text-ink antialiased`}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        
        <Toaster position="top-center" />
      </body>
    </html>
  );
}