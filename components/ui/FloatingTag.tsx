"use client";

import { motion } from "framer-motion";
import { colorways, type Colorway } from "@/lib/colorways";

type Props = {
  label: string;
  colorway: Colorway;
  rotate: number;
  className?: string;
  delay?: number;
};

/**
 * A small "washi tape" style tag that idly floats/tilts in place — purely
 * decorative, scattered near the hero headline. Each tag should get a
 * different `delay` so they don't move in lockstep.
 */
export default function FloatingTag({ label, colorway, rotate, className, delay = 0 }: Props) {
  const c = colorways[colorway];

  return (
    <motion.span
      initial={{ rotate }}
      animate={{ y: [0, -6, 0], rotate: [rotate, rotate + 3, rotate] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
      className={`pointer-events-none select-none whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide shadow-sm ${c.borderIdle} ${c.tagText} bg-surface ${className}`}
    >
      {label}
    </motion.span>
  );
}
