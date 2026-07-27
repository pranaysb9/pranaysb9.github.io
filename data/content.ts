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
  heroTags: ["Builder", "Developer", "Researcher"],
  socials: {
    github: "https://github.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    email: "mailto:you@example.com",
    resume: "/resume.pdf",
  },
};

export const snapshot = [
  {
    label: "Project",
    value: "Optisense AI",
    sub: "Project Lead, AI Vision Systems",
    colorway: "coral" as const,
  },
  {
    label: "Research",
    value: "Visual Intelligence and Learning Lab",
    sub: "IIT Hyderabad",
    colorway: "teal" as const,
  },
  {
    label: "Education",
    value: "IIT Bhilai",
    sub: "B.Tech, Electrical Engineering • GPA 8.51",
    colorway: "violet" as const,
  },
];

export type Project = {
  id: string;
  category: string[]; // e.g. ["Multi-Agent AI", "Full Stack"]
  categoryIcon: "bot" | "globe" | "cpu" | "wrench"; // maps to a lucide icon in Projects.tsx
  title: string;
  subtitle: string;
  problem: string;
  build: string;
  shipped: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  caseStudyId?: string; // matches an entry in data/caseStudies.ts, if a deep-dive exists
  associatedExperience?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    id: "ipl-verse",
    category: ["Full-Stack Web", "AI Content Pipeline"],
    categoryIcon: "globe",
    title: "IPL Verse",
    subtitle: "Full-Stack Daily IPL Gaming Platform",
    problem: "IPL fans needed an engaging daily gaming platform based on real historical data, but parsing raw datasets into playable trivia required extensive curation.",
    build: "Designed end-to-end with Next.js App Router and Supabase, featuring real-time multiplayer Arena battles. Engineered an AI pipeline via Groq API to generate and deduplicate 3,600+ trivia questions.",
    shipped: "A live public product with an active user base, supporting authentication, leaderboards, and multiple daily game modes.",
    stack: ["Next.js", "Supabase", "PostgreSQL", "Groq API"],
    githubUrl: "https://github.com/ujwal209/iplverse",
    liveUrl: "https://iplverse.vercel.app/",
    liveLabel: "Live on Vercel",
    caseStudyId: "ipl-verse",
  },
  {
    id: "api-forge-ai",
    category: ["Multi-Agent AI", "Code Generation"],
    categoryIcon: "bot",
    title: "API Forge AI",
    subtitle: "Agentic SDK Generation Platform",
    problem: "Converting OpenAPI specs into production-ready SDKs manually is error-prone and time-consuming, requiring constant updates as APIs evolve.",
    build: "Built a multi-agent LangGraph platform featuring Planner, Validator, Diagnoser, Coder, and Executor agents with self-healing code correction.",
    shipped: "An automated pipeline that ingests OpenAPI specs and outputs fully functional SDKs with Dockerized backend services.",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "Docker", "LangGraph"],
    githubUrl: "https://github.com/pranaysb/API-Forge-AI",
    liveUrl: "https://api-forge-ai.vercel.app/",
    liveLabel: "Live on Vercel",
    caseStudyId: "api-forge-ai",
  },
  {
    id: "agency-os",
    category: ["AI Automation", "Full-Stack"],
    categoryIcon: "wrench",
    title: "AgencyOS AI",
    subtitle: "AI-Powered Influencer Agency Workflow",
    problem: "Influencer marketing agencies handle dozens of inbound brand inquiries daily, requiring hours of manual brief extraction, creator matching, and CRM logging.",
    build: "Built a fully autonomous, multi-agent n8n system integrating Telegram bots, Groq LLaMA 3.3, and Supabase to orchestrate lead intake, deal intelligence, and creator matching.",
    shipped: "A production-ready automated pipeline that matches creators to brand briefs in under 5 minutes with a Next.js real-time monitoring dashboard.",
    stack: ["n8n", "Supabase", "Next.js", "Groq AI"],
    githubUrl: "https://github.com/pranaysb/agencyOS-ai",
    liveUrl: "https://agency-os-ai.vercel.app/",
    liveLabel: "Live on Vercel",
    caseStudyId: "agency-os",
  },
  {
    id: "autonomous-driving-vqa",
    category: ["Computer Vision", "ML Research"],
    categoryIcon: "cpu",
    title: "Autonomous Driving VQA",
    subtitle: "Fine-tuning BLIP on driving scenes with semantic evaluation.",
    problem:
      "BLIP performs well on general VQA but struggles in specialized domains like road scenes.",
    build:
      "Fine-tuned BLIP on BDD100K driving imagery with procedurally generated QA pairs.",
    shipped: "96.00% lexical accuracy — but 83.47% true BERTScore.",
    stack: ["Python", "PyTorch", "BLIP", "BERTScore"],
    githubUrl: "https://github.com/pranaysb/VQA-Blip-model",
    liveUrl: "https://huggingface.co/spaces/pranaysb/autonomous-driving-vqa",
    liveLabel: "Hugging Face Space",
    caseStudyId: "autonomous-driving-vqa",
    associatedExperience: { label: "Research at IIT Hyderabad", href: "#experience" },
  }
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
};

