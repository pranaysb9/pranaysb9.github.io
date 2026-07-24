import { ArrowRight } from "lucide-react";
import type { ArchitectureNode, ArchitectureEdge } from "@/types/caseStudy";

type Props = {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};

/**
 * Auto-layout: computes each node's column (level) as the longest path from
 * any root node (a node with no incoming edge), then renders nodes grouped
 * into columns with an arrow between each column. This is a deliberate
 * simplification — good enough to visualize a pipeline shape without doing
 * per-node SVG coordinate math, and it wraps naturally on mobile.
 */
export default function ArchitectureDiagram({ nodes, edges }: Props) {
  const levels = new Map<string, number>();
  const hasIncoming = new Set(edges.map((e) => e.to));
  const roots = nodes.filter((n) => !hasIncoming.has(n.id));

  roots.forEach((n) => levels.set(n.id, 0));

  // Simple relaxation pass — fine for the small, acyclic graphs this renders.
  for (let pass = 0; pass < nodes.length; pass++) {
    edges.forEach((e) => {
      const fromLevel = levels.get(e.from);
      if (fromLevel === undefined) return;
      const proposed = fromLevel + 1;
      const current = levels.get(e.to);
      if (current === undefined || proposed > current) {
        levels.set(e.to, proposed);
      }
    });
  }

  const maxLevel = Math.max(...Array.from(levels.values()), 0);
  const columns: ArchitectureNode[][] = Array.from({ length: maxLevel + 1 }, () => []);
  nodes.forEach((n) => {
    const lvl = levels.get(n.id) ?? 0;
    columns[lvl].push(n);
  });

  return (
    <div className="flex flex-col items-stretch gap-4 overflow-x-auto pb-2 md:flex-row md:items-center">
      {columns.map((col, i) => (
        <div key={i} className="flex flex-1 items-center gap-4">
          <div className="flex flex-1 flex-col gap-3">
            {col.map((node) => (
              <div
                key={node.id}
                className="rounded-lg border border-line bg-paper px-4 py-3 text-center"
              >
                <p className="font-display text-sm font-semibold text-ink">
                  {node.label}
                </p>
                {node.detail && (
                  <p className="mt-0.5 text-xs text-muted">{node.detail}</p>
                )}
              </div>
            ))}
          </div>
          {i < columns.length - 1 && (
            <ArrowRight
              size={20}
              className="shrink-0 rotate-90 text-muted md:rotate-0"
            />
          )}
        </div>
      ))}
    </div>
  );
}
