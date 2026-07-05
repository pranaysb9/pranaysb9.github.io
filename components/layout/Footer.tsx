import { Github, Linkedin, FileText } from "lucide-react";
import { profile, philosophyQuote, marqueeFragments } from "@/data/content";
import GradientBlob from "@/components/ui/GradientBlob";
import Marquee from "@/components/ui/Marquee";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import MagneticButton from "@/components/ui/MagneticButton";

const SECONDARY_LINKS = [
  { label: "GitHub", href: profile.socials.github, icon: Github },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin },
  { label: "Resume", href: profile.socials.resume, icon: FileText },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <GradientBlob hue="violet" className="-bottom-24 -left-32 h-80 w-80" />
      <GradientBlob hue="coral" className="-top-16 -right-20 h-72 w-72 opacity-[0.07]" />

      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:px-10">
        <RevealOnScroll>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-teal-dark">
            Let&rsquo;s talk
          </p>
          <h2 className="font-display text-4xl leading-[1.05] text-ink md:text-6xl">
            Got something worth
            <br />
            <span className="italic text-violet">building</span>{" "}
            <span className="font-bold">together?</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-10">
          <MagneticButton href={profile.socials.email}>
            Say hello ↗
          </MagneticButton>
        </RevealOnScroll>

        <RevealOnScroll delay={0.18} className="mt-16 border-t border-line pt-12">
          <span className="font-display text-5xl leading-none text-amber-dark/40">
            &ldquo;
          </span>
          <blockquote className="-mt-6 font-display text-xl italic leading-snug text-ink/80 md:text-2xl">
            {philosophyQuote}
          </blockquote>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">
            Core Engineering Philosophy
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.24} className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {SECONDARY_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-violet hover:text-violet hover:shadow-sm"
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </RevealOnScroll>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 pb-6 text-xs text-muted md:flex-row md:px-10">
        <span>
          {profile.name} <span className="mx-1">·</span> {profile.location}
        </span>
        <span className="font-mono uppercase tracking-wider">
          Built with Next.js
        </span>
      </div>

      <Marquee items={marqueeFragments} />
    </footer>
  );
}
