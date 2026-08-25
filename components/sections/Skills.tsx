"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/content";
import { cn } from "@/lib/utils";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

// Categorized from the real tech stacks listed on each project — not a
// separate, hand-typed skills list that could drift out of sync.
const CATEGORY_MAP: Record<string, string> = {
  Python: "Languages",
  "Next.js": "Frontend",
  FastAPI: "Backend",
  PostgreSQL: "Backend",
  Supabase: "Backend",
  Docker: "Backend",
  "Groq API": "AI & ML",
  "Groq AI": "AI & ML",
  LangGraph: "AI & ML",
  PyTorch: "AI & ML",
  BLIP: "AI & ML",
  BERTScore: "AI & ML",
  n8n: "AI & ML",
};

export default function Skills() {
  const [tab, setTab] = useState("All");

  const allTech = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.stack.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const tabs = ["All", "Languages", "Frontend", "Backend", "AI & ML"];
  const visible = tab === "All" ? allTech : allTech.filter((t) => CATEGORY_MAP[t] === tab);

  return (
    <section id="skills" className="scroll-mt-16 border-t border-line px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted">Skills</h2>
          <p className="mt-2 max-w-lg text-sm text-muted">
            The stack behind the projects above — filter by category.
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
                  tab === t ? "border-accent/40 bg-accent/10 text-accent" : "border-line text-muted hover:text-ink"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {visible.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
