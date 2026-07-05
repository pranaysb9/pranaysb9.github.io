# Portfolio — starter build

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion. All content
is placeholder — this repo is meant to be filled in, not redesigned, in your
next Antigravity session (see "Handing this to Antigravity" below).

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where everything lives

```
app/
  layout.tsx       fonts + metadata
  page.tsx         assembles all sections
  globals.css      base styles, spotlight glow, marquee keyframes
components/
  layout/          Navbar, Footer
  sections/        Hero, Projects, OpenSource, Experience, Achievements
  ui/              reusable primitives (see below)
data/
  content.ts       <-- ALL YOUR CONTENT GOES HERE. Components read from
                        this file and shouldn't need to change.
```

## Design tokens (why these choices)

- **Color system** (`tailwind.config.ts` + `lib/colorways.ts`): a deliberate
  4-color palette, each color with exactly one job — this is what keeps
  "bold" from turning into "random":
  - `violet` — primary interactive color: CTAs, active nav state, links.
  - `amber` — editorial emphasis: the italic word in headlines, bold inline
    highlights.
  - `coral` — one of four project "colorways" (see below).
  - `teal` — status/success: live badges, the Professional Snapshot label,
    "shipped" outcomes.
  Each **project** is assigned one colorway (`violet` / `amber` / `coral` /
  `teal`) explicitly in `data/content.ts` — never randomly per-render. That
  assignment drives the card's border, category tag color, icon color, and
  hover-glow color, all from the single source in `lib/colorways.ts`.
  **Important:** `lib/colorways.ts` uses static class strings (e.g.
  `"text-violet"`, never `` `text-${color}` ``) because Tailwind's compiler
  can only detect literal class names — if you add a new colorway, add it
  as a literal entry there, and make sure `lib/` stays in the `content`
  array in `tailwind.config.ts`.
- **Type** (`app/layout.tsx`): `Fraunces` (display serif — headlines, and
  its italic cut powers the "split headline" emphasis technique used in
  Hero.tsx and every major section heading), `Inter` (sans — body/nav/
  labels), `IBM Plex Mono` (stack tags, PR data, metrics — texture, not
  just code). Lean into scale contrast: headlines swing from large regular
  weight to even-larger italic emphasis to bold; labels stay small,
  uppercase, and mono.

## The hero — a deliberately different structure

Earlier drafts of this hero were structurally close to a reference site you
shared (two clean bordered panels side by side). This version is intentionally
different in shape, not just content:

- **No outer bordering card.** The headline sits directly on the page —
  a stacked "masthead" treatment (small caps line → huge italic emphasis →
  bold closing line) instead of a boxed panel.
- **Floating tag chips** (`components/ui/FloatingTag.tsx`) scattered near
  the headline with a slow idle float/tilt loop — a "corkboard" motif that
  doesn't appear in the reference at all. Edit `profile.heroTags` in
  `data/content.ts` to change them.
- **A rotating index-card stack** (`components/ui/IndexCardStack.tsx`)
  replaces the plain bordered info-list sidebar — all `snapshot` entries are
  visible at once, fanned out like a hand of cards; clicking any one of them
  "blooms" it to the front/center while the others swing further apart.
  Auto-advances on a timer, pauses on hover.
- **A tiny typewriter terminal window** (`components/ui/TerminalWindow.tsx`)
  cycles through `profile.terminalLines` instead of a single static
  monospace line.

## Experience — expandable detail

Each entry in `components/sections/ExperienceCard.tsx` shows `detail` (one
line) always, and hides `bullets` behind a "View Details" toggle with an
animated chevron — matching the pattern you'd built by hand before. The
expand/collapse uses a CSS grid-rows trick (`0fr` → `1fr`) rather than
measuring height in JS, so it stays smooth without a ResizeObserver.

## Reading Log (`components/sections/ReadingLog.tsx`)

A deliberately lighter-weight section than the project/case-study cards,
since this is meant to be added to constantly — books, papers, articles,
videos, your own notes, all in one list. Add entries to `readingLog` in
`data/content.ts`; each gets an icon based on its `type`, a status pill
(reading / finished / want-to-read), and an optional one-line `takeaway`
and link. No fixed limit on how many you add — it's a plain scrolling list,
not a grid, so it won't get visually heavier as it grows.

## Background shade switcher

A floating palette icon (bottom-right, `components/ui/ThemeSwitcher.tsx`)
lets you click through 8 background/surface/text presets live — Parchment,
Ivory, Warm Gray, Cool Slate, Terracotta, Sage, Lavender, Midnight — each a
genuinely different hue/undertone (not just lighter/darker versions of the
same cream), so they're easy to tell apart while comparing. It **only**
changes the six neutral tokens (`paper`/`surface`/`surface-hover`/`ink`/
`muted`/`line`, defined as CSS variables in `globals.css`) — the violet/
amber/coral/teal accent system is untouched by design, since you asked to
preview shades, not the accent palette.

Your choice persists in `localStorage` so it survives reloads. Once you've
picked a favorite: either leave the switcher in (it's harmless and useful if
you change your mind later), or delete `ThemeSwitcher.tsx` + its import in
`app/layout.tsx` and hardcode that preset's values directly as the `:root`
block in `globals.css`.

