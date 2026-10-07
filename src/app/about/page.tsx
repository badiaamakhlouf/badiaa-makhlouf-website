import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SpokenLanguages } from "@/components/SpokenLanguages";
import { ButtonLink, Container, Eyebrow, PageHeader } from "@/components/ui";
import { WorkIllustration } from "@/components/WorkIllustration";
import { beyond, path, workflow, workPhoto } from "@/content/about";
import { getProject } from "@/content/projects";
import { agile } from "@/content/skills";
import { ToolLogo } from "@/components/ToolLogo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.role}, ${site.specialty}, based in ${site.location}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An engineer who likes the whole system."
        lead={site.intro}
        aside={
          site.photo && (
            <div className="relative aspect-[4/5] w-48 overflow-hidden rounded-2xl border border-line shadow-[0_30px_60px_-30px_rgb(15_23_42/0.35)] sm:w-56 lg:w-64">
              <Image src={site.photo} alt={`Portrait of ${site.name}`} fill sizes="256px" className="object-cover object-top" priority />
            </div>
          )
        }
      />

      {/* Path + beyond the day job */}
      <Container className="py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">The path</h2>
            <ol className="mt-6 space-y-8 border-l border-line-strong pl-6">
              {path.map((p) => (
                <li key={p.place} className="relative">
                  <span className="absolute top-1.5 -left-[29px] size-[9px] rounded-full bg-signal" aria-hidden />
                  <p className="font-mono text-[11px] text-faint">{p.period}</p>
                  <p className="mt-1 font-medium">{p.place}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Beyond the day job</h2>
            <ul className="mt-6 grid gap-3">
              {beyond.map((b) => (
                <li key={b.title} className="rounded-2xl border border-line bg-panel p-5">
                  <p className="font-mono text-[10.5px] uppercase tracking-wider text-signal">{b.title}</p>
                  <p className="mt-1.5 font-medium">{b.org}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{b.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-3 rounded-2xl border border-line bg-panel p-5">
              <p className="font-mono text-[10.5px] uppercase tracking-wider text-signal">Languages</p>
              <div className="mt-1">
                <SpokenLanguages />
              </div>
            </div>
            <p className="mt-8 leading-relaxed text-muted">
              I&apos;m most useful on teams that want AI and data work to be measurable, maintainable and actually used.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">See the projects</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Contact
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* How I work */}
      <section className="border-t border-line bg-panel py-24">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <Eyebrow>How I work</Eyebrow>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              From raw data to a decision.
            </h2>
            <p className="mt-4 text-muted">
              The whole data science lifecycle — each step with the projects where I did it.
            </p>
          </Reveal>

          {workPhoto && (
            <Reveal className="mb-12">
              <figure className="overflow-hidden rounded-3xl border border-line">
                <div className="relative aspect-[21/9]">
                  <Image src={workPhoto.src} alt={workPhoto.alt} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
                </div>
                {workPhoto.caption && <figcaption className="px-5 py-3 text-sm text-muted">{workPhoto.caption}</figcaption>}
              </figure>
            </Reveal>
          )}

          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((step, i) => (
              <Reveal key={step.key} delay={(i % 3) * 0.06} className="h-full">
                <li className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-canvas transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(15_23_42/0.25)]">
                  <div className="bg-grid relative aspect-[244/132] border-b border-line bg-gradient-to-br from-signal-soft via-panel to-k-model/[0.06] p-4">
                    <WorkIllustration name={step.key} />
                    <span className="absolute top-3 left-3 grid size-8 place-items-center rounded-full border border-signal/30 bg-panel font-mono text-[11px] text-signal shadow-sm">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-medium tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                    <ul className="mt-4 space-y-1.5">
                      {step.points.map((pt) => (
                        <li key={pt} className="flex gap-2.5 text-sm text-fg/85">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                      {step.proof.map((slug) => {
                        const p = getProject(slug);
                        return p ? (
                          <Link
                            key={slug}
                            href={`/projects/${slug}`}
                            className="rounded-full border border-signal/25 px-2.5 py-1 font-mono text-[10.5px] text-signal transition-colors hover:bg-signal-soft"
                          >
                            {p.title.split(/ on | — /)[0]} →
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-5">
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-signal/20 bg-gradient-to-br from-signal-soft via-canvas to-k-model/[0.05] p-7 sm:p-9 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-full border border-signal/30 bg-panel font-mono text-[11px] text-signal shadow-sm">↻</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Throughout: Scrum · XP · Kanban</span>
                </p>
                <h3 className="mt-4 text-xl font-medium tracking-tight sm:text-2xl">Every step, delivered as a team.</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{agile.summary}</p>
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {agile.practices.map((pr) => (
                    <li key={pr} className="flex gap-2.5 text-sm text-fg/85">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
                      {pr}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="flex flex-wrap justify-center gap-3 lg:justify-end">
                {[...agile.methods, ...agile.tools].map((t) => (
                  <li key={t} className="flex w-20 flex-col items-center gap-1.5 rounded-2xl border border-line bg-panel p-3">
                    <ToolLogo name={t} size={36} className="ring-0" />
                    <span className="text-[11px] text-muted">{t === "Extreme Programming (XP)" ? "XP" : t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
