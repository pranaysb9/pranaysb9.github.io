"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/**
 * The classic Konami code, repurposed as a small "network online" burst —
 * a nod to the multi-agent/graph systems in the actual project work,
 * rather than a generic confetti drop. Self-contained: no external state,
 * auto-dismisses.
 */
export default function KonamiEgg() {
  const [fired, setFired] = useState(false);
  const buffer = useMemo(() => ({ keys: [] as string[] }), []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      buffer.keys.push(e.key);
      buffer.keys = buffer.keys.slice(-SEQUENCE.length);
      if (buffer.keys.length === SEQUENCE.length && buffer.keys.every((k, i) => k === SEQUENCE[i])) {
        setFired(true);
        buffer.keys = [];
        setTimeout(() => setFired(false), 2600);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [buffer]);

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2;
        const distance = 120 + Math.random() * 180;
        return {
          id: i,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          delay: Math.random() * 0.15,
        };
      }),
    []
  );

  return (
    <AnimatePresence>
      {fired && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
        >
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
              className="absolute h-1.5 w-1.5 rounded-full bg-accent"
            />
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="rounded-2xl border border-accent/30 bg-surface px-6 py-4 text-center shadow-2xl"
          >
            <p className="font-display text-lg font-semibold text-ink">Network online.</p>
            <p className="mt-1 font-mono text-xs text-muted">all agents connected &middot; 0 errors</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
