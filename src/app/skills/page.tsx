import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SpokenLanguages } from "@/components/SpokenLanguages";
import { LogoStack, TechBadge } from "@/components/ToolLogo";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { getProject } from "@/content/projects";
import { agile, skillGroups } from "@/content/skills";
import { toolkit } from "@/content/toolkit";

export const metadata: Metadata = {
  title: "Skills",
  description: "Skills proven in delivered projects, plus the full toolkit: ML, deep learning, NLP, data engineering, cloud, MLOps and Agile.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  const toolCount = toolkit.reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title={
          <>
            Skills, with receipts.
          </>
        }
        lead="First, the skills proven in delivered projects — each linked to where I used it. Then the full toolkit I work with."
      />

      {/* Proven in projects */}
      <section className="py-20">
        <Container>
          <SectionHeading index="01" eyebrow="Proven in projects" title="Used in delivered work." lead="Click a project tag to see the skill in context." />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={(i % 2) * 0.06} className={`h-full ${i === skillGroups.length - 1 && skillGroups.length % 2 === 1 ? "lg:col-span-2" : ""}`}>
                <section className="h-full rounded-2xl border border-line bg-panel p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[11px] text-signal">{String(i + 1).padStart(2, "0")}</p>
                    <LogoStack names={g.logos} size={32} />
                  </div>
                  <h3 className="mt-2 text-xl font-medium tracking-tight">{g.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{g.description}</p>
                  <ul className="mt-6 divide-y divide-line">
                    {g.skills.map((s) => (
                      <li key={s.name} className="flex flex-col gap-1.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <span className="text-sm text-fg/90">{s.name}</span>
                        {s.evidence && (
                          <span className="flex flex-wrap gap-1.5 sm:justify-end">
                            {s.evidence.map((slug) => {
                              const p = getProject(slug);
                              return p ? (
                                <Link
                                  key={slug}
                                  href={`/projects/${slug}`}
                                  className="rounded border border-signal/25 px-1.5 py-0.5 font-mono text-[10.5px] text-signal/90 transition-colors hover:bg-signal-soft"
                                  title={p.title}
                                >
                                  {p.title.split(/ on | — /)[0]}
                                </Link>
                              ) : null;
                            })}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Full toolkit */}
      <section className="border-y border-line bg-panel py-20">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="Full toolkit"
            title={
              <>
                {toolCount}+ tools and techniques, organised.
              </>
            }
            lead="Everything I work with, across the whole data and AI lifecycle."
          />
          <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
            {toolkit.map((c) => (
              <Reveal key={c.title} className="mb-5 break-inside-avoid">
                <section className="rounded-2xl border border-line bg-canvas p-5 transition-shadow hover:shadow-[0_16px_32px_-24px_rgb(15_23_42/0.3)]">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-medium">{c.title}</h3>
                    <span className="rounded-full bg-signal-soft px-2 py-0.5 font-mono text-[10.5px] text-signal">{c.items.length}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.items.map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Languages + agile */}
      <section className="py-20">
        <Container className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-2xl border border-line bg-panel p-6 sm:p-7">
              <p className="font-mono text-[11px] text-signal">03</p>
              <h2 className="mt-2 text-xl font-medium tracking-tight">Languages I speak</h2>
              <p className="mt-1.5 text-sm text-muted">Arabic, English, French, Italian and German.</p>
              <div className="mt-6">
                <SpokenLanguages />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="h-full">
            <div className="h-full rounded-2xl border border-line bg-panel p-6 sm:p-7">
              <p className="font-mono text-[11px] text-signal">04</p>
              <h2 className="mt-2 text-xl font-medium tracking-tight">Agile ways of working</h2>
              <p className="mt-1.5 text-sm text-muted">{agile.summary}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {[...agile.methods, ...agile.tools].map((t) => (
                  <TechBadge key={t} name={t} />
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
