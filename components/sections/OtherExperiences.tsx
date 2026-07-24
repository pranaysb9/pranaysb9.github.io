import { TrendingUp, Cpu, Database, GraduationCap, Users } from "lucide-react";
import { otherExperiences } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

function getRoleIcon(org: string) {
  const o = org.toLowerCase();
  if (o.includes("tech meet") || o.includes("aegis")) return TrendingUp;
  if (o.includes("google developer") || o.includes("gdg")) return Cpu;
  if (o.includes("data science") || o.includes("club")) return Database;
  if (o.includes("mentor") || o.includes("student mentor")) return GraduationCap;
  return Users;
}

export default function OtherExperiences() {
  return (
    <section className="px-6 py-24 md:px-12 border-t border-line/50 bg-paper/20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Grid Left Column: Section Header */}
          <div className="md:col-span-4 md:sticky md:top-28 h-fit">
            <RevealOnScroll>
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-2">04 // Engagement</div>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Leadership & <span className="italic font-bold text-accent">Community</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Engagement across engineering clubs, hackathon planning, developer groups, and peer mentoring.
              </p>
            </RevealOnScroll>
          </div>

          {/* Grid Right Column: Content Grid */}
          <div className="md:col-span-8">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              {otherExperiences.map((item, i) => {
                const Icon = getRoleIcon(item.org);
                return (
                  <RevealOnScroll key={item.role + item.org} delay={i * 0.05}>
                    <div className="flex h-full flex-col gap-4 rounded-xl border border-line bg-surface p-6 shadow-sm hover:border-accent/40 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="shrink-0 rounded-full border border-line bg-paper p-2.5">
                          <Icon size={16} className="text-accent" aria-hidden />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-lg font-bold text-ink truncate">
                            {item.role}
                          </p>
                          <p className="font-mono text-[9px] font-semibold text-muted uppercase tracking-wider truncate">{item.org}</p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-ink/80 flex-1">
                        {item.description}
                      </p>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
