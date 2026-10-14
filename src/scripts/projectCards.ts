import { GITHUB_URL, dictionary } from '../data/portfolioData';
import type { DictKey } from '../data/portfolioData';
import type { Locale, MergedProject, ProjectFilter } from '../types/portfolio';

/**
 * Pure HTML-string builders for project cards. They run both at build time
 * (Astro SSR via set:html) and in the browser (after the GitHub sync), so the
 * markup lives in exactly one place. All dynamic text is escaped.
 */

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ESCAPES[char] ?? char);
}

/** Bilingual text node: initial text in `locale`, both variants as attributes. */
function l10n(en: string, es: string, locale: Locale, tag = 'span', cls = ''): string {
  const text = locale === 'es' ? es : en;
  const classAttr = cls ? ` class="${cls}"` : '';
  return `<${tag}${classAttr} data-l10n-en="${escapeHtml(en)}" data-l10n-es="${escapeHtml(es)}">${escapeHtml(text)}</${tag}>`;
}

/** Dictionary-backed text node that stays reactive to locale changes. */
function i18n(key: DictKey, locale: Locale, tag = 'span', cls = ''): string {
  const classAttr = cls ? ` class="${cls}"` : '';
  return `<${tag}${classAttr} data-i18n-key="${key}">${escapeHtml(dictionary[locale][key])}</${tag}>`;
}

/** Lucide `star` and `arrow-up-right` paths, inlined for string rendering. */
const ICON_STAR =
  '<svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
const ICON_ARROW =
  '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';

/** Public repo URL: live `html_url` when synced, otherwise derived from the name. */
export function getRepoUrl(project: MergedProject): string {
  return project.stats?.htmlUrl ?? `${GITHUB_URL}/${project.repoName}`;
}

/** Manifest technologies plus the live GitHub language, de-duplicated. */
export function getTechnologies(project: MergedProject): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  const language = project.stats?.language;
  for (const tech of [...project.technologies, ...(language ? [language] : [])]) {
    const key = tech.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(tech);
    }
  }
  return result;
}

/** True when the project belongs to the selected filter pill (RF-06). */
export function matchesFilter(project: MergedProject, filter: ProjectFilter): boolean {
  if (filter.match.length === 0) return true;
  const techs = getTechnologies(project).map((tech) => tech.toLowerCase());
  return filter.match.some((m) => techs.includes(m));
}

/** "Mar 2026" / "mar 2026" style date, rendered once per locale. */
function formatUpdated(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-CO' : 'en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function renderTags(project: MergedProject): string {
  return getTechnologies(project)
    .slice(0, 6)
    .map((tech) => `<li class="tech-tag">${escapeHtml(tech)}</li>`)
    .join('');
}

/** Executive (Big Tech) bento card. */
function renderExecutiveCard(project: MergedProject, index: number, locale: Locale): string {
  const { stats } = project;
  const metrics: string[] = [];
  if (stats) {
    metrics.push(
      `<span class="metric">${ICON_STAR}<span>${stats.stars}</span><span class="sr-only">${escapeHtml(dictionary[locale]['project.stars'])}</span></span>`,
    );
    if (stats.language) {
      metrics.push(
        `<span class="metric"><span class="lang-dot" aria-hidden="true"></span>${escapeHtml(stats.language)}</span>`,
      );
    }
    const en = formatUpdated(stats.updatedAt, 'en');
    const es = formatUpdated(stats.updatedAt, 'es');
    if (en) {
      metrics.push(
        `<span class="metric">${i18n('project.updated', locale)}&nbsp;${l10n(en, es, locale)}</span>`,
      );
    }
  }

  return `
<article class="bento-card${project.featured ? ' bento-card--featured' : ''}" data-project-id="${escapeHtml(project.id)}" style="--i:${index}">
  <div class="bento-card__top">
    <span class="bento-card__repo">${escapeHtml(project.repoName)}</span>
    ${project.featured ? i18n('project.featured', locale, 'span', 'bento-card__badge') : ''}
  </div>
  <h3 class="bento-card__title">${l10n(project.title.en, project.title.es, locale)}</h3>
  <p class="bento-card__desc">${l10n(project.shortDescription.en, project.shortDescription.es, locale)}</p>
  <ul class="bento-card__tags" aria-label="${escapeHtml(dictionary[locale]['project.stack'])}">${renderTags(project)}</ul>
  <div class="bento-card__footer">
    <div class="bento-card__metrics">${metrics.join('')}</div>
    <button type="button" class="link-action" data-action="inspect" data-project-id="${escapeHtml(project.id)}">
      ${i18n('project.inspect', locale)}${ICON_ARROW}
    </button>
  </div>
</article>`;
}

/** GameDev (Cyberpunk HUD) quest card with chamfered frame. */
function renderQuestCard(project: MergedProject, index: number, locale: Locale): string {
  const { stats } = project;
  const quest = String(index + 1).padStart(2, '0');
  const language = stats?.language ?? project.technologies[0] ?? '—';
  const stars = stats ? `<span class="metric">${ICON_STAR}<span>${stats.stars}</span></span>` : '';

  return `
<article class="quest-card" data-project-id="${escapeHtml(project.id)}" style="--i:${index}">
  <div class="quest-card__inner">
    <div class="quest-card__header">
      <span class="quest-id">${i18n('hud.quest', locale)} // ${quest}</span>
      ${i18n('hud.active', locale, 'span', 'quest-status')}
    </div>
    <h3 class="quest-card__title">${l10n(project.title.en, project.title.es, locale)}</h3>
    <p class="quest-card__desc">${l10n(project.shortDescription.en, project.shortDescription.es, locale)}</p>
    <ul class="bento-card__tags" aria-label="${escapeHtml(dictionary[locale]['project.stack'])}">${renderTags(project)}</ul>
    <div class="quest-card__footer">
      <div class="bento-card__metrics">
        <span class="metric metric--hud">${i18n('hud.lang', locale)}: ${escapeHtml(language)}</span>
        ${stars}
      </div>
      <button type="button" class="hud-btn" data-action="inspect" data-project-id="${escapeHtml(project.id)}">
        ${i18n('project.inspect', locale)}${ICON_ARROW}
      </button>
    </div>
  </div>
</article>`;
}

function renderEmpty(locale: Locale): string {
  return `<p class="projects-empty">${i18n('project.empty', locale)}</p>`;
}

/** Cards for the Executive grid, honoring category and the active filter. */
export function renderExecutiveCards(
  projects: MergedProject[],
  filter: ProjectFilter,
  locale: Locale = 'en',
): string {
  const visible = projects.filter(
    (p) => p.category !== 'gamedev' && matchesFilter(p, filter),
  );
  return visible.length > 0
    ? visible.map((p, i) => renderExecutiveCard(p, i, locale)).join('')
    : renderEmpty(locale);
}

/** Cards for the GameDev quest log (not affected by the executive filter). */
export function renderQuestCards(projects: MergedProject[], locale: Locale = 'en'): string {
  const visible = projects.filter((p) => p.category !== 'executive');
  return visible.length > 0
    ? visible.map((p, i) => renderQuestCard(p, i, locale)).join('')
    : renderEmpty(locale);
}
