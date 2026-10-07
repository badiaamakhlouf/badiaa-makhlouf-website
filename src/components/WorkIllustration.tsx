import type { WorkStep } from "@/content/about";

// Small illustrated scenes for each step of "How I work", drawn in the site palette.
const P = "var(--color-signal)";
const V = "var(--color-k-model)";
const T = "var(--color-k-store)";
const B = "var(--color-k-service)";
const L = "var(--color-line-strong)";
const E = "var(--color-edge)";

function Pipelines() {
  return (
    <>
      {[30, 62, 94].map((y, i) => (
        <g key={y}>
          <rect x="14" y={y - 10} width="44" height="20" rx="5" fill="var(--color-panel)" stroke={[B, T, V][i]} strokeWidth="1.5" />
          <circle cx="24" cy={y} r="3" fill={[B, T, V][i]} />
          <path d={`M58 ${y} C 76 ${y}, 76 62, 90 62`} fill="none" stroke={E} strokeWidth="1.5" strokeDasharray="4 4" className="group-hover:animate-flow" />
        </g>
      ))}
      {["raw", "silver", "gold"].map((t, i) => (
        <g key={t}>
          <rect x={90 + i * 36} y="48" width="32" height="28" rx="6" fill={i === 2 ? "color-mix(in srgb, var(--color-signal) 14%, var(--color-panel))" : "var(--color-panel)"} stroke={i === 2 ? P : L} strokeWidth="1.5" />
          <text x={106 + i * 36} y="66" textAnchor="middle" fontSize="7" className="font-mono" fill="var(--color-muted)">{t}</text>
          {i < 2 && <path d={`M${122 + i * 36} 62 h4`} stroke={E} strokeWidth="1.5" />}
        </g>
      ))}
      <g transform="translate(224 40)">
        <ellipse cx="0" cy="6" rx="14" ry="5" fill="var(--color-panel)" stroke={P} strokeWidth="1.5" />
        <path d="M-14 6v26c0 2.8 6.3 5 14 5s14-2.2 14-5V6" fill="var(--color-panel)" stroke={P} strokeWidth="1.5" />
        <path d="M-14 19c0 2.8 6.3 5 14 5s14-2.2 14-5" fill="none" stroke={P} strokeWidth="1.2" opacity="0.5" />
      </g>
      <path d="M194 62 h16" stroke={P} strokeWidth="1.5" strokeDasharray="3 3" className="group-hover:animate-flow" />
    </>
  );
}

function Wrangling() {
  // Messy points on the left, tidy table on the right.
  const messy = [[22, 30], [48, 22], [36, 52], [18, 74], [52, 66], [30, 96], [56, 100], [42, 82], [24, 112]];
  return (
    <>
      {messy.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={i % 3 === 0 ? 14 : 10} height="6" rx="3" fill={[B, V, T, P][i % 4]} opacity={i === 4 ? 0.25 : 0.75} transform={`rotate(${(i * 23) % 40 - 20} ${x} ${y})`} />
      ))}
      <path d="M86 64 h40" stroke={E} strokeWidth="1.5" />
      <path d="m120 58 6 6-6 6" fill="none" stroke={E} strokeWidth="1.5" />
      <rect x="140" y="22" width="88" height="86" rx="8" fill="var(--color-panel)" stroke={L} strokeWidth="1.5" />
      <rect x="140" y="22" width="88" height="16" rx="8" fill="color-mix(in srgb, var(--color-signal) 12%, var(--color-panel))" />
      {[46, 62, 78, 94].map((y, r) => (
        <g key={y}>
          {[150, 180, 206].map((x, c) => (
            <rect key={x} x={x} y={y} width={c === 0 ? 22 : 16} height="6" rx="3" fill={[B, V, T][c]} opacity="0.7" />
          ))}
          {r < 3 && <path d={`M146 ${y + 10} h76`} stroke={L} strokeWidth="1" />}
        </g>
      ))}
      <circle cx="222" cy="30" r="5" fill={T} />
      <path d="m219.5 30 1.8 1.8 3.2-3.4" fill="none" stroke="white" strokeWidth="1.4" />
    </>
  );
}

function Eda() {
  const bars = [18, 34, 56, 72, 60, 40, 24];
  const dots = [[150, 98], [160, 88], [168, 92], [176, 78], [186, 74], [192, 66], [202, 60], [210, 52], [218, 46], [172, 104], [196, 70]];
  return (
    <>
      <path d="M16 112 h104" stroke={L} strokeWidth="1.5" />
      {bars.map((h, i) => (
        <rect key={i} x={22 + i * 14} y={112 - h} width="10" height={h} rx="2" fill={i === 3 ? P : B} opacity={i === 3 ? 0.9 : 0.35} />
      ))}
      <path d="M22 100 C 50 30, 80 30, 116 98" fill="none" stroke={V} strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M138 112 h96 M138 112 V 26" stroke={L} strokeWidth="1.5" />
      <path d="M144 104 L 226 40" stroke={T} strokeWidth="1.5" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={V} opacity="0.6" />
      ))}
      <circle cx="160" cy="44" r="4" fill={P} />
      <circle cx="160" cy="44" r="9" fill="none" stroke={P} strokeWidth="1.2" strokeDasharray="2 2" />
      <text x="172" y="40" fontSize="7" className="font-mono" fill={P}>anomaly</text>
    </>
  );
}

