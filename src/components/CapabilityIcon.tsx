const paths: Record<string, React.ReactNode> = {
  // Agent: a node orchestrating three others.
  agents: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="4.5" cy="5" r="1.8" />
      <circle cx="19.5" cy="5" r="1.8" />
      <circle cx="12" cy="20.5" r="1.8" />
      <path d="M6 6.3 9.8 10M18 6.3 14.2 10M12 15v3.7" />
    </>
  ),
  // LLM: chat bubble with structured lines.
  llm: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  // Evaluation: target.
  eval: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </>
  ),
  // Deep learning: layered network.
  dl: (
    <>
      <circle cx="5" cy="7" r="1.6" />
      <circle cx="5" cy="17" r="1.6" />
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
      <path d="M6.5 7.5 10.5 5.5M6.5 7.5l4 4M6.5 16.5l4-4M6.5 16.5l4 2M13.5 5.5l4 5.5M13.5 12h4M13.5 18.5l4-5.5" />
    </>
  ),
  // Data: stacked database.
  data: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v6.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5.5M5 12v6.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V12" />
    </>
  ),
  // Cloud.
  cloud: <path d="M7 18h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 9.2 4.4 4.4 0 0 0 7 18z" />,
};

export function CapabilityIcon({ name }: { name: string }) {
  return (
    <span className="grid size-11 place-items-center rounded-xl border border-signal/20 bg-signal-soft text-signal">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {paths[name]}
      </svg>
    </span>
  );
}
