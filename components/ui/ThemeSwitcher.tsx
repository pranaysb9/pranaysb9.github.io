"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const THEMES = [
  { id: "parchment", label: "Parchment", swatch: "#F7F3EA" },
  { id: "ivory", label: "Ivory", swatch: "#FAF9F6" },
  { id: "warm-gray", label: "Warm Gray", swatch: "#E8E6E0" },
  { id: "cool-slate", label: "Cool Slate", swatch: "#E7EAEC" },
  { id: "sky", label: "Sky", swatch: "#E3EEF5" },
  { id: "terracotta", label: "Terracotta", swatch: "#F7E4DB" },
  { id: "rose", label: "Rose", swatch: "#F7E1EA" },
  { id: "mustard", label: "Mustard", swatch: "#F2E8CE" },
  { id: "sage", label: "Sage", swatch: "#E5EBDD" },
  { id: "lavender", label: "Lavender", swatch: "#EAE6F2" },
  { id: "charcoal", label: "Charcoal", swatch: "#17181A" },
  { id: "midnight", label: "Midnight", swatch: "#15120D" },
] as const;

const STORAGE_KEY = "portfolio-theme";

/**
 * A dev/preview tool, not a permanent feature — it lets you click through
 * background/surface/text shade presets live and see the whole site update,
 * so you can pick a favorite before deciding. It only touches the six
 * neutral tokens (paper/surface/ink/muted/line) defined in globals.css —
 * the violet/amber/coral/teal accent system never changes.
 *
 * Once you've picked one, you can either leave this in (it's harmless and
 * genuinely useful to revisit later) or delete this file + its import in
 * layout.tsx and hardcode your chosen preset's values directly into
 * tailwind.config.ts.
 */
export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("parchment");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setActive(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  function selectTheme(id: string) {
    setActive(id);
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem(STORAGE_KEY, id);
  }

  return (
    <div className="fixed bottom-5 left-5 z-[90] flex flex-col items-start gap-2">
      {open && (
        <div className="flex max-h-80 flex-col gap-1 overflow-y-auto rounded-xl2 border border-line bg-surface p-3 shadow-lg">
          <p className="mb-1 px-1 font-mono text-[10px] uppercase tracking-wider text-muted">
            Background shade
          </p>
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => selectTheme(t.id)}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${
                active === t.id ? "bg-violet/10 text-violet" : "text-ink hover:bg-paper"
              }`}
            >
              <span
                className="h-4 w-4 shrink-0 rounded-full border border-line"
                style={{ backgroundColor: t.swatch }}
              />
              {t.label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Preview background shades"
        className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-3 text-sm font-medium text-ink shadow-md transition-colors hover:border-violet hover:text-violet"
      >
        <Palette size={16} />
      </button>
    </div>
  );
}
