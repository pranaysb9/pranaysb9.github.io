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
        // These six are CSS-variable driven (see globals.css :root and
        // [data-theme] blocks) so ThemeSwitcher.tsx can swap the whole
        // background/surface/text palette at runtime without a rebuild.
        // The accent system below (violet/amber/coral/teal) is NOT
        // affected by the theme switcher — only background shades change.
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-hover": "rgb(var(--c-surface-hover) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",

        // ---- Bold 4-color system. Each color has ONE job — this is a
        // deliberate palette, not per-element random color. See README
        // "Color system" for the full rationale.
        violet: "#6D28D9",       // primary interactive: CTAs, nav, links
        "violet-dark": "#5B21B6",
        "violet-soft": "#6D28D91A",

        amber: "#D97F0A",         // editorial emphasis: italic headline words, bold inline highlights
        "amber-dark": "#B7660A",
        "amber-soft": "#D97F0A1A",

        coral: "#E24E3C",        // category colorway A + "removed" diff lines
        "coral-dark": "#C13B2B",
        "coral-soft": "#E24E3C1A",

        teal: "#0D8A72",         // status/success: live badges, "shipped", merged
        "teal-dark": "#0A6D5A",
        "teal-soft": "#0D8A721A",

        // legacy alias so any leftover "accent" references still resolve
        accent: "#6D28D9",
        "accent-dark": "#5B21B6",
        "accent-soft": "#6D28D91A",

        "dark-bg": "#15120D",
        "dark-surface": "#1E1A14",
        "dark-line": "#332C22",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "count-fade": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "count-fade": "count-fade 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
