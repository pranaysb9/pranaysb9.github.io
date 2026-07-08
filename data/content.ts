// ============================================================================
// ALL SITE CONTENT LIVES HERE.
// This is placeholder/dummy data. Replace every value below with your real
// info — components read from this file and don't need to change.
// ============================================================================

export const profile = {
  name: "Your Name",
  initials: "YN",
  location: "City, Country",
  availability: "AVAILABLE", // or "OPEN TO WORK", "BUILDING", etc.
  heroLine1: "Building reliable",
  heroEmphasis: "AI infrastructure", // rendered in italic accent color
  heroLine2: "for production systems.",
  bio: "One or two sentences about what you do and how you think about it.",
  statusCommand: "$ status --current active", // small monospace personality line
  heroTags: [
    { label: "Builder", colorway: "violet" },
    { label: "Founder", colorway: "coral" },
    { label: "Researcher", colorway: "teal" },
  ] as { label: string; colorway: "violet" | "coral" | "teal" | "amber" }[],
  terminalLines: [
    "init system...",
    "loading modules...",
    "ready."
  ],
  socials: {
    github: "https://github.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    email: "mailto:you@example.com",
    resume: "/resume.pdf",
  },
};

export const snapshot = [
  {
    label: "Founder",
    value: "Company Name",
    sub: "Role / one-line detail",
    colorway: "coral" as const,
  },
  {
    label: "Research",
    value: "Lab or Group Name",
    sub: "Institution",
    colorway: "teal" as const,
  },
  {
    label: "Education",
    value: "University Name",
    sub: "Degree • GPA",
    colorway: "violet" as const,
  },
];

export type Project = {
  id: string;
  category: string[]; // e.g. ["Multi-Agent AI", "Full Stack"]
  colorway: "violet" | "amber" | "coral" | "teal"; // deliberate per-project assignment — see lib/colorways.ts
  categoryIcon: "bot" | "globe" | "cpu" | "wrench"; // maps to a lucide icon in Projects.tsx
  title: string;
  subtitle: string;
  problem: string;
  build: string;
  shipped: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyId?: string; // matches an entry in data/caseStudies.ts, if a deep-dive exists
};

export const projects: Project[] = [
  {
    id: "project-one",
    category: ["Multi-Agent AI", "Full Stack"],
    colorway: "violet",
    categoryIcon: "bot",
    title: "Project One",
    subtitle: "One-line description of what it does.",
    problem: "The specific problem this project solves, in one or two sentences.",
    build: "What you actually built — architecture, key technical decisions.",
    shipped: "The concrete, measurable outcome. Numbers if you have them.",
    stack: ["Next.js", "Groq", "Supabase"],
    githubUrl: "https://github.com/yourhandle/project-one",
    liveUrl: "https://project-one.example.com",
    caseStudyId: undefined,
  },
  {
    id: "project-two",
    category: ["Full-Stack Web", "Realtime"],
    colorway: "coral",
    categoryIcon: "globe",
    title: "Project Two",
    subtitle: "One-line description of what it does.",
    problem: "The specific problem this project solves, in one or two sentences.",
    build: "What you actually built — architecture, key technical decisions.",
    shipped: "The concrete, measurable outcome. Numbers if you have them.",
    stack: ["Next.js", "Supabase", "Clerk"],
    githubUrl: "https://github.com/yourhandle/project-two",
    liveUrl: "https://project-two.example.com",
    caseStudyId: undefined,
  },
  {
    id: "autonomous-driving-vqa",
    category: ["Computer Vision", "ML Research"],
    colorway: "teal",
    categoryIcon: "cpu",
    title: "Autonomous Driving VQA",
    subtitle: "Fine-tuning BLIP on driving scenes with semantic evaluation.",
    problem:
      "BLIP performs well on general VQA but struggles in specialized domains like road scenes.",
    build:
      "Fine-tuned BLIP on BDD100K driving imagery with procedurally generated QA pairs.",
    shipped: "96.00% lexical accuracy — but 83.47% true BERTScore.",
    stack: ["Python", "PyTorch", "BLIP", "BERTScore"],
    liveUrl: "https://huggingface.co/spaces/yourhandle/autonomous-driving-vqa",
    caseStudyId: "autonomous-driving-vqa",
  },
  {
    id: "project-four",
    category: ["ML", "Infra"],
    colorway: "amber",
    categoryIcon: "wrench",
    title: "Project Four",
    subtitle: "One-line description of what it does.",
    problem: "The specific problem this project solves, in one or two sentences.",
    build: "What you actually built — architecture, key technical decisions.",
    shipped: "The concrete, measurable outcome. Numbers if you have them.",
    stack: ["Python", "Docker", "AWS"],
    githubUrl: "https://github.com/yourhandle/project-four",
    caseStudyId: undefined,
  },
];

