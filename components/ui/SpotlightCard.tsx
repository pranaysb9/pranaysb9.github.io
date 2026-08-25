"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps a card with a low-opacity accent-tinted radial glow that follows
 * the cursor. The heavy lifting is CSS (see .spotlight-card in globals.css) —
 * this component only writes the cursor position into CSS custom
 * properties on mousemove, so there's no per-frame JS animation cost.
 */
export default function SpotlightCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="spotlight-card">
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