function Features() {
  return (
    <>
      {["temp", "rain", "soil"].map((t, i) => (
        <g key={t}>
          <rect x={14 + i * 34} y="24" width="28" height="84" rx="6" fill="var(--color-panel)" stroke={L} strokeWidth="1.5" />
          <text x={28 + i * 34} y="36" textAnchor="middle" fontSize="7" className="font-mono" fill="var(--color-muted)">{t}</text>
          {[48, 62, 76, 90].map((y) => (
            <rect key={y} x={20 + i * 34} y={y} width="16" height="5" rx="2.5" fill={[B, T, V][i]} opacity="0.6" />
          ))}
        </g>
      ))}
      <path d="M118 66 C 140 66, 140 66, 158 66" stroke={E} strokeWidth="1.5" />
      <circle cx="138" cy="66" r="11" fill="var(--color-panel)" stroke={P} strokeWidth="1.5" />
      <path d="M133 66h10M138 61v10" stroke={P} strokeWidth="1.6" />
      <rect x="164" y="24" width="40" height="84" rx="6" fill="color-mix(in srgb, var(--color-signal) 12%, var(--color-panel))" stroke={P} strokeWidth="1.5" />
      <text x="184" y="36" textAnchor="middle" fontSize="7" className="font-mono" fill={P}>season</text>
      {[48, 62, 76, 90].map((y, i) => (
        <rect key={y} x="172" y={y} width={[24, 16, 20, 12][i]} height="5" rx="2.5" fill={P} opacity="0.75" />
      ))}
      <path d="M214 40 l8 -6 l8 6" fill="none" stroke={T} strokeWidth="1.5" />
      <path d="M222 34 v30" stroke={T} strokeWidth="1.5" />
      <text x="222" y="76" textAnchor="middle" fontSize="7" className="font-mono" fill={T}>signal</text>
    </>
  );
}

function Modelling() {
  return (
    <>
      <rect x="14" y="20" width="118" height="92" rx="8" fill="var(--color-panel)" stroke={L} strokeWidth="1.5" />
      <path d="M26 98 h96 M26 98 V 32" stroke={L} strokeWidth="1" />
      <path d="M28 40 C 50 80, 70 88, 120 92" fill="none" stroke={B} strokeWidth="1.8" />
      <path d="M28 46 C 50 82, 70 84, 120 86" fill="none" stroke={P} strokeWidth="1.8" strokeDasharray="4 3" />
      <text x="34" y="30" fontSize="7" className="font-mono" fill="var(--color-muted)">train · val loss</text>
      <rect x="146" y="20" width="84" height="40" rx="8" fill="var(--color-panel)" stroke={L} strokeWidth="1.5" />
      <text x="156" y="36" fontSize="7" className="font-mono" fill="var(--color-muted)">metric</text>
      <text x="156" y="52" fontSize="13" fontWeight="600" fill={P}>0.82</text>
      <circle cx="214" cy="40" r="8" fill={T} />
      <path d="m210.5 40 2.5 2.5 4.5-5" fill="none" stroke="white" strokeWidth="1.6" />
      <rect x="146" y="72" width="84" height="40" rx="8" fill="color-mix(in srgb, var(--color-k-model) 10%, var(--color-panel))" stroke={V} strokeWidth="1.5" />
      <text x="156" y="88" fontSize="7" className="font-mono" fill={V}>{"{ typed: true }"}</text>
      <path d="M156 98 h40" stroke={V} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    </>
  );
}

function Story() {
  return (
    <>
      <rect x="20" y="16" width="136" height="88" rx="8" fill="var(--color-panel)" stroke={L} strokeWidth="1.5" />
      <path d="M88 104 v12 M70 120 h36" stroke={L} strokeWidth="1.5" />
      {[30, 46, 40, 62].map((h, i) => (
        <rect key={i} x={36 + i * 22} y={92 - h} width="14" height={h} rx="3" fill={i === 3 ? P : B} opacity={i === 3 ? 0.9 : 0.35} />
      ))}
      <path d="M36 54 L 58 44 L 80 50 L 110 26" fill="none" stroke={P} strokeWidth="1.6" />
      <path d="m104 25 6 1 -1 6" fill="none" stroke={P} strokeWidth="1.6" />
      <circle cx="196" cy="58" r="12" fill="color-mix(in srgb, var(--color-k-model) 14%, var(--color-panel))" stroke={V} strokeWidth="1.5" />
      <path d="M176 112 c0 -16 9 -26 20 -26 s20 10 20 26" fill="color-mix(in srgb, var(--color-k-model) 14%, var(--color-panel))" stroke={V} strokeWidth="1.5" />
      <path d="M166 26 h56 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-38 l-8 7 v-7 h-10 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6z" fill="var(--color-panel)" stroke={P} strokeWidth="1.5" />
      <path d="M174 36 h40 M174 43 h26" stroke={P} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    </>
  );
}

const scenes: Record<WorkStep["key"], () => React.ReactNode> = {
  pipelines: Pipelines,
  wrangling: Wrangling,
  eda: Eda,
  features: Features,
  modelling: Modelling,
  story: Story,
};

export function WorkIllustration({ name }: { name: WorkStep["key"] }) {
  const Scene = scenes[name];
  return (
    <svg viewBox="0 0 244 132" className="h-full w-full" aria-hidden>
      <Scene />
    </svg>
  );
}
