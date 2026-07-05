"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/content";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Projects", href: "#projects" },
  { label: "Open Source", href: "#open-source" },
  { label: "Experience", href: "#experience" },
  { label: "Reading", href: "#reading" },
  { label: "Achievements", href: "#achievements" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(NAV_ITEMS[0].href);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-10",
        scrolled
          ? "bg-paper/80 shadow-sm backdrop-blur-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <a href="#top" className="font-display text-lg font-semibold text-ink">
        {profile.initials}
      </a>

      <nav className="hidden items-center gap-1 rounded-full border border-line bg-surface/60 p-1 md:flex">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(item.href)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive ? "text-surface" : "text-muted hover:text-ink"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          );
        })}
      </nav>

      <MagneticButton href={profile.socials.resume} variant="outline">
        Resume
      </MagneticButton>
    </header>
  );
}
