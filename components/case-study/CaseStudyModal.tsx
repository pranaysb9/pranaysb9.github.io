"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Lightbulb, ShieldAlert } from "lucide-react";
import type { CaseStudy } from "@/types/caseStudy";
import ArchitectureDiagram from "@/components/case-study/ArchitectureDiagram";

type Props = {
  caseStudy: CaseStudy | null;
  onClose: () => void;
};

export default function CaseStudyModal({ caseStudy, onClose }: Props) {
  // Close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!caseStudy) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [caseStudy, onClose]);

  return (
    <AnimatePresence>
      {caseStudy && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={caseStudy.title}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-xl2 border border-line bg-surface"
          >
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-5 top-5 z-10 rounded-full border border-line bg-surface p-2 text-muted transition-colors hover:border-ink hover:text-ink"
            >
              <X size={18} />
            </button>

            <div className="max-h-[85vh] overflow-y-auto p-8 md:p-12">
              {/* ---------- Hero ---------- */}
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                Case Study
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
                {caseStudy.title}
              </h2>
              <p className="mt-2 text-lg italic text-muted">{caseStudy.tagline}</p>

              {caseStudy.liveUrl && (
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:border-accent"
                >
                  {caseStudy.liveLabel ?? "View Live"} <ExternalLink size={14} />
                </a>
              )}

              {/* Metrics grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {caseStudy.metrics.map((m) => (
                  <div key={m.label} className="rounded-lg border border-line bg-paper p-4">
                    <p className="font-display text-2xl font-bold text-ink">{m.value}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Core tech */}
              <div className="mt-6 flex flex-wrap gap-3">
                {caseStudy.coreTech.map((t) => (
                  <div
                    key={t.name}
                    className="rounded-full border border-line bg-paper px-4 py-1.5 text-xs"
                    title={t.reason}
                  >
                    <span className="font-mono font-semibold text-ink">{t.name}</span>
                    <span className="ml-2 text-muted">{t.reason}</span>
                  </div>
                ))}
              </div>

              {/* ---------- Overview & Problem ---------- */}
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">Overview</h3>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/85">
                    {caseStudy.overview.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">The Problem</h3>
                  <p className="mt-3 text-sm text-ink/85">{caseStudy.problem.intro}</p>
                  <ul className="mt-3 space-y-2 text-sm text-ink/85">
                    {caseStudy.problem.points.map((pt, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent">0{i + 1}</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ---------- Architecture ---------- */}
              <div className="mt-12">
                <h3 className="font-display text-xl font-semibold text-ink">Architecture</h3>
                <div className="mt-5 rounded-xl2 border border-line bg-paper/60 p-5">
                  <ArchitectureDiagram
                    nodes={caseStudy.architecture.nodes}
                    edges={caseStudy.architecture.edges}
                  />
                </div>
              </div>

              {/* ---------- Workflows ---------- */}
              {caseStudy.workflows && caseStudy.workflows.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-display text-xl font-semibold text-ink">Automation Workflows</h3>
                  <div className="mt-5 space-y-6">
                    {caseStudy.workflows.map((wf) => (
                      <div key={wf.title} className="rounded-xl border border-line bg-paper/30 p-5 md:p-6">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                          <h4 className="font-semibold text-ink">{wf.title}</h4>
                          <span className="inline-flex w-fit rounded border border-line bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-accent">
                            Trigger: {wf.trigger}
                          </span>
                        </div>
                        <div className="mt-6 w-full overflow-x-auto pb-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-line">
                          <div className="flex w-max items-center px-1">
                            {wf.steps.map((step, i) => (
                              <div key={i} className="flex items-center">
                                <div className="flex h-24 w-52 shrink-0 flex-col items-center justify-center rounded-xl border border-line bg-paper/80 px-4 py-3 text-center text-[13px] leading-snug text-ink shadow-sm">
                                  {step}
                                </div>
                                {i < wf.steps.length - 1 && (
                                  <div className="mx-3 shrink-0 text-muted/40">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-2 border-t border-dashed border-line pt-4">
                          <p className="font-mono text-xs text-muted">
                            <span className="font-semibold text-ink/70">Result: </span> {wf.output}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------- Decisions & Challenges ---------- */}
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                    <Lightbulb size={18} className="text-accent" /> Engineering Decisions
                  </h3>
                  <div className="mt-4 space-y-5">
                    {caseStudy.decisions.map((d) => (
                      <div key={d.title}>
                        <p className="font-semibold text-ink">{d.title}</p>
                        <p className="mt-1 text-sm text-ink/80">{d.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                    <ShieldAlert size={18} className="text-accent" /> Challenges Overcome
                  </h3>
                  <div className="mt-4 space-y-5">
                    {caseStudy.challenges.map((d) => (
                      <div key={d.title}>
                        <p className="font-semibold text-ink">{d.title}</p>
                        <p className="mt-1 text-sm text-ink/80">{d.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ---------- Tech breakdown & lessons ---------- */}
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">Tech Stack</h3>
                  <div className="mt-4 space-y-4">
                    {caseStudy.techBreakdown.map((cat) => (
                      <div key={cat.category}>
                        <p className="font-mono text-xs uppercase tracking-wide text-accent">
                          {cat.category}
                        </p>
                        <p className="mt-1 text-sm text-ink/85">{cat.items.join(" · ")}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">Lessons Learned</h3>
                  <ul className="mt-4 space-y-2 text-sm text-ink/85">
                    {caseStudy.lessons.map((l, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent">·</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
