"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";

const SECTION_IDS = ["about", "contact", "projects", "open-source", "experience", "skills", "notes", "github"];

/**
 * A thin reading-progress bar pinned to the very top of the viewport. The
 * fill and comet-head are purely a scroll indicator; the tick marks give
 * it the "how much is done" reading the profile approved — each one lights
 * up once you've scrolled past that section's start.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const headLeft = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  const [ticks, setTicks] = useState<{ id: string; pct: number }[]>([]);
  const [passed, setPassed] = useState<Record<string, boolean>>({});
  const ticksRef = useRef<{ id: string; pct: number }[]>([]);

  useEffect(() => {
    function measure() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const next = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        return el ? { id, pct: (el.offsetTop / max) * 100 } : null;
      }).filter((t): t is { id: string; pct: number } => t !== null);
      ticksRef.current = next;
      setTicks(next);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPassed((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const t of ticksRef.current) {
        const isPassed = v * 100 >= t.pct - 0.5;
        if (next[t.id] !== isPassed) {
          next[t.id] = isPassed;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  });

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px]">
      <motion.div style={{ scaleX }} className="absolute inset-0 origin-left bg-accent/40" />
      {ticks.map((t) => (
        <span
          key={t.id}
          className="absolute top-0 h-full w-[2px] -translate-x-1/2 transition-colors duration-300"
          style={{
            left: `${t.pct}%`,
            backgroundColor: passed[t.id] ? "rgb(var(--c-accent))" : "rgb(var(--c-line))",
          }}
        />
      ))}
      <motion.span
        style={{ left: headLeft }}
        className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_rgb(74_222_148_/_0.65)]"
      />
    </div>
  );
}
