# System Architecture & Technical Design: Portfolio Core

## 1. File Tree Architecture (El Agente debe crear esta estructura automáticamente)
- src/types/portfolio.ts: Contratos TypeScript estrictos (Interfaces de Datos y GitHub API).
- src/data/portfolioData.ts: Diccionario bilingüe EN/ES + Proyectos + Educación + Skills.
- src/services/githubService.ts: Cliente GitHub REST API para JuanJArdilaA con caché TTL en localStorage.
- src/styles/global.css: Tokens Cyberpunk 2077, utilidades clip-path, perspectiva y tambor 3D.
- src/layouts/MainLayout.astro: Estructura HTML base, fuentes Google, SEO y JSON-LD.
- src/components/shared/Navbar.astro: Header fijo con selector EN/ES, estado del núcleo y enlaces.
- src/components/shared/MechanicalLever.astro: Palanca metálica inferior con pomo esférico rojo (#FF003C).
- src/components/shared/ProjectModal.astro: Modal de caso de estudio (Problema, Arquitectura SDD, Stack).
- src/components/shared/ToastNotification.astro: Feedback visual al copiar correo jardilaarevalo@gmail.com.
- src/components/executive/ExecutiveView.astro: Contenedor Cara A (Big Tech).
- src/components/executive/ExecutiveHero.astro: Presentación ejecutiva + CTA CV/Contacto.
- src/components/executive/BentoProjects.astro: Grid de proyectos + Filtros por lenguaje.
- src/components/executive/EducationAndSkills.astro: Timeline (UNAD, Campuslands, Caldas) + Matriz de Skills.
- src/components/gamedev/GameDevView.astro: Contenedor Cara B (Cyberpunk 2077 HUD).
- src/components/gamedev/CyberHudHeader.astro: Telemetría Night City + Perfil C++ / Game Systems.
- src/components/gamedev/CyberQuestProjects.astro: Repositorios como misiones técnicas con bordes biselados.
- src/components/gamedev/CyberSkillTree.astro: Árbol de nodos de ingeniería (Python, C++, JS, Linux, SDD).
- src/pages/index.astro: Escenario 3D (#viewport-stage), Tambor (#roulette-drum) y Controlador de estados.

## 2. Sistema de Colorización (Cyberpunk 2077 Palette)
- --bg-obsidian: #07080C (Fondo principal ultra oscuro para la vista Ejecutiva).
- --bg-panel: #11131C (Superficie de tarjetas Bento en vista Ejecutiva).
- --cp-yellow: #FCEE09 (Amarillo Cyber icónico: sutil en vista ejecutiva, protagonista en HUD GameDev).
- --cp-cyan: #00F0FF (Cian Neón: telemetría, enlaces técnicos y estados hover).
- --cp-red: #FF003C (Rojo Samurai: mango redondo de la palanca mecánica, alertas HUD y bordes GameDev).

## 3. Contratos TypeScript (Para implementar en src/types/portfolio.ts)
- Locale: 'en' | 'es' (Default: 'en')
- ViewMode: 'executive' | 'gamedev'
- LeverState: 'IDLE_EXECUTIVE' | 'ROTATING_TO_GAMEDEV' | 'IDLE_GAMEDEV' | 'ROTATING_TO_EXECUTIVE'
- EducationItem: { id: string; institution: string; degree: Record<Locale, string>; period: Record<Locale, string>; focus: Record<Locale, string>; }
- ProjectItem: { id: string; repoName: string; title: Record<Locale, string>; shortDescription: Record<Locale, string>; architectureSummary: Record<Locale, string>; category: 'both' | 'executive' | 'gamedev'; technologies: string[]; featured: boolean; demoUrl?: string; }
- GitHubRepoResponse: { id: number; name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number; updated_at: string; topics: string[]; fork: boolean; }

## 4. Matemática del Cilindro/Ruleta 3D (#viewport-stage & #roulette-drum)
El agente debe programar un Cilindro de Rotación con Intercambio de Cara Activa en CSS3 y TypeScript:
1. Estado Reposo Executive (IDLE_EXECUTIVE): #executive-face está visible (transform: rotateX(0deg) translateZ(0)). #gamedev-face está posicionada debajo en un ángulo de -90deg sobre el eje X (transform-origin: top center; transform: rotateX(-90deg)).
2. Acción de Giro Hacia Arriba (Bajar palanca -> ROTATING_TO_GAMEDEV):
   - Duración: 900ms, curva cubic-bezier(0.22, 1, 0.36, 1).
   - #executive-face gira hacia arriba alejándose (rotateX(90deg) translateY(-100%) opacity: 0).
   - Simultáneamente, #gamedev-face emerge desde el borde inferior girando desde rotateX(-90deg) translateY(100%) hasta rotateX(0deg) translateY(0) opacity: 1.
3. Acción de Giro Inverso (Tirar palanca hacia atrás -> ROTATING_TO_EXECUTIVE):
   - Invierte los vectores de rotación (#gamedev-face desciende hacia -90deg y #executive-face desciende desde +90deg a 0deg), dando la sensación física de que el tambor retrocedió.

## 5. Diseño Físico de la Palanca Metálica (MechanicalLever.astro)
- Ubicación: Fija en la parte inferior central (fixed bottom-4 left-1/2 -translate-x-1/2 z-50).
- Componentes Visuales (CSS Puro + SVG Industrial):
  1. Caja de Engranaje Base: Chasis oscuro (#11131C) con franjas de advertencia Cyberpunk (#FCEE09 y #07080C) y ranura central vertical.
  2. Eje Metálico (Shaft): Cilindro de 10px de ancho con gradiente cromado metálico (#4B5563, #F3F4F6, #1F2937), que se inclina al ser accionado.
  3. Mango Redondo Rojo (Red Ball Knob): Esfera de 48px x 48px (border-radius: 9999px) con iluminación 3D (radial-gradient de #FF7597 a #FF003C y #590015) y brillo rojo.