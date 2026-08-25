"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Github, ArrowUpRight, Radio, FlaskConical, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/data/content";
import { caseStudies } from "@/data/caseStudies";
import CaseStudyModal from "@/components/case-study/CaseStudyModal";
import TiltCard from "@/components/ui/TiltCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const railRef = useRef<HTMLDivElement>(null);

  const filters = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category[0])))], []);
  const visible = filter === "All" ? projects : projects.filter((p) => p.category[0] === filter);

  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const caseStudyId = params.get("caseStudy");
        if (caseStudyId) {
          const proj = projects.find((p) => p.caseStudyId === caseStudyId);
          if (proj) {
            setActiveProject(proj);
            return;
          }
        }
        setActiveProject(null);
      }
    };

    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const activeCaseStudy =
    activeProject?.caseStudyId ? caseStudies[activeProject.caseStudyId] : null;

  const handleOpen = (project: Project) => {
    window.history.pushState(null, "", `/?caseStudy=${project.caseStudyId}`);
    window.dispatchEvent(new Event("popstate"));
  };

  const handleClose = () => {
    window.history.pushState(null, "", window.location.pathname);
    window.dispatchEvent(new Event("popstate"));
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const scrollRail = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section id="projects" className="scroll-mt-16 border-t border-line py-16">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <RevealOnScroll className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted">Projects</h2>
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                  filter === f
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-line text-muted hover:text-ink"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      {/* Horizontal scroll rail */}
      <div className="relative mt-6">
        <div
          ref={railRef}
          className="rail flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:px-12"
        >
          {visible.map((project, i) => {
            const isOpen = expanded.has(project.id);
            const status = project.liveUrl ? "Live" : project.associatedExperience ? "Research" : "Built";

            return (
              <RevealOnScroll key={project.id} delay={i * 0.05} className="w-[320px] shrink-0 snap-start sm:w-[360px]">
              <TiltCard
                className="flex h-full w-full flex-col rounded-xl2 border border-line bg-surface p-5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      status === "Live" ? "bg-accent/10 text-accent" : "bg-line/60 text-muted"
                    )}
                  >
                    {status === "Live" && <Radio size={8} className="animate-pulse" />}
                    {status}
                  </span>
                  <span className="text-[10px] font-medium text-muted">{project.category.join(" / ")}</span>
                </div>

                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{project.title}</h3>
                <p className="text-xs text-muted">{project.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{project.shipped}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded bg-paper px-1.5 py-0.5 text-[10px] font-medium text-muted">
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => toggleExpand(project.id)}
                  className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-muted transition-colors hover:text-ink"
                >
                  {isOpen ? "Hide" : "Show"} engineering details
                  <ChevronDown size={13} className={cn("transition-transform", isOpen && "rotate-180")} />
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-200 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="mt-3 space-y-2.5 border-t border-line pt-3 text-[13px] leading-relaxed text-ink/75">
                      <p><span className="font-semibold text-ink">Problem — </span>{project.problem}</p>
                      <p><span className="font-semibold text-ink">Build — </span>{project.build}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3 text-xs font-medium">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link-underline flex items-center gap-1 text-muted transition-colors hover:text-ink">
                      <Github size={12} /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-accent">
                      {project.liveLabel ?? "Live"}
                    </a>
                  )}
                  {project.associatedExperience && (
                    <a href={project.associatedExperience.href} className="link-underline flex items-center gap-1 text-muted transition-colors hover:text-ink">
                      <FlaskConical size={12} /> {project.associatedExperience.label}
                    </a>
                  )}
                  {project.caseStudyId && (
                    <button onClick={() => handleOpen(project)} className="link-underline ml-auto flex items-center gap-1 text-ink">
                      Case study <ArrowUpRight size={12} />
                    </button>
                  )}
                </div>
              </TiltCard>
              </RevealOnScroll>
            );
          })}
        </div>

        <div className="mx-auto mt-2 flex max-w-3xl items-center gap-2 px-6 md:px-12">
          <button
            onClick={() => scrollRail(-1)}
            aria-label="Scroll projects left"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-ink"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            onClick={() => scrollRail(1)}
            aria-label="Scroll projects right"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-ink"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {activeProject && (
        <CaseStudyModal caseStudy={activeCaseStudy} onClose={handleClose} />
      )}
    </section>
  );
}
