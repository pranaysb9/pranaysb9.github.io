"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A small glowing beam that travels around the inside edge of its parent's
 * border, corner to corner, on an infinite loop. Parent must be
 * `position: relative` and sized to the element the beam should trace.
 * Used sparingly — on the one bordered CTA in the hero, not everywhere.
 */
export default function BorderBeam({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]", className)} aria-hidden="true">
      <motion.div
        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70 blur-md"
        animate={{
          left: ["0%", "100%", "100%", "0%", "0%"],
          top: ["0%", "0%", "100%", "100%", "0%"],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
