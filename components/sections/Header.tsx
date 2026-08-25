"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/content";
import MagneticButton from "@/components/ui/MagneticButton";

const NODES = [
  { x: 40, y: 40 }, { x: 140, y: 20 }, { x: 220, y: 90 },
  { x: 90, y: 130 }, { x: 200, y: 180 }, { x: 30, y: 200 },
  { x: 260, y: 30 },
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [2, 6], [2, 4],
];

// A small hand-drawn constellation — nodes and edges standing in for the
// multi-agent / vision-graph systems the copy talks about. Draws itself in
// on mount, nodes pulse gently, and the whole thing tilts toward the
// cursor — decorative, but alive rather than static.
function Constellation() {
  return (
    <svg viewBox="0 0 300 240" className="h-full w-full overflow-visible" aria-hidden>
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          stroke="rgb(var(--c-accent))"
          strokeOpacity={0.22}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: "easeOut" }}
        />
      ))}
      {NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y}
          r={i === 3 ? 5 : 3}
          fill="rgb(var(--c-accent))"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, i === 3 ? 0.55 : 0.35, i === 3 ? 0.35 : 0.2, i === 3 ? 0.55 : 0.35],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 3, delay: 1 + i * 0.15, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.4, delay: 0.9 + i * 0.08 },
          }}
        />
      ))}
    </svg>
  );
}

const HEADLINE_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};
const WORD_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

function AnimatedWords({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span variants={HEADLINE_VARIANTS} initial="hidden" animate="show" className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i} variants={WORD_VARIANTS} className="inline-block">
          {word}
          {i < text.split(" ").length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Header() {
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 80, damping: 20 });
  const springY = useSpring(my, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(springY, [-1, 1], [6, -6]);
  const rotateY = useTransform(springX, [-1, 1], [-6, 6]);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden border-b border-line px-6 py-20 md:px-12 md:py-28"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="pointer-events-none absolute -right-10 top-10 h-64 w-72 opacity-70 [transform-style:preserve-3d] md:right-0 md:top-16"
      >
        <Constellation />
      </motion.div>

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted"
        >
          <span className="relative flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </span>
          <span>&middot;</span>
          <span>{profile.location}</span>
        </motion.div>

        <h1 className="mt-6 max-w-xl font-display text-3xl font-semibold leading-[1.3] text-ink sm:text-4xl md:text-[2.6rem]">
          <AnimatedWords text={`I'm ${profile.name.split(" ")[0]} — ${profile.heroLine1.toLowerCase()}`} />{" "}
          <AnimatedWords text={profile.heroEmphasis.toLowerCase()} className="text-accent" />
          {", "}
          <AnimatedWords text={`${profile.heroLine2.toLowerCase().replace(/\.$/, "")}.`} />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 max-w-md text-[15px] leading-relaxed text-muted"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.65 }}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          <MagneticButton href="#projects">
            View projects <ArrowUpRight size={14} />
          </MagneticButton>
          <MagneticButton href={profile.socials.resume} variant="outline" target="_blank" rel="noopener noreferrer">
            Résumé
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