export const openSource: OpenSourceContribution[] = [
  {
    id: "oss-1",
    number: "01",
    repo: "NVIDIA/NeMo-Agent-Toolkit",
    repoUrl: "https://github.com/NVIDIA/NeMo-Agent-Toolkit",
    title: "fix(finetune): apply CLI config overrides in finetuning runtime",
    context: "The --override flag in the nat finetune CLI command was correctly parsed but previously ignored by the runtime.",
    impact: "Explicitly merged user-provided overrides into the config dictionary, producing a fully prepared run configuration.",
    prNumber: "#2103",
    status: "MERGED",
    linesAdded: 137,
    linesRemoved: 13,
    sourceUrl: "https://github.com/NVIDIA/NeMo-Agent-Toolkit/pull/2103",
  },
  {
    id: "oss-2",
    number: "02",
    repo: "roboflow/trackers",
    repoUrl: "https://github.com/roboflow/trackers",
    title: "fix(cmc): prevent cv2.resize crash on tiny downscaled images",
    context: "Providing a very small frame or bounding box crop would cause an unhandled crash when img_w or img_h was smaller than the downscale factor.",
    impact: "Added defensive dimension bounding to ensure valid dimensions, and gracefully handled tiny images instead of crashing.",
    prNumber: "#488",
    status: "MERGED",
    linesAdded: 132,
    linesRemoved: 8,
    sourceUrl: "https://github.com/roboflow/trackers/pull/488",
  },
  {
    id: "oss-3",
    number: "03",
    repo: "NVIDIA/NeMo-Agent-Toolkit",
    repoUrl: "https://github.com/NVIDIA/NeMo-Agent-Toolkit",
    title: "fix memory leak lru cache",
    context: "Using functools.lru_cache on class instance methods created permanent strong references, preventing garbage collection across 25 critical core utilities.",
    impact: "Replaced improper lru_cache usage with cached_property and manual dictionary caches, fixing 25 memory leaks and preventing runaway memory usage.",
    prNumber: "#2105",
    status: "MERGED",
    linesAdded: 107,
    linesRemoved: 72,
    sourceUrl: "https://github.com/NVIDIA/NeMo-Agent-Toolkit/pull/2105",
  },
  {
    id: "oss-4",
    number: "04",
    repo: "NVIDIA/NeMo-Agent-Toolkit",
    repoUrl: "https://github.com/NVIDIA/NeMo-Agent-Toolkit",
    title: "fix(core): resolve lru_cache memory retention in DiscoveryMetadata",
    context: "Bare @lru_cache decorators on DiscoveryMetadata's static methods pinned the 128 most-recently-seen dynamic Pydantic classes in memory indefinitely, quietly extending their lifetime in long-running processes like nat mcp serve.",
    impact: "Replaced the leaking cache with a WeakKeyDictionary-based strategy so the garbage collector reclaims dynamically generated classes automatically, and resolved lingering typing/docstring feedback from a related prior PR in the same pass.",
    prNumber: "#2118",
    status: "MERGED",
    linesAdded: 43,
    linesRemoved: 7,
    sourceUrl: "https://github.com/NVIDIA/NeMo-Agent-Toolkit/pull/2118",
  },
  {
    id: "oss-5",
    number: "05",
    repo: "open-telemetry/opentelemetry-python",
    repoUrl: "https://github.com/open-telemetry/opentelemetry-python",
    title: "Fix Context in-place mutability bypass via inherited dict methods",
    context: "Context subclasses dict and blocks direct assignment to enforce its 'MUST be immutable' contract, but CPython's C-level dict methods like update, pop, and clear bypass that override entirely, allowing silent in-place mutation.",
    impact: "Explicitly overrode the remaining mutating dict methods to raise consistently with the existing contract, and expanded the immutability test suite to independently verify every mutation path.",
    prNumber: "#5399",
    status: "MERGED",
    linesAdded: 38,
    linesRemoved: 2,
    sourceUrl: "https://github.com/open-telemetry/opentelemetry-python/pull/5399",
  },
  {
    id: "oss-6",
    number: "06",
    repo: "roboflow/trackers",
    repoUrl: "https://github.com/roboflow/trackers",
    title: "fix: prevent zero division in xcycsr_to_xyxy converter",
    context: "Bounding boxes with zero scale or aspect ratio caused a division by zero, producing NaN values that propagated into downstream tracking state.",
    impact: "Added epsilon guards to the reverse conversion to protect both single-box and batch paths from producing NaN on degenerate boxes.",
    prNumber: "#485",
    status: "MERGED",
    linesAdded: 103,
    linesRemoved: 54,
    sourceUrl: "https://github.com/roboflow/trackers/pull/485",
  },
];

