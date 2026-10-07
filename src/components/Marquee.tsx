import { ToolLogo } from "./ToolLogo";

/** Infinite, CSS-only scrolling band of tool logos. The list is duplicated so the loop is seamless. */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="mask-edges overflow-hidden" aria-label={`Tools: ${items.join(", ")}`}>
      <div className="flex w-max animate-marquee gap-8 hover:[animation-play-state:paused]" aria-hidden>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-2.5 text-sm font-medium whitespace-nowrap text-fg/75">
            <ToolLogo name={t} size={30} className="ring-0" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
