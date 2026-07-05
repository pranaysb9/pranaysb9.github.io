import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import ScrollProgressRing from "@/components/ui/ScrollProgressRing";
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
  title: "Your Name — AI Engineer & Builder",
  description:
    "Building reliable AI infrastructure for production systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <head>
        {/* Applies any saved shade preset before first paint, so switching
            themes and reloading doesn't flash the default theme first. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              var t = localStorage.getItem('portfolio-theme');
              if (t) document.documentElement.setAttribute('data-theme', t);
            } catch (e) {}`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <ThemeSwitcher />
        <ScrollProgressRing />
      </body>
    </html>
  );
}
