# Implementation Tasks Plan

## Phase 1: Project Setup & Cyberpunk Design System
- [x] Task 1.1: Initialize Astro project with Tailwind CSS and strict TypeScript. Create src/layouts/MainLayout.astro with Google Fonts (Inter, Rajdhani, JetBrains Mono), SEO meta tags, and Schema.org Person JSON-LD for Juan José Ardila Arévalo.
- [x] Task 1.2: Configure tailwind.config.mjs and src/styles/global.css with Cyberpunk 2077 colors (#07080C, #11131C, #FCEE09, #00F0FF, #FF003C), chamfered clip-path utilities, metallic gradients, and 3D drum rotation classes.

## Phase 2: Data Contracts, CV Content & GitHub Service
- [x] Task 2.1: Create src/types/portfolio.ts and src/data/portfolioData.ts with full bilingual (EN default / ES secondary) profile data for Juan José Ardila Arévalo (Education: UNAD, Campuslands, Instituto Caldas; Skills: Python, C++, JS, HTML/CSS, Linux, Git/GitHub, Scrum, English C1, Soft Skills). Exclude non-tech jobs.
- [x] Task 2.2: Create src/services/githubService.ts to fetch public repos from https://api.github.com/users/JuanJArdilaA/repos?sort=updated&per_page=15 with 30-min localStorage cache and fallback to portfolioData.ts.

## Phase 3: Shared UI & Dual Views (Executive + GameDev)
- [x] Task 3.1: Create src/components/shared/Navbar.astro (with reactive EN/ES switch and email copy button), ToastNotification.astro, and ProjectModal.astro.
- [x] Task 3.2: Create src/components/executive/ExecutiveView.astro and subcomponents (ExecutiveHero, BentoProjects with stack filter, EducationAndSkills).
- [x] Task 3.3: Create src/components/gamedev/GameDevView.astro and subcomponents (CyberHudHeader, CyberQuestProjects, CyberSkillTree).

## Phase 4: Mechanical Lever & 3D Roulette Drum Integration
- [ ] Task 4.1: Build src/components/shared/MechanicalLever.astro (metallic shaft + red ball knob) and assemble the 3D rotating drum in src/pages/index.astro so pulling down rotates to GameDev View from bottom, and pulling back rotates in reverse to Executive View.
- [ ] Task 4.2: Run npx astro check and npm run build to fix any TypeScript or layout issues.