## Content field renames (if you're diffing against an older version)

- `profile.statusCommand` → `profile.terminalLines` (now an array, cycles).
- `snapshot` rows gained a required `colorway` field (`"violet" | "amber" |
  "coral" | "teal"`) — used by the index-card stack's top tab color.
- `profile.heroTags` is new — an array of `{ label, colorway }` for the
  floating tags.

## The case-study modal (`components/case-study/`)

Clicking "View Case Study" on a project card opens a full-screen modal
that renders a `CaseStudy` object (see `types/caseStudy.ts`) — hero metrics
grid, live-demo link, overview/problem, an auto-laid-out architecture
diagram, engineering decisions, challenges overcome, categorized tech
stack, and lessons learned.

- `types/caseStudy.ts` — the full data shape.
- `data/caseStudies.ts` — one fully populated real example
  (`autonomous-driving-vqa`) to copy the shape from when adding more.
- `components/case-study/ArchitectureDiagram.tsx` — auto-layouts nodes into
  columns based on the edge graph (longest path from any root node), so you
  never have to hand-place coordinates — just list nodes and edges.
- `components/case-study/CaseStudyModal.tsx` — the modal shell itself.
  Closes on Escape or backdrop click, locks body scroll while open.

To wire up a new case study: add an entry to `data/caseStudies.ts` keyed by
an id, then set that same id as a project's `caseStudyId` in
`data/content.ts`. Projects without a `caseStudyId` simply don't render the
"View Case Study" button.

## Micro-interactions already built in

- `components/ui/RevealOnScroll.tsx` — scroll-triggered fade+rise, used on
  every section/card. Respects `prefers-reduced-motion` globally.
- `components/ui/SpotlightCard.tsx` — cursor-follow radial glow on hover,
  tinted per the card's own colorway (CSS-driven, no per-frame JS cost).
- `components/ui/MagneticButton.tsx` — buttons pull subtly toward the
  cursor and press down on click.
- `components/ui/CountUp.tsx` — animates PR diff numbers counting up when
  scrolled into view.
- `Navbar.tsx` — active nav pill morphs between tabs via Framer Motion
  `layoutId`; header gains blur/shadow on scroll.
- `Experience.tsx` — timeline connector line draws in as you scroll, tied
  to actual scroll progress (`useScroll` + `useSpring`).
- `Marquee.tsx` — auto-scrolling footer ticker, pauses on hover.
- `CaseStudyModal.tsx` — entrance/exit spring animation via `AnimatePresence`,
  closes on Escape or backdrop click.

## Latest round of changes

- **Index cards** (`IndexCardStack.tsx`): rebuilt as a non-overlapping row —
  all three snapshot cards are always fully visible and readable; the active
  one lifts/enlarges instead of the others fading or shrinking illegibly.
- **Experience milestone ribbon** (`ExperienceRibbon.tsx`): a horizontal strip
  above the timeline — click any entry to smoothly scroll to it and briefly
  ring-highlight its card. Functional jump-nav, not just decoration.
- **Footer rebuild**: a masthead-style closing statement ("Got something
  worth building together?") replaces the plain paragraph, with one clear
  primary CTA (`Say hello`) instead of four equal-weight buttons; secondary
  links (GitHub/LinkedIn/Resume) moved to a smaller row below. Two different
  accent hues now glow in the background instead of one flat blob.
- **Palette cleanup**: the shade switcher previously had near-duplicate hues
  and a duplicate `charcoal` CSS block (silently broken — the second
  definition was overriding the first). It's now a clean 12-preset list —
  Parchment, Ivory, Warm Gray, Cool Slate, Sky, Terracotta, Rose, Mustard,
  Sage, Lavender, Charcoal, Midnight — each a genuinely distinct hue
  direction, verified with no duplicate `[data-theme]` selectors.

## Handing this to Antigravity

Give it this repo and ask it to:
1. Replace every value in `data/content.ts` with your real projects,
   experience, open-source contributions, reading log entries, and links —
   **do not** touch component files for this, the data file is the single
   source of truth.
2. Add real entries to `data/caseStudies.ts` for any project that should
   open a deep-dive modal (copy the `autonomous-driving-vqa` entry's shape),
   then set the matching `caseStudyId` on that project in `data/content.ts`.
3. Assign each project a `colorway` (`violet`/`amber`/`coral`/`teal`) in
   `data/content.ts` — pick deliberately, don't let it default/randomize.
4. Swap `public/resume.pdf` for your real resume.
5. Leave the design system (colors, fonts, spacing, motion, the colorway
   map in `lib/colorways.ts`) alone unless you explicitly ask for a design
   change — this repo's job was to solve that already.

## Known gaps / things to do next

- No dark mode toggle wired up yet (tokens exist in Tailwind config under
  `dark-bg`/`dark-surface`/`dark-line`, but no toggle UI or `dark:` classes
  are applied — add if you want it).
- Only one case study (`autonomous-driving-vqa`) is populated; the other
  three placeholder projects have `caseStudyId: undefined` and won't show
  a "View Case Study" button until you add entries for them.
- No image/OG card set up yet — add `public/og.png` and reference it in
  `app/layout.tsx` metadata when ready.
