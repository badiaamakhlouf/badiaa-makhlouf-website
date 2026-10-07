"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { categories, type Category, type Project } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

/** Project grid with category filter chips. The first project in view is shown large. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Category | "All">("All");
  const reduce = useReducedMotion();
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);
  const count = (c: Category) => projects.filter((p) => p.category === c).length;

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="toolbar" aria-label="Filter projects by category">
        {(["All", ...categories] as const).map((c) => {
          const on = active === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                on ? "border-signal bg-signal text-on-signal" : "border-line-strong bg-panel text-fg/80 hover:border-signal/40 hover:text-fg"
              }`}
            >
              {c}
              <span className={`font-mono text-[11px] ${on ? "text-on-signal/80" : "text-faint"}`}>{c === "All" ? projects.length : count(c)}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout={!reduce} className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className={`h-full ${i === 0 ? "md:col-span-2" : ""} ${i === shown.length - 1 && shown.length % 2 === 0 && shown.length > 1 ? "md:col-span-2" : ""}`}
            >
              <ProjectCard project={p} index={projects.indexOf(p)} large={i === 0 || (i === shown.length - 1 && shown.length % 2 === 0 && shown.length > 1)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
