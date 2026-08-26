"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const STORAGE_KEY = "theme";

/**
 * Dark is the site's default and primary design — light is an opt-in
 * alternate palette (see :root.light in globals.css). Preference persists
 * in localStorage; the blocking script in layout.tsx applies it before
 * first paint so there's no flash of the wrong theme.
 */
export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className="flex items-center justify-center rounded-md border border-line p-1.5 text-muted transition-colors hover:border-accent/50 hover:text-ink"
    >
      {isLight ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );
}
