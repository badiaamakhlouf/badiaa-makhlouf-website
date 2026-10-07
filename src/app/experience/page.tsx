import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { LogoStack, TechBadge } from "@/components/ToolLogo";
import { Container, DraftBadge, PageHeader } from "@/components/ui";
import { education, experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { visible } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description: "7+ years across GenAI, deep learning, ML engineering and data engineering.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title={
          <>
            From data pipelines to agents.
          </>
        }
        lead="Data engineering, then machine learning and deep learning, now generative and agentic AI — each step building on the last."
      />
      <Container className="py-20">
        <ol className="relative">
          <span className="absolute top-2 bottom-2 left-[7px] w-px bg-line-strong md:left-[calc(200px+7px)]" aria-hidden />
          {visible(experience).map((r, i) => (
            <Reveal key={`${r.company}-${r.period}`} delay={0.04 * i}>
              <li className="relative grid gap-3 pb-14 pl-8 md:grid-cols-[200px_1fr] md:gap-10 md:pl-0">
                <div className="font-mono text-xs leading-6 text-muted md:pr-6 md:text-right">
                  {r.period}
                  {r.location && <span className="block text-faint">{r.location}</span>}
                </div>
                <span
                  className={`absolute top-1.5 left-0 size-[15px] rounded-full border-2 border-canvas md:left-[200px] ${i === 0 ? "bg-signal" : "bg-line-strong"}`}
                  aria-hidden
                />
                <div className="md:pl-10">
                  <h2 className="flex flex-wrap items-center gap-2 text-xl font-medium tracking-tight">
                    {r.role} <span className="text-muted">· {r.company}</span>
                    {r.draft && <DraftBadge />}
                  </h2>
                  <p className="mt-2 leading-relaxed text-muted">{r.summary}</p>
                  <ul className="mt-4 space-y-2.5">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg/85">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-signal" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {r.projects && (
                    <div className="mt-6">
                      <p className="font-mono text-[10.5px] uppercase tracking-wider text-faint">Projects delivered</p>
                      <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {r.projects.map((slug) => {
                          const p = getProject(slug);
                          return p ? (
                            <Link
                              key={slug}
                              href={`/projects/${slug}`}
                              className="group flex items-center gap-3 rounded-2xl border border-line bg-panel p-3 pr-4 transition-all hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-[0_12px_24px_-16px_rgb(15_23_42/0.25)]"
                            >
                              <LogoStack names={p.stack.flatMap((g) => g.items)} size={26} max={3} />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium">{p.title}</span>
                                <span className="block truncate text-xs text-signal">{p.results[0]?.value}</span>
                              </span>
                              <ArrowRight className="size-3.5 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-signal" />
                            </Link>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                  {r.stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {r.stack.map((t) => (
                        <TechBadge key={t} name={t} />
                      ))}
                    </div>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <section className="mt-6 border-t border-line pt-14">
            <h2 className="text-xl font-medium tracking-tight">Education</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {education.map((e) => (
                <li key={e.school} className="rounded-xl border border-line p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-faint">{e.year}</p>
                  <p className="mt-1.5 font-medium">{e.degree}</p>
                  {e.href ? (
                    <a href={e.href} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-signal">
                      {e.school}
                    </a>
                  ) : (
                    <p className="text-sm text-muted">{e.school}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </Container>
    </>
  );
}
