'use client';

import { useEffect, useRef } from 'react';
import startLoaderAnimation from './startLoaderAnimation';

/**
 * Starts the loading animation once the overlay markup is on the page.
 * It renders nothing itself.
 */
export default function LoaderAnimation() {
  const started = useRef(false);

  useEffect(() => {
    // React Strict Mode runs effects twice in development. The animation
    // rearranges the SVG, so it must only be started once.
    if (started.current) return;
    started.current = true;
    startLoaderAnimation();
  }, []);

  return null;
}
