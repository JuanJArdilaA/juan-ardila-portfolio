import { profile } from '../data/portfolioData';
import type { DictKey } from '../data/portfolioData';
import { applyTranslations } from './i18n';
import { getActiveView, prefersReducedMotion, setActiveView } from './viewState';

/**
 * Shared UI behaviour: toast feedback, clipboard email copy (RF-07),
 * contextual navigation, quick view switch and simulated HUD telemetry.
 */

/* --------------------------------- Toast ---------------------------------- */

let toastTimer: number | undefined;

/** Shows the floating toast with a dictionary message for ~2.8s. */
export function showToast(key: DictKey): void {
  const toast = document.getElementById('toast');
  const message = document.getElementById('toast-message');
  if (!toast || !message) return;

  message.setAttribute('data-i18n-key', key);
  applyTranslations(toast);

  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

/* ------------------------------ Email copy -------------------------------- */

/** Fallback for browsers/contexts without the async Clipboard API. */
function legacyCopy(text: string): boolean {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  area.remove();
  return ok;
}

/** Copies the contact email and confirms with the toast (RF-07). */
async function copyEmail(): Promise<void> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(profile.email);
    } else if (!legacyCopy(profile.email)) {
      return;
    }
    showToast('toast.email');
  } catch {
    // Permission denied: try the legacy path before giving up silently.
    if (legacyCopy(profile.email)) showToast('toast.email');
  }
}

/* ------------------------------ HUD telemetry ----------------------------- */

/**
 * Simulated FPS / memory readout for the GameDev HUD. Updates once per second
 * and only while the GameDev face is visible, so it costs nothing otherwise.
 */
function initHudTelemetry(): void {
  const fps = document.querySelectorAll<HTMLElement>('[data-hud-fps]');
  const mem = document.querySelectorAll<HTMLElement>('[data-hud-mem]');
  if (fps.length === 0 && mem.length === 0) return;

  window.setInterval(() => {
    if (document.hidden || getActiveView() !== 'gamedev') return;
    const fpsValue = 58 + Math.floor(Math.random() * 3); // 58-60 FPS
    const memValue = (41 + Math.random() * 2).toFixed(1); // 41.0-43.0 MB
    fps.forEach((el) => (el.textContent = String(fpsValue)));
    mem.forEach((el) => (el.textContent = `${memValue} MB`));
  }, 1000);
}

/* --------------------------------- Boot ----------------------------------- */

export function initUi(): void {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest('[data-action="copy-email"]')) {
      void copyEmail();
      return;
    }

    // Quick-switch indicator (RF-08). Phase 4 swaps this for the lever machine.
    if (target.closest('[data-action="toggle-view"]')) {
      document.dispatchEvent(new CustomEvent('portfolio:toggle-view'));
      return;
    }

    // Contextual nav: resolve "#projects" against whichever face is active.
    const navLink = target.closest<HTMLAnchorElement>('[data-nav-target]');
    if (navLink?.dataset.navTarget) {
      const section = document.getElementById(`${getActiveView()}-${navLink.dataset.navTarget}`);
      if (section) {
        event.preventDefault();
        section.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      }
    }
  });

  initHudTelemetry();
}

/** Default toggle used until the lever state machine (Phase 4) takes over. */
export function initDefaultViewToggle(): void {
  document.addEventListener('portfolio:toggle-view', () => {
    setActiveView(getActiveView() === 'executive' ? 'gamedev' : 'executive');
  });
}
