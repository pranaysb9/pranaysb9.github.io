import type { CaseStudy } from "@/types/caseStudy";

// ============================================================================
// Add one entry per deep-dive here, keyed by id. Reference the same id from
// the matching project's `caseStudyId` in data/content.ts to wire it up.
// "autonomous-driving-vqa" below is fully populated as a working example —
// copy its shape for future case studies.
// ============================================================================

export const caseStudies: Record<string, CaseStudy> = {
  "autonomous-driving-vqa": {
    id: "autonomous-driving-vqa",
    title: "Autonomous Driving VQA",
    tagline: "Fine-Tuning BLIP on Driving Scenes with Semantic Evaluation",
    liveUrl: "https://huggingface.co/spaces/pranaysb/autonomous-driving-vqa",
    liveLabel: "Launch Hugging Face Space",

    metrics: [
      { label: "Lexical Accuracy", value: "96.00%" },
      { label: "BERTScore", value: "83.47%" },
      { label: "Training Images", value: "1,000" },
      { label: "Evaluation", value: "Semantic" },
    ],

    coreTech: [
      { name: "Python", reason: "Core implementation language" },
      { name: "PyTorch", reason: "Fine-tuning pipeline and training loop" },
      { name: "BLIP", reason: "Base vision-language model being adapted" },
      { name: "BERTScore", reason: "Semantic evaluation metric" },
    ],

    overview: [
      "BLIP performs well on general-purpose visual question answering, but its performance degrades in specialized domains where questions require precise, safety-relevant understanding of a scene rather than broad visual recognition.",
      "This project fine-tunes BLIP specifically for road and driving conditions, using the BDD100K dataset as the source of both imagery and scene metadata, so the model learns to answer questions grounded in the specific visual vocabulary of driving scenes — lane markings, traffic signals, occlusion, and object presence.",
    ],

    problem: {
      intro:
        "Adapting a general VQA model to driving scenes surfaced three distinct problems:",
      points: [
        "No domain-specific QA dataset exists for driving scenes at the scale needed for fine-tuning.",
        "Exact lexical overlap (the standard VQA accuracy metric) rewards superficially matching words even when the underlying meaning is wrong — a flawed signal for a safety-critical domain.",
        "Misalignment between what the model says and what's actually true in the scene is especially costly in safety-critical contexts, where a confidently wrong answer is worse than an uncertain one.",
      ],
    },

    architecture: {
      nodes: [
        { id: "dataset", label: "BDD100K Dataset", detail: "Driving imagery + scene metadata" },
        { id: "qa-gen", label: "QA Generator", detail: "Procedurally generates QA pairs from metadata" },
        { id: "base-model", label: "Base BLIP Model", detail: "Pretrained vision-language model" },
        { id: "finetune", label: "PyTorch Fine-Tuning Pipeline", detail: "Adapts BLIP to driving-scene QA" },
        { id: "eval", label: "BERTScore Evaluation Harness", detail: "Scores predictions semantically" },
        { id: "deploy", label: "Hugging Face Space", detail: "Deployed, interactive demo" },
      ],
      edges: [
        { from: "dataset", to: "qa-gen" },
        { from: "qa-gen", to: "finetune" },
        { from: "base-model", to: "finetune" },
        { from: "finetune", to: "eval" },
        { from: "eval", to: "deploy" },
      ],
    },

    decisions: [
      {
        title: "Integrating BERTScore",
        body: "Naive word-overlap accuracy is over-optimistic — it scores a response as correct if the words match, regardless of whether the meaning does. Taking on BERTScore's computational overhead was necessary to get a realistic read on how the model actually performs.",
      },
      {
        title: "Automated Dataset Creation",
        body: "Rather than crowdsourcing expensive human annotations, QA pairs were procedurally generated directly from BDD100K's existing scene metadata — trading some question diversity for a dataset that could actually be built at the scale and cost this project allowed.",
      },
    ],

    challenges: [
      {
        title: "Exposing the Superficial Lexical Evaluation Illusion",
        body: "The model scored 96% on lexical accuracy but only 83.47% on true semantic evaluation via BERTScore — a gap that would have gone unnoticed without deliberately introducing a stricter metric.",
      },
      {
        title: "Analyzing Failure Modes",
        body: "Manual review of low-scoring predictions showed the model's most consistent failures were on small or occluded objects — a specific, actionable limitation rather than a generic accuracy gap.",
      },
    ],

    techBreakdown: [
      { category: "Model Architecture", items: ["ViT", "BERT"] },
      { category: "Training & Evaluation", items: ["AdamW", "PyTorch"] },
      { category: "Dataset", items: ["BDD100K"] },
    ],

    lessons: [
      "Semantic evaluation isn't optional for VQA tasks — lexical metrics alone can hide a large gap between apparent and actual performance.",
      "Reproducing established baselines (DaViT, GenAD) before building custom architectures saves time and gives a real point of comparison for any custom work that follows.",
    ],
  },
  "ipl-verse": {
    id: "ipl-verse",
    title: "IPL Verse",
    tagline: "The Ultimate IPL Knowledge Engine",
    liveUrl: "https://iplverse.vercel.app/",
    liveLabel: "Visit Live Site",

    metrics: [
      { label: "Lines of Code", value: "~20K" },
      { label: "Game Modes", value: "6" },
      { label: "Database Tables", value: "12" },
      { label: "Latency", value: "<100ms" },
    ],

    coreTech: [
      { name: "Next.js 15", reason: "React Server Components and Server Actions" },
      { name: "Supabase", reason: "PostgreSQL and Realtime WebSockets" },
      { name: "Groq", reason: "High-speed AI inference for trivia generation" },
      { name: "Clerk", reason: "Seamless authentication" },
    ],

    overview: [
      "IPL Verse is a sophisticated full-stack web application designed to challenge cricket enthusiasts through knowledge rather than luck. Moving away from the saturated fantasy sports and betting markets, it focuses entirely on historical data, presenting it through an array of daily puzzles and a real-time multiplayer arena.",
      "Under the hood, the platform leverages the Next.js App Router for aggressive server-side rendering, ensuring that complex historical data tables and game boards load instantly. By utilizing React Server Components, the application minimizes client-side JavaScript payloads, maintaining a premium, fluid aesthetic even on low-end mobile devices.",
    ],

    problem: {
      intro: "The current digital cricket ecosystem is overwhelmingly dominated by fantasy leagues, prediction markets, and betting apps. Fans who possess deep, historical knowledge of the sport have no dedicated platform to test their memory or compete purely on trivia.",
      points: [
        "Existing cricket trivia solutions rely on static, manually updated databases that quickly become stale.",
        "Creating a platform that could automatically generate contextual, historically accurate questions while parsing decades of structured match data required a modern data pipeline and a responsive game engine.",
      ],
    },

    architecture: {
      nodes: [
        { id: "client", label: "Client Browser", detail: "Framer Motion & React 19" },
        { id: "next", label: "Next.js App Router", detail: "Server Actions & RSC" },
        { id: "auth", label: "Clerk", detail: "Authentication" },
        { id: "db", label: "Supabase PostgreSQL", detail: "Relational database" },
        { id: "realtime", label: "Supabase Realtime", detail: "Presence & WebSockets" },
        { id: "ai", label: "Groq AI", detail: "Dynamic trivia generation" },
      ],
      edges: [
        { from: "client", to: "next" },
        { from: "client", to: "realtime" },
        { from: "client", to: "auth" },
        { from: "next", to: "db" },
        { from: "next", to: "auth" },
        { from: "next", to: "ai" },
        { from: "realtime", to: "db" },
      ],
    },

    decisions: [
      {
        title: "Server Actions instead of traditional REST APIs",
        body: "Chosen to reduce client-side JavaScript, improve type safety between frontend and backend, and eliminate the boilerplate of fetch() calls. This resulted in 63 highly typed, easily auditable server functions that drastically sped up feature velocity.",
      },
      {
        title: "Supabase Realtime for Multiplayer State",
        body: "The 1v1 Arena required instant state sync (timers, answers). Building a custom Socket.io server would require separate hosting and complex auth syncing. Supabase provided <100ms latency synchronization while keeping the entire stack serverless and maintaining unified authentication via RLS.",
      },
    ],

    challenges: [
      {
        title: "Mitigating Race Conditions in Multiplayer Scoring",
        body: "If both players answer at the exact same millisecond, concurrent database writes could potentially overwrite the room state. Implemented strict PostgreSQL Row Level Security (RLS) policies and atomic updates. The server action validates the room's current state before processing the answer.",
      },
      {
        title: "AI Hallucination and JSON Parsing Failures",
        body: "The Groq LLM occasionally responds with conversational filler instead of pure JSON. Engineered a strict, few-shot prompt forcing JSON-only output, wrapped the inference call in a resilient try/catch block, and implemented a regex scrubber. If all parsing fails, it instantly falls back to a curated static database.",
      },
    ],

    techBreakdown: [
      { category: "Frontend", items: ["Next.js 15", "React 19", "Tailwind CSS", "Framer Motion"] },
      { category: "Backend", items: ["Next.js Server Actions", "Supabase", "Groq AI", "Clerk"] },
    ],

    lessons: [
      "State Machines are Mandatory for Multiplayer: Relying on ad-hoc boolean flags for game state quickly becomes unmaintainable. Implementing a strict state machine is the only way to build reliable realtime systems.",
      "Never Trust the Client: Client-side timers are purely cosmetic. The true source of truth for timeouts and scoring must always exist on the server to prevent network manipulation.",
      "LLMs Require Defensive Engineering: AI APIs will inevitably fail, timeout, or hallucinate. Building a robust software layer that expects and gracefully handles these failures is just as important as the prompt engineering itself.",
    ],
  },
  "api-forge-ai": {
    id: "api-forge-ai",
    title: "API Forge AI",
    tagline: "Agentic OpenAPI SDK Generator",
    liveUrl: "https://api-forge-ai.vercel.app/",
    liveLabel: "Live on Vercel",

    metrics: [
      { label: "State Machine Nodes", value: "5" },
      { label: "Validation Strictness", value: "100%" },
      { label: "LLM Engine", value: "Groq LLaMA 3.3" },
      { label: "Max Tokens", value: "128k" },
    ],

    coreTech: [
      { name: "LangGraph", reason: "Cyclic self-healing orchestration" },
      { name: "FastAPI", reason: "Async SSE streaming" },
      { name: "Python AST", reason: "Strict hallucinatory import blocking" },
      { name: "Groq", reason: "Ultra-low latency iterative retry loops" },
    ],

    overview: [
      "API Forge AI explores the boundaries of autonomous code generation by combining Large Language Models with a deterministic execution sandbox. Instead of just generating static code, the system spins up an ephemeral environment to run the generated SDK against a strict test linter.",
      "It actively parses abstract syntax trees (AST) to detect LLM hallucinations before they reach the user, routing broken code to a Diagnoser agent for self-healing."
    ],

    problem: {
      intro: "Modern APIs change rapidly, and maintaining up-to-date SDKs is a massive developer burden.",
      points: [
        "While LLMs can generate structural boilerplate, they notoriously hallucinate internal types and mock network requests, meaning the raw output is rarely production-ready.",
        "A system was needed that could iteratively test its own generated code and fix its mistakes autonomously without human intervention."
      ],
    },

    architecture: {
      nodes: [
        { id: "frontend", label: "Frontend UI", detail: "Upload OpenAPI Spec" },
        { id: "fastapi", label: "FastAPI Endpoint", detail: "Initialize" },
        { id: "planner", label: "Planner Node", detail: "Extract Schema" },
        { id: "coder", label: "Coder Node", detail: "Generates SDK" },
        { id: "linter", label: "Test Linter Node", detail: "AST Analysis" },
        { id: "diagnoser", label: "Diagnoser Node", detail: "Self-Healing Prompt" },
        { id: "executor", label: "Executor Sandbox", detail: "Run Tests" },
      ],
      edges: [
        { from: "frontend", to: "fastapi" },
        { from: "fastapi", to: "planner" },
        { from: "planner", to: "coder" },
        { from: "coder", to: "linter" },
        { from: "linter", to: "diagnoser" },
        { from: "diagnoser", to: "coder" },
        { from: "linter", to: "executor" },
        { from: "executor", to: "diagnoser" },
      ],
    },

    decisions: [
      {
        title: "Enforcing Strict Synthetic Mocking via AST",
        body: "Implemented an AST Test Linter that strictly enforces the usage of httpx.MockTransport in all generated test scripts to prevent agents from mutating live production APIs. This yielded an intentional 0% pass rate as LLMs struggle to write syntactically correct mock handlers, proving that framework-level mocking is required.",
      },
      {
        title: "SSE Streaming for Agent Orchestration",
        body: "Pushed all state changes from LangGraph nodes directly to the frontend via Server-Sent Events (SSE) because agentic workflows can take minutes to complete. This created a transparent UX where users can watch the AI think, fail, diagnose, and rewrite in real-time.",
      },
    ],

    challenges: [
      {
        title: "Context Window Exhaustion on Enterprise Specs",
        body: "When processing massive enterprise specifications (e.g. Stripe's 7.8MB, 1.3M token spec), the Planner node crashed due to context limits. Mapped the context limits of llama-3.3-70b-versatile (128k tokens) and began paving the way for a Chunked Planning architecture.",
      },
    ],

    techBreakdown: [
      { category: "Backend Core", items: ["FastAPI", "LangGraph", "SQLAlchemy", "Poetry", "Python AST"] },
      { category: "AI / LLM", items: ["LangChain", "Groq (llama-3.3-70b)"] },
    ],

    lessons: [
      "LLMs cannot write test infrastructure: LLMs are highly capable at generating functional code, but fail catastrophically when forced to write strict mock handlers.",
      "Deterministic gates are mandatory: You cannot rely on the LLM to self-regulate its own syntax; rigid, programmatic guardrails (like an AST Linter) are non-negotiable.",
      "Honesty in metrics: An artificially high pass-rate is dangerous in code generation. Breaking the pipeline intentionally to prevent unsafe network calls is a feature, not a bug."
    ],
  },
  "agency-os": {
    id: "agency-os",
    title: "AgencyOS AI",
    tagline: "AI-powered operating system for influencer marketing agencies",
    liveUrl: "https://agency-os-ai.vercel.app/",
    liveLabel: "Live on Vercel",

    metrics: [
      { label: "Time Saved", value: "3-5 hrs/deal" },
      { label: "Response Time", value: "< 30s" },
      { label: "AI Agents", value: "3" },
      { label: "Cost Reduction", value: "~₹20L/yr" },
    ],

    coreTech: [
      { name: "n8n", reason: "Workflow orchestration" },
      { name: "Groq AI", reason: "Ultra-fast LLaMA 3.3 70B inference" },
      { name: "Supabase", reason: "PostgreSQL CRM database" },
      { name: "Next.js 14", reason: "Real-time dashboard" },
    ],

    overview: [
      "AgencyOS AI is a fully autonomous, multi-agent AI system that automates the end-to-end operational workflow of an influencer marketing agency — from the moment a brand sends an inquiry, to deal intelligence extraction, creator matching, and CRM logging.",
      "What previously required a team of operations interns now runs 24/7 with zero human intervention, handling the full inbound campaign lifecycle through Telegram bots, n8n workflows, and a Next.js dashboard."
    ],

    problem: {
      intro: "Influencer marketing agencies handle dozens of inbound brand inquiries every single day, requiring a massive amount of manual coordination.",
      points: [
        "Campaign managers manually fill out deal brief documents from raw brand emails/DMs.",
        "Talent managers manually search through creator roster spreadsheets, which scales poorly and results in subjective, inconsistent matching.",
      ],
    },

    architecture: {
      nodes: [
        { id: "telegram", label: "Telegram Bot", detail: "Inbound Channel" },
        { id: "n8n", label: "n8n Workflows", detail: "Multi-Agent Orchestrator" },
        { id: "groq", label: "Groq AI (LLaMA 3.3)", detail: "Classification & Matching" },
        { id: "supabase", label: "Supabase", detail: "PostgreSQL CRM" },
        { id: "nextjs", label: "Next.js Dashboard", detail: "Real-time Monitoring" },
      ],
      edges: [
        { from: "telegram", to: "n8n" },
        { from: "n8n", to: "groq" },
        { from: "n8n", to: "supabase" },
        { from: "n8n", to: "telegram" },
        { from: "supabase", to: "nextjs" },
      ],
    },

    decisions: [
      {
        title: "Multi-Agent Orchestration via n8n",
        body: "Instead of writing a monolithic backend script, n8n was chosen to visually orchestrate three distinct AI agents (Lead Intake, Deal Intelligence, Creator Matching). This allows for independent scheduling, isolated error handling, and easy modular expansion.",
      },
      {
        title: "Groq LLaMA 3.3 for Inference",
        body: "Creator matching and lead classification requires heavy prompt reasoning. Groq's LPU architecture was selected over standard OpenAI endpoints to ensure that the Business Agent can reply to brand inquiries on Telegram in under 30 seconds.",
      },
    ],

    challenges: [
      {
        title: "AI Returning JSON as a String",
        body: "The Groq AI agent occasionally returned valid JSON but wrapped it as a string inside the output field, breaking downstream workflows. Added a dedicated JavaScript Code node after every AI Agent to aggressively clean and parse the output using regex cleanup for markdown code fences.",
      },
      {
        title: "If Node Data Context Failures",
        body: "The If node in the workflow occasionally read from the wrong data context, receiving Telegram reply data instead of the Code node's parsed JSON. Fixed this by using explicit node references ($('Code in JavaScript').first().json.category) to force reading from the correct node.",
      },
    ],

    workflows: [
      {
        title: "Business Agent (Lead Intake)",
        trigger: "Any message sent to the Telegram bot",
        steps: [
          "Telegram Trigger captures the inbound message.",
          "Groq AI Agent (LLaMA 3.3) classifies the message.",
          "JavaScript Code node parses the AI's JSON output.",
          "Supabase node inserts a new row into the leads table.",
          "Google Sheets node logs the lead as a backup.",
          "Telegram node sends AI-drafted reply to the brand.",
          "If category is 'Brand Deal', Telegram sends alert to agency owner.",
        ],
        output: "Extracted: category, brand_name, offer_details, budget, urgency",
      },
      {
        title: "Deal Intelligence Agent",
        trigger: "Schedule (every 5 minutes)",
        steps: [
          "Supabase node fetches all leads where status = new.",
          "Groq AI Agent extracts structured deal data & scores quality 1-10.",
          "JavaScript Code node parses AI output and attaches lead_id.",
          "Supabase node inserts a new structured deal into deals table.",
          "Supabase node updates the original lead's status to processed.",
        ],
        output: "Extracted: brand_name, budget, campaign_dates, deliverables, deal_score",
      },
      {
        title: "Creator Matching Agent",
        trigger: "Schedule (every 5 minutes)",
        steps: [
          "Supabase node fetches all deals where status = pending.",
          "HTTP Request node fetches all creators from Supabase REST API.",
          "JavaScript node combines deal requirements + full creator roster.",
          "Groq AI Agent ranks top 3 creators and explains reasoning.",
          "JavaScript Code node parses the AI's matching JSON.",
          "Telegram Send node delivers the match report to the agency owner.",
          "Supabase node updates the deal's status to matched.",
        ],
        output: "Output: Top 3 ranked creators, estimated reach, and risk assessment",
      },
    ],

    techBreakdown: [
      { category: "Automation & AI", items: ["n8n (Self-hosted)", "Groq API", "LLaMA 3.3 70B"] },
      { category: "Infrastructure & UI", items: ["Supabase (PostgreSQL)", "Next.js 14", "Tailwind CSS", "Telegram Bot API"] },
    ],

    lessons: [
      "Agentic workflows over linear automation: Tools like n8n shouldn't just move data; pairing them with LLMs allows the system to read, classify, reason, and make decisions exactly like a human operations team.",
      "Robust data parsing is critical: LLMs will inevitably output markdown blocks or conversational text. A dedicated regex/JSON parsing step after every LLM call is required for workflow stability.",
    ],
  },
};
