import { Lightbulb, ArrowUpRight } from "lucide-react";
import { engineeringNotes } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import OrgLogo from "@/components/ui/OrgLogo";

export default function EngineeringNotes() {
  return (
    <section id="notes" className="px-6 py-24 md:px-12 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Grid Left Column: Section Header */}
          <div className="md:col-span-4 md:sticky md:top-28 h-fit">
            <RevealOnScroll>
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-2">06 // Engineering Notes</div>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Lessons from <span className="italic font-bold text-accent">shipped fixes.</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Short technical takeaways pulled from real, merged pull requests and research —
                not things I read, things I had to work out.
              </p>
            </RevealOnScroll>
          </div>

          {/* Grid Right Column: Notes list */}
          <div className="md:col-span-8">
            <div className="divide-y divide-line rounded-xl border border-line bg-surface shadow-sm">
              {engineeringNotes.map((note, i) => (
                <RevealOnScroll key={note.id} delay={i * 0.04}>
                  <div className="group flex items-start gap-4 p-5 transition-all duration-300 hover:bg-paper/40 hover:pl-7 md:items-start">
                    <div className="mt-0.5 shrink-0 rounded-full border border-line bg-paper p-2.5 transition-transform group-hover:scale-110">
                      {note.org ? (
                        <OrgLogo org={note.org} size={14} />
                      ) : (
                        <Lightbulb size={14} className="text-accent" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <p className="font-display text-base font-semibold text-ink group-hover:text-accent transition-colors duration-250">
                          {note.title}
                        </p>
                        <a
                          href={note.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted transition-colors hover:text-ink"
                          aria-label={`Open source for ${note.title}`}
                        >
                          <ArrowUpRight size={13} />
                        </a>
                      </div>
                      <p className="text-xs text-muted uppercase tracking-wider font-mono font-medium">{note.source}</p>
                      <p className="mt-2 text-xs italic text-ink/75 bg-paper/30 border-l border-line/80 pl-3">
                        &ldquo;{note.takeaway}&rdquo;
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-1.5 ml-2">
                      <span className="font-mono text-[10px] text-muted font-medium">{note.date}</span>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
