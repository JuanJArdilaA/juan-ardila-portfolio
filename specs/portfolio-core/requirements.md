# Requirements Specification: Portfolio Core (Enterprise SDD)

## PARTE I: REQUERIMIENTOS FUNCIONALES (RF)

### RF-01: Motor de Internacionalización Reactivo (i18n Engine - EN Default / ES Secondary)
- **WHEN** the user accesses the application without a stored language preference, **THE SYSTEM SHALL** initialize and render 100% of the UI, metadata, and content in **English (`en`)** showcasing the C1 proficiency level.
- **WHEN** the user clicks the language selector (`EN` / `ES`) in the top navigation bar, **THE SYSTEM SHALL** update all visible text nodes via reactive data attributes (`data-i18n-key`), persist the choice in `localStorage.getItem('portfolio_lang')`, and update the `<html lang="">` attribute in under 50ms without page reload or resetting the 3D cylinder position.

### RF-02: Máquina de Estados de la Palanca Metálica y Ruleta 3D (`MechanicalLever` & `RouletteDrum`)
- **WHILE** the system is in state `EXECUTIVE_ACTIVE`, **THE SYSTEM SHALL** render the bottom metallic lever in the upright/forward position (`angle: +25deg`) with the red spherical knob (`#FF003C`) illuminated.
- **WHEN** the user clicks or drags the red spherical knob downward (`deltaY > 40px`) in `EXECUTIVE_ACTIVE` state, **THE SYSTEM SHALL**:
  1. Transition lever state to `PULLING_TO_GAMEDEV`.
  2. Lock pointer events during the `950ms` transition to prevent animation spamming.
  3. Rotate the `#roulette-drum` container upward on the X-axis (`rotateX(180deg)`) so the **GameDev View** emerges physically from the bottom of the screen.
  4. Reset window scroll position smoothly and set state to `GAMEDEV_ACTIVE`.
- **WHEN** the user pulls/clicks the lever backward in `GAMEDEV_ACTIVE` state, **THE SYSTEM SHALL** animate the lever back to its initial angle and rotate the `#roulette-drum` in reverse (`rotateX(0deg)`), bringing the **Executive View** back from the bottom.

### RF-03: Arquitectura de la Cara A — Vista Ejecutiva Big Tech (`ExecutiveView`)
- **WHILE** `EXECUTIVE_ACTIVE` is active, **THE SYSTEM SHALL** display:
  1. **Executive Hero**: Nombre completo (**Juan José Ardila Arévalo**), badge de estado (`Available for High-Impact Software Engineering Roles`), propuesta de valor analítica y botones de acción (`View Projects`, `Download CV`, `GitHub`, `LinkedIn`).
  2. **Featured Systems Bento Grid**: Tarjetas limpias de proyectos con arquitectura explicada, etiquetas de stack y métricas de GitHub.
  3. **Academic & Technical Timeline**: Tarjetas estructuradas para **UNAD** (Ingeniería en Sistemas, 2026 - Actualidad), **Campuslands** (Técnico Laboral en Desarrollo de Software, 2026 - Actualidad) e **Instituto Caldas** (Bachiller Académico, 2021).
  4. **Competency Matrix**: Agrupación limpia de Lenguajes (`Python`, `C++`, `JavaScript`, `HTML/CSS`), Ingeniería (`Linux`, `Git/GitHub`, `Scrum`, `SDD/KDD`), Idiomas (`English C1`, `Spanish Native`) y Habilidades Blandas (`Leadership`, `Teamwork`, `Creativity`, `Problem Solving`).

### RF-04: Arquitectura de la Cara B — Vista GameDev Cyberpunk 2077 (`GameDevView`)
- **WHILE** `GAMEDEV_ACTIVE` is active, **THE SYSTEM SHALL** display a Night City HUD interface featuring:
  1. **HUD Telemetry Header**: Coordenadas de ubicación (`BUCARAMANGA // COL [7.1193° N, 73.1227° W]`), estado de memoria/FPS simulado y enfoque en motores de juego, C++ y arquitectura lógica.
  2. **Quest Log / Arsenal (GitHub Repositories)**: Proyectos presentados como sistemas tácticos con bordes biselados a 45° (`clip-path`), destacando el uso de lógica de programación, Python y C++.
  3. **Skill Tree & Spec Architecture**: Visualización estilo árbol de nodos de las habilidades técnicas y metodologías SDD/KDD.

### RF-05: Sincronización Híbrida con GitHub API (`JuanJArdilaA`) y Sistema de Caché
- **WHEN** the client application mounts, **THE SYSTEM SHALL** check `localStorage` for cached key `gh_repos_JuanJArdilaA` with a valid TTL (< 30 minutes).
- **IF** cache is expired or missing, **THE SYSTEM SHALL** execute an asynchronous `GET` request to `https://api.github.com/users/JuanJArdilaA/repos?sort=updated&per_page=15`, filter out forks unless explicitly listed in the local manifest, and merge live statistics (`stargazers_count`, `language`, `updated_at`, `html_url`) with the rich descriptions in `src/data/portfolioData.ts`.
- **IF** the GitHub API returns an error (e.g., `403 Rate Limit Exceeded` or offline network), **THE SYSTEM SHALL** silently activate the local fallback dataset from `src/data/portfolioData.ts` and display a subtle status badge (`Cached Telemetry Mode`).

