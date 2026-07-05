import { GitPullRequest } from "lucide-react";
import { openSource } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CountUp from "@/components/ui/CountUp";

export default function OpenSource() {
  return (
    <section id="open-source" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <h2 className="font-display text-4xl text-ink md:text-5xl">
            Improving the core infrastructure that{" "}
            <span className="italic text-accent">powers production AI.</span>
          </h2>
        </RevealOnScroll>

        <div className="mt-16 space-y-16">
          {openSource.map((contribution) => (
            <RevealOnScroll key={contribution.id}>
              <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
                {/* Story side */}
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-3xl text-line">
                      {contribution.number}
                    </span>
                    <a
                      href={contribution.repoUrl}
                      className="link-underline font-mono text-sm text-muted hover:text-ink"
                    >
                      {contribution.repo} ↗
                    </a>
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-ink">
                    {contribution.title}
                  </h3>

                  <p className="mb-2 mt-8 font-mono text-xs uppercase tracking-wider text-muted">
                    The Context
                  </p>
                  <blockquote className="font-display text-xl italic leading-snug text-ink/90">
                    &ldquo;{contribution.context}&rdquo;
                  </blockquote>

                  <p className="mb-2 mt-6 font-mono text-xs uppercase tracking-wider text-muted">
                    The Impact
                  </p>
                  <p className="text-ink/85">{contribution.impact}</p>
                </div>

                {/* PR data card */}
                <div className="h-fit rounded-xl2 border border-line bg-surface p-6">
                  <p className="mb-4 font-mono text-xs uppercase tracking-wider text-muted">
                    Pull Request Data
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-sm text-ink">
                      <GitPullRequest size={15} className="text-accent" />
                      {contribution.prNumber}
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] font-medium uppercase text-emerald-700">
                      {contribution.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-line pt-4 font-mono text-sm tabular-nums">
                    <span className="text-emerald-700">
                      +<CountUp value={contribution.linesAdded} /> lines added
                    </span>
                    <span className="text-accent">
                      -<CountUp value={contribution.linesRemoved} /> removed
                    </span>
                  </div>

                  {contribution.reviewerNote && (
                    <p className="mt-4 rounded-lg bg-paper p-3 font-display text-sm italic text-muted">
                      &ldquo;{contribution.reviewerNote}&rdquo;
                    </p>
                  )}

                  <a
                    href={contribution.sourceUrl}
                    className="link-underline mt-4 inline-block font-mono text-xs uppercase tracking-wider text-ink"
                  >
                    View Source ↗
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
