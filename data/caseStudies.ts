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
    liveUrl: "https://huggingface.co/spaces/yourhandle/autonomous-driving-vqa",
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
};
