'use client';

import { useRef } from 'react';
import useAutoplay from '@/hooks/useAutoplay';
import useDragSlider from '@/hooks/useDragSlider';
import { HERO_SLIDES } from '@/data/heroSlides';
import CircleArrowButton from '@/components/ui/CircleArrowButton';
import PillDots from '@/components/ui/PillDots';
import ImageSlide from './ImageSlide';
import TextSlide from './TextSlide';

const SLIDE_TYPES = { image: ImageSlide, text: TextSlide };

/**
 * The big carousel under the top bar.
 * Drag/swipe, arrows, dots, keyboard arrows and autoplay (pauses on hover).
 */
export default function HeroCarousel() {
  const isHovered = useRef(false);
  const { viewRef, trackRef, index, goTo, next, prev, isDragging, viewProps } = useDragSlider({
    count: HERO_SLIDES.length,
    loop: true,
  });

  useAutoplay(next, { resetKey: index, paused: () => isHovered.current || isDragging() });

  const pause = () => {
    isHovered.current = true;
  };
  const resume = () => {
    isHovered.current = false;
  };

  return (
    <section
      className="relative mx-auto mb-8 mt-1 sm:mb-12"
      style={{ width: 'min(1180px, calc(100% - 12vw))' }}
      aria-roledescription="carousel"
      aria-label="Pickle-Fy highlights"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div
        ref={viewRef}
        className="cursor-grab touch-pan-y select-none overflow-hidden rounded-[28px] active:cursor-grabbing"
        style={{ boxShadow: '0 10px 30px rgba(39,62,16,.14)' }}
        {...viewProps}
      >
        <div ref={trackRef} className="flex will-change-transform">
          {HERO_SLIDES.map((slide, i) => {
            const Slide = SLIDE_TYPES[slide.type];
            return <Slide key={slide.id} slide={slide} position={i + 1} total={HERO_SLIDES.length} active={i === index} />;
          })}
        </div>
      </div>

      {/* Arrows: bottom corners on phones, top right from "sm" up */}
      <div className="absolute bottom-1.5 left-2.5 z-[2] sm:bottom-auto sm:left-auto sm:right-[78px] sm:top-5">
        <CircleArrowButton direction="prev" label="Previous slide" onClick={prev} size={{ xs: 36, sm: 48 }} />
      </div>
      <div className="absolute bottom-1.5 right-2.5 z-[2] sm:bottom-auto sm:right-6 sm:top-5">
        <CircleArrowButton direction="next" label="Next slide" onClick={next} size={{ xs: 36, sm: 48 }} />
      </div>

      <PillDots
        count={HERO_SLIDES.length}
        activeIndex={index}
        onSelect={goTo}
        label="Choose a slide"
        className="absolute inset-x-0 bottom-5 z-[1] sm:bottom-4"
      />
    </section>
  );
}
