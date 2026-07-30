import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import CommandPalette from "@/components/ui/CommandPalette";
import { profile } from "@/data/content";
import "./globals.css";

// Display serif — used for headlines only, with restraint. Fraunces has a
// genuinely dramatic italic cut, which is what powers the split-headline
// technique (regular weight + accent-colored italic emphasis).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body sans — carries nav, body copy, labels.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Utility mono — stack tags, stats, PR data, code-flavored details.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — AI Engineer & Builder`,
  description: profile.bio,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
