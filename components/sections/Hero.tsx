"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { profile, snapshot } from "@/data/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import IndexCardStack from "@/components/ui/IndexCardStack";

const COMMANDS = ["status", "socials", "secret", "clear"];

export default function Hero() {
  const [terminalHistory, setTerminalHistory] = useState<{ cmd: string; output: string }[]>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let output = "";
    if (trimmed === "status") {
      output = `availability :: ${profile.availability}\nlocation     :: ${profile.location}\nfocus        :: Building reliable AI infrastructure`;
    } else if (trimmed === "socials") {
      output = `github   :: ${profile.socials.github}\nlinkedin :: ${profile.socials.linkedin}\nemail    :: ${profile.socials.email.replace("mailto:", "")}`;
    } else if (trimmed === "secret") {
      const isDev = document.documentElement.classList.toggle("developer-mode");
      // Dispatch custom event to notify other components (like Footer toggler)
      window.dispatchEvent(new CustomEvent("dev-mode-change", { detail: isDev }));
      output = isDev
        ? "SYS_INIT :: BLUEPRINT DRAWING ENGAGED.\n- Rendering 24px structural grid lines\n- Displaying section bounding box wires\n- Uncapping absolute container layout guidelines"
        : "SYS_SHUT :: BLUEPRINT DRAWING DISENGAGED.\n- Returning to production canvas render";
    } else if (trimmed === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else if (trimmed === "help") {
      output = `available commands: ${COMMANDS.join(", ")}`;
    } else {
      output = `error: command "${trimmed}" not recognized. Type "help" for a list of commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: trimmed, output }]);
    setTerminalInput("");
  };

  useEffect(() => {
    if (terminalHistory.length === 0) return;
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [terminalHistory]);

  return (
    <section id="top" className="px-6 py-20 md:px-12 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            {profile.availability}
          </span>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 items-start">
          {/* Main intro grid column */}
          <div className="md:col-span-7">
            <RevealOnScroll delay={0.05} className="mb-6 flex flex-wrap gap-2">
              {profile.heroTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted"
                >
                  {tag}
                </span>
              ))}
            </RevealOnScroll>

            <RevealOnScroll delay={0.12}>
              <h1 className="font-display leading-[1.05] text-ink">
                <span className="block text-3xl font-semibold uppercase tracking-tight text-muted md:text-4xl">
                  {profile.heroLine1}
                </span>
                <span className="mt-2 block text-5xl italic text-accent md:text-7xl">
                  {profile.heroEmphasis}
                </span>
                <span className="mt-2 block text-3xl font-bold md:text-5xl">
                  {profile.heroLine2}
                </span>
              </h1>

              <p className="mt-8 max-w-lg text-base leading-relaxed text-muted">{profile.bio}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-paper transition-all duration-200 hover:bg-ink/90 hover:translate-y-[-1px] shadow-sm"
                >
                  See the work →
                </a>
              </div>
            </RevealOnScroll>

            {/* Interactive Terminal (Surprise Element 1) */}
            <RevealOnScroll delay={0.24}>
              <div className="mt-12 overflow-hidden rounded-xl border border-line bg-surface shadow-sm max-w-xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-line bg-paper/50 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                    <TerminalIcon size={12} />
                    Status terminal
                  </div>
                </div>

                {/* Terminal Window content */}
                <div className="p-4 font-mono text-xs leading-relaxed text-ink/90 max-h-[160px] overflow-y-auto bg-surface/50">
                  <div className="text-muted mb-2">
                    // Welcome. Type a command or tap one below to execute.
                  </div>

                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="flex items-center gap-1 text-accent">
                        <span>$</span>
                        <span>{item.cmd}</span>
                      </div>
                      <div className="whitespace-pre-wrap text-muted mt-0.5">{item.output}</div>
                    </div>
                  ))}

                  <div className="flex items-center gap-1">
                    <span className="text-accent">$</span>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        runCommand(terminalInput);
                      }}
                      className="flex-1"
                    >
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="help"
                        className="w-full border-none bg-transparent font-mono text-xs text-ink placeholder-zinc-400 outline-none"
                      />
                    </form>
                  </div>
                  <div ref={terminalEndRef} />
                </div>

                {/* Command chips */}
                <div className="flex flex-wrap items-center gap-2 border-t border-line bg-paper/20 px-4 py-3">
                  <span className="font-mono text-[10px] text-muted uppercase tracking-wider mr-1">Suggestions:</span>
                  {COMMANDS.map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => runCommand(cmd)}
                      className="rounded border border-line bg-surface px-2 py-1 font-mono text-[10px] text-muted hover:border-accent hover:text-accent transition-all uppercase tracking-wider font-semibold"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Professional snapshot column */}
          <div className="md:col-span-5">
            <RevealOnScroll delay={0.18}>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted font-bold">
                Professional Snapshot
              </p>
              <IndexCardStack rows={snapshot} />
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
