import { profile, projects as localProjects } from '../data/portfolioData';
import type {
  GitHubRepoResponse,
  MergedProject,
  ProjectsResult,
} from '../types/portfolio';

/** Cache key and TTL (RF-05). */
const CACHE_KEY = `gh_repos_${profile.githubUser}`;
const CACHE_TTL_MS = 30 * 60 * 1000;
const API_URL = `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=15`;

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

/** Validates a whole payload; returns null if it is not an array of repos. */
function parseRepos(payload: unknown): GitHubRepoResponse[] | null {
  if (!Array.isArray(payload)) return null;
  const repos = payload.filter(isRepo);
  return repos;
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

/**
 * Merges live stats with the rich local manifest.
 * Forks are dropped unless explicitly listed in the manifest (RF-05).
 * Manifest projects without a live repo keep their local data.
 */
function mergeProjects(repos: GitHubRepoResponse[]): MergedProject[] {
  const byName = new Map<string, GitHubRepoResponse>(
    repos.filter((r) => !r.fork || localProjects.some((p) => p.repoName === r.name)).map((r) => [r.name, r]),
  );

  return localProjects.map((project) => {
    const repo = byName.get(project.repoName);
    if (!repo) return { ...project };
    return {
      ...project,
      stats: {
        stars: repo.stargazers_count,
        language: repo.language,
        updatedAt: repo.updated_at,
        htmlUrl: repo.html_url,
      },
    };
  });
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
    return { projects: localProjects.map((p) => ({ ...p })), source: 'fallback' };
  }
}
