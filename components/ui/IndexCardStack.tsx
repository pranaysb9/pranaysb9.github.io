"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { colorways, type Colorway } from "@/lib/colorways";

type Row = {
  label: string;
  value: string;
  sub: string;
  colorway: Colorway;
};

type Props = {
  rows: Row[];
  autoAdvanceMs?: number;
};

/**
 * All cards sit in a non-overlapping row at all times — nothing is ever
 * faded out or shrunk to illegible. Clicking (or auto-advancing to) a card
 * lifts it forward (scale up, rotate to 0, shadow, raised) while the other
 * two settle back slightly and tilt a little further away — full "fan"
 * feeling, but every card stays fully readable at every moment.
 */
export default function IndexCardStack({ rows, autoAdvanceMs = 5000 }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % rows.length);
    }, autoAdvanceMs);
    return () => clearInterval(id);
  }, [paused, rows.length, autoAdvanceMs]);

  // Idle tilt direction per position — purely a resting-state fan look.
  const restTilt = (i: number) => (i === 0 ? -4 : i === rows.length - 1 ? 4 : 0);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex w-full max-w-xl items-end justify-center gap-3"
    >
      {rows.map((row, i) => {
        const c = colorways[row.colorway];
        const isActive = i === active;

        return (
          <motion.button
            key={row.label}
            onClick={() => setActive(i)}
            animate={{
              rotate: isActive ? 0 : restTilt(i) + (i < active ? -3 : i > active ? 3 : 0),
              y: isActive ? -10 : 4,
              scale: isActive ? 1.05 : 0.96,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className={`flex h-52 w-full flex-col justify-between rounded-xl2 border-2 bg-surface p-5 text-left ${c.borderIdle} ${
              isActive ? "shadow-xl" : "shadow-sm"
            }`}
          >
            <div className={`h-1.5 w-10 rounded-full ${c.topBar}`} />
            <div>
              <p className={`font-mono text-xs uppercase tracking-wider ${c.tagText}`}>
                {row.label}
              </p>
              <p className="mt-1 font-display text-lg font-semibold leading-snug text-ink">
                {row.value}
              </p>
              <p className="text-sm text-muted">{row.sub}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
