import { dictionary } from '../data/portfolioData';
import type { DictKey } from '../data/portfolioData';
import type { Locale } from '../types/portfolio';

/**
 * Reactive i18n engine (RF-01). This module has no import-time side effects,
 * so it is safe to use from Astro frontmatter (SSR) and from the browser.
 *
 * DOM contract (all on leaf elements, never on nodes that contain icons):
 *  - `data-i18n-key="dict.key"`            -> textContent from the dictionary
 *  - `data-i18n-aria-label="dict.key"`     -> aria-label from the dictionary
 *  - `data-l10n-en="..." data-l10n-es=".."` -> textContent for data-driven strings
 */

export const LOCALE_STORAGE_KEY = 'portfolio_lang';
export const LOCALE_EVENT = 'portfolio:locale-change';

let currentLocale: Locale = 'en';

/** Type guard that narrows an arbitrary attribute value to a dictionary key. */
export function isDictKey(value: string | null): value is DictKey {
  return value !== null && value in dictionary.en;
}

/** Translates a key. Pure and SSR-safe (defaults to English). */
export function t(key: DictKey, locale: Locale = 'en'): string {
  return dictionary[locale][key];
}

/** Reads the persisted locale; English is the default (RF-01). */
export function readStoredLocale(): Locale {
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY) === 'es' ? 'es' : 'en';
  } catch {
    return 'en'; // storage blocked (private mode): keep the default
  }
}

export function getLocale(): Locale {
  return currentLocale;
}

/** Writes a bilingual string into an element and remembers both variants. */
export function setLocalized(el: HTMLElement, value: Record<Locale, string>): void {
  el.setAttribute('data-l10n-en', value.en);
  el.setAttribute('data-l10n-es', value.es);
  el.textContent = value[currentLocale];
}

/**
 * Applies the given locale to every translatable node under `root`.
 * Flow: one querySelectorAll pass per contract, direct textContent writes,
 * no layout-affecting reads, so a full swap stays well under the 50ms budget.
 */
export function applyTranslations(root: ParentNode = document, locale: Locale = currentLocale): void {
  root.querySelectorAll<HTMLElement>('[data-i18n-key]').forEach((el) => {
    const key = el.getAttribute('data-i18n-key');
    if (isDictKey(key)) el.textContent = dictionary[locale][key];
  });

  root.querySelectorAll<HTMLElement>('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (isDictKey(key)) el.setAttribute('aria-label', dictionary[locale][key]);
  });

  root.querySelectorAll<HTMLElement>('[data-l10n-en]').forEach((el) => {
    const text = el.getAttribute(`data-l10n-${locale}`);
    if (text !== null) el.textContent = text;
  });
}

/**
 * Switches the UI language without reloading the page or touching the 3D drum:
 * persists the choice, updates <html lang>, metadata, the EN/ES toggle state,
 * then notifies other modules through a document-level event.
 */
export function setLocale(locale: Locale): void {
  currentLocale = locale;

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* best-effort persistence */
  }

  document.documentElement.lang = locale;
  document.documentElement.setAttribute('data-lang', locale);
  document.title = dictionary[locale]['meta.title'];
  document
    .querySelector<HTMLMetaElement>('meta[name="description"]')
    ?.setAttribute('content', dictionary[locale]['meta.description']);

  applyTranslations(document, locale);

  document.querySelectorAll<HTMLElement>('[data-lang-option]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.langOption === locale));
  });

  document.dispatchEvent(new CustomEvent<Locale>(LOCALE_EVENT, { detail: locale }));
}

/** Boots the engine: restores the stored locale and wires the EN/ES buttons. */
export function initI18n(): void {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const option = target.closest<HTMLElement>('[data-lang-option]');
    if (!option) return;
    setLocale(option.dataset.langOption === 'es' ? 'es' : 'en');
  });

  setLocale(readStoredLocale());
}
