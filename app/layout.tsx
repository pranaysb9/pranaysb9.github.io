import type { Metadata } from "next";
import { Sora, Fira_Code } from "next/font/google";
import CommandPalette from "@/components/ui/CommandPalette";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorFollower from "@/components/ui/CursorFollower";
import KonamiEgg from "@/components/ui/KonamiEgg";
import { profile } from "@/data/content";
import "./globals.css";

// One clean grotesque carries headings and body alike — no separate
// display serif this time. Sora's slightly rounded terminals read as
// approachable rather than corporate, which suits a dense "dossier" page.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Reused as the body font too, via the same variable — keeps the whole
// page to a genuine two-font system (grotesque + mono).
const soraBody = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Status tags, stack pills, PR/commit-style details.
const firaCode = Fira_Code({
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
    <html lang="en" className={`${sora.variable} ${soraBody.variable} ${firaCode.variable}`}>
      <body className="font-sans antialiased">
        <ScrollProgress />
        <CursorFollower />
        {children}
        <CommandPalette />
        <KonamiEgg />
      </body>
    </html>
  );
}
