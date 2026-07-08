# SriZen Group — Website (Next.js + TypeScript + Tailwind + shadcn structure)

Premium multi-page corporate website for SriZen Group.

## Stack

- **Next.js 14** (App Router)
- **100% TypeScript** — every component and page is its own `.tsx`/`.ts` file (no `.js` remains anywhere in `app/`, `components/`, `data/`, or `lib/`)
- **Tailwind CSS**, with a shadcn/ui-compatible `components.json`, CSS variables in `globals.css`, and `lib/utils.ts` (`cn()` helper)
- **Framer Motion** for the hero and carousel animations
- **lucide-react** for icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## shadcn/ui setup

This project is already wired for the shadcn CLI:

- `components.json` points at `tailwind.config.ts`, `app/globals.css`, and uses the `@/components/ui` alias.
- Reusable primitives live in `components/ui/` (the shadcn convention) — currently `scroll-expansion-hero.tsx` and `project-carousel.tsx`.
- `lib/utils.ts` exports `cn()`, the standard shadcn class-merging helper.

To add more shadcn components later:

```bash
npx shadcn@latest add button
```

(will install into `components/ui/` automatically, matching this config).

## The two new interactive components

### `components/ui/scroll-expansion-hero.tsx` — homepage hero

A "scroll to expand" hero: a small framed image grows to fill the viewport as you scroll, then releases into normal page scroll. This is a full rewrite of the common community version to fix the jank it's known for:

- **Root cause of the lag**: the original re-rendered React state on *every single* wheel/touch event, and fought the native scroll position on every `scroll` event. On a trackpad that can be 50–100 events/second — far more than the screen can paint, and the constant `window.scrollTo` fight causes visible stutter.
- **Fix**: wheel/touch deltas are written to a `ref` and only committed to React state once per animation frame (`requestAnimationFrame`), capping updates to the display refresh rate. While the media is expanding, `<body>` gets a true `scroll-lock` class (`overflow: hidden`, defined in `globals.css`) instead of being repeatedly reset — so there's nothing to fight. Once fully expanded, the lock is released and the rest of the page scrolls **natively** with zero JS involvement — no lag scrolling past the hero.
- **Accessibility**: respects `prefers-reduced-motion` (skips the scroll-jacking entirely and shows the final state), full keyboard support (Arrow/Page keys expand it, Enter jumps to expanded), a visually-hidden `<h1>` carries the real title for screen readers while the decorative split-word text is `aria-hidden`.
- Wired into the homepage via `components/HomeHero.tsx`, using project imagery already used elsewhere on the site (skyline + Meridian Heights tower).

### `components/ui/project-carousel.tsx` — projects section

> Note: both documents you pasted contained the *same* hero component code (no distinct second component was actually included), so there was nothing existing to "use" for the projects section — this carousel was built from scratch to match the brief (bottom navigation controls, accessible, premium).

- Prev/next arrow buttons **and** dot indicators at the bottom, as requested.
- Swipe/drag support (via Framer Motion `drag`), keyboard arrow-key navigation, autoplay that pauses on hover/focus, and a screen-reader live region announcing the current slide.
- Respects `prefers-reduced-motion` (disables drag + slide transitions).
- Wired into the homepage via `components/ProjectsCarouselSection.tsx`.

## Pages / Routes

| Route                | Description                                             |
|-----------------------|-----------------------------------------------------------|
| `/`                    | Landing page — scroll-expand hero, stats, teasers, projects carousel, CTA |
| `/about`               | Mission/vision/values, company timeline, leadership     |
| `/services`            | All 12 services + construction process timeline         |
| `/projects`            | Filterable project grid                                 |
| `/projects/[slug]`     | Individual project detail (gallery, specs, related work) |
| `/industries`          | Sectors served                                           |
| `/sustainability`      | Sustainability commitments                               |
| `/careers`             | Culture + open roles                                     |
| `/news`                | News & insights grid                                     |
| `/news/[slug]`         | Individual article page                                  |
| `/contact`             | Contact form + office locations                          |

Navbar and Footer are rendered once in `app/layout.js` and shared across every route.

## Project Structure

```
app/
  layout.tsx             → root layout, fonts (next/font/google), metadata, Navbar + Footer
  page.tsx                → homepage (scroll-expand hero, teasers, carousel, CTA)
  about/ services/ projects/ industries/ sustainability/ careers/ news/ contact/  → routed pages (all .tsx)
  globals.css             → Tailwind directives + shadcn CSS variables + design tokens
components/
  ui/                      → shadcn-convention primitives (scroll-expansion-hero.tsx, project-carousel.tsx)
  home/                    → homepage-only teaser variants (AboutTeaser, ServicesTeaser, CTABanner) — one component per file
  HomeHero.tsx             → wires the hero component with SriZen content/imagery
  ProjectsCarouselSection.tsx → wires the carousel with heading/CTA
  Navbar.tsx, Footer.tsx, About.tsx, Services.tsx, Projects.tsx, ...  → every section is its own component/file, fully typed
  useReveal.ts             → shared scroll-reveal hook, generic over element type
data/content.ts            → typed content module — every content shape has an exported interface (Project, Service, NewsArticle, ...)
lib/utils.ts               → cn() helper (shadcn convention)
public/assets/             → srizen-logo.png (nav/footer), srizen-favicon.png (favicon)
tailwind.config.ts         → brand color tokens + shadcn CSS-variable tokens, fonts, keyframes
components.json            → shadcn CLI configuration
tsconfig.json               → TypeScript project config with the `@/*` path alias
```

## Performance & accessibility checklist

- Hero and carousel images use `next/image` with `fill` + `sizes` for responsive delivery; hero background uses `priority` for a fast LCP.
- No layout-thrashing scroll handlers — state updates are rAF-throttled; the expanding hero box uses `contain: layout paint` to scope reflow.
- `prefers-reduced-motion` is respected globally (`globals.css`) and specifically inside both new components.
- Full keyboard operability for both the hero (Arrow/Page/Enter) and the carousel (Arrow keys, focusable dots/arrows with visible focus rings).
- `aria-live` regions and semantic roles (`region`, `carousel`, `tablist`/`tab`) for screen readers.
