"use client";

import { useState } from "react";
import { GitPullRequest } from "lucide-react";
import { openSource } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CountUp from "@/components/ui/CountUp";
import OrgLogo, { getOrgDisplayName } from "@/components/ui/OrgLogo";

export default function OpenSource() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="open-source" className="px-6 py-24 md:px-12 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Grid Left Column: Section Header */}
          <div className="md:col-span-4 md:sticky md:top-28 h-fit">
            <RevealOnScroll>
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-2">02 // Open Source</div>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Core <span className="italic font-bold text-accent">Infrastructure</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Optimizing runtimes, correcting memory leaks, and building reliability in widely-used production frameworks.
              </p>
            </RevealOnScroll>
          </div>

          {/* Grid Right Column: Content */}
          <div className="md:col-span-8 space-y-16">
            {openSource.slice(0, showAll ? undefined : 4).map((contribution) => {
              const [org, repoName] = contribution.repo.split("/");
              return (
              <RevealOnScroll key={contribution.id}>
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
                  {/* Story side */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-2xl font-bold text-line">
                        {contribution.number}
                      </span>
                      <a
                        href={contribution.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline font-mono text-xs uppercase tracking-wider font-semibold text-muted hover:text-ink"
                      >
                        {contribution.repo} ↗
                      </a>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-ink leading-snug">
                      {contribution.title}
                    </h3>

                    <p className="mb-2 mt-6 font-mono text-[9px] uppercase tracking-widest text-muted font-bold">
                      The Context
                    </p>
                    <blockquote className="border-l-2 border-line pl-4 font-display text-lg italic leading-snug text-ink/80">
                      &ldquo;{contribution.context}&rdquo;
                    </blockquote>

                    <p className="mb-2 mt-6 font-mono text-[9px] uppercase tracking-widest text-muted font-bold">
                      The Impact
                    </p>
                    <p className="text-sm leading-relaxed text-ink/85">{contribution.impact}</p>
                  </div>

                  {/* PR data card */}
                  <div className="h-fit rounded-xl border border-line bg-surface p-5 shadow-sm">
                    <a
                      href={contribution.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3"
                    >
                      <OrgLogo org={org} size={40} className="shrink-0" />
                      <span className="min-w-0">
                        <span className="block truncate font-display text-xl font-bold text-ink leading-none group-hover:text-accent transition-colors">
                          {getOrgDisplayName(org)}
                        </span>
                        <span className="link-underline mt-1 block truncate font-mono text-[10px] uppercase tracking-wider font-semibold text-muted group-hover:text-ink">
                          {repoName} ↗
                        </span>
                      </span>
                    </a>

                    <p className="mb-3 mt-5 border-t border-line pt-4 font-mono text-[9px] uppercase tracking-widest text-muted font-bold">
                      Pull Request Data
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-mono text-xs text-ink font-semibold">
                        <GitPullRequest size={13} className="text-accent" />
                        {contribution.prNumber}
                      </span>
                      <span className="rounded bg-emerald-50 border border-emerald-100 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-emerald-800">
                        {contribution.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] font-semibold tabular-nums">
                      <span className="text-emerald-700">
                        +<CountUp value={contribution.linesAdded} /> lines
                      </span>
                      <span className="text-accent">
                        -<CountUp value={contribution.linesRemoved} /> lines
                      </span>
                    </div>

                    {contribution.reviewerNote && (
                      <p className="mt-4 rounded bg-paper/50 p-3 font-display text-xs italic text-muted border border-line/40">
                        &ldquo;{contribution.reviewerNote}&rdquo;
                      </p>
                    )}

                    <a
                      href={contribution.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-4 inline-block font-mono text-[9px] font-bold uppercase tracking-wider text-accent"
                    >
                      View Source ↗
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
              );
            })}

            {!showAll && openSource.length > 4 && (
              <RevealOnScroll>
                <div className="flex justify-start">
                  <button
                    onClick={() => setShowAll(true)}
                    className="group flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-2.5 font-mono text-xs font-semibold tracking-wider text-muted transition-all hover:border-ink hover:text-ink hover:bg-paper"
                  >
                    SHOW MORE
                    <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                  </button>
                </div>
              </RevealOnScroll>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
