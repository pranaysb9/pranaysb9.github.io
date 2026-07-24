import { Trophy, Smartphone, Rocket, Award, Activity } from "lucide-react";
import { otherExperiences, recognition, experience, openSource } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CountUp from "@/components/ui/CountUp";

const STATS = [
  { label: "Other Experiences", value: otherExperiences.length },
  { label: "Awards Won", value: recognition.length },
  { label: "Roles & Programs", value: experience.length },
  { label: "OSS Contributions", value: openSource.length },
];

function getRecognitionIcon(event: string) {
  const e = event.toLowerCase();
  if (e.includes("hackathon") || e.includes("pathway")) return Trophy;
  if (e.includes("techsprint") || e.includes("gdg")) return Smartphone;
  if (e.includes("genesis") || e.includes("meity")) return Rocket;
  return Award;
}

export default function Achievements() {
  return (
    <section id="achievements" className="px-6 py-24 md:px-12 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Grid Left Column: Section Header */}
          <div className="md:col-span-4 md:sticky md:top-28 h-fit">
            <RevealOnScroll>
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-2">05 // Achievements</div>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Honors & <span className="italic font-bold text-accent">Metrics</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Key software metrics and honors received from national programs, academic incubations, and developer hackathons.
              </p>
            </RevealOnScroll>
          </div>

          {/* Grid Right Column: Stats + Recognition cards */}
          <div className="md:col-span-8 space-y-12">
            {/* Stats Strip */}
            <RevealOnScroll>
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-line bg-surface p-6 md:grid-cols-4 shadow-sm">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-display text-3xl font-bold text-ink tracking-tight">
                      <CountUp value={s.value} />
                    </p>
                    <p className="mt-1.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-muted">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Recognition List */}
            <div className="space-y-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted font-bold">
                Awards & Honors
              </p>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {recognition.map((item, i) => {
                  const Icon = getRecognitionIcon(item.event);
                  return (
                    <RevealOnScroll key={item.place + item.event} delay={i * 0.05}>
                      <div className="flex h-full flex-col gap-4 rounded-xl border border-line bg-surface p-6 shadow-sm hover:border-accent/40 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="shrink-0 rounded-full border border-line bg-paper p-2.5">
                            <Icon size={16} className="text-accent" aria-hidden />
                          </div>
                          <div className="min-w-0">
                            <p className="font-display text-lg font-bold text-ink truncate">
                              {item.place}
                            </p>
                            <p className="font-mono text-[9px] font-semibold text-muted uppercase tracking-wider truncate">{item.event}</p>
                          </div>
                        </div>
                        {item.description && (
                          <p className="text-sm leading-relaxed text-ink/80 flex-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </RevealOnScroll>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
