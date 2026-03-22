/**
 * Minimal SPA router utilities.
 * Uses history.pushState and a custom event for in-app navigation.
 */
export const ROUTE_CHANGE_EVENT = "planday:routechange";

export function navigate(path: string): void {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT));
}

export function getPath(): string {
  return window.location.pathname;
}
