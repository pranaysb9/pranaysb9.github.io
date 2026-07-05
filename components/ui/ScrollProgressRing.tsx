"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronUp } from "lucide-react";

const SIZE = 48;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * A fixed bottom-right ring that fills as the page scrolls, and doubles as
 * a "back to top" button once you've scrolled down. Only appears after a
 * small scroll threshold so it's not competing with the hero.
 */
export default function ScrollProgressRing() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const dashOffset = useTransform(progress, (v) => CIRCUMFERENCE * (1 - v));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 240);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-[90] flex items-center justify-center rounded-full 
      bg-surface/30 backdrop-blur-2xl ring-1 ring-ink/5
      shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.1)]
      transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] 
      hover:scale-110 hover:bg-surface/50 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_12px_40px_rgba(0,0,0,0.15)] 
      ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-8 scale-90"
      }`}
      style={{ width: SIZE, height: SIZE }}
    >
      <svg width={SIZE} height={SIZE} className="-rotate-90">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
          fill="none"
          className="stroke-ink/5"
        />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
          fill="none"
          strokeLinecap="round"
          className="stroke-ink/70"
          strokeDasharray={CIRCUMFERENCE}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      <ChevronUp size={20} className="absolute text-ink/80 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2.5} />
    </button>
  );
}
