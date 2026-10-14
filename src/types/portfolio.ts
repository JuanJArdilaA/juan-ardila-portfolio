/**
 * Strict TypeScript contracts for the portfolio (design.md §3).
 * No `any` is allowed anywhere in the project (AGENTS.md §2).
 */

/** Supported UI languages. English is the default. */
export type Locale = 'en' | 'es';

/** The two faces of the 3D drum. */
export type ViewMode = 'executive' | 'gamedev';

/** Mechanical lever / drum state machine. */
export type LeverState =
  | 'IDLE_EXECUTIVE'
  | 'ROTATING_TO_GAMEDEV'
  | 'IDLE_GAMEDEV'
  | 'ROTATING_TO_EXECUTIVE';

/** Bilingual string container. */
export type Localized = Record<Locale, string>;

/** Academic timeline entry. */
export interface EducationItem {
  id: string;
  institution: string;
  degree: Record<Locale, string>;
  period: Record<Locale, string>;
  focus: Record<Locale, string>;
}

/** Local project manifest entry (rich descriptions; live stats merged later). */
export interface ProjectItem {
  id: string;
  repoName: string;
  title: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
  architectureSummary: Record<Locale, string>;
  category: 'both' | 'executive' | 'gamedev';
  technologies: string[];
  featured: boolean;
  demoUrl?: string;
}

/** Subset of the GitHub REST v3 repo payload that we validate and consume. */
export interface GitHubRepoResponse {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

/** Live GitHub statistics merged into a project. */
export interface GitHubStats {
  stars: number;
  language: string | null;
  updatedAt: string;
  htmlUrl: string;
}

/**
 * Project after merging the local manifest with (optional) live stats.
 * `origin` tells whether the card comes from the manual manifest or was
 * auto-discovered from the GitHub API.
 */
export interface MergedProject extends ProjectItem {
  stats?: GitHubStats;
  origin: 'manifest' | 'github';
}

/** Technology filter pill (RF-06). `match` holds lowercase technology names. */
export interface ProjectFilter {
  id: string;
  label: Record<Locale, string>;
  match: string[];
}

/** Where the project data came from (drives the "Cached Telemetry Mode" badge). */
export type DataSource = 'live' | 'cache' | 'fallback';

export interface ProjectsResult {
  projects: MergedProject[];
  source: DataSource;
}

/** Skill groups shown in the Competency Matrix and the Skill Tree. */
export type SkillGroupId = 'languages' | 'engineering' | 'spoken' | 'soft';

export interface SkillItem {
  id: string;
  label: Localized;
}

export interface SkillGroup {
  id: SkillGroupId;
  title: Localized;
  items: SkillItem[];
}

/** Public profile / contact information. */
export interface ProfileData {
  fullName: string;
  role: Localized;
  location: string;
  coordinates: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  cvUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  githubUser: string;
}

/** Flat translation dictionary keyed by `data-i18n-key` (keys checked per locale). */
export type Dictionary<K extends string = string> = Record<Locale, Record<K, string>>;
