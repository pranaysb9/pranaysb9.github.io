"use client";

import type { ExperienceEntry } from "@/data/content";

type Props = {
  entries: ExperienceEntry[];
  onSelect: (id: string) => void;
  activeId: string | null;
};

/**
 * A horizontal row of small milestone markers above the timeline — click one
 * to smoothly scroll to (and briefly highlight) that entry below. This is
 * functional, not just decorative: it's a jump-nav for the timeline, useful
 * once there are more than 3-4 entries.
 */
export default function ExperienceRibbon({ entries, onSelect, activeId }: Props) {
  return (
    <div className="mb-14 flex snap-x gap-3 overflow-x-auto pb-2">
      {entries.map((entry) => (
        <button
          key={entry.id}
          onClick={() => onSelect(entry.id)}
          className={`shrink-0 snap-start rounded-full border px-4 py-2 text-left transition-colors ${
            activeId === entry.id
              ? "border-violet bg-violet/10"
              : "border-line bg-surface hover:border-violet/40"
          }`}
        >
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {entry.dateRange}
          </p>
          <p className="text-sm font-medium text-ink">{entry.org}</p>
        </button>
      ))}
    </div>
  );
}
