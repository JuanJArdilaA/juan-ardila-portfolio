import type {
  Dictionary,
  EducationItem,
  ProfileData,
  ProjectFilter,
  ProjectItem,
  SkillGroup,
} from '../types/portfolio';

/**
 * Single source of truth for content (RNF-05: zero-touch UI updates).
 * Scope is strictly software development + education + skills (AGENTS.md §3.2).
 */

/** Social URLs live in single constants so they can be updated in one place. */
export const GITHUB_USER = 'JuanJArdilaA';
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/juanjoseardilaarevalo/';

/**
 * Repositories that must never be rendered as project cards
 * (lowercase). The profile README repo carries the username as its name.
 */
export const EXCLUDED_REPOS: string[] = [GITHUB_USER.toLowerCase()];

export const profile: ProfileData = {
  fullName: 'Juan José Ardila Arévalo',
  role: { en: 'Software Developer', es: 'Desarrollador de Software' },
  location: 'Bucaramanga, Colombia',
  coordinates: 'BUCARAMANGA // COL [7.1193° N, 73.1227° W]',
  email: 'jardilaarevalo@gmail.com',
  phone: '+57 3170998504',
  whatsappUrl: 'https://wa.me/573170998504',
  /** Drop the PDF in /public/cv/ with this exact name. */
  cvUrl: '/cv/Juan-Jose-Ardila-Arevalo-CV.pdf',
  githubUser: GITHUB_USER,
  githubUrl: GITHUB_URL,
  linkedinUrl: LINKEDIN_URL,
};

export const education: EducationItem[] = [
  {
    id: 'unad',
    institution: 'UNAD',
    degree: { en: 'Systems Engineering', es: 'Ingeniería en Sistemas' },
    period: { en: '2026 - Present', es: '2026 - Actualidad' },
    focus: {
      en: 'Core focus on software architecture, algorithms, data structures, and scalable systems engineering.',
      es: 'Enfoque en arquitectura de software, algoritmos, estructuras de datos e ingeniería de sistemas escalables.',
    },
  },
  {
    id: 'campuslands',
    institution: 'Campuslands',
    degree: {
      en: 'Technical Degree in Software Development',
      es: 'Técnico Laboral en Desarrollo de Software',
    },
    period: { en: '2026 - Present', es: '2026 - Actualidad' },
    focus: {
      en: 'Intensive hands-on training in full-stack software development, Python, JavaScript, Linux, Git workflows, and Agile Scrum.',
      es: 'Entrenamiento intensivo práctico en desarrollo de software full-stack, Python, JavaScript, Linux, flujos con Git y Scrum Ágil.',
    },
  },
  {
    id: 'caldas',
    institution: 'Instituto Caldas',
    degree: { en: 'High School Diploma', es: 'Bachiller Académico' },
    period: { en: '2021', es: '2021' },
    focus: {
      en: 'Academic Diploma with analytical and mathematical foundation.',
      es: 'Bachiller Académico con base analítica y matemática.',
    },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: { en: 'Languages', es: 'Lenguajes' },
    items: [
      { id: 'python', label: { en: 'Python', es: 'Python' } },
      { id: 'cpp', label: { en: 'C++', es: 'C++' } },
      { id: 'javascript', label: { en: 'JavaScript', es: 'JavaScript' } },
      { id: 'htmlcss', label: { en: 'HTML/CSS', es: 'HTML/CSS' } },
    ],
  },
  {
    id: 'engineering',
    title: { en: 'Engineering', es: 'Ingeniería' },
    items: [
      { id: 'linux', label: { en: 'Linux', es: 'Linux' } },
      { id: 'git', label: { en: 'Git/GitHub', es: 'Git/GitHub' } },
      { id: 'scrum', label: { en: 'Scrum', es: 'Scrum' } },
      { id: 'sddkdd', label: { en: 'SDD/KDD', es: 'SDD/KDD' } },
    ],
  },
  {
    id: 'spoken',
    title: { en: 'Languages (Spoken)', es: 'Idiomas' },
    items: [
      { id: 'english', label: { en: 'English C1', es: 'Inglés C1' } },
      { id: 'spanish', label: { en: 'Spanish Native', es: 'Español Nativo' } },
    ],
  },
  {
    id: 'soft',
    title: { en: 'Soft Skills', es: 'Habilidades Blandas' },
    items: [
      { id: 'leadership', label: { en: 'Leadership', es: 'Liderazgo' } },
      { id: 'teamwork', label: { en: 'Teamwork', es: 'Trabajo en equipo' } },
      { id: 'creativity', label: { en: 'Creativity', es: 'Creatividad' } },
      { id: 'problem', label: { en: 'Problem Solving', es: 'Resolución de problemas' } },
    ],
  },
];

