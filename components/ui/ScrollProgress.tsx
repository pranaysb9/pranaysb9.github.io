"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin reading-progress bar pinned to the very top of the viewport,
 * above the nav. Purely a scroll indicator — no interaction, no layout
 * shift, just a quiet signal that the page has depth.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
    />
  );
}
