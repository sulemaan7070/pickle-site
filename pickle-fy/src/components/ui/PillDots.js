'use client';

/** Dots under the hero carousel. The active dot stretches into a pill. */
export default function PillDots({ count, activeIndex, onSelect, label, className = '' }) {
  return (
    <div role="group" aria-label={label} className={`pointer-events-none flex justify-center gap-2 ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={isActive}
            onClick={() => onSelect(i)}
            className={`pointer-events-auto h-2.5 cursor-pointer rounded-full border-0 p-0 transition-all duration-300 ${
              isActive ? 'w-9 bg-[#273E10]' : 'w-2.5 bg-[#273E10]/30'
            }`}
          />
        );
      })}
    </div>
  );
}
