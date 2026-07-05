/**
 * Curated colorway system for project cards. Each project is assigned ONE
 * of these deliberately (see data/content.ts) — never randomly generated
 * per-render. Class strings must stay static (not built from template
 * literals) or Tailwind's compiler won't pick them up.
 */
export type Colorway = "violet" | "amber" | "coral" | "teal";

type ColorwayClasses = {
  topBar: string;
  tagText: string;
  borderIdle: string;
  borderSolid: string; // full-opacity border, e.g. for an emphasized/active state
  borderHover: string;
  iconText: string;
  spotVar: string; // CSS custom property value used by SpotlightCard
  caseStudyText: string;
};

export const colorways: Record<Colorway, ColorwayClasses> = {
  violet: {
    topBar: "bg-violet",
    tagText: "text-violet",
    borderIdle: "border-violet/25",
    borderSolid: "border-violet",
    borderHover: "hover:border-violet",
    iconText: "text-violet",
    spotVar: "#6D28D91A",
    caseStudyText: "text-violet",
  },
  amber: {
    topBar: "bg-amber",
    tagText: "text-amber-dark",
    borderIdle: "border-amber/25",
    borderSolid: "border-amber",
    borderHover: "hover:border-amber",
    iconText: "text-amber-dark",
    spotVar: "#D97F0A1A",
    caseStudyText: "text-amber-dark",
  },
  coral: {
    topBar: "bg-coral",
    tagText: "text-coral",
    borderIdle: "border-coral/25",
    borderSolid: "border-coral",
    borderHover: "hover:border-coral",
    iconText: "text-coral",
    spotVar: "#E24E3C1A",
    caseStudyText: "text-coral",
  },
  teal: {
    topBar: "bg-teal",
    tagText: "text-teal-dark",
    borderIdle: "border-teal/25",
    borderSolid: "border-teal",
    borderHover: "hover:border-teal",
    iconText: "text-teal-dark",
    spotVar: "#0D8A721A",
    caseStudyText: "text-teal-dark",
  },
};
