"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, FileText, Copy, Check } from "lucide-react";
import { profile, philosophyQuote } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const SECONDARY_LINKS = [
  { label: "GitHub", href: profile.socials.github, icon: Github },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin },
  { label: "Resume", href: profile.socials.resume, icon: FileText },
];

export default function Footer() {
  const [devMode, setDevMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.socials.email.replace("mailto:", ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the mailto link next to it still works.
    }
  };

  useEffect(() => {
    console.log(
      `%cLooking under the hood — I like that.\n%cSource: ${profile.socials.github}`,
      "font-family: monospace; font-size: 13px; font-weight: 600; color: #2563EB;",
      "font-family: monospace; font-size: 12px; color: #75746D;"
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Read initial state
    setDevMode(document.documentElement.classList.contains("developer-mode"));

    const handleModeChange = (e: Event) => {
      const isDev = (e as CustomEvent).detail;
      setDevMode(isDev);
    };

    window.addEventListener("dev-mode-change", handleModeChange);
    return () => window.removeEventListener("dev-mode-change", handleModeChange);
  }, []);

  const toggleDevMode = () => {
    const isDev = document.documentElement.classList.toggle("developer-mode");
    setDevMode(isDev);
    window.dispatchEvent(new CustomEvent("dev-mode-change", { detail: isDev }));
  };

  return (
    <footer className="relative border-t border-line/50 bg-surface">
      <div className="mx-auto max-w-3xl px-6 py-28 text-center md:px-10">
        <RevealOnScroll>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted font-bold">
            Let&rsquo;s talk
          </p>
          <h2 className="font-display text-4xl leading-[1.05] text-ink md:text-6xl tracking-tight">
            Got something worth
            <br />
            <span className="italic text-accent font-bold">building</span>{" "}
            together?
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton href={profile.socials.email}>
            Say hello ↗
          </MagneticButton>
          <button
            onClick={copyEmail}
            aria-label="Copy email address"
            className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            {copied ? (
              <>
                <Check size={13} aria-hidden className="text-accent" />
                Copied
              </>
            ) : (
              <>
                <Copy size={13} aria-hidden />
                Copy email
              </>
            )}
          </button>
        </RevealOnScroll>

        <RevealOnScroll delay={0.18} className="mt-16 border-t border-line pt-12">
          <span className="font-display text-5xl leading-none text-line select-none">
            &ldquo;
          </span>
          <blockquote className="-mt-6 font-display text-xl italic leading-snug text-ink/80 md:text-2xl">
            {philosophyQuote}
          </blockquote>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-muted font-bold">
            Core Engineering Philosophy
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.24} className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {SECONDARY_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted transition-all duration-200 hover:border-accent hover:text-accent hover:bg-paper"
            >
              <Icon size={13} aria-hidden />
              <span>{label}</span>
            </a>
          ))}
        </RevealOnScroll>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-line px-6 py-6 text-xs text-muted md:flex-row md:px-12 font-medium">
        <span>
          {profile.name} <span className="mx-2 text-line">|</span> {profile.location}
        </span>

        {/* Blueprint Easter Egg Toggle */}
        <button
          onClick={toggleDevMode}
          className="flex items-center gap-2 rounded-full border border-line bg-surface px-4.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-muted hover:border-accent hover:text-accent hover:bg-paper transition-all shadow-sm"
        >
          <span className={cn("h-1.5 w-1.5 rounded-full transition-colors", devMode ? "bg-accent animate-pulse" : "bg-zinc-300")} />
          Blueprint mode: {devMode ? "ON" : "OFF"}
        </button>

        <span className="font-mono uppercase tracking-wider text-[10px]">
          Built with Next.js
        </span>
      </div>
    </footer>
  );
}
