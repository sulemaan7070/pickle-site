'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/*
 * A small slider that works with mouse and touch, has no scrollbar and snaps
 * to the cards. It is used by the hero carousel and by every product row.
 *
 * Usage:
 *   const { viewRef, trackRef, index, goTo, next, prev, canScroll, viewProps } =
 *     useDragSlider({ count: 3 });
 *
 *   <div ref={viewRef} className="overflow-hidden" {...viewProps}>   // the visible window
 *     <div ref={trackRef} className="flex">                          // the row that moves
 *       ...one child per card...
 *     </div>
 *   </div>
 */

const DRAG_THRESHOLD_PX = 6; // a press only counts as a drag after moving this far
const EDGE_RESISTANCE = 0.35; // how stretchy the first/last card feels
const FLICK_MIN_DISTANCE_PX = 40; // a quick short swipe still changes card...
const FLICK_MAX_TIME_MS = 300; // ...if it is this fast
const SLIDE_TRANSITION = 'transform .45s cubic-bezier(.22,.8,.26,1)';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/** Index of the snap position closest to `offset`. */
function nearestIndex(snaps, offset) {
  let best = 0;
  snaps.forEach((snap, i) => {
    if (Math.abs(snap - offset) < Math.abs(snaps[best] - offset)) best = i;
  });
  return best;
}

export default function useDragSlider({ count, loop = false }) {
  const viewRef = useRef(null);
  const trackRef = useRef(null);

  const [index, setIndex] = useState(0); // which card the row is currently on
  const [canScroll, setCanScroll] = useState(false); // false when every card already fits

  // Mutable values that must not trigger a re-render while dragging.
  const position = useRef({ index: 0, offset: 0 }).current;
  const drag = useRef({ active: false, moved: false, pointerId: null, startX: 0, deltaX: 0, startOffset: 0, startTime: 0 }).current;

  /** Where each card should sit (in px) and how far the row can travel at most. */
  const measure = useCallback(() => {
    const cards = trackRef.current.children;
    const first = cards[0];
    const last = cards[cards.length - 1];
    const sidePadding = first.offsetLeft;
    const maxOffset = Math.max(0, last.offsetLeft + last.offsetWidth + sidePadding - viewRef.current.clientWidth);
    const snaps = Array.from(cards, (card) => Math.min(card.offsetLeft - sidePadding, maxOffset));
    return { snaps, maxOffset };
  }, []);

  /** Move the row to `offset` px, with or without animation. */
  const moveTo = useCallback(
    (offset, animate) => {
      position.offset = offset;
      trackRef.current.style.transition = animate ? SLIDE_TRANSITION : 'none';
      trackRef.current.style.transform = `translate3d(${-offset}px,0,0)`;
    },
    [position]
  );

  /** Slide to card number `target` (wraps around when `loop` is on). */
  const goTo = useCallback(
    (target) => {
      const cardIndex = loop ? (target + count) % count : clamp(target, 0, count - 1);
      position.index = cardIndex;
      setIndex(cardIndex);
      moveTo(measure().snaps[cardIndex], true);
    },
    [count, loop, measure, moveTo, position]
  );

  const next = useCallback(() => goTo(position.index + 1), [goTo, position]);
  const prev = useCallback(() => goTo(position.index - 1), [goTo, position]);

  // Re-measure on mount and whenever the window size changes.
  useEffect(() => {
    function handleResize() {
      const { snaps, maxOffset } = measure();
      setCanScroll(maxOffset > 4);
      moveTo(snaps[position.index], false);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [measure, moveTo, position]);

  /* ---- pointer handlers (mouse + touch + pen) ---- */

  const onPointerDown = (event) => {
    if ((event.button || 0) > 0) return; // left button / touch only
    if (event.target.closest('[data-no-drag]')) return; // e.g. a card's own picture carousel
    Object.assign(drag, {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      deltaX: 0,
      startOffset: position.offset,
      startTime: Date.now(),
    });
    trackRef.current.style.transition = 'none';
  };

  const onPointerMove = (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    drag.deltaX = event.clientX - drag.startX;

    if (Math.abs(drag.deltaX) > DRAG_THRESHOLD_PX) {
      drag.moved = true;
      if (!viewRef.current.hasPointerCapture(event.pointerId)) {
        viewRef.current.setPointerCapture(event.pointerId); // keep receiving events outside the box
      }
    }

    // Follow the finger, with a soft "rubber band" past the first/last card.
    const { maxOffset } = measure();
    let offset = drag.startOffset - drag.deltaX;
    if (offset < 0) offset *= EDGE_RESISTANCE;
    else if (offset > maxOffset) offset = maxOffset + (offset - maxOffset) * EDGE_RESISTANCE;
    moveTo(offset, false);
  };

  const finishDrag = (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    drag.active = false;

    // Snap to the nearest card, or step one card on a quick flick.
    const { snaps, maxOffset } = measure();
    const releasedAt = clamp(drag.startOffset - drag.deltaX, 0, maxOffset);
    let target = nearestIndex(snaps, releasedAt);
    const isFlick = Math.abs(drag.deltaX) > FLICK_MIN_DISTANCE_PX && Date.now() - drag.startTime < FLICK_MAX_TIME_MS;
    if (isFlick && target === position.index) target = position.index + (drag.deltaX < 0 ? 1 : -1);
    goTo(target);
  };

  // After a drag, swallow the click so a card button is not pressed by accident.
  const onClickCapture = (event) => {
    if (drag.moved) {
      event.stopPropagation();
      event.preventDefault();
      drag.moved = false;
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') prev();
    else if (event.key === 'ArrowRight') next();
  };

  return {
    viewRef,
    trackRef,
    index,
    canScroll,
    goTo,
    next,
    prev,
    isDragging: () => drag.active,
    /** Spread these onto the "view" element. */
    viewProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishDrag,
      onPointerCancel: finishDrag,
      onClickCapture,
      onKeyDown,
      onDragStart: (event) => event.preventDefault(), // stop the browser dragging images
    },
  };
}
