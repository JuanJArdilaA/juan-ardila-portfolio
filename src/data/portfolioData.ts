import type {
  Dictionary,
  EducationItem,
  ProfileData,
  ProjectItem,
  SkillGroup,
} from '../types/portfolio';

/**
 * Single source of truth for content (RNF-05: zero-touch UI updates).
 * Scope is strictly software development + education + skills (AGENTS.md §3.2).
 */

export const profile: ProfileData = {
  fullName: 'Juan José Ardila Arévalo',
  role: { en: 'Software Developer', es: 'Desarrollador de Software' },
  location: 'Bucaramanga, Colombia',
  coordinates: 'BUCARAMANGA // COL [7.1193° N, 73.1227° W]',
  email: 'jardilaarevalo@gmail.com',
  phone: '+57 3170998504',
  githubUser: 'JuanJArdilaA',
  githubUrl: 'https://github.com/JuanJArdilaA',
  linkedinUrl: 'https://linkedin.com/in/juanjardilaa',
};

export const education: EducationItem[] = [
  {
    id: 'unad',
    institution: 'UNAD',
    degree: { en: 'Systems Engineering', es: 'Ingeniería en Sistemas' },
    period: { en: '2026 - Present', es: '2026 - Actualidad' },
    focus: {
      en: 'Software engineering foundations, algorithms and systems architecture.',
      es: 'Fundamentos de ingeniería de software, algoritmos y arquitectura de sistemas.',
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
      en: 'Hands-on full stack development, version control and agile teamwork.',
      es: 'Desarrollo full stack práctico, control de versiones y trabajo ágil en equipo.',
    },
  },
  {
    id: 'caldas',
    institution: 'Instituto Caldas',
    degree: { en: 'High School Diploma', es: 'Bachiller Académico' },
    period: { en: '2021', es: '2021' },
    focus: {
      en: 'Academic secondary education.',
      es: 'Educación media académica.',
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
 * Local project manifest. Used for rich descriptions and as the offline
 * fallback dataset. Add new repositories here (repoName must match GitHub).
 */
export const projects: ProjectItem[] = [
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

/** Technology filter pills (RF-06). */
export const projectFilters: string[] = ['All', 'Python', 'C++', 'JavaScript', 'Web/HTML/CSS'];

/** UI dictionary: EN default, ES secondary (RF-01). Keys map to `data-i18n-key`. */
export const dictionary: Dictionary = {
  en: {
    'nav.projects': 'Projects',
    'nav.education': 'Education',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.switch': 'Switch view',
    'hero.status': 'Available for High-Impact Software Engineering Roles',
    'hero.tagline':
      'Junior Full Stack Developer focused on continuous technical growth, analytical thinking for complex projects, and scalable environments.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.cv': 'Download CV',
    'hero.cta.github': 'GitHub',
    'hero.cta.linkedin': 'LinkedIn',
    'section.projects': 'Featured Systems',
    'section.education': 'Academic & Technical Timeline',
    'section.skills': 'Competency Matrix',
    'project.inspect': 'Inspect Architecture',
    'project.problem': 'Problem Statement',
    'project.architecture': 'SDD/KDD Architecture Applied',
    'project.stack': 'Tech Stack',
    'project.repo': 'GitHub Repository',
    'project.demo': 'Live Demo',
    'status.cached': 'Cached Telemetry Mode',
    'toast.email': 'Email copied to clipboard!',
    'hud.questlog': 'Quest Log / Arsenal',
    'hud.skilltree': 'Skill Tree & Spec Architecture',
  },
  es: {
    'nav.projects': 'Proyectos',
    'nav.education': 'Educación',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',
    'nav.switch': 'Cambiar vista',
    'hero.status': 'Disponible para Roles de Ingeniería de Software de Alto Impacto',
    'hero.tagline':
      'Desarrollador Full Stack Junior enfocado en la mejora técnica continua, capacidad analítica para proyectos complejos y entornos escalables.',
    'hero.cta.projects': 'Ver Proyectos',
    'hero.cta.cv': 'Descargar CV',
    'hero.cta.github': 'GitHub',
    'hero.cta.linkedin': 'LinkedIn',
    'section.projects': 'Sistemas Destacados',
    'section.education': 'Trayectoria Académica y Técnica',
    'section.skills': 'Matriz de Competencias',
    'project.inspect': 'Ver Arquitectura',
    'project.problem': 'Planteamiento del Problema',
    'project.architecture': 'Arquitectura SDD/KDD Aplicada',
    'project.stack': 'Stack Tecnológico',
    'project.repo': 'Repositorio de GitHub',
    'project.demo': 'Demo en Vivo',
    'status.cached': 'Modo Telemetría en Caché',
    'toast.email': '¡Correo copiado!',
    'hud.questlog': 'Registro de Misiones / Arsenal',
    'hud.skilltree': 'Árbol de Habilidades y Arquitectura de Specs',
  },
};
