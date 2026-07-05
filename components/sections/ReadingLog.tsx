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
  finished: "text-teal-dark border-teal/30",
  reading: "text-violet border-violet/30",
  "want-to-read": "text-muted border-line",
};

const STATUS_LABEL: Record<ReadingLogEntry["status"], string> = {
  finished: "Finished",
  reading: "Reading",
  "want-to-read": "Want to read",
};

export default function ReadingLog() {
  return (
    <section id="reading" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-amber-dark">
            Reading Log
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            What I&rsquo;m <span className="italic text-amber-dark">reading and learning.</span>
          </h2>
        </RevealOnScroll>

        <div className="mt-12 divide-y divide-line rounded-xl2 border border-line bg-surface">
          {readingLog.map((entry, i) => {
            const Icon = TYPE_ICONS[entry.type];
            return (
              <RevealOnScroll key={entry.id} delay={i * 0.04}>
                <div className="flex items-start gap-4 p-5 transition-colors hover:bg-paper/60 md:items-center">
                  <div className="mt-0.5 shrink-0 rounded-full border border-line bg-paper p-2 md:mt-0">
                    <Icon size={16} className="text-muted" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="font-display text-base font-semibold text-ink">
                        {entry.title}
                      </p>
                      {entry.link && (
                        <a
                          href={entry.link}
                          className="text-muted transition-colors hover:text-ink"
                          aria-label="Open link"
                        >
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted">{entry.source}</p>
                    {entry.takeaway && (
                      <p className="mt-1 text-sm italic text-ink/70">
                        &ldquo;{entry.takeaway}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${STATUS_STYLES[entry.status]}`}
                    >
                      {STATUS_LABEL[entry.status]}
                    </span>
                    {entry.date && (
                      <span className="font-mono text-[11px] text-muted">{entry.date}</span>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
