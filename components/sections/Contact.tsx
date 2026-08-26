"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, Check, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/content";

const TILES = [
  { label: "GitHub", href: profile.socials.github, icon: Github, external: true },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin, external: true },
  { label: "Résumé", href: profile.socials.resume, icon: FileText, external: true },
];

const tileHover = { y: -3, transition: { type: "spring" as const, stiffness: 400, damping: 20 } };

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.socials.email.replace("mailto:", ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the mail tile's href still works.
    }
  };

  return (
    <section id="contact" className="scroll-mt-16 border-t border-line px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted">Contact</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TILES.map(({ label, href, icon: Icon, external }) => (
            <motion.a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              whileHover={tileHover}
              whileTap={{ scale: 0.97 }}
              className="group flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center justify-between">
                <Icon size={16} className="text-muted transition-colors group-hover:text-accent" />
                <ArrowUpRight size={13} className="text-muted/50 transition-colors group-hover:text-accent" />
              </div>
              <span className="text-sm font-medium text-ink">{label}</span>
            </motion.a>
          ))}

          <motion.button
            onClick={copyEmail}
            whileHover={tileHover}
            whileTap={{ scale: 0.97 }}
            className="group flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 text-left transition-colors hover:border-accent/40"
          >
            <div className="flex items-center justify-between">
              {copied ? (
                <Check size={16} className="text-accent" />
              ) : (
                <Mail size={16} className="text-muted transition-colors group-hover:text-accent" />
              )}
            </div>
            <span className="text-sm font-medium text-ink">{copied ? "Copied!" : "Copy Email"}</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
