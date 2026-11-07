import { createContext, useContext } from 'react';
import type { PageId } from './config';

export interface AppCtx {
  page: PageId;
  go: (p: PageId) => void;
  reduced: boolean;
  viewMode: 'mobile' | 'full';
  toggleViewMode: () => void;
}

export const AppContext = createContext<AppCtx>({
  page: 'home',
  go: () => {},
  reduced: false,
  viewMode: 'mobile',
  toggleViewMode: () => {},
});
export const useApp = () => useContext(AppContext);

/** Fire a celebratory firework burst at viewport coordinates (or random if omitted). */
export function celebrate(x?: number, y?: number, count = 1) {
  window.dispatchEvent(new CustomEvent('fw-burst', { detail: { x, y, count } }));
}
