# Case Study Template

To add a new case study to your portfolio, you need to follow a two-step process:

## Step 1: Add the Data Object
Open `data/caseStudies.ts` and add a new entry to the `caseStudies` object. The key and the `id` should match.

```typescript
  "your-project-id": {
    id: "your-project-id",
    title: "Project Title",
    tagline: "A compelling one-liner about the project",
    liveUrl: "https://your-live-link.com",
    liveLabel: "Visit Live Site",

    metrics: [
      { label: "Metric Name", value: "Value (e.g. 96%)" },
      { label: "Another Metric", value: "10x" },
    ],

    coreTech: [
      { name: "Next.js", reason: "For fast server-side rendering" },
      { name: "PostgreSQL", reason: "Primary relational database" },
    ],

    overview: [
      "Paragraph 1 explaining the general context and purpose of the project.",
      "Paragraph 2 explaining what this project specifically achieved.",
    ],

    problem: {
      intro: "The main issue that sparked this project was:",
      points: [
        "Point 1 about the problem.",
        "Point 2 about the problem.",
      ],
    },

    architecture: {
      nodes: [
        { id: "frontend", label: "Next.js Frontend", detail: "User interface" },
        { id: "backend", label: "FastAPI Backend", detail: "API services" },
        { id: "db", label: "PostgreSQL", detail: "Data storage" },
      ],
      edges: [
        { from: "frontend", to: "backend" },
        { from: "backend", to: "db" },
      ],
    },

    decisions: [
      {
        title: "Why we chose X over Y",
        body: "Explanation of the engineering tradeoff and decision.",
      },
    ],

    challenges: [
      {
        title: "Overcoming Z",
        body: "How you solved a particularly difficult bug or scaling issue.",
      },
    ],

    techBreakdown: [
      { category: "Frontend", items: ["React", "Tailwind"] },
      { category: "Backend", items: ["Node.js", "Express"] },
    ],

    lessons: [
      "What you learned from building this.",
      "What you would do differently next time.",
    ],
  },
```

## Step 2: Link it to your Project
Open `data/content.ts` and find your project in the `projects` array. 
Set the `caseStudyId` property to match the ID you used above (e.g., `"your-project-id"`).

```typescript
  {
    id: "some-id",
    // ... other project fields ...
    caseStudyId: "your-project-id", // <-- This links the button!
  }
```

Once you do both steps, the "View Case Study" button will automatically appear on the project card in the UI!
