type Props = {
  items: string[];
};

/**
 * A thin, full-width, auto-scrolling ticker. Duplicates the item list once
 * so the CSS animation (marquee, in globals.css) can loop seamlessly at
 * -50% translateX. Pauses on hover.
 */
export default function Marquee({ items }: Props) {
  const doubled = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-t border-dark-line bg-ink py-3">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-4 shrink-0 font-mono text-xs uppercase tracking-wider text-paper/70"
          >
            {item}
            <span className="mx-4 text-accent">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
