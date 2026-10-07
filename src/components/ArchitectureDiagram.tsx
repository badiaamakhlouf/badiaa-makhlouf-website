"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import type { ArchEdge, ArchNode, NodeKind } from "@/content/projects";
import { NODE_H, NODE_W, geometry, left, route, top } from "@/lib/diagram";
import { kindColor, kindLabel } from "./ui";

export function ArchitectureDiagram({
  nodes,
  edges,
  caption,
  compact = false,
}: {
  nodes: ArchNode[];
  edges: ArchEdge[];
  caption?: string;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const { width, height } = useMemo(() => geometry(nodes), [nodes]);
  const firstAgent = nodes.find((n) => n.kind === "agent") ?? nodes[0];
  const [selected, setSelected] = useState<string>(firstAgent.id);
  const [hovered, setHovered] = useState<string | null>(null);

  const active = hovered ?? selected;
  const activeNode = byId.get(active)!;
  const connected = useMemo(() => {
    const set = new Set<string>([active]);
    for (const e of edges) {
      if (e.from === active) set.add(e.to);
      if (e.to === active) set.add(e.from);
    }
    return set;
  }, [active, edges]);

  const inputs = edges.filter((e) => e.to === active).map((e) => byId.get(e.from)!);
  const outputs = edges.filter((e) => e.from === active).map((e) => byId.get(e.to)!);
  const kinds = [...new Set(nodes.map((n) => n.kind))] as NodeKind[];

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-4 py-3 sm:px-5">
        {kinds.map((k) => (
          <span key={k} className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-muted">
            <span className="size-2 rounded-full" style={{ background: kindColor[k] }} />
            {kindLabel[k]}
          </span>
        ))}
        <span className="ml-auto font-mono text-[10.5px] text-faint md:hidden">scroll →</span>
      </div>

      <div className="relative overflow-x-auto">
        <div className="bg-grid relative" style={{ minWidth: Math.max(compact ? 640 : 760, width * 0.82) }}>
          <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
            <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 size-full" aria-hidden>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-line-strong)" />
                </marker>
                <marker id="arrow-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-signal)" />
                </marker>
              </defs>
              {edges.map((e) => {
                const a = byId.get(e.from);
                const b = byId.get(e.to);
                if (!a || !b) return null;
                const { d, label } = route(a, b);
                const on = e.from === active || e.to === active;
                return (
                  <g key={`${e.from}-${e.to}`} className="transition-opacity duration-300" opacity={on ? 1 : 0.55}>
                    <path
                      d={d}
                      fill="none"
                      stroke={on ? "var(--color-signal)" : "var(--color-edge)"}
                      strokeWidth={on ? 1.6 : 1.1}
                      strokeDasharray={e.dashed || on ? "4 6" : undefined}
                      className={on && !reduce ? "animate-flow" : undefined}
                      markerEnd={on ? "url(#arrow-on)" : "url(#arrow)"}
                    />
                    {e.label && (
                      <text
                        x={label.x}
                        y={label.y}
                        textAnchor="middle"
                        className="font-mono"
                        fontSize={9.5}
                        fill={on ? "var(--color-signal)" : "var(--color-muted)"}
                        stroke="var(--color-panel)"
                        strokeWidth={4}
                        paintOrder="stroke"
                      >
                        {e.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {nodes.map((n, i) => {
              const isActive = n.id === active;
              const dim = !connected.has(n.id);
              return (
                <motion.button
                  key={n.id}
                  type="button"
                  initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setSelected(n.id)}
                  onClick={() => setSelected(n.id)}
                  aria-pressed={n.id === selected}
                  aria-label={`${n.label}: ${n.sub ?? kindLabel[n.kind]}`}
                  className="absolute flex flex-col justify-center rounded-lg border bg-raised px-2.5 text-left transition-[opacity,border-color,box-shadow] duration-300"
                  style={{
                    left: `${(left(n) / width) * 100}%`,
                    top: `${(top(n) / height) * 100}%`,
                    width: `${(NODE_W / width) * 100}%`,
                    height: `${(NODE_H / height) * 100}%`,
                    borderColor: isActive ? kindColor[n.kind] : "var(--color-line-strong)",
                    boxShadow: isActive ? `0 0 0 3px color-mix(in srgb, ${kindColor[n.kind]} 18%, transparent), 0 8px 30px -10px ${kindColor[n.kind]}` : undefined,
                    opacity: dim ? 0.4 : 1,
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 shrink-0 rounded-full" style={{ background: kindColor[n.kind] }} />
                    <span className="truncate text-[12px] font-medium leading-tight text-fg">{n.label}</span>
                  </span>
                  {n.sub && <span className="mt-0.5 line-clamp-2 pl-3 font-mono text-[9.5px] leading-tight text-muted">{n.sub}</span>}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {!compact && (
        <div className="grid grid-cols-1 gap-6 border-t border-line p-5 sm:p-6 md:grid-cols-[1.4fr_1fr]" aria-live="polite">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider" style={{ color: kindColor[activeNode.kind] }}>
              <span className="size-2 rounded-full" style={{ background: kindColor[activeNode.kind] }} />
              {kindLabel[activeNode.kind]}
            </p>
            <h4 className="mt-2 text-lg font-medium">{activeNode.label}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{activeNode.detail}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { title: "Receives from", list: inputs },
              { title: "Sends to", list: outputs },
            ].map(({ title, list }) => (
              <div key={title}>
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-faint">{title}</p>
                <ul className="mt-2 space-y-1.5">
                  {list.length === 0 && <li className="text-faint">—</li>}
                  {list.map((n) => (
                    <li key={n.id}>
                      <button type="button" onClick={() => setSelected(n.id)} className="text-left text-fg/85 underline-offset-4 hover:text-signal hover:underline">
                        {n.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {caption && <figcaption className="border-t border-line px-5 py-3 font-mono text-[11px] text-faint">{caption}</figcaption>}
    </figure>
  );
}
