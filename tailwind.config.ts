import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fixed neutral palette (see globals.css :root).
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-hover": "rgb(var(--c-surface-hover) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",

        // Single accent — used sparingly for interactive/emphasis moments
        // only (links, active nav state, the one primary CTA).
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        "accent-dark": "rgb(var(--c-accent-dark) / <alpha-value>)",
        "accent-soft": "rgb(var(--c-accent-soft) / <alpha-value>)",

        // Colorway set — used only by the Professional Snapshot card
        // (lib/colorways.ts + IndexCardStack), restored per original design.
        violet: "#6D28D9",
        "violet-dark": "#5B21B6",
        "violet-soft": "#6D28D91A",
        amber: "#D97F0A",
        "amber-dark": "#B7660A",
        "amber-soft": "#D97F0A1A",
        coral: "#E24E3C",
        "coral-dark": "#C13B2B",
        "coral-soft": "#E24E3C1A",
        teal: "#0D8A72",
        "teal-dark": "#0A6D5A",
        "teal-soft": "#0D8A721A",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
