"use client";

import { useEffect, useRef, useState } from "react";

const STEP_MS = 110;
const SPEED = 4.5;
const IDLE_RADIUS = 46;
const BLINK_MS = 2200;

/**
 * A tiny pixel-art rover that lives on the page and roams toward the
 * cursor — same proven "desktop pet" mechanic as the classic oneko.js
 * cursor-chaser, rebuilt from scratch as an on-brand rover (not a reskin)
 * with its own idle/walk state machine, stepped movement (not smooth
 * spring-follow, so it reads as mechanical rather than liquid), and a
 * blinking sensor light instead of face/paw animation frames.
 *
 * Position is driven by directly mutating the ref'd element's transform
 * on each tick rather than React state, so the ~9 ticks/sec movement loop
 * never triggers a re-render — only the walking/facing/blink booleans
 * (which change far less often) go through useState.
 */
export default function PixelRover() {
  const [enabled, setEnabled] = useState(false);
  const [walking, setWalking] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [rollFrame, setRollFrame] = useState(0);
  const [blink, setBlink] = useState(true);

  const roverRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isEnabled = isFinePointer && !reducedMotion;
    setEnabled(isEnabled);
    if (!isEnabled) return;

    const startX = 64;
    const startY = window.innerHeight - 72;
    pos.current = { x: startX, y: startY };
    target.current = { x: startX, y: startY };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    // Writes the transform unconditionally, every tick (idle or walking).
    // roverRef isn't attached yet on this effect's first run — the div
    // only mounts once `enabled` flips true and React re-renders — so the
    // ref only becomes non-null a tick or two in. Gating the write inside
    // the "walking" branch only (as an earlier version did) meant an idle
    // rover never got positioned at all.
    const stepTimer = window.setInterval(() => {
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > IDLE_RADIUS) {
        const angle = Math.atan2(dy, dx);
        pos.current.x += Math.cos(angle) * SPEED;
        pos.current.y += Math.sin(angle) * SPEED;
        setWalking(true);
        setFacingLeft(dx < 0);
        setRollFrame((f) => (f + 1) % 2);
      } else {
        setWalking(false);
      }

      if (roverRef.current) {
        roverRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
    }, STEP_MS);

    const blinkTimer = window.setInterval(() => setBlink((b) => !b), BLINK_MS);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.clearInterval(stepTimer);
      window.clearInterval(blinkTimer);
    };
  }, []);

  if (!enabled) return null;

  const bob = walking ? rollFrame : 0;

  return (
    <div
      ref={roverRef}
      className="pointer-events-none fixed left-0 top-0 z-30 -translate-x-1/2 -translate-y-full"
      aria-hidden="true"
    >
      <svg
        width="34"
        height="26"
        viewBox="0 0 32 24"
        shapeRendering="crispEdges"
        style={{ transform: facingLeft ? "scaleX(-1)" : undefined }}
      >
        <rect x={11} y={6} width={10} height={7} rx={1} fill="rgb(var(--c-surface))" stroke="rgb(var(--c-line))" />
        <rect x={17} y={8} width={3} height={3} fill={blink ? "rgb(var(--c-accent))" : "rgb(var(--c-line))"} />
        <line x1={16} y1={6} x2={16} y2={1} stroke="rgb(var(--c-line))" strokeWidth={1} />
        <circle cx={16} cy={1} r={1.3} fill={blink ? "rgb(var(--c-accent))" : "rgb(var(--c-line))"} />
        <rect
          x={6}
          y={12 - bob}
          width={20}
          height={8}
          rx={1}
          fill="rgb(var(--c-surface))"
          stroke="rgb(var(--c-line))"
        />
        <rect x={8} y={18 - bob * 2} width={5} height={5} rx={1} fill="rgb(var(--c-line))" />
        <rect x={19} y={18 + bob * 2} width={5} height={5} rx={1} fill="rgb(var(--c-line))" />
      </svg>
    </div>
  );
}
