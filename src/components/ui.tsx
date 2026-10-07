import Link from "next/link";
import type { ReactNode } from "react";
import type { NodeKind } from "@/content/projects";
import { ArrowRight } from "./icons";
import { Reveal } from "./Reveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      {index && <span className="text-signal">{index}</span>}
      <span className="h-px w-6 bg-line-strong" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  action,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <Reveal className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 className="mt-4 text-3xl font-medium tracking-tight text-balance sm:text-4xl">{title}</h2>
        {lead && <p className="mt-4 text-base leading-relaxed text-muted text-pretty">{lead}</p>}
      </div>
      {action && <ArrowLink href={action.href}>{action.label}</ArrowLink>}
    </Reveal>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Optional element (e.g. a portrait) shown beside the text on large screens. */
  aside?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div className="bg-grid mask-fade pointer-events-none absolute inset-0" aria-hidden />
      <Container className={`relative pt-32 pb-14 sm:pt-40 sm:pb-20 ${aside ? "grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16" : ""}`}>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">{title}</h1>
          {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{lead}</p>}
        </Reveal>
        {aside && <Reveal delay={0.1}>{aside}</Reveal>}
      </Container>
    </header>
  );
}

/** Serif italic accent for a word or two inside a headline. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-display text-[1.08em] font-normal italic text-signal">{children}</em>;
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "signal" }) {
  const tones = {
    default: "border-line-strong bg-fg/[0.03] text-fg/85",
    signal: "border-signal/30 bg-signal-soft text-signal",
  };
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] leading-5 ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function DraftBadge() {
  return (
    <span className="rounded border border-dashed border-k-guard/60 px-1.5 font-mono text-[10px] tracking-widest text-k-guard">
      DRAFT
    </span>
  );
}

export const kindColor: Record<NodeKind, string> = {
  input: "var(--color-k-input)",
  agent: "var(--color-k-agent)",
  model: "var(--color-k-model)",
  service: "var(--color-k-service)",
  store: "var(--color-k-store)",
  guard: "var(--color-k-guard)",
  output: "var(--color-k-output)",
};

export const kindLabel: Record<NodeKind, string> = {
  input: "Source",
  agent: "Agent",
  model: "Model",
  service: "Service",
  store: "Data store",
  guard: "Evaluation / governance",
  output: "Output",
};

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-fg/80 transition-colors hover:text-signal"
    >
      {children}
      <ArrowRight className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const styles = {
    primary: "bg-signal text-on-signal hover:opacity-90",
    ghost: "border border-line-strong text-fg hover:border-fg/40 hover:bg-fg/[0.04]",
  };
  const cls = `inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${styles[variant]}`;
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