### RF-06: Filtrado Dinámico de Proyectos por Stack y Modal de Caso de Estudio
- **WHEN** the user clicks a technology filter pill (`All`, `Python`, `C++`, `JavaScript`, `Web/HTML/CSS`), **THE SYSTEM SHALL** filter the project grid with a smooth layout transition.
- **WHEN** the user clicks on "Inspect Architecture / Ver Arquitectura" on any project card, **THE SYSTEM SHALL** open an accessible modal detailing: *Problem Statement*, *SDD/KDD Architecture Applied*, *Tech Stack*, and direct links to the *GitHub Repository* and *Live Demo*.

### RF-07: Módulo de Contacto Directo y Acciones de Conversión Rápida
- **WHEN** the user clicks the email button (`jardilaarevalo@gmail.com`), **THE SYSTEM SHALL** copy the email address to the system clipboard via `navigator.clipboard.writeText()` and trigger a floating notification toast (`Email copied to clipboard! / ¡Correo copiado!`).
- **WHEN** the user clicks the direct phone/WhatsApp action (`+57 3170998504`) or social links (`GitHub`, `LinkedIn`), **THE SYSTEM SHALL** open the corresponding external channel securely in a new tab.

### RF-08: Navegación Contextual y Atajos de Teclado
- **WHEN** the user presses `Alt + S` (or clicks the quick-switch indicator in the Navbar), **THE SYSTEM SHALL** trigger the same lever pull and 3D roulette rotation animation as interacting with the bottom physical lever.

---

## PARTE II: REQUERIMIENTOS NO FUNCIONALES (RNF)

### RNF-01: Rendimiento y Core Web Vitals (Performance Budget)
- **Métrica**: Puntuación en Google Lighthouse $\ge 95$ en Performance, Accessibility, Best Practices y SEO.
- **Tiempos**: First Contentful Paint (FCP) $< 0.9\text{s}$, Largest Contentful Paint (LCP) $< 1.5\text{s}$, Cumulative Layout Shift (CLS) $< 0.02$.
- **Aceleración GPU 60 FPS**: La animación del cilindro 3D y de la palanca mecánica **SOLO** podrá animar propiedades compuestas por GPU (`transform: translate3d()`, `rotateX()`, `scale()`, `opacity`). Queda estrictamente prohibido animar `top`, `left`, `height`, `width` o `margin` para evitar recálculos de layout (*reflows*).

### RNF-02: Accesibilidad Universal y Preferencia de Movimiento Reducido (A11y - WCAG 2.1 AA)
- **Contraste**: En la Vista Ejecutiva, todo texto de cuerpo debe mantener un ratio de contraste mínimo de `7:1` (AAA) o `4.5:1` (AA) sobre el fondo `#07080C`.
- **Semántica y Teclado**: La palanca mecánica debe implementarse como un elemento enfocable con teclado (`<button role="switch" aria-checked="false" aria-label="Switch between Executive and GameDev portfolio views">`).
- **Prevención de Vértigo (`prefers-reduced-motion`)**: **IF** the user's operating system has `prefers-reduced-motion: reduce` enabled, **THE SYSTEM SHALL** bypass the 180-degree 3D rotational spin and execute a smooth `350ms` cross-fade transition while still animating the lever knob indicator.

### RNF-03: Ergonomía Táctil y Diseño Responsivo Multi-Resolución
- **Breakpoints**: Soporte fluido y sin desbordamiento horizontal (`overflow-x: hidden`) desde `320px` (iPhone SE) hasta `2560px` (Monitores Ultrawide/4K).
- **Física Táctil en Móviles**: El pomo rojo de la palanca debe tener un área de impacto táctil mínima de `56px × 56px` con `touch-action: none` para permitir el gesto de arrastrar el dedo hacia abajo o hacia atrás sin activar accidentalmente el gesto de "actualizar página" del navegador móvil.

### RNF-04: Seguridad, Tipado Estricto y Calidad de Código
- **TypeScript Strict Mode**: Cero errores de compilación en `astro check` y `tsc --noEmit`. Todas las respuestas de la API de GitHub deben validarse contra una interfaz tipada antes de renderizarse.
- **Seguridad de Enlaces**: Todo enlace externo (`target="_blank"`) debe incluir obligatoriamente `rel="noopener noreferrer"`.

### RNF-05: Mantenibilidad KDD (Zero-Touch UI Updates)
- Agregar un nuevo proyecto, certificación o habilidad no debe requerir modificar ningún archivo `.astro` ni `.css`, sino únicamente agregar un objeto tipado en `src/data/portfolioData.ts`.

### RNF-06: SEO Técnico, Metadatos Bilingües y Schema.org
- Inclusión de etiquetas OpenGraph (`og:title`, `og:description`, `og:type`, `og:locale`), Twitter Cards y un bloque `<script type="application/ld+json">` de tipo `Person` con el nombre `Juan José Ardila Arévalo`, rol `Software Developer`, ubicación `Bucaramanga, Colombia` y enlaces a `https://github.com/JuanJArdilaA`.