"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Combines the cursor-follow spotlight glow (.spotlight-card, shared with
 * other cards) with a subtle 3D tilt that follows the cursor — the card
 * leans away from wherever the pointer is, spring-damped back to flat on
 * mouse leave. Kept small (max ~6deg) so it reads as tactile, not gimmicky.
 */
export default function TiltCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 18 });
  const springY = useSpring(my, { stiffness: 200, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x - 0.5);
    my.set(y - 0.5);
    el.style.setProperty("--spot-x", `${x * 100}%`);
    el.style.setProperty("--spot-y", `${y * 100}%`);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn("spotlight-card", className)}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
