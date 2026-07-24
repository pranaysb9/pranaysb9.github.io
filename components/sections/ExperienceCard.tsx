"use client";

import { useState } from "react";
import { ChevronDown, Rocket, FlaskConical, Trophy, Building2 } from "lucide-react";
import type { ExperienceEntry } from "@/data/content";

const ICONS = {
  rocket: Rocket,
  flask: FlaskConical,
  trophy: Trophy,
  building: Building2,
};

type Props = {
  entry: ExperienceEntry;
  highlighted?: boolean;
};

/**
 * Uses the CSS grid-rows 0fr/1fr trick for the expand animation instead of
 * measuring height in JS — smoother, and doesn't need a ref/ResizeObserver.
 */
export default function ExperienceCard({ entry, highlighted }: Props) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[entry.icon];
  const isCurrent = entry.dateRange.toLowerCase().includes("present");

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-line bg-surface p-6 transition-all duration-300 ${
        isCurrent ? "border-l-2 border-l-ink" : ""
      } ${highlighted ? "ring-2 ring-accent ring-offset-2 ring-offset-paper" : ""}`}
    >
      {isCurrent && (
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-ink" />
          Current
        </span>
      )}

      <div className="inline-flex items-center justify-center rounded-full border border-line bg-paper p-2">
        <Icon size={16} className="text-ink" aria-hidden />
      </div>

      <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted">
        {entry.dateRange}
      </p>
      <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
        {entry.org}
      </h3>
      <p className="text-base text-ink/80">{entry.role}</p>
      <p className="mt-1 text-sm text-muted">{entry.detail}</p>

      {entry.bullets && entry.bullets.length > 0 && (
        <>
          <div
            className="grid transition-[grid-template-rows] duration-200 ease-out"
            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <ul className="mt-4 space-y-1.5 text-sm text-ink/80">
                {entry.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-muted">·</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink"
            >
              View Details
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>

            {entry.caseStudyId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window !== "undefined") {
                    window.history.pushState(null, "", `/?caseStudy=${entry.caseStudyId}`);
                    window.dispatchEvent(new Event("popstate"));
                  }
                }}
                className="link-underline flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-accent"
              >
                View Case Study ↗
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
