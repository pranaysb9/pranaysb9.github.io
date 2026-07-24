"use client";

import { useState, useEffect } from "react";
import { Github, ArrowUpRight, Bot, Globe, Cpu, Wrench, Radio, FlaskConical } from "lucide-react";
import { projects, type Project } from "@/data/content";
import { caseStudies } from "@/data/caseStudies";
import SpotlightCard from "@/components/ui/SpotlightCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CaseStudyModal from "@/components/case-study/CaseStudyModal";

const CATEGORY_ICONS = {
  bot: Bot,
  globe: Globe,
  cpu: Cpu,
  wrench: Wrench,
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/?caseStudy=${project.caseStudyId}`);
      // Dispatch a popstate event to trigger any other listeners if needed
      window.dispatchEvent(new Event("popstate"));
    }
  };

  const handleClose = () => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", window.location.pathname);
      window.dispatchEvent(new Event("popstate"));
    }
  };

  return (
    <section id="projects" className="px-6 py-24 md:px-12 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Grid Left Column: Section Header */}
          <div className="md:col-span-4 md:sticky md:top-28 h-fit">
            <RevealOnScroll>
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-2">01 // Projects</div>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                Selected <span className="italic font-bold text-accent">Work</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Production-grade systems across multi-agent orchestration,
                analytics, and core infrastructure.
              </p>
            </RevealOnScroll>
          </div>

          {/* Grid Right Column: Content */}
          <div className="md:col-span-8">
            <div className="project-card-group grid grid-cols-1 gap-6 lg:grid-cols-2">
              {projects.map((project, i) => {
                const CategoryIcon = CATEGORY_ICONS[project.categoryIcon];

                return (
                  <RevealOnScroll key={project.id} delay={(i % 2) * 0.05}>
                    <SpotlightCard className="project-card-sibling group flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm">
                      {/* Category row */}
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex shrink-0 items-center gap-2">
                          <CategoryIcon size={14} className="text-muted" aria-hidden />
                          <p className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                            {project.category.join(" · ")}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-underline flex items-center gap-1 transition-colors hover:text-ink"
                            >
                              <Github size={12} aria-hidden /> GitHub
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-underline flex items-center gap-1 text-accent transition-colors hover:text-accent-dark"
                            >
                              <Radio size={11} className="animate-pulse text-accent" aria-hidden />
                              {project.liveLabel ?? "Live"}
                              <ArrowUpRight size={12} aria-hidden />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-muted uppercase tracking-wider font-mono">{project.subtitle}</p>

                      {/* Compressed problem -> build -> shipped flow */}
                      <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-ink/80 flex-1">
                        <p>
                          <span className="font-semibold text-ink">Problem: </span>
                          {project.problem}
                        </p>
                        <p>
                          <span className="font-semibold text-ink">Build: </span>
                          {project.build}
                        </p>
                        <p className="font-mono text-[11px] leading-relaxed text-muted bg-paper/60 p-3 rounded border border-line/50">
                          <span className="font-bold text-ink uppercase tracking-wider text-[9px] mr-1 bg-ink/5 px-1 py-0.5 rounded">Shipped</span>
                          <span className="font-medium text-ink/90">{project.shipped}</span>
                        </p>
                      </div>

                      <div className="mt-6 border-t border-dashed border-line pt-4">
                        {/* Tech stack — clean text chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded bg-paper border border-line px-2 py-0.5 font-mono text-[9px] font-semibold text-muted uppercase tracking-wider"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-y-3 gap-x-4">
                          {project.associatedExperience && (
                            <a
                              href={project.associatedExperience.href}
                              className="link-underline flex items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-ink"
                            >
                              <FlaskConical size={12} aria-hidden /> {project.associatedExperience.label}
                            </a>
                          )}
                          {project.caseStudyId && (
                            <button
                              onClick={() => handleOpen(project)}
                              className="link-underline ml-auto text-xs font-bold uppercase tracking-wider text-accent font-mono"
                            >
                              View Case Study ↗
                            </button>
                          )}
                        </div>
                      </div>
                    </SpotlightCard>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {activeProject && (
        <CaseStudyModal caseStudy={activeCaseStudy} onClose={handleClose} />
      )}
    </section>
  );
}
