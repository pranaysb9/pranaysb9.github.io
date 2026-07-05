"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

/**
 * Fades + rises an element into view once, when it enters the viewport.
 * Displacement is intentionally small (14px) — this should read as a
 * settling-in, not a swoop. Respects prefers-reduced-motion globally via
 * the CSS override in globals.css.
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
