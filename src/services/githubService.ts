import {
  EXCLUDED_REPOS,
  GITHUB_USER,
  dictionary,
  projects as localProjects,
} from '../data/portfolioData';
import type {
  GitHubRepoResponse,
  MergedProject,
  ProjectItem,
  ProjectsResult,
} from '../types/portfolio';

/** Cache key and TTL (RF-05). */
const CACHE_KEY = `gh_repos_${GITHUB_USER}`;
const CACHE_TTL_MS = 30 * 60 * 1000;
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=15`;

interface CacheEntry {
  timestamp: number;
  repos: GitHubRepoResponse[];
}

/** Runtime type guard: validates one raw API item before it is used (RNF-04). */
function isRepo(value: unknown): value is GitHubRepoResponse {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'number' &&
    typeof v.name === 'string' &&
    typeof v.html_url === 'string' &&
    (typeof v.description === 'string' || v.description === null) &&
    (typeof v.language === 'string' || v.language === null) &&
    typeof v.stargazers_count === 'number' &&
    typeof v.updated_at === 'string' &&
    Array.isArray(v.topics) &&
    typeof v.fork === 'boolean'
  );
}

/** Validates a whole payload; returns null if it is not an array. */
function parseRepos(payload: unknown): GitHubRepoResponse[] | null {
  if (!Array.isArray(payload)) return null;
  return payload.filter(isRepo);
}

/** Reads a non-expired cache entry, or null if missing/expired/corrupt. */
function readCache(): GitHubRepoResponse[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as Partial<CacheEntry>;
    if (typeof entry.timestamp !== 'number') return null;
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) return null; // expired
    return parseRepos(entry.repos);
  } catch {
    return null; // corrupt JSON or storage unavailable
  }
}

/** Persists repos with the current timestamp; storage errors are ignored. */
function writeCache(repos: GitHubRepoResponse[]): void {
  try {
    const entry: CacheEntry = { timestamp: Date.now(), repos };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    /* quota exceeded or storage disabled: cache is best-effort */
  }
}

/** Builds a card definition for a repo that is NOT in the local manifest. */
function repoToProjectItem(repo: GitHubRepoResponse): ProjectItem {
  const technologies: string[] = [];
  if (repo.language) technologies.push(repo.language);
  for (const topic of repo.topics) {
    if (typeof topic === 'string' && !technologies.includes(topic)) technologies.push(topic);
  }

  return {
    id: `gh-${repo.id}`,
    repoName: repo.name,
    title: { en: repo.name, es: repo.name },
    // GitHub descriptions are not translatable; fall back to a bilingual notice.
    shortDescription: {
      en: repo.description ?? dictionary.en['project.noDescription'],
      es: repo.description ?? dictionary.es['project.noDescription'],
    },
    architectureSummary: {
      en: dictionary.en['project.autoArchitecture'],
      es: dictionary.es['project.autoArchitecture'],
    },
    category: 'both',
    technologies,
    featured: false,
  };
}

/** Copies the live stats of a repo into the shape consumed by the UI. */
function toStats(repo: GitHubRepoResponse): NonNullable<MergedProject['stats']> {
  return {
    stars: repo.stargazers_count,
    language: repo.language,
    updatedAt: repo.updated_at,
    htmlUrl: repo.html_url,
  };
}

/**
 * Merges the local manifest with the live API payload.
 *  1. Manifest projects come first and get live stats when the repo exists.
 *  2. Every OTHER public repo (non-fork, not excluded) is appended
 *     automatically using its GitHub name, description and language.
 * Forks are only kept when explicitly listed in the manifest (RF-05).
 */
function mergeProjects(repos: GitHubRepoResponse[]): MergedProject[] {
  const manifestNames = new Set(localProjects.map((p) => p.repoName.toLowerCase()));
  const byName = new Map<string, GitHubRepoResponse>(repos.map((r) => [r.name.toLowerCase(), r]));

  const curated: MergedProject[] = localProjects.map((project) => {
    const repo = byName.get(project.repoName.toLowerCase());
    return repo
      ? { ...project, origin: 'manifest', stats: toStats(repo) }
      : { ...project, origin: 'manifest' };
  });

  const discovered: MergedProject[] = repos
    .filter((repo) => {
      const name = repo.name.toLowerCase();
      return !manifestNames.has(name) && !repo.fork && !EXCLUDED_REPOS.includes(name);
    })
    .map((repo) => ({ ...repoToProjectItem(repo), origin: 'github', stats: toStats(repo) }));

  return [...curated, ...discovered];
}

/** Offline dataset: manifest only. */
function fallbackProjects(): MergedProject[] {
  return localProjects.map((p) => ({ ...p, origin: 'manifest' }));
}

/**
 * Main entry point (client-side only; uses localStorage and fetch).
 * Flow: 1) valid cache -> use it. 2) else GET GitHub API, validate, cache.
 * 3) On any error (403 rate limit, offline, bad payload) -> local fallback.
 */
export async function fetchProjects(): Promise<ProjectsResult> {
  const cached = readCache();
  if (cached) {
    return { projects: mergeProjects(cached), source: 'cache' };
  }

  try {
    const response = await fetch(API_URL, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) throw new Error(`GitHub API responded ${response.status}`);

    const repos = parseRepos((await response.json()) as unknown);
    if (!repos) throw new Error('Unexpected GitHub API payload');

    writeCache(repos);
    return { projects: mergeProjects(repos), source: 'live' };
  } catch {
    // Silent fallback: the UI shows the "Cached Telemetry Mode" badge.
    return { projects: fallbackProjects(), source: 'fallback' };
  }
}

/** Synchronous first-paint dataset (manifest only), also used for SSR. */
export function getManifestProjects(): MergedProject[] {
  return fallbackProjects();
}
