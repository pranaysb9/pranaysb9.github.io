import { Lightbulb, ArrowUpRight } from "lucide-react";
import { engineeringNotes } from "@/data/content";
import OrgLogo from "@/components/ui/OrgLogo";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function EngineeringNotes() {
  return (
    <section id="notes" className="scroll-mt-16 border-t border-line px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted">Notes</h2>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Short technical takeaways from real, merged pull requests and research — things I had to work out,
          not things I read.
        </p>

        <div className="mt-6 divide-y divide-line rounded-xl2 border border-line bg-surface">
          {engineeringNotes.map((note) => (
            <SpotlightCard key={note.id} className="flex items-start gap-4 p-5 transition-colors hover:bg-surface-hover">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper">
                {note.org ? <OrgLogo org={note.org} size={14} /> : <Lightbulb size={14} className="text-accent" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="text-[15px] font-semibold text-ink">{note.title}</p>
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
                <p className="font-mono text-[11px] font-medium text-muted">{note.source}</p>
                <p className="mt-2 border-l border-line pl-3 text-sm italic leading-relaxed text-ink/70">
                  &ldquo;{note.takeaway}&rdquo;
                </p>
              </div>

              <span className="ml-2 shrink-0 text-[11px] text-muted">{note.date}</span>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
