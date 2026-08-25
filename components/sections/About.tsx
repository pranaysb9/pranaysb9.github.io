import { profile, philosophyQuote, snapshot } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const BIO_POINTS = profile.bio.split(" — ");

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-line px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted">About</h2>

          <ul className="mt-5 space-y-3">
            {BIO_POINTS.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {point}.
              </li>
            ))}
            <li className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span className="italic text-muted">&ldquo;{philosophyQuote}&rdquo;</span>
            </li>
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mt-6 rounded-xl border border-line bg-surface p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">
              Snapshot
            </p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {snapshot.map((row) => (
                <div key={row.label}>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-accent">{row.label}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{row.value}</p>
                  <p className="text-xs text-muted">{row.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
