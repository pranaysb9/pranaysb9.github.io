"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ArrowUpRight, Radio, FlaskConical, ChevronDown, Bot, Globe, Cpu, Wrench } from "lucide-react";
import { projects, type Project } from "@/data/content";
import { caseStudies } from "@/data/caseStudies";
import CaseStudyModal from "@/components/case-study/CaseStudyModal";
import TiltCard from "@/components/ui/TiltCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS = { bot: Bot, globe: Globe, cpu: Cpu, wrench: Wrench };

// Bento rhythm: every 3rd card (0, 3, 6…) spans the full width as a
// "featured" cell — breaks the equal-size grid up without needing real
// screenshots, using the categoryIcon data that already existed but was
// never actually rendered anywhere.
function isFeatured(i: number) {
  return i % 3 === 0;
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

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

  return (
    <section id="projects" className="scroll-mt-16 border-t border-line px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
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

        <motion.div layout className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => {
              const isOpen = expanded.has(project.id);
              const status = project.liveUrl ? "Live" : project.associatedExperience ? "Research" : "Built";
              const featured = isFeatured(i);
              const Icon = CATEGORY_ICONS[project.categoryIcon];

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={featured ? "sm:col-span-2" : undefined}
                >
                  <TiltCard className="relative flex h-full w-full flex-col overflow-hidden rounded-xl2 border border-line bg-surface p-5">
                    <Icon
                      size={featured ? 128 : 88}
                      strokeWidth={1}
                      className="pointer-events-none absolute -right-4 -top-4 text-line/60"
                      aria-hidden
                    />

                    <div className="relative flex items-center justify-between">
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

                    <h3
                      className={cn(
                        "relative mt-3 font-display font-semibold text-ink",
                        featured ? "text-2xl" : "text-lg"
                      )}
                    >
                      {project.title}
                    </h3>
                    <p className="relative text-xs text-muted">{project.subtitle}</p>
                    <p
                      className={cn(
                        "relative mt-3 leading-relaxed text-ink/75",
                        featured ? "max-w-xl text-[15px]" : "text-sm"
                      )}
                    >
                      {project.shipped}
                    </p>

                    <div className="relative mt-3 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span key={tech} className="rounded bg-paper px-1.5 py-0.5 text-[10px] font-medium text-muted">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="relative mt-4 flex items-center gap-1 text-[11px] font-semibold text-muted transition-colors hover:text-ink"
                    >
                      {isOpen ? "Hide" : "Show"} engineering details
                      <ChevronDown size={13} className={cn("transition-transform", isOpen && "rotate-180")} />
                    </button>

                    <div
                      className="relative grid transition-[grid-template-rows] duration-200 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={cn(
                            "mt-3 space-y-2.5 border-t border-line pt-3 leading-relaxed text-ink/75",
                            featured ? "grid gap-2.5 text-[13px] sm:grid-cols-2" : "text-[13px]"
                          )}
                        >
                          <p><span className="font-semibold text-ink">Problem — </span>{project.problem}</p>
                          <p><span className="font-semibold text-ink">Build — </span>{project.build}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3 text-xs font-medium">
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {activeProject && (
        <CaseStudyModal caseStudy={activeCaseStudy} onClose={handleClose} />
      )}
    </section>
  );
}
