/**
 * Tiny shared flag that tells the rest of the page whether the loading
 * animation is still on screen. It lives on <html data-loader="...">.
 *
 *   "running" – the loader overlay is visible
 *   "done"    – the overlay has faded away
 */
const ATTRIBUTE = 'data-loader';

export function setLoaderState(state) {
  document.documentElement.setAttribute(ATTRIBUTE, state);
}

export function isLoaderFinished() {
  return document.documentElement.getAttribute(ATTRIBUTE) !== 'running';
}
