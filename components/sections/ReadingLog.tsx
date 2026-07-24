import { BookOpen, Newspaper, FileText, Youtube, StickyNote, ArrowUpRight } from "lucide-react";
import { readingLog, type ReadingLogEntry } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const TYPE_ICONS: Record<ReadingLogEntry["type"], typeof BookOpen> = {
  book: BookOpen,
  article: Newspaper,
  paper: FileText,
  video: Youtube,
  note: StickyNote,
};

const STATUS_STYLES: Record<ReadingLogEntry["status"], string> = {
  finished: "text-ink border-line",
  reading: "text-accent border-accent/30",
  "want-to-read": "text-muted border-line",
};

const STATUS_LABEL: Record<ReadingLogEntry["status"], string> = {
  finished: "Finished",
  reading: "Reading",
  "want-to-read": "Want to read",
};

export default function ReadingLog() {
  return (
    <section id="reading" className="px-6 py-24 md:px-12 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Grid Left Column: Section Header */}
          <div className="md:col-span-4 md:sticky md:top-28 h-fit">
            <RevealOnScroll>
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-2">06 // Learning</div>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Reading <span className="italic font-bold text-accent">Log</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Articles, books, and scientific publications I'm currently digesting to expand my technical knowledge.
              </p>
            </RevealOnScroll>
          </div>

          {/* Grid Right Column: Reading list */}
          <div className="md:col-span-8">
            <div className="divide-y divide-line rounded-xl border border-line bg-surface shadow-sm">
              {readingLog.map((entry, i) => {
                const Icon = TYPE_ICONS[entry.type];
                return (
                  <RevealOnScroll key={entry.id} delay={i * 0.04}>
                    <div className="group flex items-start gap-4 p-5 transition-all duration-300 hover:bg-paper/40 hover:pl-7 md:items-center">
                      <div className="mt-0.5 shrink-0 rounded-full border border-line bg-paper p-2.5 md:mt-0 transition-transform group-hover:scale-110">
                        <Icon size={14} className="text-accent" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <p className="font-display text-base font-semibold text-ink group-hover:text-accent transition-colors duration-250">
                            {entry.title}
                          </p>
                          {entry.link && (
                            <a
                              href={entry.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted transition-colors hover:text-ink"
                              aria-label="Open link"
                            >
                              <ArrowUpRight size={13} />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-muted uppercase tracking-wider font-mono font-medium">{entry.source}</p>
                        {entry.takeaway && (
                          <p className="mt-2 text-xs italic text-ink/75 bg-paper/30 border-l border-line/80 pl-3">
                            &ldquo;{entry.takeaway}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-1.5 ml-2">
                        <span
                          className={`rounded px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider border ${STATUS_STYLES[entry.status]}`}
                        >
                          {STATUS_LABEL[entry.status]}
                        </span>
                        {entry.date && (
                          <span className="font-mono text-[10px] text-muted font-medium">{entry.date}</span>
                        )}
                      </div>
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
