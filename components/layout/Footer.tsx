"use client";

import { useEffect, useState } from "react";
import { philosophyQuote, profile } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Footer() {
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    console.log(
      `%cLooking under the hood — I like that.\n%cSource: ${profile.socials.github}`,
      "font-family: monospace; font-size: 13px; font-weight: 600; color: #4ADE94;",
      "font-family: monospace; font-size: 12px; color: #8E948F;"
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDevMode(document.documentElement.classList.contains("developer-mode"));
    const handleModeChange = (e: Event) => setDevMode((e as CustomEvent).detail);
    window.addEventListener("dev-mode-change", handleModeChange);
    return () => window.removeEventListener("dev-mode-change", handleModeChange);
  }, []);

  const toggleDevMode = () => {
    const isDev = document.documentElement.classList.toggle("developer-mode");
    setDevMode(isDev);
    window.dispatchEvent(new CustomEvent("dev-mode-change", { detail: isDev }));
  };

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-14 md:px-12">
        <blockquote className="max-w-xl text-lg italic leading-snug text-ink/80">
          &ldquo;{philosophyQuote}&rdquo;
        </blockquote>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-muted">
          Core Engineering Philosophy
        </p>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 border-t border-line px-6 py-6 text-xs text-muted md:flex-row md:px-12">
        <span>
          {profile.name} <span className="mx-2 text-line">|</span> {profile.location}
        </span>

        <button
          onClick={toggleDevMode}
          className="flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          <span className={cn("h-1.5 w-1.5 rounded-full transition-colors", devMode ? "bg-accent animate-pulse" : "bg-line")} />
          Blueprint mode: {devMode ? "ON" : "OFF"}
        </button>

        <span className="font-mono text-[10px] uppercase tracking-wider">Built with Next.js</span>
      </div>
    </footer>
  );
}
