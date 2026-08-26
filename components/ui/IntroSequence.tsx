"use client";

import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = ["$ whoami", "pranay — ai infrastructure engineer", "$ status", "systems nominal."];
const STEP_MS = 260;
const SEEN_KEY = "intro-seen";

/**
 * A short terminal boot sequence shown once per browser session, on first
 * load only. Skipped entirely (no flash, no delay) for repeat visits within
 * the session and for prefers-reduced-motion. This is the site's one
 * "first impression" moment — everything else stays calm by comparison.
 *
 * Both `show` and `skip` default to their "first visit, currently booting"
 * values so server and first-client render match (no hydration mismatch).
 * The decision happens in useLayoutEffect, which commits before the
 * browser's first paint. On skip, the component bails out to `null` before
 * AnimatePresence ever mounts its child — no exit transition is attempted,
 * so there is nothing to see.
 */
export default function IntroSequence() {
  const [show, setShow] = useState(true);
  const [skip, setSkip] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SEEN_KEY);
    if (reduced || seen) {
      setSkip(true);
      return;
    }
    sessionStorage.setItem(SEEN_KEY, "1");

    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setLineCount(i);
      if (i >= LINES.length) {
        window.clearInterval(timer);
        window.setTimeout(() => setShow(false), 420);
      }
    }, STEP_MS);

    return () => window.clearInterval(timer);
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-paper px-6"
          aria-hidden="true"
        >
          <div className="w-full max-w-xs font-mono text-[13px] leading-relaxed text-muted">
            {LINES.slice(0, lineCount).map((line, i) => (
              <p key={line} className={i === LINES.length - 1 ? "text-accent" : undefined}>
                {line}
              </p>
            ))}
            {lineCount < LINES.length && (
              <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-accent" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
