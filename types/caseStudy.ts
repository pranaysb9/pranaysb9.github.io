// Type definitions for the case-study deep-dive modal. Add new entries in
// data/caseStudies.ts keyed by id, and reference that id from a project's
// `caseStudyId` field in data/content.ts.

export type Metric = {
  label: string;
  value: string;
};

export type TechWithReason = {
  name: string;
  reason: string;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  detail?: string;
};

export type ArchitectureEdge = {
  from: string; // ArchitectureNode id
  to: string; // ArchitectureNode id
};

export type Decision = {
  title: string;
  body: string;
};

export type TechCategory = {
  category: string; // e.g. "Model Architecture"
  items: string[];
};

export type Workflow = {
  title: string;
  trigger: string;
  steps: string[];
  output: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  tagline: string;
  liveUrl?: string;
  liveLabel?: string; // e.g. "Launch Hugging Face Space"

  metrics: Metric[]; // the 4 big hero metric blocks
  coreTech: TechWithReason[];

  overview: string[]; // one string per paragraph
  problem: {
    intro: string;
    points: string[];
  };

  architecture: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[]; // rendered in the order given — keep it a simple chain for the auto-layout
  };

  decisions: Decision[];
  challenges: Decision[];

  workflows?: Workflow[];

  techBreakdown: TechCategory[];
  lessons: string[];
};
