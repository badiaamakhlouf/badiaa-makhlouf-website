import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/icons";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
import { Badge, Container, PageHeader, SectionHeading } from "@/components/ui";
import { moreWork, projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Delivered projects in generative AI, deep learning, machine learning and data engineering — problem, architecture, contribution and results.",
  alternates: { canonical: "/projects" },
};

// How every case study is structured.
const method = [
  { step: "What I built", body: "The system, its users and the problem it removes." },
  { step: "How I built it", body: "Architecture, key decisions and the stack — with an interactive diagram." },
  { step: "Why it matters", body: "Business impact and what changed for the people using it." },
  { step: "Evidence", body: "Metrics, code, or a walkthrough for confidential work." },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Proof of work, not a list of claims."
        lead="Projects I delivered — each with the problem, the solution, an interactive architecture, my personal contribution and the results. Client names are anonymised; I'm happy to go deeper in interview."
      />
      <section className="py-20">
        <Container>
          <ol className="relative mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <span className="absolute top-5 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-signal/0 via-signal/40 to-signal/0 lg:block" aria-hidden />
            {method.map((m, i) => (
              <Reveal key={m.step} delay={i * 0.06}>
                <li className="relative flex flex-col items-start lg:items-center lg:text-center">
                  <span className="relative grid size-10 place-items-center rounded-full border border-signal/30 bg-panel font-mono text-xs text-signal shadow-sm">
                    0{i + 1}
                  </span>
                  <p className="mt-4 font-medium">{m.step}</p>
                  <p className="mt-1.5 max-w-[16rem] text-sm leading-relaxed text-muted">{m.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <ProjectGrid projects={projects} />
        </Container>
      </section>

      <section className="border-t border-line py-20">
        <Container>
          <SectionHeading eyebrow="More on GitHub" title="Open-source & earlier work" lead="Personal projects and learning resources on GitHub." />
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {moreWork.map((w) => (
              <li key={w.href} className="bg-canvas">
                <a href={w.href} target="_blank" rel="noreferrer" className="group flex h-full flex-col p-6 transition-colors hover:bg-panel">
                  <span className="flex items-start justify-between gap-3 font-medium">
                    {w.title}
                    <ArrowUpRight className="mt-1 shrink-0 text-faint transition-colors group-hover:text-signal" />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{w.description}</span>
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {w.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
