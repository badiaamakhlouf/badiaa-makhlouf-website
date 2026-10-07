import Link from "next/link";
import { nav, site } from "@/content/site";
import { Container } from "./ui";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="text-sm font-medium">{site.name}</p>
          <p className="mt-2 text-sm text-muted">
            {site.role} · {site.specialty}. {site.location}.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {[...nav, { href: "/contact", label: "Contact" }].map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-fg">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-3">
          <a href={site.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-9 place-items-center rounded-full border border-line-strong text-muted hover:text-fg">
            <GitHubIcon />
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-9 place-items-center rounded-full border border-line-strong text-muted hover:text-fg">
            <LinkedInIcon />
          </a>
          <Link href="/contact" aria-label="Contact form" className="grid size-9 place-items-center rounded-full border border-line-strong text-muted hover:text-fg">
            <MailIcon />
          </Link>
        </div>
      </Container>
      <Container className="pb-8">
        <p className="font-mono text-[11px] text-faint">
          © {new Date().getFullYear()} {site.name}. Built with Next.js, TypeScript, Tailwind CSS and Framer Motion.
        </p>
      </Container>
    </footer>
  );
}
