import { cn } from "@/lib/utils";
import type { Colorway } from "@/lib/colorways";

type Props = {
  className?: string;
  hue?: Colorway;
};

// Static per-hue classes — kept literal (not template-built) so Tailwind's
// compiler can detect them. See lib/colorways.ts for the same pattern.
const HUE_CLASSES: Record<Colorway, string> = {
  violet: "bg-[radial-gradient(circle_at_30%_30%,#6D28D9,transparent_70%)]",
  amber: "bg-[radial-gradient(circle_at_30%_30%,#D97F0A,transparent_70%)]",
  coral: "bg-[radial-gradient(circle_at_30%_30%,#E24E3C,transparent_70%)]",
  teal: "bg-[radial-gradient(circle_at_30%_30%,#0D8A72,transparent_70%)]",
};

/**
 * A single soft, blurred, low-opacity decorative gradient shape.
 * Purely atmospheric — never place behind readable text without
 * sufficient contrast/opacity margin. Use 2-3 total across the page,
 * and prefer varying `hue` rather than always defaulting to violet so
 * different sections don't all glow the same color.
 */
export default function GradientBlob({ className, hue = "violet" }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl opacity-[0.10]",
        HUE_CLASSES[hue],
        className
      )}
    />
  );
}
