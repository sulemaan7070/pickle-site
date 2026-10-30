'use client';

import { Typography } from '@mui/material';
import useDragSlider from '@/hooks/useDragSlider';
import { PACK_SIZES } from '@/data/products';
import CircleArrowButton from '@/components/ui/CircleArrowButton';
import DynamicDots from '@/components/ui/DynamicDots';
import SizeCard from './SizeCard';

/**
 * One product with its three pack sizes in a draggable row.
 * The arrows and dots only appear when the cards do not all fit on screen.
 * (Each card has its own image carousel – see CardImages.js.)
 */
export default function ProductRow({ product }) {
  const { viewRef, trackRef, index, canScroll, goTo, next, prev, viewProps } = useDragSlider({
    count: PACK_SIZES.length,
  });

  return (
    <div className="mb-10 sm:mb-14">
      <div className="mb-3 flex items-center justify-between">
        <Typography component="h3" sx={{ fontWeight: 700, fontSize: { xs: 20, sm: 26 } }}>
          {product.shortName}
        </Typography>

        {canScroll && (
          <div className="hidden gap-2 sm:flex">
            <CircleArrowButton direction="prev" label={`Previous ${product.shortName} size`} onClick={prev} />
            <CircleArrowButton direction="next" label={`Next ${product.shortName} size`} onClick={next} />
          </div>
        )}
      </div>

      {/* The negative margin lets the row run edge to edge, so the next card peeks in. */}
      <div
        ref={viewRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${product.name} pack sizes`}
        tabIndex={0}
        className="-mx-[6vw] cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
        {...viewProps}
      >
        <div ref={trackRef} className="relative flex gap-4 px-[6vw] pb-4 will-change-transform sm:gap-6">
          {PACK_SIZES.map((size) => (
            <SizeCard key={size} product={product} size={size} />
          ))}
        </div>
      </div>

      {canScroll && (
        <DynamicDots labels={PACK_SIZES} activeIndex={index} onSelect={goTo} groupLabel={`${product.shortName} pagination`} />
      )}
    </div>
  );
}