export type ExperienceEntry = {
  id: string;
  dateRange: string;
  org: string;
  role: string;
  detail: string;
  bullets?: string[];
  icon: "rocket" | "flask" | "trophy" | "building";
  caseStudyId?: string;
};

export const experience: ExperienceEntry[] = [
  {
    id: "exp-optisense",
    dateRange: "December 2025 – Present",
    org: "Optisense AI",
    role: "Project Lead, AI Vision Systems",
    detail: "MeitY GENESIS Grant Project, IIT Bhilai",
    bullets: [
      "Selected for the competitive MeitY GENESIS EiR program at IIT Bhilai; awarded a ₹10 lakh government grant to prototype AI-driven vision sensing systems for smart infrastructure.",
      "Lead end-to-end development of the prototype — architecture, backend system design, AI inference pipelines, and Dockerized deployment — building low-latency vision intelligence modules for constrained edge and cloud hardware.",
    ],
    icon: "rocket",
  },
  {
    id: "exp-vill",
    dateRange: "May 2025 – January 2026",
    org: "Visual Intelligence and Learning Lab, IIT Hyderabad",
    role: "AI/ML Research Intern",
    detail: "Research Internship",
    bullets: [
      "Reproduced and benchmarked DaViT and GenAD models on real-world sensor datasets, documenting generalization behavior across distribution shifts; implemented 3D Gaussian Splatting for neural rendering and dynamic object removal under deployment-constrained latency and memory budgets.",
      "Built a modular BLIP-based Visual Question Answering pipeline on BDD100K with custom annotation tooling and evaluation harnesses, enabling rapid iteration across model configurations.",
    ],
    icon: "flask",
    caseStudyId: "autonomous-driving-vqa",
  },
];

export type OtherExperienceEntry = {
  role: string;
  org: string;
  description: string;
};

