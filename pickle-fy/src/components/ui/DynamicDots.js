'use client';

/**
 * Pagination dots for the product rows.
 * The active dot is filled, the next one is an outline and dots further away
 * shrink – the same look as Swiper's "dynamic bullets".
 */
function dotSize(distance) {
  if (distance < 2) return 12;
  if (distance === 2) return 9;
  return 6;
}

export default function DynamicDots({ labels, activeIndex, onSelect, groupLabel }) {
  return (
    <div role="group" aria-label={groupLabel} className="mt-1 flex items-center justify-center">
      {labels.map((label, i) => {
        const distance = Math.abs(i - activeIndex);
        const size = dotSize(distance);

        return (
          <button
            key={label}
            type="button"
            aria-label={`Show ${label}`}
            aria-current={distance === 0}
            onClick={() => onSelect(i)}
            className="flex h-6 w-6 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: size,
                height: size,
                border: '1.5px solid #1d1d1b',
                background: distance === 0 ? '#1d1d1b' : 'transparent',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
