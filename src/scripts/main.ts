import { initI18n } from './i18n';
import { initProjects } from './projectsController';
import { initUi } from './ui';
import { initLever } from './lever';
import { setActiveView } from './viewState';

/** Single client entry point for the portfolio page. */
// Initial sync only: marks the hidden face inert without scrolling the page.
setActiveView('executive', false);
initI18n();
initUi();
initProjects();
// Phase 4: replace the simple toggle with the full lever state machine.
initLever();
