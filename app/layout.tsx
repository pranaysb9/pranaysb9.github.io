import type { Metadata } from "next";
import { Sora, Fira_Code } from "next/font/google";
import { MotionConfig } from "framer-motion";
import CommandPalette from "@/components/ui/CommandPalette";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorFollower from "@/components/ui/CursorFollower";
import PixelRover from "@/components/ui/PixelRover";
import KonamiEgg from "@/components/ui/KonamiEgg";
import IntroSequence from "@/components/ui/IntroSequence";
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
      <head>
        {/* Blocking, runs before first paint — applies a stored light-mode
            choice immediately so there's no flash of the dark default. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.add('light')}}catch(e){}",
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <MotionConfig reducedMotion="user">
          <IntroSequence />
          <ScrollProgress />
          <CursorFollower />
          <PixelRover />
          {children}
          <CommandPalette />
          <KonamiEgg />
        </MotionConfig>
      </body>
    </html>
  );
}
