import Image from "next/image";
import Link from "next/link";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CapabilityIcon } from "@/components/CapabilityIcon";
import { HeroGraph } from "@/components/HeroGraph";
import { ArrowRight, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { Marquee } from "@/components/Marquee";
import { LogoStack, TechBadge } from "@/components/ToolLogo";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Accent, ArrowLink, ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { capabilities } from "@/content/ai";
import { experience } from "@/content/experience";
import { learning } from "@/content/learning";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { visible } from "@/lib/content";

// Every number here comes from a case study.
const metrics = [
  { value: "25", label: "contract terms extracted by agents on AWS Bedrock", href: "/projects/contract-intelligence-bedrock" },
  { value: "0.82", label: "Dice score on 3D CT multi-organ segmentation", href: "/projects/medical-imaging-segmentation" },
  { value: "−22%", label: "AWS storage cost through serverless automation", href: "/projects/aws-data-lake-automation" },
  { value: "7+", label: "years across data science, ML and data engineering", href: "/experience" },
];

const stack = [
  "Amazon Bedrock", "Claude", "Llama", "Qwen", "PyTorch", "TensorFlow", "scikit-learn", "MLflow", "Optuna", "pandas",
  "Python", "FastAPI", "React", "TypeScript", "BigQuery", "GCP", "Snowflake", "dbt", "AWS Lambda", "SageMaker", "Docker", "Jira",
];

const companies = ["Publicis Sapient", "Bonescreen", "ProGlove", "Luxoft", "NetValue"];

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const showcase = getProject("contract-intelligence-bedrock")!;
  const roles = visible(experience);
  const highlighted = ["AWS Certified Solutions Architect – Associate", "Machine Learning Specialization", "IBM Machine Learning Professional Certificate", "Data Engineering Nanodegree", "IBM Data Science Professional Certificate"];
  const certs = visible(learning).filter((l) => highlighted.includes(l.title)).sort((a, b) => highlighted.indexOf(a.title) - highlighted.indexOf(b.title));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="bg-grid mask-fade absolute inset-0" />
          <div className="absolute -top-32 -left-24 size-[32rem] rounded-full bg-signal/[0.10] blur-3xl" />
          <div className="absolute top-10 right-[-6rem] size-[30rem] rounded-full bg-k-model/[0.08] blur-3xl" />
          <div className="absolute bottom-[-10rem] left-1/3 size-[26rem] rounded-full bg-k-store/[0.07] blur-3xl" />
        </div>

        <Container className="relative grid items-center gap-12 pt-28 pb-16 sm:pt-36 lg:grid-cols-[1.25fr_1fr] lg:pb-20">
          <Reveal>
            <span className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/80 py-1.5 pr-3.5 text-xs text-fg/80 shadow-sm backdrop-blur ${site.photo ? "pl-1.5" : "pl-3.5"}`}>
              {site.photo && (
                <span className="relative size-7 shrink-0">
                  <Image src={site.photo} alt={`Portrait of ${site.name}`} fill sizes="28px" className="rounded-full object-cover object-top" priority />
                  <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-panel bg-k-output" aria-hidden />
                </span>
              )}
              {!site.photo && (
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-k-output opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-k-output" />
                </span>
              )}
              Open to {site.role} roles · {site.location}
            </span>
            <h1 className="mt-7 text-[2.6rem] leading-[1.04] font-medium tracking-tight text-balance sm:text-6xl lg:text-[4.1rem]">
              {site.name}. I build AI systems that <Accent>ship</Accent> — and prove they work.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">{site.headline}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/projects">
                See the work <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Get in touch
              </ButtonLink>
              <div className="ml-1 flex items-center gap-1">
                {[
                  { href: site.links.github, label: "GitHub", icon: <GitHubIcon /> },
                  { href: site.links.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
                  { href: "/contact", label: "Contact form", icon: <MailIcon /> },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    aria-label={l.label}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-fg/[0.05] hover:text-fg"
                  >
                    {l.icon}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-[17rem] sm:max-w-md">
            <div className="absolute inset-6 rounded-full bg-panel shadow-[0_30px_80px_-30px_rgb(15_23_42/0.25)]" aria-hidden />
            <div className="relative">
              <HeroGraph />
            </div>
          </Reveal>
        </Container>

        {/* Evidence metrics */}
        <Container className="relative pb-14">
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={0.05 * i} className="h-full">
                <Link
                  href={m.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-panel/90 p-5 shadow-[0_1px_2px_rgb(15_23_42/0.04)] backdrop-blur transition-all hover:-translate-y-0.5 hover:border-signal/30"
                >
                  <dd className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                    {m.value.startsWith("−") ? <span className="text-signal">{m.value}</span> : m.value}
                  </dd>
                  <dt className="mt-2 text-xs leading-snug text-muted sm:text-sm">{m.label}</dt>
                </Link>
              </Reveal>
            ))}
          </dl>
        </Container>

        <Container className="relative pb-12">
          <Reveal>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">Delivered at</span>
              <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                {companies.map((c) => (
                  <li key={c} className="text-lg font-semibold tracking-tight text-fg/45 transition-colors hover:text-fg">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>

        <div className="relative border-y border-line bg-panel/70 py-5 backdrop-blur">
          <Marquee items={stack} />
        </div>
      </section>

      {/* Featured projects */}
      <section className="pt-20 pb-24" id="projects">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Featured work"
            title="Real systems, end to end."
            lead="Production systems from my client and employer work — each with the problem, the architecture, my contribution and the evidence."
            action={{ href: "/projects", label: `All ${projects.length} projects` }}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal
                key={p.slug}
                delay={i === 0 ? 0 : ((i - 1) % 3) * 0.08}
                className={`h-full ${i === 0 ? "md:col-span-2 lg:col-span-3" : ""} ${i === featured.length - 1 && featured.length % 2 === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <ProjectCard project={p} index={i} large={i === 0} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Interactive architecture */}
      <section className="border-y border-line bg-panel py-24">
        <Container>
          <Reveal>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <Eyebrow index="02">Under the hood</Eyebrow>
                <h2 className="mt-4 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
                  Explore a real architecture. <Accent>Click any node.</Accent>
                </h2>
                <p className="mt-3 text-muted">{showcase.title} — every project has a diagram like this.</p>
              </div>
              <ArrowLink href={`/projects/${showcase.slug}`}>View project</ArrowLink>
            </div>
            <ArchitectureDiagram nodes={showcase.architecture.nodes} edges={showcase.architecture.edges} caption={showcase.architecture.caption} />
          </Reveal>
        </Container>
      </section>

      {/* AI & Agentic AI */}
      <section className="py-24" id="ai">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="AI & Agentic AI"
            title="What I bring to an AI team."
            lead="Each capability links to the project where I used it — not a list of buzzwords."
            action={{ href: "/skills", label: "All skills" }}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => {
              const proof = getProject(c.proof)!;
              return (
                <Reveal key={c.key} delay={(i % 3) * 0.06} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgb(15_23_42/0.25)]">
                    <CapabilityIcon name={c.key} />
                    <h3 className="mt-5 text-lg font-medium">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.tools.map((t) => (
                        <TechBadge key={t} name={t} />
                      ))}
                    </div>
                    <Link href={`/projects/${proof.slug}`} className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-signal">
                      See it in {proof.title.split(/ on | — /)[0]}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Experience + learning */}
      <section className="border-t border-line bg-panel py-24">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading index="04" eyebrow="Experience" title="Where I've built." action={{ href: "/experience", label: "Experience" }} />
            <Reveal>
              <ol className="divide-y divide-line rounded-2xl border border-line">
                {roles.map((r, i) => (
                  <li key={`${r.company}-${r.period}`} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:gap-6">
                    <span className="flex w-40 shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-faint">
                      {i === 0 && <span className="size-1.5 rounded-full bg-k-output" aria-label="Current" />}
                      {r.period}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{r.company}</span>
                      <span className="block text-sm text-muted">{r.role}</span>
                    </span>
                    <span className="hidden sm:block">
                      <LogoStack names={r.stack} size={28} max={4} />
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <div>
            <SectionHeading index="05" eyebrow="Learning" title="Certified & curious." action={{ href: "/learning", label: "Learning" }} />
            <Reveal>
              <ul className="divide-y divide-line border-y border-line">
                {certs.map((l) => (
                  <li key={l.title} className="flex items-baseline gap-4 py-3.5">
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{l.title}</span>
                      <span className="block font-mono text-[11px] text-faint">{l.provider}</span>
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-faint">{l.date}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-fg px-6 py-16 text-center text-canvas sm:px-12 sm:py-20">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,var(--color-canvas)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-canvas)_1px,transparent_1px)] [background-size:40px_40px]"
                aria-hidden
              />
              <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-signal/30 blur-3xl" aria-hidden />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-canvas/60">Contact</p>
                <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-medium tracking-tight text-balance sm:text-5xl">
                  Hiring for GenAI, ML or agentic systems? <em className="font-display font-normal text-signal-inverse italic">Let&apos;s talk.</em>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-canvas/70">{site.availability}</p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-canvas px-6 py-3 text-sm font-medium text-fg transition-opacity hover:opacity-90">
                    <MailIcon /> Send a message
                  </Link>
                  <a
                    href={site.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-canvas/25 px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-canvas/10"
                  >
                    <LinkedInIcon /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
