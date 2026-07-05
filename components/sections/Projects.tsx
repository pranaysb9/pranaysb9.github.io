"use client";

import { useState } from "react";
import { Github, ArrowUpRight, Bot, Globe, Cpu, Wrench, Radio } from "lucide-react";
import { projects, type Project } from "@/data/content";
import { caseStudies } from "@/data/caseStudies";
import { colorways } from "@/lib/colorways";
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
  const activeCaseStudy =
    activeProject?.caseStudyId ? caseStudies[activeProject.caseStudyId] : null;

  return (
    <section id="projects" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <h2 className="font-display text-4xl text-ink md:text-5xl">
            Selected <span className="font-bold italic text-violet">Work</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Production-grade systems across multi-agent orchestration,
            analytics, and infrastructure.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {projects.map((project, i) => {
            const c = colorways[project.colorway];
            const CategoryIcon = CATEGORY_ICONS[project.categoryIcon];

            return (
              <RevealOnScroll key={project.id} delay={(i % 2) * 0.08}>
                <SpotlightCard
                  glowColor={c.spotVar}
                  className={`group flex h-full flex-col rounded-xl2 border-2 ${c.borderIdle} bg-surface p-7 shadow-sm transition-all duration-300 ${c.borderHover} hover:-translate-y-1 hover:shadow-xl`}
                >
                  {/* Category + links row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <CategoryIcon size={16} className={c.iconText} />
                      <p className={`font-mono text-[11px] uppercase tracking-wider ${c.tagText}`}>
                        {project.category.join(" · ")}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4 pt-0.5 text-xs font-medium text-muted">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="link-underline flex items-center gap-1 transition-colors hover:text-ink"
                        >
                          <Github size={14} /> GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="link-underline flex items-center gap-1 text-teal-dark transition-colors hover:text-teal"
                        >
                          <Radio size={12} className="animate-pulse" />
                          Live
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{project.subtitle}</p>

                  {/* Compressed problem -> build -> shipped flow */}
                  <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink/85">
                    <p>
                      <span className={`font-semibold ${c.tagText}`}>Problem: </span>
                      {project.problem}
                    </p>
                    <p>
                      <span className={`font-semibold ${c.tagText}`}>Build: </span>
                      {project.build}
                    </p>
                    <p className="font-mono text-[13px]">
                      <span className={`font-semibold ${c.tagText}`}>Shipped: </span>
                      <span className="font-bold">{project.shipped}</span>
                    </p>
                  </div>

                  <div className="mt-6 border-t border-dashed border-line pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-mono text-xs text-muted">
                        {project.stack.join(" · ")}
                      </p>
                      {project.caseStudyId && (
                        <button
                          onClick={() => setActiveProject(project)}
                          className={`link-underline text-sm font-semibold ${c.tagText}`}
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

      {activeProject && (
        <CaseStudyModal
          caseStudy={activeCaseStudy}
          colorway={activeProject.colorway}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
