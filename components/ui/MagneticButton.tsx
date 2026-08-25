"use client";

import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
  target?: string;
  rel?: string;
};

/**
 * A button with a subtle magnetic pull toward the cursor (max ~8px
 * displacement) plus a press-down scale on click. Solid variant is the
 * primary CTA treatment — full accent fill, real visual weight.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  target,
  rel,
}: Props) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * 0.25, y: relY * 0.25 });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const styles = cn(
    "inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors duration-200",
    variant === "solid"
      ? "bg-accent text-paper hover:opacity-90"
      : "border border-line text-ink hover:border-accent/50",
    className
  );

  const motionProps = {
    animate: pos,
    whileTap: { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.4 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: styles,
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  );
}
