"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ExperienceCard from "@/components/sections/ExperienceCard";
import ExperienceRibbon from "@/components/sections/ExperienceRibbon";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  function handleSelect(id: string) {
    setHighlightedId(id);
    document.getElementById(`exp-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setHighlightedId((current) => (current === id ? null : current)), 1600);
  }

  return (
    <section id="experience" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Professional Trajectory
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            Experience across AI research,{" "}
            <span className="italic text-accent">infrastructure, and engineering.</span>
          </h2>
        </RevealOnScroll>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <ExperienceRibbon entries={experience} onSelect={handleSelect} activeId={highlightedId} />
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-3xl">
        {/* Static track + animated progress line */}
        <div className="absolute left-4 top-0 h-full w-px bg-line md:left-1/2" />
        <motion.div
          style={{ scaleY: lineHeight }}
          className="absolute left-4 top-0 h-full w-px origin-top bg-accent md:left-1/2"
        />

        <div className="space-y-10">
          {experience.map((entry, i) => {
            const onLeft = i % 2 === 0; // matches md:odd:mr-auto below (CSS nth-child is 1-indexed)
            return (
              <motion.div
                key={entry.id}
                id={`exp-${entry.id}`}
                initial={{ opacity: 0, x: onLeft ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative ml-10 scroll-mt-28 md:ml-0 md:w-[calc(50%-2rem)] md:odd:mr-auto md:even:ml-auto"
              >
                {/* Mobile timeline dot */}
                <span className="absolute -left-[2.65rem] top-7 h-2.5 w-2.5 rounded-full border-2 border-accent bg-surface md:hidden" />
                {/* Desktop connector stub, reaching from the card to the center line */}
                <span
                  className={`absolute top-7 hidden h-px w-8 bg-line md:block ${
                    onLeft ? "-right-8" : "-left-8"
                  }`}
                />
                <ExperienceCard entry={entry} highlighted={entry.id === highlightedId} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
