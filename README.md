# Juan José Ardila Arévalo — Portfolio

> **High-performance software engineering portfolio** with a dual-view interactive architecture:
> **Executive Big Tech View** ↔ **GameDev Cyberpunk 2077 HUD View**, driven by a mechanical lever that rotates the page as a 3D roulette cylinder.

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x_strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## ✨ Features

| Feature | Detail |
|---|---|
| **Dual-View Architecture** | Executive (Big Tech) face ↔ GameDev (Cyberpunk 2077 HUD) face |
| **3D Roulette Drum** | CSS `perspective` + `rotateX` cylinder swap animated at 900ms `cubic-bezier(0.22, 1, 0.36, 1)` |
| **Mechanical Lever** | Fixed bottom-center control: hazard-stripe gear base, chrome shaft, `#FF003C` red ball knob |
| **GitHub API Sync** | Live repo cards via `api.github.com/users/JuanJArdilaA/repos` with 30-min `localStorage` cache |
| **Bilingual EN / ES** | Full dictionary-driven i18n — zero hardcoded strings in `.astro` templates |
| **Strict TypeScript** | `"strict": true`, `noImplicitAny`, no `any` type anywhere |
| **Accessible** | `role="button"`, `aria-pressed`, `aria-hidden`, `inert`, keyboard nav, skip-link, ARIA live regions |
| **Reduced Motion** | Graceful 350ms crossfade (no 3D vertigo) for `prefers-reduced-motion` users |
| **SEO + JSON-LD** | Per-page `<title>`, `<meta>`, Open Graph, Twitter Card, Schema.org `Person` |

---

## 🎮 The Dual-View Concept

```
┌─────────────────────────────────────────────────────┐
│               EXECUTIVE BIG TECH VIEW               │
│   Inter font · Bento grid · Professional palette    │
│   (bg: #07080C · accent: #FCEE09 subtle)            │
├─────────────────────────────────────────────────────┤
│         ▼  PULL LEVER  ▼  (rotateX 900ms)           │
├─────────────────────────────────────────────────────┤
│           GAMEDEV CYBERPUNK 2077 HUD VIEW           │
│   Rajdhani / JetBrains Mono · Scanlines · Grid      │
│   (accent: #00F0FF · #FF003C · #FCEE09 hero)        │
└─────────────────────────────────────────────────────┘
```

The **mechanical lever** (fixed `bottom-4 left-1/2`) triggers a 4-state FSM:

```
IDLE_EXECUTIVE → ROTATING_TO_GAMEDEV → IDLE_GAMEDEV → ROTATING_TO_EXECUTIVE → …
```

