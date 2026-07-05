"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  className?: string;
};

/**
 * A tiny terminal-chrome window that types out each line in `lines`, holds,
 * erases, and moves to the next — looping. Purely decorative personality
 * detail; the chrome dots are neutral grayscale on purpose (not a 5th
 * accent color).
 */
export default function TerminalWindow({ lines, className }: Props) {
  const [lineIndex, setLineIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");

  useEffect(() => {
    const current = lines[lineIndex] ?? "";

    if (phase === "typing") {
      if (display.length < current.length) {
        const t = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 35);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("holding"), 1400);
      return () => clearTimeout(t);
    }

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("erasing"), 900);
      return () => clearTimeout(t);
    }

    // erasing
    if (display.length > 0) {
      const t = setTimeout(() => setDisplay(display.slice(0, -1)), 20);
      return () => clearTimeout(t);
    }
    setLineIndex((i) => (i + 1) % lines.length);
    setPhase("typing");
  }, [display, phase, lineIndex, lines]);

  return (
    <div className={`w-full max-w-sm rounded-lg border border-line bg-ink shadow-sm ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
      </div>
      <div className="px-4 py-3 font-mono text-[13px] text-emerald-400/90">
        {display}
        <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-emerald-400/80 align-middle" />
      </div>
    </div>
  );
}
