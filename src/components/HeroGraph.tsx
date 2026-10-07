"use client";

import { motion, useReducedMotion } from "framer-motion";

// An orchestrator with satellite agents; dashes travel along each edge to suggest message passing.
const center = { x: 200, y: 200 };
const satellites = [
  { label: "plan", x: 200, y: 52, color: "var(--color-k-agent)" },
  { label: "extract", x: 342, y: 132, color: "var(--color-k-store)" },
  { label: "act · tools", x: 318, y: 300, color: "var(--color-k-service)" },
  { label: "evaluate", x: 82, y: 300, color: "var(--color-k-guard)" },
  { label: "LLM", x: 58, y: 132, color: "var(--color-k-model)" },
];

export function HeroGraph() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 400 380" className="h-auto w-full" role="img" aria-label="Diagram of an orchestrator agent connected to planning, retrieval, tools, evaluation and an LLM">
      <circle cx={center.x} cy={center.y} r={150} fill="none" stroke="var(--color-line)" strokeDasharray="2 6" />
      <circle cx={center.x} cy={center.y} r={92} fill="none" stroke="var(--color-line)" />
      {satellites.map((s, i) => (
        <g key={s.label}>
          <motion.line
            x1={center.x}
            y1={center.y}
            x2={s.x}
            y2={s.y}
            stroke="var(--color-edge)"
            strokeWidth={1}
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.12 }}
          />
          <line
            x1={center.x}
            y1={center.y}
            x2={s.x}
            y2={s.y}
            stroke={s.color}
            strokeWidth={1.4}
            strokeDasharray="3 17"
            className="animate-flow"
            style={{ animationDuration: `${1.4 + i * 0.35}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
            opacity={0.85}
          />
          <motion.g
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.12 }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >
            <circle cx={s.x} cy={s.y} r={20} fill="var(--color-panel)" stroke={s.color} strokeOpacity={0.6} />
            <circle cx={s.x} cy={s.y} r={4} fill={s.color} />
            <text x={s.x} y={s.y + 36} textAnchor="middle" fontSize={11} className="font-mono" fill="var(--color-muted)">
              {s.label}
            </text>
          </motion.g>
        </g>
      ))}
      <circle cx={center.x} cy={center.y} r={44} fill="var(--color-signal)" fillOpacity={0.1} className="animate-pulse-soft" />
      <rect x={center.x - 54} y={center.y - 20} width={108} height={40} rx={10} fill="var(--color-raised)" stroke="var(--color-signal)" strokeOpacity={0.7} />
      <text x={center.x} y={center.y + 4} textAnchor="middle" fontSize={12} className="font-mono" fill="var(--color-signal)">
        orchestrator
      </text>
    </svg>
  );
}
