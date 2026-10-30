'use client';

import { useEffect, useRef } from 'react';
import { isLoaderFinished } from '@/lib/loaderState';

const TICK_MS = 250;

/**
 * Calls `callback` every `delay` ms (e.g. to show the next slide).
 *
 *  - waits until the loading animation has finished
 *  - pauses while `paused()` returns true or the browser tab is hidden
 *  - restarts its countdown whenever `resetKey` changes (e.g. the user changed slide)
 *  - does nothing if the visitor prefers reduced motion
 */
export default function useAutoplay(callback, { delay = 5000, paused = () => false, resetKey } = {}) {
  const latest = useRef({ callback, paused });
  const waited = useRef(0);

  useEffect(() => {
    latest.current = { callback, paused };
  });

  useEffect(() => {
    waited.current = 0;
  }, [resetKey]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const timer = setInterval(() => {
      if (!isLoaderFinished()) {
        waited.current = 0;
        return;
      }
      if (document.hidden || latest.current.paused()) return;

      waited.current += TICK_MS;
      if (waited.current >= delay) {
        waited.current = 0;
        latest.current.callback();
      }
    }, TICK_MS);

    return () => clearInterval(timer);
  }, [delay]);
}
