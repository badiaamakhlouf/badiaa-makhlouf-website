import type { Metadata } from "next";
import { ArrowUpRight, GitHubIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { ToolLogo } from "@/components/ToolLogo";
import { ButtonLink, Container, DraftBadge, PageHeader } from "@/components/ui";
import { learning, writing } from "@/content/learning";
import { visible } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certifications & Programmes",
  description: "AWS certifications, IBM professional certificates, a Udacity Data Engineering Nanodegree and the DeepLearning.AI Machine Learning Specialization.",
  alternates: { canonical: "/learning" },
};

export default function LearningPage() {
  const items = visible(learning);
  const count = (pred: (k: string) => boolean) => items.filter((i) => pred(i.kind) || pred(i.provider)).length;
  const stats = [
    { value: count((k) => k === "Amazon Web Services"), label: "AWS certifications" },
    { value: count((k) => k === "IBM · Coursera"), label: "IBM professional certificates" },
    { value: count((k) => k === "Nanodegree" || k === "Specialization"), label: "Nanodegree & specialization" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Learning & certifications"
        title={
          <>
            Certified, and still learning.
          </>
        }
        lead="Cloud certifications, professional certificates and programmes — from AWS architecture to data engineering and machine learning."
      />

      <Container className="py-20">
        <dl className="mb-14 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="rounded-2xl border border-line bg-panel p-5">
                <dd className="text-4xl font-semibold tracking-tight text-signal">{s.value}</dd>
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>

        <ol className="relative">
          <span className="absolute top-3 bottom-3 left-[23px] w-px bg-line-strong" aria-hidden />
          {items.map((l, i) => (
            <Reveal key={l.title} delay={0.03 * i}>
              <li className="relative flex gap-5 pb-5">
                <span className="relative z-10 mt-4">
                  <ToolLogo name={l.provider} size={48} />
                </span>
                <article className="flex-1 rounded-2xl border border-line bg-panel p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-24px_rgb(15_23_42/0.3)] sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-signal">{l.date}</span>
                    <span className="rounded-full border border-line-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">{l.kind}</span>
                    {l.draft && <DraftBadge />}
                  </div>
                  <h2 className="mt-2 text-lg font-medium tracking-tight">{l.title}</h2>
                  <p className="text-sm text-muted">{l.provider}</p>
                  {l.topics && l.topics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {l.topics.map((t) => (
                        <span key={t} className="rounded-full bg-fg/[0.04] px-2.5 py-1 text-xs text-fg/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {(l.verifyUrl || l.workUrl) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {l.verifyUrl && (
                        <a href={l.verifyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-signal px-3.5 py-1.5 text-xs font-medium text-on-signal hover:opacity-90">
                          Verify credential <ArrowUpRight className="size-3" />
                        </a>
                      )}
                      {l.workUrl && (
                        <a href={l.workUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-1.5 text-xs font-medium hover:border-fg/30">
                          <GitHubIcon className="size-3.5" /> View projects
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <section className="mt-12 flex flex-col gap-6 rounded-3xl border border-line bg-panel p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="text-xl font-medium tracking-tight">Writing & community</h2>
              <p className="mt-1.5 max-w-xl text-sm text-muted">{writing.note}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={writing.medium} variant="ghost" external>
                Medium <ArrowUpRight />
              </ButtonLink>
              <ButtonLink href={writing.kaggle} variant="ghost" external>
                Kaggle <ArrowUpRight />
              </ButtonLink>
            </div>
          </section>
        </Reveal>
      </Container>
    </>
  );
}
