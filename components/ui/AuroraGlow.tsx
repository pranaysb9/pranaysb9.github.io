"use client";

import { motion } from "framer-motion";

/**
 * Two large, very-low-opacity blurred blobs that drift slowly behind hero
 * content — ambient light bleed rather than a distinct shape. Pure CSS/SVG,
 * no image assets. Sits behind the constellation and text (painted first
 * in DOM order, both siblings default to z-index:auto).
 */
export default function AuroraGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-accent/[0.10] blur-[110px]"
        animate={{ x: [0, 40, -10, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 top-10 h-[320px] w-[320px] rounded-full bg-accent/[0.07] blur-[100px]"
        animate={{ x: [0, -30, 10, 0], y: [0, -15, 25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
