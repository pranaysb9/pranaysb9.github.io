"use client";

import { useRef, useState, useEffect } from "react";
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
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  // Scroll-Spy for ribbon milestones
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Extract the direct entry ID
          const id = entry.target.id.replace("exp-block-", "");
          setHighlightedId(id);
        }
      });
    }, observerOptions);

    experience.forEach((entry) => {
      const el = document.getElementById(`exp-block-${entry.id}`);
      if (el) observer.observe(el);
    });

    return () => {
      experience.forEach((entry) => {
        const el = document.getElementById(`exp-block-${entry.id}`);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  function handleSelect(id: string) {
    setHighlightedId(id);
    document.getElementById(`exp-block-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section id="experience" className="px-6 py-24 md:px-12 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Grid Left Column: Section Header */}
          <div className="md:col-span-4 md:sticky md:top-28 h-fit">
            <RevealOnScroll>
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-2">03 // Experience</div>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Professional <span className="italic font-bold text-accent">Trajectory</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Experience across deep learning research, distributed AI systems architecture, and early-stage startup engineering.
              </p>
            </RevealOnScroll>

            {/* Jump Navigation ribbon */}
            <div className="mt-8 hidden md:block">
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted font-bold mb-3">Milestone Jump-nav</p>
              <ExperienceRibbon entries={experience} onSelect={handleSelect} activeId={highlightedId} />
            </div>
          </div>

          {/* Grid Right Column: Left-aligned Timeline */}
          <div className="md:col-span-8">
            {/* Jump nav visible only on mobile */}
            <div className="block md:hidden mb-8">
              <ExperienceRibbon entries={experience} onSelect={handleSelect} activeId={highlightedId} />
            </div>

            <div ref={containerRef} className="relative pl-6 md:pl-10">
              {/* Vertical Progress Line */}
              <div className="absolute left-1 md:left-2 top-2 h-[calc(100%-8px)] w-px bg-line" />
              <motion.div
                style={{ scaleY: lineHeight }}
                className="absolute left-1 md:left-2 top-2 h-[calc(100%-8px)] w-px origin-top bg-accent"
              />

              <div className="space-y-12">
                {experience.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    id={`exp-block-${entry.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                    className="relative scroll-mt-28"
                  >
                    {/* Timeline connector dot */}
                    <span
                      className={`absolute -left-[23px] md:-left-[39px] top-6 h-2 w-2 rounded-full border border-accent bg-surface transition-all duration-300 ${
                        highlightedId === entry.id
                          ? "bg-accent scale-125 ring-4 ring-accent-soft"
                          : "bg-surface"
                      }`}
                    />
                    <ExperienceCard entry={entry} highlighted={entry.id === highlightedId} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
