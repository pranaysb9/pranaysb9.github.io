"use client";

import { useState } from "react";
import { GitPullRequest } from "lucide-react";
import { openSource } from "@/data/content";
import CountUp from "@/components/ui/CountUp";
import OrgLogo, { getOrgDisplayName } from "@/components/ui/OrgLogo";
import SpotlightCard from "@/components/ui/SpotlightCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function OpenSource() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="open-source" className="scroll-mt-16 border-t border-line px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted">Open Source</h2>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Merged fixes in widely-used production frameworks — optimizing runtimes, correcting memory leaks,
            and closing reliability gaps.
          </p>
        </RevealOnScroll>

        <div className="mt-6 divide-y divide-line rounded-xl2 border border-line bg-surface">
          {openSource.slice(0, showAll ? undefined : 4).map((contribution, i) => {
            const [org, repoName] = contribution.repo.split("/");
            return (
              <RevealOnScroll key={contribution.id} delay={Math.min(i, 4) * 0.04}>
              <SpotlightCard className="p-5 transition-colors hover:bg-surface-hover">
                <div className="flex items-center gap-2.5">
                  <OrgLogo org={org} size={20} className="shrink-0" />
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

                <div className="mt-3 flex items-center gap-3 font-mono text-[11px] font-semibold">
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                    {contribution.status}
                  </span>
                  <span className="text-emerald-400">
                    +<CountUp value={contribution.linesAdded} />
                  </span>
                  <span className="text-muted">
                    &minus;<CountUp value={contribution.linesRemoved} />
                  </span>
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
              </RevealOnScroll>
            );
          })}
        </div>

        {!showAll && openSource.length > 4 && (
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
