"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#";

/**
 * Decrypt-style hover effect — on hover, characters cycle through random
 * glyphs and lock in left-to-right until the real text resolves. A small
 * "hacker terminal" flourish for nav links, cheap and contained since it
 * only runs while a specific link is actually being hovered.
 */
export default function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function scramble() {
    if (reducedMotionRef.current) return;
    if (timerRef.current) clearInterval(timerRef.current);

    let iteration = 0;
    const maxIterations = text.length * 3;
    timerRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return text[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      iteration += 1;
      if (iteration > maxIterations) {
        if (timerRef.current) clearInterval(timerRef.current);
        setDisplay(text);
      }
    }, 35);
  }

  function reset() {
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplay(text);
  }

  return (
    <span className={className} onMouseEnter={scramble} onMouseLeave={reset}>
      {display}
    </span>
  );
}
