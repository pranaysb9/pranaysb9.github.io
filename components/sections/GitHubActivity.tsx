import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

// Real, live contribution data for the linked GitHub account — not a static
// image or fabricated number. ghchart.rshah.org renders a public,
// unauthenticated SVG straight from GitHub's own contribution graph.
const GITHUB_USERNAME = profile.socials.github.split("/").pop();
const CHART_URL = `https://ghchart.rshah.org/4ADE94/${GITHUB_USERNAME}`;

export default function GitHubActivity() {
  return (
    <section id="github" className="scroll-mt-16 border-t border-line px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted">GitHub Activity</h2>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline flex items-center gap-1 text-[13px] font-medium text-accent"
          >
            @{GITHUB_USERNAME} <ArrowUpRight size={13} />
          </a>
        </div>

        <RevealOnScroll delay={0.1}>
          <div className="mt-5 overflow-x-auto rounded-xl2 border border-line bg-white p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CHART_URL}
              alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
              className="min-w-[640px]"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