export const otherExperiences: OtherExperienceEntry[] = [
  {
    role: "Team Member — AEGIS",
    org: "Inter IIT Tech Meet 14.0",
    description: "Architected a multi-agent trading platform via a 7-stage pipeline with SHAP/LIME explainability.",
  },
  {
    role: "AI/ML Lead",
    org: "Google Developer Groups, IIT Bhilai",
    description: "Directed deep learning workshops and authored widely adopted ML resources.",
  },
  {
    role: "Core Member",
    org: "Data Science & AI Club",
    description: "Organized intensive technical bootcamps and mentored 30+ engineering peers.",
  },
  {
    role: "Student Mentor",
    org: "IIT Bhilai",
    description: "Guided incoming junior cohorts on advanced coursework strategy.",
  },
];

export type RecognitionEntry = {
  place: string;
  event: string;
  description?: string;
};

export const recognition: RecognitionEntry[] = [
  { 
    place: "3rd Place", 
    event: "AI Hackathon (Pathway)", 
    description: "Architected a real-time financial analytics streaming platform.",
  },
  { 
    place: "2nd Place", 
    event: "TechSprint (GDG)", 
    description: "Built a Flutter-based, Gemini-integrated campus application.",
  },
  { 
    place: "Selected Participant",
    event: "MeitY GENESIS EiR Program, IIT Bhilai",
    description: "Awarded a ₹10 lakh government grant to prototype AI-driven vision sensing systems for smart infrastructure.",
  },
];

export const philosophyQuote =
  "A one or two sentence statement of how you think about building software.";

export type EngineeringNote = {
  id: string;
  title: string; // the lesson itself, as a headline
  org?: "NVIDIA" | "roboflow" | "open-telemetry"; // renders the real org logo when set
  source: string;
  link: string;
  takeaway: string;
  date: string;
};

export const engineeringNotes: EngineeringNote[] = [
  {
    id: "note-lru-cache",
    title: "WeakKeyDictionary beats lru_cache for GC-safe caching",
    org: "NVIDIA",
    source: "NVIDIA/NeMo-Agent-Toolkit",
    link: "https://github.com/NVIDIA/NeMo-Agent-Toolkit/pull/2118",
    takeaway:
      "Bare @lru_cache on static methods doesn't leak in the traditional sense, but it pins the 128 most-recently-seen dynamic classes in memory indefinitely — and linters that catch instance-method leaks don't flag static methods. A module-level WeakKeyDictionary keeps the caching benefit while letting the GC reclaim classes that are no longer referenced.",
    date: "Jul 2026",
  },
  {
    id: "note-dict-immutability",
    title: "Subclassing dict doesn't get you real immutability",
    org: "open-telemetry",
    source: "open-telemetry/opentelemetry-python",
    link: "https://github.com/open-telemetry/opentelemetry-python/pull/5399",
    takeaway:
      "Overriding __setitem__ blocks direct assignment, but CPython's C-level dict methods — update, pop, clear — bypass Python's method overrides entirely and mutate in place anyway. Real immutability means explicitly overriding every mutating method, not just the obvious one.",
    date: "Jul 2026",
  },
  {
    id: "note-agent-separation",
    title: "Self-correcting agents can't grade their own work",
    source: "API Forge AI — Agentic SDK Generation Platform",
    link: "https://github.com/pranaysb/API-Forge-AI",
    takeaway:
      "Early versions had one agent generate and fix its own SDK output — correction quality was inconsistent, because the model that made a mistake usually couldn't see it as a mistake. Splitting the pipeline into distinct Planner, Validator, Diagnoser, Coder, and Executor agents put a fresh evaluation pass between generation and correction, so errors got caught instead of rationalized away.",
    date: "2025",
  },
  {
    id: "note-lexical-vs-semantic",
    title: "Lexical accuracy isn't semantic accuracy",
    source: "Autonomous Driving VQA — Research at IIT Hyderabad",
    link: "https://huggingface.co/spaces/pranaysb/autonomous-driving-vqa",
    takeaway:
      "Fine-tuning BLIP on BDD100K driving scenes hit 96% lexical accuracy but only 83.47% true BERTScore — the model was matching surface tokens, not meaning. It reframed evaluation for the rest of the project: exact-match metrics overstate correctness on open-ended VQA, and semantic similarity scoring is the one that actually matters.",
    date: "2025–26",
  },
];
