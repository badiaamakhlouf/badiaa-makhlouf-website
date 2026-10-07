import type { ArchEdge, ArchNode } from "@/content/projects";
import { NODE_H, NODE_W, geometry, left, route, top } from "@/lib/diagram";
import { kindColor } from "./ui";

/**
 * Abstract, non-interactive rendering of a project's real architecture —
 * used as cover art on cards. Text is replaced by bars so it reads at any size.
 * Edges start flowing when the surrounding `.group` is hovered.
 */
export function ArchThumb({ nodes, edges, className = "" }: { nodes: ArchNode[]; edges: ArchEdge[]; className?: string }) {
  const { width, height } = geometry(nodes);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const padX = 40;
  const padY = 36;

  return (
    <svg
      viewBox={`${-padX} ${-padY} ${width + padX * 2} ${height + padY * 2}`}
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {edges.map((e) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return null;
        return (
          <path
            key={`${e.from}-${e.to}`}
            d={route(a, b).d}
            fill="none"
            stroke="var(--color-edge)"
            strokeWidth={2.5}
            strokeDasharray={e.dashed ? "6 8" : "10 6"}
            className="group-hover:animate-flow"
          />
        );
      })}
      {nodes.map((n) => {
        const color = kindColor[n.kind];
        const x = left(n);
        const y = top(n);
        const strong = n.kind === "agent" || n.kind === "model";
        return (
          <g key={n.id}>
            <rect
              x={x}
              y={y}
              width={NODE_W}
              height={NODE_H}
              rx={12}
              fill={strong ? `color-mix(in srgb, ${color} 12%, var(--color-panel))` : "var(--color-panel)"}
              stroke={color}
              strokeOpacity={strong ? 0.8 : 0.35}
              strokeWidth={2.5}
            />
            <circle cx={x + 18} cy={y + 22} r={6} fill={color} />
            <rect x={x + 32} y={y + 17} width={NODE_W * 0.55} height={10} rx={5} fill="var(--color-fg)" opacity={0.7} />
            <rect x={x + 32} y={y + 36} width={NODE_W * 0.38} height={8} rx={4} fill="var(--color-faint)" opacity={0.45} />
          </g>
        );
      })}
    </svg>
  );
}
