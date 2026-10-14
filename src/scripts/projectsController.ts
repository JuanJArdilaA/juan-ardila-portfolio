import { projectFilters } from '../data/portfolioData';
import { fetchProjects, getManifestProjects } from '../services/githubService';
import type { DictKey } from '../data/portfolioData';
import type { DataSource, MergedProject, ProjectFilter } from '../types/portfolio';
import { applyTranslations, getLocale, setLocalized } from './i18n';
import { getRepoUrl, getTechnologies, renderExecutiveCards, renderQuestCards } from './projectCards';

/**
 * Client controller for the project grids, filter pills, GitHub sync badge
 * and the case-study modal (RF-05, RF-06). Asynchronous flow:
 *   mount -> fetchProjects() (cache / API / fallback) -> re-render both grids.
 */

let projects: MergedProject[] = getManifestProjects();
let activeFilter: ProjectFilter = projectFilters[0] as ProjectFilter;
let animationTimer: number | undefined;

/** Which dictionary key labels each data source on the sync badge. */
const BADGE_LABEL: Record<DataSource, DictKey> = {
  live: 'status.live',
  cache: 'status.synced',
  fallback: 'status.cached',
};

function getEl<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector<T>(selector);
}

/** Re-renders the Executive grid; `animate` plays the staggered entrance. */
function renderExecutiveGrid(animate: boolean): void {
  const grid = getEl<HTMLElement>('#executive-projects-grid');
  if (!grid) return;

  grid.innerHTML = renderExecutiveCards(projects, activeFilter, getLocale());
  applyTranslations(grid);

  if (animate) {
    grid.classList.remove('is-animating');
    // Force a reflow so the CSS animation restarts on consecutive filter clicks.
    void grid.offsetWidth;
    grid.classList.add('is-animating');
    window.clearTimeout(animationTimer);
    animationTimer = window.setTimeout(() => grid.classList.remove('is-animating'), 900);
  }
}

function renderQuestGrid(): void {
  const grid = getEl<HTMLElement>('#gamedev-projects-grid');
  if (!grid) return;
  grid.innerHTML = renderQuestCards(projects, getLocale());
  applyTranslations(grid);
}

/** Shows the telemetry badge in both views for the given data source. */
function updateSyncBadges(source: DataSource): void {
  document.querySelectorAll<HTMLElement>('[data-sync-badge]').forEach((badge) => {
    badge.hidden = false;
    badge.dataset.state = source;
    const label = badge.querySelector<HTMLElement>('[data-sync-label]');
    if (label) {
      label.setAttribute('data-i18n-key', BADGE_LABEL[source]);
      applyTranslations(badge);
    }
  });
}

/** Marks the active pill (aria-pressed) and swaps the grid content. */
function selectFilter(id: string): void {
  const next = projectFilters.find((f) => f.id === id);
  if (!next || next.id === activeFilter.id) return;
  activeFilter = next;

  document.querySelectorAll<HTMLElement>('[data-filter-id]').forEach((pill) => {
    pill.setAttribute('aria-pressed', String(pill.dataset.filterId === next.id));
  });
  renderExecutiveGrid(true);
}

/* ------------------------------ Project modal ------------------------------ */

function openProjectModal(projectId: string): void {
  const project = projects.find((p) => p.id === projectId);
  const dialog = getEl<HTMLDialogElement>('#project-modal');
  if (!project || !dialog) return;

  const set = (selector: string, value: Record<'en' | 'es', string>): void => {
    const el = dialog.querySelector<HTMLElement>(selector);
    if (el) setLocalized(el, value);
  };

  set('[data-modal="title"]', project.title);
  set('[data-modal="problem"]', project.shortDescription);
  set('[data-modal="architecture"]', project.architectureSummary);

  const stack = dialog.querySelector<HTMLElement>('[data-modal="stack"]');
  if (stack) {
    stack.replaceChildren(
      ...getTechnologies(project).map((tech) => {
        const li = document.createElement('li');
        li.className = 'tech-tag';
        li.textContent = tech;
        return li;
      }),
    );
  }

  const repo = dialog.querySelector<HTMLAnchorElement>('[data-modal="repo"]');
  if (repo) repo.href = getRepoUrl(project);

  const demo = dialog.querySelector<HTMLAnchorElement>('[data-modal="demo"]');
  if (demo) {
    demo.hidden = !project.demoUrl;
    if (project.demoUrl) demo.href = project.demoUrl;
  }

  document.body.classList.add('modal-open');
  dialog.showModal();
}

function initModal(): void {
  const dialog = getEl<HTMLDialogElement>('#project-modal');
  if (!dialog) return;

  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));

  // Backdrop click: the <dialog> itself is the target only outside its panel.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.querySelector('[data-action="close-modal"]')?.addEventListener('click', () => dialog.close());
}

/* --------------------------------- Boot ----------------------------------- */

/** Wires events immediately and kicks off the asynchronous GitHub sync. */
export function initProjects(): void {
  initModal();

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const inspect = target.closest<HTMLElement>('[data-action="inspect"]');
    if (inspect?.dataset.projectId) {
      openProjectModal(inspect.dataset.projectId);
      return;
    }

    const pill = target.closest<HTMLElement>('[data-filter-id]');
    if (pill?.dataset.filterId) selectFilter(pill.dataset.filterId);
  });

  void fetchProjects().then((result) => {
    projects = result.projects;
    renderExecutiveGrid(false);
    renderQuestGrid();
    updateSyncBadges(result.source);
  });
}
