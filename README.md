# Design Destiny — Portfolio

Premium, cinematic portfolio for the graphic design brand **Design Destiny**.
Built with **React + Vite + TypeScript**, animated with **Motion for React**, styled with
**Tailwind CSS v4**, smooth-scrolled by **Lenis**.

Brand colours (fixed): black `#000000`, golden amber `#F6B125`, white `#FFFFFF`.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build (dist/)
npm run preview  # preview the production build
```

The site is **not deployed** — that's a separate step when you're ready.

## Make it yours

Everything personal lives in three files. Nothing is invented for you — empty
values render as a clear "Not set" state instead of a fake link.

| What | File |
| --- | --- |
| WhatsApp number, email, Instagram, Behance, form endpoint | `src/config/site.config.ts` |
| Hero/about copy, services, skills, stats, tools | `src/content/content.ts` |
| Placeholder projects | `src/data/projects.ts` |

### 1. Contact details

Open `src/config/site.config.ts` and fill in:

- `whatsappNumber` — international format, digits only, e.g. `"919876543210"`
- `email` — e.g. `"hello@yourdomain.com"`
- `instagramUrl` / `instagramHandle`
- `behanceUrl` / `behanceHandle`

Until then, the contact section shows "Not set — add in src/config/site.config.ts".

### 2. Connecting the contact form

The form is honest by default: it says it isn't connected and never pretends to send.
To enable it, paste an endpoint URL into `formEndpoint` in `src/config/site.config.ts`:

- **[Formspree](https://formspree.io)** — create a form, copy the endpoint like
  `https://formspree.io/f/abcdwxyz`
- **[Web3Forms](https://web3forms.com)** — create an access key, use
  `https://api.web3forms.com/submit` and add a hidden `access_key` input to the form
- Most other services that accept a standard `multipart/form-data` POST also work.

The form posts `name`, `email`, `projectType`, `budget` and `message`.

### 3. Portrait photo

Drop your photo into `public/` (e.g. `public/portrait.jpg`) and set
`portrait: "/portrait.jpg"` in `src/content/content.ts`. Until then a designed
placeholder is shown.

### 4. Real projects

Replace the clearly-labelled sample projects in `src/data/projects.ts`. Each project:

```ts
{
  id: "p01",                    // unique
  slug: "my-project",           // used in the shareable URL (#project-my-project)
  title: "My Project",
  category: "logo",             // "logo" | "brand" | "social" | "poster" | "other"
  variant: "monogram",          // cover artwork — see CoverArt.tsx
  gallery: ["orbit", "grid"],   // detail-page visuals
  deliverables: ["Logo suite"],
  description: ["Paragraph one.", "Paragraph two."],
}
```

Covers are drawn as in-brand SVG compositions (`src/components/ui/CoverArt.tsx`) — no
image files needed. Until you swap them, every card and detail view is clearly
marked as a **sample project** (no real client is ever implied).

## Structure

```
src/
├─ config/     site.config.ts        ← your contact details + form endpoint
├─ content/    content.ts            ← all copy
├─ data/       projects.ts           ← placeholder projects
├─ lib/        motion.ts · scroll.ts ← shared easings + Lenis helpers
├─ hooks/      useScrollSpy · useCountUp · usePrefersReducedMotion · useMediaQuery
├─ styles/     main.css · tokens.css · base.css · components.css · keyframes.css
└─ components/
   ├─ ui/       Reveal · MaskedLine · Magnetic · Marquee · Button · CoverArt · …
   ├─ layout/   Preloader · Header · MobileMenu · Footer
   └─ sections/ Hero · About · Portfolio · ProjectCard · ProjectDetail · Services · Skills · Contact
```

## Motion & accessibility notes

- The preloader plays once per browser session and is skipped for
  `prefers-reduced-motion` users; click or press any key to skip it.
- Reduced-motion users get simple fades instead of parallax, magnetics and marquees.
- All animation uses transform/opacity only, for smooth 60fps on mobile.

## Fonts

**Clash Display** (headings) + **Satoshi** (body), loaded from Fontshare in `index.html`.
To self-host, drop the font files into `public/fonts` and update `src/styles/tokens.css`.
