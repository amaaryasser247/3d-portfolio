# Amaar — Front-End Developer

Dark, animated single-page portfolio built with Vite, React 18, TypeScript (strict), Tailwind CSS 3, Framer Motion and Lucide React. The Kanit font (Google Fonts, weights 300–900) drives the display typography; the page background is `#0C0C0C`.

## Getting started

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # type-check (tsc --noEmit) + production build to dist/
npm run preview   # preview the production build
npm run typecheck # tsc --noEmit only
```

## Content: one file to rule them all

Every piece of personal copy, every link and every image path lives in
**`src/data/portfolio.ts`** (single source of truth). Components never contain
personal text.

Editable exports:

| Export             | Used by                              |
| ------------------ | ------------------------------------ |
| `profile`          | Hero (name, h1, tagline, CTA, email, portrait) |
| `navLinks`         | Navbar anchor links (`#about`, `#services`, `#projects`, `#contact`) |
| `aboutText`        | About paragraph (scroll-driven per-character reveal) |
| `aboutDecorations` | Four corner images in the About section |
| `services`         | Services list (01–05)                |
| `projects`         | Sticky stacking project cards (name, category, tech stack, description, live/repo URLs, images) |
| `marqueeImages`    | 21 marquee tiles (row 1 = first 11, row 2 = remaining 10) |
| `socials`          | Contact icon row (Mail, GitHub, LinkedIn, WhatsApp) |

## Images

Drop your own files into `/public/images` using exactly these paths — the
`src` values in `portfolio.ts` already point here:

```
public/images/me-cartoon.webp             # hero cartoon portrait (transparent WebP)
public/images/me-cartoon.png              # fallback for the cartoon portrait
public/images/marquee/01.webp … 21.webp     # marquee tiles (420×270)
public/images/about/moon.png
public/images/about/object.png
public/images/about/lego.png
public/images/about/group.png
public/images/projects/casamood-1.jpg … -3.jpg
public/images/projects/mrwood-1.jpg … -3.jpg
public/images/projects/velo-1.jpg … -3.jpg
```

Every image is an `ImageAsset { src, fallbackSrc, alt }`: `src` is your local
file, and `fallbackSrc` is rendered by the `onError` handler if it fails to
load (a second capture of the same project for the cards, or the original
remote spec asset elsewhere). Replace the files, keep the names — or update
`src` directly in `portfolio.ts`.

## Contact links

Email (`amaaryasser88@gmail.com`), GitHub, LinkedIn and WhatsApp are all wired
through `profile.email` and `socials`. Update them there if anything changes.

## Updating the visual year

The footer line renders `© {currentYear} {profile.name}. All rights reserved.`
automatically.
