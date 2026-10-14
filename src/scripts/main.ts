import { initI18n } from './i18n';
import { initProjects } from './projectsController';
import { initDefaultViewToggle, initUi } from './ui';
import { setActiveView } from './viewState';

/** Single client entry point for the portfolio page. */
// Initial sync only: marks the hidden face inert without scrolling the page.
setActiveView('executive', false);
initI18n();
initUi();
initProjects();
initDefaultViewToggle();