export type OpenSourceContribution = {
  id: string;
  number: string; // display index, "01", "02"...
  repo: string; // "org/repo"
  repoUrl: string;
  title: string;
  context: string; // pull-quote style
  impact: string;
  prNumber: string; // "#4210"
  status: "MERGED" | "OPEN" | "DRAFT";
  linesAdded: number;
  linesRemoved: number;
  reviewerNote?: string;
  sourceUrl: string;
  colorway: "violet" | "amber" | "coral" | "teal";
};

export const openSource: OpenSourceContribution[] = [
  {
    id: "oss-one",
    number: "01",
    repo: "org-name/repo-name",
    repoUrl: "https://github.com/org-name/repo-name",
    title: "Short title of the contribution",
    context: "A pull-quote describing the bug or gap you found, in your own words.",
    impact: "What your fix actually changed, in concrete terms.",
    prNumber: "#0000",
    status: "MERGED",
    linesAdded: 0,
    linesRemoved: 0,
    reviewerNote: "Optional short quote from a maintainer or review comment.",
    sourceUrl: "https://github.com/org-name/repo-name/pull/0000",
    colorway: "violet",
  },
  {
    id: "oss-two",
    number: "02",
    repo: "org-name/repo-name-2",
    repoUrl: "https://github.com/org-name/repo-name-2",
    title: "Short title of the contribution",
    context: "A pull-quote describing the bug or gap you found, in your own words.",
    impact: "What your fix actually changed, in concrete terms.",
    prNumber: "#0000",
    status: "MERGED",
    linesAdded: 0,
    linesRemoved: 0,
    reviewerNote: "Optional short quote from a maintainer or review comment.",
    sourceUrl: "https://github.com/org-name/repo-name-2/pull/0000",
    colorway: "teal",
  },
];

export type ExperienceEntry = {
  id: string;
  dateRange: string;
  org: string;
  role: string;
  detail: string;
  bullets?: string[];
  colorway: "violet" | "amber" | "coral" | "teal";
  icon: "rocket" | "flask" | "trophy" | "building";
};

export const experience: ExperienceEntry[] = [
  {
    id: "exp-one",
    dateRange: "Month Year – Present",
    org: "Company / Lab Name",
    role: "Your Role",
    detail: "One-line qualifier — program name, affiliation, etc.",
    bullets: [
      "What you did, concretely.",
      "A second concrete responsibility or outcome.",
    ],
    colorway: "coral",
    icon: "building",
  },
  {
    id: "exp-two",
    dateRange: "Month Year – Month Year",
    org: "Company / Lab Name",
    role: "Your Role",
    detail: "One-line qualifier.",
    bullets: ["What you did, concretely."],
    colorway: "amber",
    icon: "rocket",
  },
  {
    id: "exp-three",
    dateRange: "Month Year – Month Year",
    org: "Event / Program Name",
    role: "Your Role",
    detail: "One-line qualifier.",
    colorway: "violet",
    icon: "trophy",
  },
];

export const leadership = [
  { role: "Role Title", org: "Organization Name", colorway: "violet" as const },
  { role: "Role Title", org: "Organization Name", colorway: "amber" as const },
  { role: "Role Title", org: "Organization Name", colorway: "coral" as const },
];

export const recognition = [
  { place: "1st Place", event: "Hackathon or Competition Name", colorway: "teal" as const },
  { place: "2nd Place", event: "Hackathon or Competition Name", colorway: "violet" as const },
];

export const philosophyQuote =
  "A one or two sentence statement of how you think about building software.";

export type ReadingLogEntry = {
  id: string;
  type: "book" | "article" | "paper" | "video" | "note";
  status: "finished" | "reading" | "want-to-read";
  title: string;
  link?: string;
  source: string;
  takeaway?: string;
  date?: string;
};

export const readingLog: ReadingLogEntry[] = [
  {
    id: "reading-1",
    type: "book",
    status: "reading",
    title: "Example Book",
    source: "Author Name",
    takeaway: "An interesting takeaway.",
    date: "2024",
  },
];

// Fragments for the footer marquee — keep these short, real, and yours.
export const marqueeFragments: string[] = [
  "NEXT.JS",
  "PYTHON",
  "LANGGRAPH",
  "GROQ",
  "SUPABASE",
  "HACKATHON WINNER",
  "OPEN SOURCE",
];
