"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  FolderGit2,
  GitBranch,
  Briefcase,
  Lightbulb,
  UserRound,
  Code2,
  Github,
  Linkedin,
  Mail,
  FileText,
  Terminal as TerminalIcon,
} from "lucide-react";
import { profile, projects } from "@/data/content";

type Command = {
  id: string;
  group: "Navigate" | "Case Studies" | "Links";
  label: string;
  hint?: string;
  icon: typeof Search;
  run: () => void;
};

/**
 * Global quick-nav overlay, opened via Ctrl/Cmd+K or the Navbar search
 * trigger. Keeps the same open-project mechanism Projects.tsx already uses
 * (pushState + popstate) so opening a case study from here needs no new
 * plumbing, and reuses the dev-mode-change event the Footer/Hero already
 * dispatch for Blueprint mode.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const goTo = (href: string) => {
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const openCaseStudy = (caseStudyId: string) => {
    window.history.pushState(null, "", `/?caseStudy=${caseStudyId}`);
    window.dispatchEvent(new Event("popstate"));
  };

  const toggleBlueprint = () => {
    const isDev = document.documentElement.classList.toggle("developer-mode");
    window.dispatchEvent(new CustomEvent("dev-mode-change", { detail: isDev }));
  };

  const commands: Command[] = useMemo(() => {
    const nav: Command[] = [
      { id: "nav-top", group: "Navigate", label: "Back to top", icon: ArrowRight, run: () => goTo("#top") },
      { id: "nav-about", group: "Navigate", label: "About", icon: UserRound, run: () => goTo("#about") },
      { id: "nav-projects", group: "Navigate", label: "Projects", icon: FolderGit2, run: () => goTo("#projects") },
      { id: "nav-oss", group: "Navigate", label: "Open Source", icon: GitBranch, run: () => goTo("#open-source") },
      { id: "nav-exp", group: "Navigate", label: "Experience", icon: Briefcase, run: () => goTo("#experience") },
      { id: "nav-skills", group: "Navigate", label: "Skills", icon: Code2, run: () => goTo("#skills") },
      { id: "nav-notes", group: "Navigate", label: "Notes", icon: Lightbulb, run: () => goTo("#notes") },
    ];

    const caseStudies: Command[] = projects
      .filter((p) => p.caseStudyId)
      .map((p) => ({
        id: `case-${p.id}`,
        group: "Case Studies",
        label: p.title,
        hint: p.subtitle,
        icon: FolderGit2,
        run: () => openCaseStudy(p.caseStudyId!),
      }));

    const links: Command[] = [
      { id: "link-github", group: "Links", label: "Open GitHub", icon: Github, run: () => window.open(profile.socials.github, "_blank") },
      { id: "link-linkedin", group: "Links", label: "Open LinkedIn", icon: Linkedin, run: () => window.open(profile.socials.linkedin, "_blank") },
      { id: "link-resume", group: "Links", label: "View Resume", icon: FileText, run: () => window.open(profile.socials.resume, "_blank") },
      { id: "link-email", group: "Links", label: "Send an email", icon: Mail, run: () => { window.location.href = profile.socials.email; } },
      { id: "link-blueprint", group: "Links", label: "Toggle Blueprint mode", icon: TerminalIcon, run: toggleBlueprint },
    ];

    return [...nav, ...caseStudies, ...links];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const execute = (cmd: Command) => {
    cmd.run();
    setOpen(false);
  };

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    function onOpenRequest() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenRequest);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[activeIndex];
        if (cmd) execute(cmd);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, activeIndex]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center bg-ink/50 p-4 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-xl2 border border-line bg-surface shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <Search size={16} className="shrink-0 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, project, or link…"
                className="w-full border-none bg-transparent text-sm text-ink placeholder-muted outline-none"
              />
              <kbd className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">
                ESC
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted">No matches.</p>
              )}

              {(["Navigate", "Case Studies", "Links"] as const).map((group) => {
                const items = filtered.filter((c) => c.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group} className="mb-1 last:mb-0">
                    <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                      {group}
                    </p>
                    {items.map((cmd) => {
                      runningIndex += 1;
                      const isActive = runningIndex === activeIndex;
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          onMouseEnter={() => setActiveIndex(runningIndex)}
                          onClick={() => execute(cmd)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                            isActive ? "bg-paper text-ink" : "text-ink/85"
                          }`}
                        >
                          <Icon size={15} className={isActive ? "text-accent" : "text-muted"} aria-hidden />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">{cmd.label}</span>
                            {cmd.hint && (
                              <span className="block truncate text-xs text-muted">{cmd.hint}</span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
