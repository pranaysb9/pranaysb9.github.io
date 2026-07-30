"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FolderGit2, GitBranch, Briefcase, Lightbulb, Award, Menu, X, Search } from "lucide-react";
import { profile } from "@/data/content";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Open Source", href: "#open-source", icon: GitBranch },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Notes", href: "#notes", icon: Lightbulb },
  { label: "Achievements", href: "#achievements", icon: Award },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-Spy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    const sections = ["projects", "open-source", "experience", "notes", "achievements"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (href: string) => {
    setActive(href);
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-12",
          scrolled
            ? "border-b border-line bg-paper/85 py-3 backdrop-blur-lg"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <a
          href="#top"
          onClick={() => handleNavClick("#top")}
          className="font-display text-xl font-bold italic tracking-tight text-ink transition-transform hover:scale-105"
        >
          {profile.name.split(" ")[0]}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-sm md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href;
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-250",
                  isActive ? "text-surface" : "text-muted hover:text-ink"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}
                <Icon size={12} className="relative z-10" aria-hidden />
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            aria-label="Open quick search"
            className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-medium text-muted transition-colors duration-200 hover:border-ink hover:text-ink sm:flex"
          >
            <Search size={14} aria-hidden />
            <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </button>

          <a
            href={profile.socials.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line bg-surface px-5 py-2 text-xs font-semibold uppercase tracking-wider text-ink transition-all duration-200 hover:border-ink hover:bg-paper"
          >
            Resume
          </a>

          {/* Hamburger Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-full border border-line bg-surface p-2 text-ink hover:border-ink md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 border-b border-line bg-surface p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.href;
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors",
                      isActive
                        ? "bg-paper text-accent border border-line"
                        : "text-muted hover:bg-paper/40 hover:text-ink"
                    )}
                  >
                    <Icon size={16} className={isActive ? "text-accent" : "text-muted"} aria-hidden />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
