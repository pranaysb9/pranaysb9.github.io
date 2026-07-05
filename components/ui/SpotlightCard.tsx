"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Hex-with-alpha color for this card's hover glow, e.g. "#6D28D91A". Falls back to violet. */
  glowColor?: string;
};

/**
 * Wraps a card with a low-opacity, colorway-tinted radial glow that follows
 * the cursor. The heavy lifting is CSS (see .spotlight-card in globals.css) —
 * this component only writes the cursor position + glow color into CSS
 * custom properties on mousemove, so there's no per-frame JS animation cost.
 */
export default function SpotlightCard({ children, className, glowColor }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
    if (glowColor) el.style.setProperty("--spot-color", glowColor);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("spotlight-card", className)}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
