# Alex Rivera — Developer Portfolio

An interactive, Three.js-powered developer portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** — design tokens defined in `src/styles/globals.css`
- **Three.js / React Three Fiber / drei** — the hero's interactive constellation and the ambient starfield background
- **Framer Motion** — page/section/element animation
- **GSAP** — available for scroll-choreographed sequences (see `src/animations`)
- **Lenis** — smooth scrolling (`src/hooks/useLenis.ts`)
- **EmailJS** — contact form delivery (`src/services/email.ts`)
- **react-markdown + rehype-highlight** — blog post rendering with syntax highlighting
- **PWA** — manifest + service worker in `public/`

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # type-check + production build
npm run preview   # preview the production build
npm run lint      # oxlint
```

## Configuring the contact form

Copy `.env.example` to `.env` and fill in your [EmailJS](https://www.emailjs.com) credentials:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Until these are set, the contact form will show a clear configuration error instead of failing silently.

## Content

All copy lives in `src/data/` — edit `profile.ts`, `skills.ts`, `projects.ts`, `career.ts`, and `blog.ts` to swap in your own name, projects, experience, and writing. Replace the resume at `public/alex-rivera-resume.pdf` and project/testimonial images under `public/`.

## Folder structure

```
src/
├── components/   shared UI (Navbar, cards, modals, cursor, buttons)
├── sections/     one file per page section (Hero, About, Skills, ...)
├── three/        R3F scenes (starfield, constellation hero)
├── hooks/        Lenis, scroll progress, count-up, contact form, media queries
├── animations/   Framer Motion variant presets
├── services/     EmailJS wrapper
├── data/         all site content
├── types/        shared TypeScript interfaces
├── utils/        formatting + class-name helpers
└── styles/       Tailwind v4 theme tokens (globals.css)
```

## Performance notes

- The Three.js scenes (`HeroScene`, `AmbientBackground`) are lazy-loaded via `React.lazy` and code-split into their own chunk so the initial JS payload stays small.
- `StarField` renders as a single instanced `Points` cloud regardless of star count (one draw call).
- `AdaptiveDpr` + `PerformanceMonitor` from drei scale render resolution down automatically on slower devices.
- `prefers-reduced-motion` disables Lenis, the cursor follower, and the constellation scene, falling back to a static starfield.
