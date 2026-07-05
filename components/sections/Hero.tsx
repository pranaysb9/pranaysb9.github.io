import { profile, snapshot } from "@/data/content";
import GradientBlob from "@/components/ui/GradientBlob";
import MagneticButton from "@/components/ui/MagneticButton";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import FloatingTag from "@/components/ui/FloatingTag";
import IndexCardStack from "@/components/ui/IndexCardStack";
import TerminalWindow from "@/components/ui/TerminalWindow";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-20 md:px-10">
      <GradientBlob hue="violet" className="-right-24 -top-24 h-96 w-96" />
      <GradientBlob hue="teal" className="-left-40 top-40 h-72 w-72 opacity-[0.06]" />

      <div className="relative mx-auto max-w-6xl">
        <RevealOnScroll>
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            {profile.availability}
          </span>
        </RevealOnScroll>

        <div className="mt-10 grid gap-16 md:grid-cols-[1.3fr_1fr] md:gap-10">
          {/* Masthead — no bordering card, floats directly on the page */}
          <div className="relative">
          <div className="mb-6 flex flex-wrap gap-3">
            <FloatingTag
              label={profile.heroTags[0]?.label ?? "Builder"}
              colorway={profile.heroTags[0]?.colorway ?? "violet"}
              rotate={-2}
              delay={0}
            />
            <FloatingTag
              label={profile.heroTags[1]?.label ?? "Founder"}
              colorway={profile.heroTags[1]?.colorway ?? "coral"}
              rotate={1}
              delay={1.2}
            />
            <FloatingTag
              label={profile.heroTags[2]?.label ?? "Researcher"}
              colorway={profile.heroTags[2]?.colorway ?? "teal"}
              rotate={-1}
              delay={2.1}
            />
          </div>

          <RevealOnScroll>
            {/* Stacked masthead headline: caps line + huge italic emphasis + bold close */}
            <h1 className="font-display leading-[1.02] text-ink">
              <span className="block text-2xl font-semibold uppercase tracking-tight text-muted md:text-3xl">
                {profile.heroLine1}
              </span>
              <span className="mt-1 block text-5xl italic text-amber-dark md:text-7xl">
                {profile.heroEmphasis}
              </span>
              <span className="mt-1 block text-3xl font-bold md:text-4xl">
                {profile.heroLine2}
              </span>
            </h1>

            <p className="mt-8 max-w-md text-base text-muted">{profile.bio}</p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <MagneticButton href="#projects">See the work →</MagneticButton>
              <TerminalWindow lines={profile.terminalLines} />
            </div>
          </RevealOnScroll>
        </div>

        {/* Index card stack on the right */}
        <RevealOnScroll delay={0.12} className="flex flex-col items-center justify-center md:items-end">
          <p className="mb-5 font-mono text-xs uppercase tracking-widest text-teal-dark self-start md:self-auto">
            Professional Snapshot
          </p>
          <IndexCardStack rows={snapshot} />
        </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
