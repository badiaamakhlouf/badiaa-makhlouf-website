# Badiaa Makhlouf — Portfolio

A proof-of-work portfolio for an AI Engineer (Generative & Agentic AI). Every project page follows the same arc:
**what I built → how I built it → why it matters → evidence.**

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Framer Motion. Fully static: no backend, no database.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes are prerendered)
npm run lint
```

## Editing content

All copy lives in typed files under [`src/content/`](src/content). Components never hard-code content.

| File | What it drives |
|---|---|
| `site.ts` | Name, headline, intro, social links, site URL, contact form ID, portrait |
| `projects.ts` | Case studies, including the interactive architecture diagrams, plus "More on GitHub" |
| `experience.ts` | Experience timeline and education |
| `skills.ts` | Skill groups; each skill can link to the projects that prove it |
| `ai.ts` | The "AI & Agentic AI" capability section on the home page |
| `learning.ts` | Courses, certifications, writing links |

### Adding a project

Add an object to `projects` in `projects.ts`. Its page is generated at `/projects/<slug>` automatically.
Architecture diagrams are declared as data:

- **Nodes** sit on a grid: `col` runs left to right, `row` top to bottom, and fractional columns are allowed.
  `kind` sets the colour (`input`, `agent`, `model`, `service`, `store`, `guard`, `output`).
- **Edges** are routed automatically: forward curves, vertical connectors, feedback loops (backward edges) and elbows for long edges that rise into a node.
  Use `dashed: true` for optional, fallback or feedback paths. Keep labels short (≤ 8 characters) when they sit between adjacent columns.

### Drafts and TODOs

- `draft: true` on an experience or learning entry shows it with a DRAFT badge in `npm run dev` and drops it from production builds.
- `TODO(badiaa)` comments mark facts only you can confirm. Search for them before publishing: `grep -rn "TODO(badiaa)" src`.
- Client names are anonymised by industry. Check your NDA before naming a client.

## Contact form

No email address is published on the site. The form on `/contact` posts to [Formspree](https://formspree.io), so the site stays static.

1. Create a free Formspree account and a new form. Set the delivery address in Formspree; a dedicated address such as `hello@your-domain.com` forwarded to your inbox works well. Cloudflare Email Routing and ImprovMX are free options.
2. Copy the form ID (the part after `/f/` in the endpoint, e.g. `xyzabcd`).
3. Set `NEXT_PUBLIC_FORMSPREE_ID=xyzabcd` in `.env.local` for local testing and in Vercel's environment variables.

Without the ID, the form shows a notice pointing visitors to LinkedIn.

## Images

Images are optional. Each slot renders only when a path is set.

- **Project covers:** put a 16:9 image (at least 1600×900) in `public/images/projects/` and add
  `cover: { src: "/images/projects/<slug>.jpg", alt: "…" }` to the project in `projects.ts`. Covers show on project cards and at the top of the case study.
- **Portrait:** put a real photo in `public/images/` and set `photo: "/images/portrait.jpg"` in `site.ts`. It appears on the About page. Use a real photo of yourself rather than an AI-generated one: recruiters will meet you.

AI-generated covers work best as abstract illustrations, not fake screenshots or fake people. For a consistent set, keep this style suffix on every prompt:

> *…, minimal isometric technical illustration, thin line art, soft white background, light purple and slate accents, soft shadows, lots of negative space, no text, no logos, no people*

| Project | Subject to put before the style suffix |
|---|---|
| Contract intelligence | Stacked contract pages flowing through glowing extraction nodes into neat structured data cards |
| Customer 360 | Several data streams converging through layered platforms into a single unified customer profile |
| Medical imaging | Abstract translucent 3D spine and vertebrae made of voxels, segmented in different tints |
| Battery maintenance | Wearable barcode-scanner battery cells with a declining health curve and early-warning signal |
| Real-time analytics | Streaming and batch data lanes feeding a warehouse that powers live dashboard tiles |
| Data lake automation | Cloud storage buckets with lifecycle arrows moving data into cooler archive tiers |
| Plant disease detection | Leaves passing through a convolutional network grid, with classification labels as abstract shapes |
| Vineyard forecasting | Vineyard rows with weather and soil layers feeding a forecasting curve |
| Airline sentiment | Chat bubbles flowing into positive, neutral and negative clusters over a timeline |

## Deploy to Vercel with a custom domain

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repository. The Next.js preset needs no configuration.
3. Add the environment variables `NEXT_PUBLIC_SITE_URL=https://your-domain.com` (used for canonical URLs, the sitemap and Open Graph tags) and `NEXT_PUBLIC_FORMSPREE_ID`.
4. **Settings → Domains → Add** your domain and create the DNS records Vercel shows (an `A` record for the apex domain, a `CNAME` for `www`).
5. Every push to `main` deploys to production, and every pull request gets a preview URL.

## Structure

```
src/
├── app/                 # routes: /, /projects, /projects/[slug], /experience, /skills, /learning, /about, /contact
│   ├── opengraph-image.tsx, sitemap.ts, robots.ts, icon.svg
├── components/          # ArchitectureDiagram, ProjectCard, HeroGraph, ContactForm, SiteHeader, SiteFooter, ui
├── content/             # all site copy (see above)
└── lib/content.ts       # draft filtering
```
