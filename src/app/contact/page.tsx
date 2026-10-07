import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ArrowUpRight, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { Accent, Container, PageHeader } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about AI Engineer, GenAI or ML roles.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  { label: "LinkedIn", value: "badiaa-makhlouf", href: site.links.linkedin, icon: LinkedInIcon },
  { label: "GitHub", value: "badiaamakhlouf", href: site.links.github, icon: GitHubIcon },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something that <Accent>ships</Accent>.
          </>
        }
        lead={site.availability}
      />
      <Container className="py-20">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="rounded-2xl border border-line bg-panel p-6 sm:p-9">
              <h2 className="text-xl font-medium tracking-tight">Send me a message</h2>
              <p className="mt-1.5 mb-7 text-sm text-muted">It goes straight to my inbox.</p>
              <ContactForm formId={site.formspreeId} fallbackHref={site.links.linkedin} />
            </div>
          </Reveal>
          <div className="grid content-start gap-5">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={0.06 * (i + 1)}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-line-strong"
                >
                  <c.icon className="size-5 text-muted group-hover:text-fg" />
                  <span className="flex-1">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-faint">{c.label}</span>
                    <span className="mt-0.5 block font-medium">{c.value}</span>
                  </span>
                  <ArrowUpRight className="text-faint group-hover:text-signal" />
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-line bg-panel p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-faint">Location</p>
                <p className="mt-0.5 font-medium">{site.location}</p>
                <p className="mt-1 text-sm text-muted">CET · open to on-site or remote roles in Germany</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}
