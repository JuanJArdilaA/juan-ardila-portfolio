# AGENTS.md - Single Source of Truth (KDD Architecture)

## 1. Product Vision & Business Goal
Portafolio de ingeniería de software de alto rendimiento para **Juan José Ardila Arévalo**, Desarrollador Full Stack Junior enfocado en la optimización continua de habilidades técnicas, capacidad analítica para proyectos complejos y entornos de alta escalabilidad.
La aplicación opera bajo una arquitectura interactiva de doble cara (**Executive Big Tech View** vs. **GameDev Cyberpunk 2077 HUD View**), accionada por una palanca mecánica inferior con pomo esférico rojo que rota el contenedor principal como un cilindro/ruleta 3D (`rotateX`) para hacer emerger la cara opuesta desde la parte inferior.

## 2. Official Tech Stack & Environment
- **Core Framework**: Astro 5.x (Static Site Generation, cero JS innecesario por defecto).
- **Styling Engine**: Tailwind CSS 3.4+ con variables CSS nativas (`Custom Properties`) y aceleración por hardware (`transform3d`, `perspective`, `backface-visibility`).
- **Scripting & Logic**: TypeScript 5.x en modo estricto (`"strict": true`, prohibido el tipo `any`).
- **Icons & Typography**: Lucide Icons / Simple Icons + Google Fonts (`Inter` para lectura ejecutiva, `Rajdhani` para displays Cyberpunk y `JetBrains Mono` para telemetría y código).
- **External APIs**: GitHub REST API v3 (`https://api.github.com/users/JuanJArdilaA/repos`).

## 3. Strict Architectural Rules (Innegociables)
1. **Real Identity Enforcement**: Usar exclusivamente el nombre oficial **Juan José Ardila Arévalo**. Prohibido inventar alias o nombres de alter egos en la interfaz.
2. **Data Filtering Policy (Strict CV Scope)**: Incluir únicamente el perfil de desarrollo de software, educación académica (UNAD, Campuslands, Instituto Caldas), idiomas (Inglés C1, Español Nativo), habilidades técnicas (Python, C++, JavaScript, HTML/CSS, Linux, Git/GitHub, Scrum) y habilidades blandas (Liderazgo, Trabajo en equipo, Creatividad, Resolución de problemas). **PROHIBIDO** incluir experiencias laborales previas ajenas al desarrollo de software.
3. **Separation of Concerns (SoC)**:
   - `src/types/`: Contratos e interfaces TypeScript.
   - `src/data/`: Diccionario bilingüe (`en` por defecto, `es` secundario) y manifiesto local de proyectos. Prohibido quemar texto (*hardcode*) en archivos `.astro`.
   - `src/services/`: Cliente HTTP para GitHub con manejo de caché y errores.
   - `src/components/`: Componentes modulares divididos en `/shared`, `/executive` y `/gamedev`.
4. **Code Documentation Standard**: Cada función de transformación matemática 3D, manejo de eventos táctiles/mouse y lógica asíncrona debe incluir comentarios explicativos claros sobre el flujo lógico.