During rotation `body.is-rotating` blocks all pointer events to prevent double-fires.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Astro 5.x](https://astro.build) — Static Site Generation, zero JS by default |
| **Styling** | [Tailwind CSS 3.4+](https://tailwindcss.com) + CSS Custom Properties |
| **Scripting** | TypeScript 5.x (strict mode) |
| **Icons** | [Lucide Astro](https://lucide.dev) |
| **Fonts** | Google Fonts — Inter (executive), Rajdhani (HUD displays), JetBrains Mono (telemetry/code) |
| **API** | GitHub REST API v3 (`/users/JuanJArdilaA/repos`) |

---

## 📁 Project Structure

```
src/
├── types/
│   └── portfolio.ts          # Strict TypeScript contracts (Locale, ViewMode, LeverState, …)
├── data/
│   └── portfolioData.ts      # Bilingual EN/ES dictionary + project manifest + profile
├── services/
│   └── githubService.ts      # GitHub API client with 30-min localStorage cache + fallback
├── scripts/
│   ├── main.ts               # Single client entry point
│   ├── lever.ts              # Mechanical lever 4-state FSM (Phase 4)
│   ├── viewState.ts          # setActiveView / getActiveView / prefersReducedMotion
│   ├── ui.ts                 # Toast, email copy (RF-07), HUD telemetry, nav
│   ├── projectCards.ts       # Card rendering + stack filter chips (RF-06)
│   ├── projectsController.ts # Orchestrates GitHub fetch + card render
│   └── i18n.ts               # applyTranslations + language switcher
├── layouts/
│   └── MainLayout.astro      # HTML shell, Google Fonts, SEO, JSON-LD
├── styles/
│   ├── global.css            # Cyberpunk tokens, 3D drum CSS, clip-paths, gradients
│   └── components.css        # Component-level styles
├── components/
│   ├── shared/
│   │   ├── MechanicalLever.astro   # The lever!
│   │   ├── Navbar.astro            # Fixed header, EN/ES toggle, nav links
│   │   ├── ProjectModal.astro      # Case-study modal (Problem, Architecture, Stack)
│   │   ├── ToastNotification.astro # Email-copy feedback toast
│   │   ├── ContactPanel.astro      # Shared contact form / links
│   │   └── BrandIcon.astro         # SVG brand mark
│   ├── executive/
│   │   ├── ExecutiveView.astro     # Cara A container
│   │   ├── ExecutiveHero.astro     # Name, role, CTA (CV / Contact)
│   │   ├── BentoProjects.astro     # Bento grid + language filter
│   │   └── EducationAndSkills.astro # Timeline + competency matrix
│   └── gamedev/
│       ├── GameDevView.astro       # Cara B container (HUD root)
│       ├── CyberHudHeader.astro    # Night City telemetry + C++ profile
│       ├── CyberQuestProjects.astro # Repos as HUD missions (chamfered borders)
│       └── CyberSkillTree.astro    # Engineering node tree
└── pages/
    └── index.astro           # 3D stage, roulette drum, lever mount
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Install

```bash
git clone https://github.com/JuanJArdilaA/juan-ardila-portfolio.git
cd juan-ardila-portfolio
npm install
```

### Development server

```bash
npm run dev
# → http://localhost:4321
```

### Type check

```bash
npm run check
```

### Production build

```bash
npm run build
# Output → dist/
```

### Preview production build

```bash
npm run preview
```

---

## 🎨 Design System — Cyberpunk 2077 Palette

| Token | Hex | Role |
|---|---|---|
| `--bg-obsidian` | `#07080C` | Main background |
| `--bg-panel` | `#11131C` | Card/panel surfaces |
| `--cp-yellow` | `#FCEE09` | Cyber yellow — hero accent, hazard stripes |
| `--cp-cyan` | `#00F0FF` | Neon cyan — telemetry, hover states, links |
| `--cp-red` | `#FF003C` | Samurai red — lever knob, HUD alerts, GameDev borders |

---

## 📡 GitHub API Integration

Repos are fetched from:

```
GET https://api.github.com/users/JuanJArdilaA/repos?sort=updated&per_page=15
```

- **Cache**: 30-minute TTL in `localStorage` — avoids rate-limit hits on repeat visits.
- **Fallback**: If the network is unavailable, the local project manifest from `portfolioData.ts` is used and a `"Cached Telemetry Mode"` badge is displayed.
- **Auto-discovery**: All public repos are rendered as cards automatically, even if not manually listed in the manifest. Manually listed projects receive richer bilingual descriptions and architecture summaries.

---

## ♿ Accessibility

- Semantic HTML5 (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`)
- `role="button"` + `tabindex="0"` + `aria-pressed` on the lever
- `inert` + `aria-hidden="true"` on the off-screen drum face
- Skip-to-content link (`#main-content`)
- Keyboard-navigable lever (Enter / Space)
- `aria-live="polite"` on the toast notification
- Full `prefers-reduced-motion` support (350ms opacity crossfade, no 3D rotation)

---

## 🗂 CV Data Scope (AGENTS.md §3)

Only the following is included per the strict data-filtering policy:

- ✅ Software development profile & role
- ✅ Education: UNAD · Campuslands · Instituto Caldas
- ✅ Languages: English C1 · Spanish (Native)
- ✅ Technical skills: Python · C++ · JavaScript · HTML/CSS · Linux · Git/GitHub · Scrum
- ✅ Soft skills: Leadership · Teamwork · Creativity · Problem Solving
- ❌ Non-software work experience excluded

---

## 📄 License

MIT © 2026 [Juan José Ardila Arévalo](https://github.com/JuanJArdilaA)