/**
 * Local project manifest: curated descriptions for featured work and the
 * offline fallback dataset. Any other public GitHub repo is rendered
 * automatically by githubService.ts, so listing here is optional.
 */
export const projects: ProjectItem[] = [
  {
    id: 'gimnasio-forcetech',
    repoName: 'gimnasio-forcetech',
    title: {
      en: 'ForceTech Gym Management System',
      es: 'Sistema de Gestión de Gimnasio ForceTech',
    },
    shortDescription: {
      en: 'Gym management system built with Python and developed through Agile and Scrum methodologies.',
      es: 'Sistema de gestión de gimnasio construido en Python y desarrollado con metodologías Ágiles y Scrum.',
    },
    architectureSummary: {
      en: 'Modular architecture: responsibilities are split into independent Python modules, delivered in iterative Scrum sprints.',
      es: 'Arquitectura modular: las responsabilidades se dividen en módulos Python independientes, entregados en sprints iterativos de Scrum.',
    },
    category: 'both',
    technologies: ['Python', 'Scrum', 'Agile', 'Modular Architecture'],
    featured: true,
  },
  {
    id: 'portfolio',
    repoName: 'juan-ardila-portfolio',
    title: {
      en: 'Dual-Face Portfolio Engine',
      es: 'Motor de Portafolio de Doble Cara',
    },
    shortDescription: {
      en: 'Astro portfolio with an Executive view and a Cyberpunk HUD view, switched by a 3D mechanical lever.',
      es: 'Portafolio en Astro con vista Ejecutiva y vista HUD Cyberpunk, alternadas por una palanca mecánica 3D.',
    },
    architectureSummary: {
      en: 'Built with SDD/KDD: specs drive implementation, content lives in typed data files, and animations use GPU-only transforms.',
      es: 'Construido con SDD/KDD: las especificaciones guían la implementación, el contenido vive en datos tipados y las animaciones usan solo transformaciones por GPU.',
    },
    category: 'both',
    technologies: ['Astro', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
    featured: true,
  },
];

/** Technology filter pills (RF-06). Empty `match` means "show everything". */
export const projectFilters: ProjectFilter[] = [
  { id: 'all', label: { en: 'All', es: 'Todos' }, match: [] },
  { id: 'python', label: { en: 'Python', es: 'Python' }, match: ['python'] },
  { id: 'cpp', label: { en: 'C++', es: 'C++' }, match: ['c++', 'cpp'] },
  {
    id: 'javascript',
    label: { en: 'JavaScript', es: 'JavaScript' },
    match: ['javascript', 'typescript'],
  },
  {
    id: 'web',
    label: { en: 'Web/HTML/CSS', es: 'Web/HTML/CSS' },
    match: ['html', 'css', 'astro', 'tailwind css', 'web'],
  },
];

/** English dictionary: the source of truth for key names (`as const`). */
const en = {
  // Meta
  'meta.title': 'Juan José Ardila Arévalo | Software Developer Portfolio',
  'meta.description':
    'Portfolio of Juan José Ardila Arévalo, Junior Full Stack Developer from Bucaramanga, Colombia. Python, C++, JavaScript, Linux and Agile Scrum.',
  'a11y.skip': 'Skip to main content',

  // Navbar
  'nav.projects': 'Projects',
  'nav.education': 'Education',
  'nav.skills': 'Skills',
  'nav.contact': 'Contact',
  'nav.main.aria': 'Main navigation',
  'nav.lang.aria': 'Language selector',
  'nav.switch': 'Switch view',
  'nav.switch.aria': 'Switch between Executive and GameDev portfolio views',
  'nav.core.executive': 'Core: Executive',
  'nav.core.gamedev': 'Core: GameDev',
  'nav.copyEmail': 'Copy email address',

  // Executive hero
  'hero.eyebrow': 'Software Developer',
  'hero.status': 'Available for High-Impact Software Engineering Roles',
  'hero.headline': 'Engineering reliable software with analytical depth.',
  'hero.tagline':
    'Junior Full Stack Developer focused on continuous technical growth, analytical thinking for complex projects, and scalable environments.',
  'hero.cta.projects': 'View Projects',
  'hero.cta.cv': 'Download CV',
  'hero.cta.github': 'GitHub',
  'hero.cta.linkedin': 'LinkedIn',
  'hero.card.title': 'profile.json',
  'hero.card.name': 'name',
  'hero.card.role': 'role',
  'hero.card.location': 'location',
  'hero.card.studying': 'studying',
  'hero.card.languages': 'languages',
  'hero.card.focus': 'focus',
  'hero.card.focusValue': 'Python · C++ · Full Stack',

  // Sections
  'section.projects.eyebrow': 'Selected work',
  'section.projects': 'Featured Systems',
  'section.projects.sub':
    'Projects with their architecture and live GitHub telemetry, synced automatically from my public repositories.',
  'section.education.eyebrow': 'Background',
  'section.education': 'Academic & Technical Timeline',
  'section.skills.eyebrow': 'Toolbox',
  'section.skills': 'Competency Matrix',
  'section.contact.eyebrow': 'Get in touch',
  'section.contact': "Let's build something reliable.",
  'section.contact.sub':
    'Open to junior software engineering opportunities. Reach out through any channel below.',

  // Projects
  'filter.aria': 'Filter projects by technology',
  'project.inspect': 'Inspect Architecture',
  'project.problem': 'Problem Statement',
  'project.architecture': 'SDD/KDD Architecture Applied',
  'project.stack': 'Tech Stack',
  'project.repo': 'GitHub Repository',
  'project.demo': 'Live Demo',
  'project.stars': 'stars',
  'project.updated': 'Updated',
  'project.featured': 'Featured',
  'project.empty': 'No projects match this filter.',
  'project.noDescription': 'No description provided on GitHub yet.',
  'project.autoArchitecture':
    'Repository synced automatically from GitHub. Open the repository for its source code and architecture details.',
  'modal.close': 'Close dialog',
  'status.live': 'Live GitHub Telemetry',
  'status.synced': 'GitHub Telemetry (cached)',
  'status.cached': 'Cached Telemetry Mode',

  // Contact + toast
  'contact.email': 'Copy email',
  'contact.whatsapp': 'WhatsApp',
  'contact.github': 'GitHub',
  'contact.linkedin': 'LinkedIn',
  'toast.email': 'Email copied to clipboard!',
  'footer.built': 'Built with Astro, TypeScript & Tailwind CSS · SDD/KDD',

  // GameDev HUD
  'hud.terminal': '// NIGHT CITY TERMINAL',
  'hud.link': 'LINK: STABLE',
  'hud.tagline':
    'Systems-minded developer focused on game engines, C++ and logical architecture.',
  'hud.location': 'LOCATION',
  'hud.fps': 'FPS',
  'hud.mem': 'MEM',
  'hud.focus': 'FOCUS',
  'hud.focusValue': 'Game Engines · C++ · Logic Architecture',
  'hud.questlog': 'Quest Log / Arsenal',
  'hud.questlog.sub': 'Public repositories deployed as tactical systems.',
  'hud.quest': 'QUEST',
  'hud.lang': 'LANG',
  'hud.active': 'ACTIVE',
  'hud.skilltree': 'Skill Tree & Spec Architecture',
  'hud.skilltree.sub': 'Engineering nodes unlocked through SDD/KDD methodology.',
  'hud.root': 'SDD/KDD CORE',
  'hud.unlocked': 'UNLOCKED',
  'hud.comms': 'Open Comms Channel',
} as const;

export type DictKey = keyof typeof en;

/** Spanish dictionary: typed so a missing key is a compile error. */
const es: Record<DictKey, string> = {
  'meta.title': 'Juan José Ardila Arévalo | Portafolio de Desarrollador de Software',
  'meta.description':
    'Portafolio de Juan José Ardila Arévalo, Desarrollador Full Stack Junior de Bucaramanga, Colombia. Python, C++, JavaScript, Linux y Scrum Ágil.',
  'a11y.skip': 'Saltar al contenido principal',

  'nav.projects': 'Proyectos',
  'nav.education': 'Educación',
  'nav.skills': 'Habilidades',
  'nav.contact': 'Contacto',
  'nav.main.aria': 'Navegación principal',
  'nav.lang.aria': 'Selector de idioma',
  'nav.switch': 'Cambiar vista',
  'nav.switch.aria': 'Alternar entre las vistas Ejecutiva y GameDev del portafolio',
  'nav.core.executive': 'Núcleo: Ejecutivo',
  'nav.core.gamedev': 'Núcleo: GameDev',
  'nav.copyEmail': 'Copiar correo electrónico',

  'hero.eyebrow': 'Desarrollador de Software',
  'hero.status': 'Disponible para Roles de Ingeniería de Software de Alto Impacto',
  'hero.headline': 'Ingeniería de software confiable con profundidad analítica.',
  'hero.tagline':
    'Desarrollador Full Stack Junior enfocado en la mejora técnica continua, capacidad analítica para proyectos complejos y entornos escalables.',
  'hero.cta.projects': 'Ver Proyectos',
  'hero.cta.cv': 'Descargar CV',
  'hero.cta.github': 'GitHub',
  'hero.cta.linkedin': 'LinkedIn',
  'hero.card.title': 'perfil.json',
  'hero.card.name': 'nombre',
  'hero.card.role': 'rol',
  'hero.card.location': 'ubicación',
  'hero.card.studying': 'estudiando',
  'hero.card.languages': 'idiomas',
  'hero.card.focus': 'enfoque',
  'hero.card.focusValue': 'Python · C++ · Full Stack',

  'section.projects.eyebrow': 'Trabajo seleccionado',
  'section.projects': 'Sistemas Destacados',
  'section.projects.sub':
    'Proyectos con su arquitectura y telemetría de GitHub en vivo, sincronizados automáticamente desde mis repositorios públicos.',
  'section.education.eyebrow': 'Trayectoria',
  'section.education': 'Trayectoria Académica y Técnica',
  'section.skills.eyebrow': 'Herramientas',
  'section.skills': 'Matriz de Competencias',
  'section.contact.eyebrow': 'Hablemos',
  'section.contact': 'Construyamos algo confiable.',
  'section.contact.sub':
    'Abierto a oportunidades junior de ingeniería de software. Escríbeme por cualquiera de los canales.',

  'filter.aria': 'Filtrar proyectos por tecnología',
  'project.inspect': 'Ver Arquitectura',
  'project.problem': 'Planteamiento del Problema',
  'project.architecture': 'Arquitectura SDD/KDD Aplicada',
  'project.stack': 'Stack Tecnológico',
  'project.repo': 'Repositorio de GitHub',
  'project.demo': 'Demo en Vivo',
  'project.stars': 'estrellas',
  'project.updated': 'Actualizado',
  'project.featured': 'Destacado',
  'project.empty': 'Ningún proyecto coincide con este filtro.',
  'project.noDescription': 'Aún no hay descripción en GitHub.',
  'project.autoArchitecture':
    'Repositorio sincronizado automáticamente desde GitHub. Abre el repositorio para ver su código y detalles de arquitectura.',
  'modal.close': 'Cerrar diálogo',
  'status.live': 'Telemetría de GitHub en Vivo',
  'status.synced': 'Telemetría de GitHub (caché)',
  'status.cached': 'Modo Telemetría en Caché',

  'contact.email': 'Copiar correo',
  'contact.whatsapp': 'WhatsApp',
  'contact.github': 'GitHub',
  'contact.linkedin': 'LinkedIn',
  'toast.email': '¡Correo copiado!',
  'footer.built': 'Hecho con Astro, TypeScript y Tailwind CSS · SDD/KDD',

  'hud.terminal': '// TERMINAL DE NIGHT CITY',
  'hud.link': 'ENLACE: ESTABLE',
  'hud.tagline':
    'Desarrollador con mentalidad de sistemas enfocado en motores de juego, C++ y arquitectura lógica.',
  'hud.location': 'UBICACIÓN',
  'hud.fps': 'FPS',
  'hud.mem': 'MEM',
  'hud.focus': 'ENFOQUE',
  'hud.focusValue': 'Motores de Juego · C++ · Arquitectura Lógica',
  'hud.questlog': 'Registro de Misiones / Arsenal',
  'hud.questlog.sub': 'Repositorios públicos desplegados como sistemas tácticos.',
  'hud.quest': 'MISIÓN',
  'hud.lang': 'LENG',
  'hud.active': 'ACTIVA',
  'hud.skilltree': 'Árbol de Habilidades y Arquitectura de Specs',
  'hud.skilltree.sub': 'Nodos de ingeniería desbloqueados mediante la metodología SDD/KDD.',
  'hud.root': 'NÚCLEO SDD/KDD',
  'hud.unlocked': 'DESBLOQUEADO',
  'hud.comms': 'Abrir Canal de Comunicación',
};

/** UI dictionary: EN default, ES secondary (RF-01). Keys map to `data-i18n-key`. */
export const dictionary: Dictionary<DictKey> = { en, es };
