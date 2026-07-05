import { Users, Award } from "lucide-react";
import { leadership, recognition, experience, openSource } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CountUp from "@/components/ui/CountUp";
import { colorways } from "@/lib/colorways";

const STATS = [
  { label: "Leadership Roles", value: leadership.length },
  { label: "Awards Won", value: recognition.length },
  { label: "Roles & Programs", value: experience.length },
  { label: "OSS Contributions", value: openSource.length },
];

export default function Achievements() {
  return (
    <section id="achievements" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Stats strip — numbers are derived from the actual data arrays,
            not hardcoded, so they stay accurate as content is added. */}
        <RevealOnScroll>
          <div className="grid grid-cols-2 gap-4 rounded-xl2 border border-line bg-surface p-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-ink">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid gap-16 md:grid-cols-2">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-violet">
              Leadership
            </p>
            <ul className="space-y-3">
              {leadership.map((item, i) => {
                const c = colorways[item.colorway];
                return (
                  <RevealOnScroll key={item.role + item.org} delay={i * 0.06}>
                    <li className={`flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${c.borderHover}`}>
                      <div className={`shrink-0 rounded-full border ${c.borderIdle} bg-paper p-2`}>
                        <Users size={16} className={c.iconText} />
                      </div>
                      <div>
                        <p className="font-display text-lg font-semibold text-ink">
                          {item.role}
                        </p>
                        <p className="text-sm text-muted">{item.org}</p>
                      </div>
                    </li>
                  </RevealOnScroll>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-amber-dark">
              Recognition
            </p>
            <ul className="space-y-3">
              {recognition.map((item, i) => {
                const c = colorways[item.colorway];
                return (
                  <RevealOnScroll key={item.place + item.event} delay={i * 0.06}>
                    <li className={`relative overflow-hidden rounded-xl border-2 bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${c.borderIdle} ${c.borderHover}`}>
                      <div className={`absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-10 ${c.topBar}`} />
                      <div className="relative flex items-center gap-4">
                        <div className={`shrink-0 rounded-full border ${c.borderIdle} bg-paper p-2`}>
                          <Award size={16} className={c.iconText} />
                        </div>
                        <div>
                          <p className="font-display text-lg font-semibold text-ink">
                            {item.place}
                          </p>
                          <p className="text-sm text-muted">{item.event}</p>
                        </div>
                      </div>
                    </li>
                  </RevealOnScroll>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
