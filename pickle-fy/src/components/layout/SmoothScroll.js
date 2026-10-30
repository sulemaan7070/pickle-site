'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Smooth (eased) mouse-wheel scrolling with Lenis. Renders nothing.
 *
 *  - links like href="#star" glide to their section instead of jumping
 *  - scrolling pauses while a Material UI drawer or dialog is open
 *    (Material UI sets overflow:hidden on <body> then)
 *  - skipped for visitors who prefer reduced motion
 *
 * To let an element scroll normally inside the page (e.g. a long list in a
 * drawer) give it the attribute  data-lenis-prevent.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    // Lenis needs to be told the time on every animation frame.
    let frameId = requestAnimationFrame(function onFrame(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(onFrame);
    });

    // Smooth-scroll to in-page links (#star, #why, ...).
    const onClick = (event) => {
      const link = event.target.closest && event.target.closest('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute('href');
      const target = hash === '#' ? 0 : document.getElementById(hash.slice(1));
      if (target === null) return; // not a section on this page – let the browser handle it

      event.preventDefault();
      const header = document.querySelector('header');
      lenis.scrollTo(target, { offset: -(header ? header.offsetHeight : 0), force: true });
      if (hash !== '#') window.history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onClick);

    // Pause Lenis while a modal/drawer has locked the page.
    const syncWithBodyLock = () => {
      if (document.body.style.overflow === 'hidden') lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncWithBodyLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => {
      document.removeEventListener('click', onClick);
      observer.disconnect();
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
