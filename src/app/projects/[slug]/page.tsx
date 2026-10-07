import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ArchThumb } from "@/components/ArchThumb";
import { ArrowRight, ArrowUpRight, GitHubIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { LogoStack, TechBadge } from "@/components/ToolLogo";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: project.title, description: project.tagline, type: "article" },
  };
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="grid grid-cols-1 gap-6 border-t border-line py-14 md:grid-cols-[220px_1fr] md:gap-12">
        <div>
          <p className="font-mono text-[11px] text-signal">{index}</p>
          <h2 className="mt-2 text-xl font-medium tracking-tight">{title}</h2>
        </div>
        <div className="min-w-0">{children}</div>
      </section>
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-fg/85">
          <span className="mt-2.5 h-px w-3 shrink-0 bg-signal" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="bg-grid mask-fade absolute inset-0" />
          <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-signal/[0.09] blur-3xl" />
          <div className="absolute top-0 right-[-8rem] size-[28rem] rounded-full bg-k-model/[0.07] blur-3xl" />
        </div>
        <Container className="relative grid items-center gap-12 pt-28 pb-14 sm:pt-36 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <Link href="/projects" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-fg">
              ← All projects
            </Link>
            <div className="mt-8">
              <Eyebrow index={String(i + 1).padStart(2, "0")}>{project.domain}</Eyebrow>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">{project.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted text-pretty">{project.tagline}</p>
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { k: "Context", v: project.context },
                { k: "Year", v: project.year },
                { k: "Status", v: project.status },
                { k: "Domain", v: project.domain },
              ].map((d) => (
                <div key={d.k}>
                  <dt className="font-mono text-[10.5px] uppercase tracking-wider text-faint">{d.k}</dt>
                  <dd className="mt-1 text-sm text-fg/90">{d.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex items-center gap-3">
              <LogoStack names={project.stack.flatMap((g) => g.items)} size={38} max={7} />
              <span className="font-mono text-[11px] text-faint">Built with</span>
            </div>
            {(project.links.github || project.links.demo) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.github && (
                  <ButtonLink href={project.links.github} external>
                    <GitHubIcon /> View source
                  </ButtonLink>
                )}
                {project.links.demo && (
                  <ButtonLink href={project.links.demo} variant="ghost" external>
                    Live demo <ArrowUpRight />
                  </ButtonLink>
                )}
              </div>
            )}
          </Reveal>
          <Reveal delay={0.12}>
            <div className="group overflow-hidden rounded-3xl border border-line bg-panel shadow-[0_30px_60px_-30px_rgb(15_23_42/0.3)]">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-signal-soft via-panel to-k-model/[0.06]">
                <div className="bg-grid absolute inset-0" aria-hidden />
                <div className="absolute inset-0 p-6">
                  <ArchThumb nodes={project.architecture.nodes} edges={project.architecture.edges} />
                </div>
              </div>
              {project.results[0] && (
                <div className="border-t border-line p-6">
                  <p className="font-mono text-[10.5px] uppercase tracking-wider text-faint">{project.results[0].label}</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-signal">{project.results[0].value}</p>
                </div>
              )}
            </div>
          </Reveal>
        </Container>
      </header>

      <Container>
        {project.cover && (
          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-2xl border border-line">
            <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          </div>
        )}
        <Reveal>
          <p className="max-w-3xl py-14 text-xl leading-relaxed text-fg/90 text-pretty sm:text-2xl">{project.summary}</p>
        </Reveal>

        <Block index="01" title="Problem">
          <Bullets items={project.problem} />
        </Block>

        <Block index="02" title="Solution">
          <Bullets items={project.solution} />
        </Block>

        <Reveal>
          <section className="border-t border-line py-14">
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="font-mono text-[11px] text-signal">03</p>
                <h2 className="mt-2 text-xl font-medium tracking-tight">Architecture</h2>
              </div>
              <p className="font-mono text-[11px] text-faint">Hover, tap or tab through nodes</p>
            </div>
            <div className="-mx-4 sm:mx-0 lg:-mx-12 xl:-mx-20"><ArchitectureDiagram nodes={project.architecture.nodes} edges={project.architecture.edges} caption={project.architecture.caption} /></div>
            <div className={`mt-8 grid gap-4 ${project.decisions.length === 1 ? "" : project.decisions.length % 2 === 0 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
              {project.decisions.map((d) => (
                <div key={d.title} className="rounded-xl border border-line p-5">
                  <p className="font-mono text-[10.5px] uppercase tracking-wider text-faint">Design decision</p>
                  <h3 className="mt-2 font-medium">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Block index="04" title="Technologies">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {project.stack.map((g) => (
              <div key={g.group}>
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-faint">{g.group}</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {g.items.map((t) => (
                    <TechBadge key={t} name={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block index="05" title="My contribution">
          <Bullets items={project.contribution} />
        </Block>

        <Block index="06" title="Results & impact">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {project.results.map((r) => (
              <div key={r.label} className="bg-canvas p-5">
                <dt className="font-mono text-[10.5px] uppercase tracking-wider text-faint">{r.label}</dt>
                <dd className="mt-1.5 text-lg font-medium text-fg">{r.value}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block index="07" title="Evidence">
          <ul className="space-y-3">
            {project.evidence.map((e) => (
              <li key={e.label} className="rounded-xl border border-line p-5">
                {e.href ? (
                  <a href={e.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-signal hover:underline">
                    {e.label} <ArrowUpRight />
                  </a>
                ) : (
                  <p className="font-medium">{e.label}</p>
                )}
                {e.note && <p className="mt-1.5 text-sm text-muted">{e.note}</p>}
              </li>
            ))}
          </ul>
        </Block>
      </Container>

      <Container className="pb-24">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-center justify-between gap-6 rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-line-strong sm:p-8"
        >
          <span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Next project</span>
            <span className="mt-2 block text-xl font-medium tracking-tight sm:text-2xl">{next.title}</span>
          </span>
          <ArrowRight className="size-6 shrink-0 text-faint transition-all group-hover:translate-x-1 group-hover:text-signal" />
        </Link>
      </Container>
    </article>
  );
}
