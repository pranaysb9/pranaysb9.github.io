"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { GitPullRequest, ArrowUpRight } from "lucide-react";
import { openSource, ossIssuesTriaged } from "@/data/content";
import OrgLogo, { getOrgDisplayName } from "@/components/ui/OrgLogo";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

/**
 * Sticky-scroll-reveal layout: a left panel stays pinned while the PR list
 * scrolls past on the right, and the panel swaps to show whichever PR is
 * currently centered. `activeIndex` is derived from scroll progress through
 * the list container (not IntersectionObserver) — deterministic and cheap.
 * Desktop only; mobile falls back to a plain stacked list with full detail
 * on every card, since there's no room for a pinned panel there.
 */
export default function OpenSource() {
  const [showAll, setShowAll] = useState(false);
  const items = openSource.slice(0, showAll ? undefined : 8);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.35", "end 0.65"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(items.length - 1, Math.max(0, Math.round(v * (items.length - 1))));
    setActiveIndex(idx);
  });

  const active = items[activeIndex] ?? items[0];
  const [activeOrg, activeRepoName] = active.repo.split("/");

  return (
    <section id="open-source" className="scroll-mt-16 border-t border-line px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted">Open Source</h2>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Merged fixes in widely-used production frameworks — optimizing runtimes, correcting memory leaks,
          and closing reliability gaps.
        </p>
        <p className="mt-2 font-mono text-[12px] text-muted">
          <span className="text-emerald-400">{openSource.length} merged</span> · {ossIssuesTriaged} issues triaged · 6 repositories
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr] md:gap-8">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl2 border border-line bg-surface p-5"
                >
                  <OrgLogo org={activeOrg} size={28} />
                  <p className="mt-3 text-[13px] font-semibold text-ink">
                    {getOrgDisplayName(activeOrg)}/{activeRepoName}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {active.prNumber} &middot; {active.status}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75">{active.title}</p>
                  <div className="mt-4 flex items-center gap-3 font-mono text-[11px] font-semibold">
                    <span className="text-emerald-400">+{active.linesAdded}</span>
                    <span className="text-muted">&minus;{active.linesRemoved}</span>
                  </div>
                  <a
                    href={active.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent"
                  >
                    View source <ArrowUpRight size={12} />
                  </a>
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 flex gap-1" aria-hidden="true">
                {items.map((item, i) => (
                  <span
                    key={item.id}
                    className={cn(
                      "h-[3px] flex-1 rounded-full transition-colors duration-300",
                      i === activeIndex ? "bg-accent" : "bg-line"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div ref={listRef} className="divide-y divide-line rounded-xl2 border border-line bg-surface">
            {items.map((contribution, i) => {
              const [org, repoName] = contribution.repo.split("/");
              return (
                <SpotlightCard
                  key={contribution.id}
                  className={cn(
                    "p-5 transition-colors hover:bg-surface-hover",
                    i === activeIndex && "md:bg-surface-hover"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <OrgLogo org={org} size={20} className="shrink-0 md:hidden" />
                    <a
                      href={contribution.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-[13px] font-semibold text-ink"
                    >
                      {getOrgDisplayName(org)}/{repoName}
                    </a>
                    <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-muted">
                      <GitPullRequest size={11} className="text-accent" />
                      {contribution.prNumber}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-[15px] font-medium leading-snug text-ink">{contribution.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{contribution.impact}</p>

                  <div className="mt-3 flex items-center gap-3 font-mono text-[11px] font-semibold md:hidden">
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                      {contribution.status}
                    </span>
                    <span className="text-emerald-400">+{contribution.linesAdded}</span>
                    <span className="text-muted">&minus;{contribution.linesRemoved}</span>
                    <a
                      href={contribution.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline ml-auto text-accent"
                    >
                      View source ↗
                    </a>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>

        {!showAll && openSource.length > 8 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-muted transition-colors hover:text-ink"
          >
            Show all {openSource.length} contributions ↓
          </button>
        )}
      </div>
    </section>
  );
}
