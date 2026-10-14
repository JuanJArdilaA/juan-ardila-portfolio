import type { LeverState, ViewMode } from '../types/portfolio';
import { getActiveView, prefersReducedMotion, setActiveView } from './viewState';

/**
 * lever.ts — Mechanical Lever State Machine (Phase 4 / design.md §4–5)
 *
 * State transitions:
 *   IDLE_EXECUTIVE → (pull) → ROTATING_TO_GAMEDEV → IDLE_GAMEDEV
 *   IDLE_GAMEDEV   → (pull) → ROTATING_TO_EXECUTIVE → IDLE_EXECUTIVE
 *
 * During rotation:
 *   - body.is-rotating is set to block pointer events (global.css §143).
 *   - #executive-face / #gamedev-face CSS transitions are driven by the
 *     body[data-view] attribute written by setActiveView().
 *   - The lever knob visually tilts via the CSS rule:
 *       body[data-view="gamedev"] .lever-shaft-wrapper { transform: rotateZ(8deg); }
 *   - After 900ms (--drum-duration) the lock is released.
 */

/** Duration must match --drum-duration in global.css */
const DRUM_DURATION_MS = 900;

/** Tracks whether a rotation is in progress (mutex). */
let currentState: LeverState = 'IDLE_EXECUTIVE';

/**
 * Maps a ViewMode to its corresponding idle LeverState.
 */
function idleStateFor(view: ViewMode): LeverState {
  return view === 'executive' ? 'IDLE_EXECUTIVE' : 'IDLE_GAMEDEV';
}

/**
 * Returns true when the lever is currently animating and must not be
 * triggered again (prevents double-fires during the 900ms window).
 */
function isRotating(): boolean {
  return currentState === 'ROTATING_TO_GAMEDEV' || currentState === 'ROTATING_TO_EXECUTIVE';
}

/**
 * Core transition logic.
 *
 * 1. Guard: if already rotating, bail out silently.
 * 2. Determine the target view (opposite of current).
 * 3. Mark body.is-rotating to block stray clicks.
 * 4. Update body[data-view] via setActiveView() — this triggers the CSS
 *    3D drum transition (rotateX + opacity) defined in global.css §100–177.
 * 5. After DRUM_DURATION_MS release the lock and settle into an idle state.
 */
function performTransition(): void {
  if (isRotating()) return;

  const from: ViewMode = getActiveView();
  const to: ViewMode = from === 'executive' ? 'gamedev' : 'executive';

  // Enter rotating state and engage the pointer-event lock
  currentState = to === 'gamedev' ? 'ROTATING_TO_GAMEDEV' : 'ROTATING_TO_EXECUTIVE';
  document.body.classList.add('is-rotating');

  // Update ARIA pressed state on the lever button
  const leverEl = document.getElementById('mechanical-lever');
  if (leverEl) leverEl.setAttribute('aria-pressed', String(to === 'gamedev'));

  // setActiveView writes body[data-view], which drives all CSS transitions.
  // We pass scroll=true so the viewport resets to top for the incoming face.
  setActiveView(to);

  // Release the rotation lock after the animation completes.
  // For prefers-reduced-motion users the crossfade is 350ms but using the
  // full 900ms still yields correct behaviour (no race condition).
  const settleDuration = prefersReducedMotion() ? 400 : DRUM_DURATION_MS;

  window.setTimeout(() => {
    document.body.classList.remove('is-rotating');
    currentState = idleStateFor(to);
  }, settleDuration);
}

/**
 * Attaches all interaction event listeners to the lever element:
 *   - click (mouse / touch)
 *   - keydown Enter / Space  (keyboard a11y)
 *   - touch swipe-down / swipe-up (mobile UX)
 *
 * Also subscribes to the 'portfolio:toggle-view' custom event so that any
 * other UI element (e.g. Navbar quick-switch) drives the same state machine.
 */
export function initLever(): void {
  const lever = document.getElementById('mechanical-lever');

  /* ------------------------------------------------------------------ */
  /* Click                                                                */
  /* ------------------------------------------------------------------ */
  lever?.addEventListener('click', () => {
    performTransition();
  });

  /* ------------------------------------------------------------------ */
  /* Keyboard (Enter / Space) — required for role="button" a11y          */
  /* ------------------------------------------------------------------ */
  lever?.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // prevent page scroll on Space
      performTransition();
    }
  });

  /* ------------------------------------------------------------------ */
  /* Touch swipe on the lever (vertical drag → trigger)                  */
  /* A short downward swipe (≥ 30px) on the lever fires a transition.    */
  /* ------------------------------------------------------------------ */
  let touchStartY = 0;

  lever?.addEventListener('touchstart', (e: TouchEvent) => {
    touchStartY = e.touches[0]?.clientY ?? 0;
  }, { passive: true });

  lever?.addEventListener('touchend', (e: TouchEvent) => {
    const dy = (e.changedTouches[0]?.clientY ?? 0) - touchStartY;
    // ≥30px vertical drag (either direction) counts as a lever pull
    if (Math.abs(dy) >= 30) performTransition();
  }, { passive: true });

  /* ------------------------------------------------------------------ */
  /* Custom event bus: other components can trigger the lever             */
  /* ------------------------------------------------------------------ */
  document.addEventListener('portfolio:toggle-view', () => {
    performTransition();
  });

  // Synchronise initial ARIA state with whatever face is shown on load
  if (lever) {
    lever.setAttribute('aria-pressed', String(getActiveView() === 'gamedev'));
  }
}
