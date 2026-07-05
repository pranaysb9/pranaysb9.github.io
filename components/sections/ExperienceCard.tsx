"use client";

import { useState } from "react";
import { ChevronDown, Rocket, FlaskConical, Trophy, Building2 } from "lucide-react";
import type { ExperienceEntry } from "@/data/content";
import { colorways } from "@/lib/colorways";

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
  const c = colorways[entry.colorway];
  const Icon = ICONS[entry.icon];
  const isCurrent = entry.dateRange.toLowerCase().includes("present");

  return (
    <div
      className={`relative overflow-hidden rounded-xl2 border border-line border-l-4 bg-surface p-6 transition-shadow duration-500 ${c.borderSolid} ${
        highlighted ? "ring-2 ring-violet ring-offset-2 ring-offset-paper" : ""
      }`}
    >
      {isCurrent && (
        <span className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full border ${c.borderIdle} px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${c.tagText}`}>
          <span className="relative flex h-1.5 w-1.5">
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${c.topBar} opacity-75`} />
            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${c.topBar}`} />
          </span>
          Current
        </span>
      )}

      <div className={`inline-flex items-center justify-center rounded-full border ${c.borderIdle} bg-paper p-2`}>
        <Icon size={16} className={c.iconText} />
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
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <ul className="mt-4 space-y-1.5 text-sm text-ink/80">
                {entry.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className={c.tagText}>·</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-3 flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink"
          >
            View Details
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </>
      )}
    </div>
  );
}
