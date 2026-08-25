"use client";

import { Rocket, FlaskConical, Trophy, Building2, ArrowUpRight } from "lucide-react";
import { experience, otherExperiences, recognition, openSource, projects } from "@/data/content";
import CountUp from "@/components/ui/CountUp";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const ICONS = { rocket: Rocket, flask: FlaskConical, trophy: Trophy, building: Building2 };

const STATS = [
  { label: "Projects Shipped", value: projects.length, suffix: "+" },
  { label: "OSS PRs Merged", value: openSource.length, suffix: "" },
  { label: "Research Roles", value: experience.length, suffix: "" },
  { label: "Recognitions", value: recognition.length, suffix: "" },
];

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-t border-line px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted">Experience</h2>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <RevealOnScroll key={s.label} delay={i * 0.05}>
              <div className="rounded-xl border border-line bg-surface p-3.5">
                <p className="font-display text-2xl font-bold text-ink">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-0.5 text-[11px] text-muted">{s.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          {experience.map((entry) => {
            const Icon = ICONS[entry.icon];
            const isCurrent = entry.dateRange.toLowerCase().includes("present");
            return (
              <div key={entry.id} className="flex gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface">
                  <Icon size={14} className="text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-[11px] font-medium text-muted">{entry.dateRange}</p>
                    {isCurrent && (
                      <span className="rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-accent">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-ink">{entry.org}</h3>
                  <p className="text-sm text-ink/75">{entry.role}</p>
                  <p className="text-xs text-muted">{entry.detail}</p>
                  {entry.bullets && (
                    <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/70">
                      {entry.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {entry.caseStudyId && (
                    <button
                      onClick={() => {
                        window.history.pushState(null, "", `/?caseStudy=${entry.caseStudyId}`);
                        window.dispatchEvent(new Event("popstate"));
                      }}
                      className="link-underline mt-2 inline-block text-xs font-semibold text-accent"
                    >
                      View case study ↗
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">
            Leadership &amp; Community
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {otherExperiences.map((item) => (
              <div key={item.role + item.org} className="rounded-lg border border-line bg-surface p-3">
                <p className="text-sm font-semibold text-ink">{item.role}</p>
                <p className="text-[11px] text-muted">{item.org}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink/65">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">
            Recognition
          </p>
          <div className="mt-3 space-y-3">
            {recognition.map((item) => (
              <div key={item.place + item.event} className="flex items-start justify-between gap-3 text-sm">
                <div>
                  <span className="font-semibold text-ink">{item.place}</span>
                  <span className="text-muted"> — {item.event}</span>
                  {item.description && <p className="mt-0.5 text-xs text-muted">{item.description}</p>}
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted transition-colors hover:text-accent"
                    aria-label={`View writeup for ${item.event}`}
                  >
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
