import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArchThumb } from "./ArchThumb";
import { ArrowUpRight } from "./icons";
import { LogoStack } from "./ToolLogo";
import { Badge } from "./ui";

/**
 * Project card with a visual cover: the project's image when set, otherwise an
 * abstract rendering of its real architecture. `large` lays out horizontally on desktop.
 */
export function ProjectCard({ project, index, large = false }: { project: Project; index: number; large?: boolean }) {
  const headline = project.results[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_48px_-24px_rgb(15_23_42/0.25)] ${
        large ? "lg:flex-row" : ""
      }`}
    >
      <div
        className={`relative aspect-[16/9] shrink-0 overflow-hidden border-b border-line bg-gradient-to-br from-signal-soft via-panel to-k-model/[0.06] ${
          large ? "lg:aspect-auto lg:w-[56%] lg:border-r lg:border-b-0" : ""
        }`}
      >
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={large ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <div className="bg-grid absolute inset-0" aria-hidden />
            <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03] ${large ? "p-4 lg:p-6" : "p-5 sm:p-7"}`}>
              <ArchThumb nodes={project.architecture.nodes} edges={project.architecture.edges} />
            </div>
          </>
        )}
        <span className="absolute top-4 left-4 rounded-full border border-line bg-panel/90 px-2.5 py-1 font-mono text-[10.5px] tracking-wider text-fg/80 backdrop-blur">
          <span className="text-signal">{String(index + 1).padStart(2, "0")}</span> · {project.domain}
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${large ? "lg:justify-center lg:p-10" : ""}`}>
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          <span className="truncate">{project.context}</span>
          <span className="shrink-0">{project.year}</span>
        </div>

        <h3 className={`mt-4 flex items-start justify-between gap-4 font-medium tracking-tight text-balance ${large ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
          {project.title}
          <ArrowUpRight className="mt-1.5 size-5 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">{project.tagline}</p>

        {headline && (
          <div className="mt-6 flex items-baseline gap-3 rounded-xl bg-signal-soft px-4 py-3">
            <span className="text-lg font-semibold tracking-tight text-signal">{headline.value}</span>
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted">{headline.label}</span>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Badge tone="signal">{project.status}</Badge>
          <LogoStack names={project.stack.flatMap((g) => g.items)} size={large ? 34 : 30} max={large ? 6 : 5} />
        </div>
      </div>
    </Link>
  );
}
