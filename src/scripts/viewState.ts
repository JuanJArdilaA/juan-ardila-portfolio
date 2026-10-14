import type { ViewMode } from '../types/portfolio';

/**
 * Active-view bookkeeping shared by the navbar, the HUD telemetry and (in
 * Phase 4) the mechanical lever state machine.
 */

/** Reads the active face from the <body data-view> attribute. */
export function getActiveView(): ViewMode {
  return document.body.dataset.view === 'gamedev' ? 'gamedev' : 'executive';
}

/** True when the OS asks for reduced motion (RNF-02). */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Makes `view` the active face. Beyond the CSS hook (`data-view`), the hidden
 * face is marked `inert` so keyboard focus and screen readers can never reach
 * content that is visually off-screen. `scroll` resets the window position
 * smoothly (used on user-initiated switches, not on the initial sync).
 */
export function setActiveView(view: ViewMode, scroll = true): void {
  document.body.dataset.view = view;

  const faces: Array<[string, ViewMode]> = [
    ['executive-face', 'executive'],
    ['gamedev-face', 'gamedev'],
  ];
  for (const [id, faceView] of faces) {
    const face = document.getElementById(id);
    if (!face) continue;
    const hidden = faceView !== view;
    face.inert = hidden;
    face.setAttribute('aria-hidden', String(hidden));
  }

  if (scroll) window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
