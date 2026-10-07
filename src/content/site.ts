// Single source of truth for identity, links and SEO.
// Change `url` once the custom domain is attached in Vercel.

export const site = {
  name: "Badiaa Makhlouf",
  role: "AI Engineer",
  specialty: "Generative & Agentic AI",
  location: "Munich, Germany",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://badiaamakhlouf.com",
  // No email address is published. The contact form posts to Formspree:
  // create a form at formspree.io and set NEXT_PUBLIC_FORMSPREE_ID (e.g. "xyzabcd").
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID,
  // Optional portrait, e.g. "/images/portrait.jpg" (put the file in /public/images).
  photo: "/images/badiaa_picture.png" as string | undefined,
  headline:
    "I build LLM systems that leave the notebook: agents, extraction pipelines, evaluation harnesses and the cloud data platforms underneath them.",
  intro:
    "7+ years across machine learning, deep learning and data engineering — in healthcare, industrial IoT, energy, automotive, hospitality and agriculture — now focused on generative and agentic AI. I care about the unglamorous parts that decide whether an AI system ships: schemas, evaluation, data foundations and governance.",
  availability: "Open to AI roles in Germany — on-site or remote.",
  links: {
    github: "https://github.com/badiaamakhlouf",
    linkedin: "https://www.linkedin.com/in/badiaa-makhlouf-b77032116/",
    medium: "https://medium.com/@badiaa-makhlouf",
    kaggle: "https://www.kaggle.com/badiaamakhlouf",
  },
} as const;

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/learning", label: "Learning" },
  { href: "/about", label: "About" },
] as const;
