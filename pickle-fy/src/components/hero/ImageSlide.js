'use client';

import Image from 'next/image';
import { Button } from '@mui/material';

/** A carousel slide that is just a banner picture. */
export default function ImageSlide({ slide, position, total, active }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${position} of ${total}`}
      aria-hidden={!active}
      className="flex min-w-0 shrink-0 grow-0 basis-full items-center"
      style={{ background: slide.background }}
    >
      {/* Every banner sits in the same 2:1 frame so the carousel keeps one height. */}
      <div className="relative aspect-[2/1] w-full overflow-hidden">
        {slide.blurFill && (
          <Image
            src={slide.src}
            alt=""
            fill
            aria-hidden="true"
            sizes="(min-width: 1280px) 1180px, 88vw"
            className="pointer-events-none scale-110 object-cover opacity-80 blur-2xl"
          />
        )}
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          priority={position === 1} // the first banner is the biggest thing on screen
          draggable={false}
          sizes="(min-width: 1280px) 1180px, 88vw"
          className="pointer-events-none select-none object-contain"
        />

        {/* Invisible button laid over the "Shop Now" button that is drawn inside the banner. */}
        {slide.shopNowHotspot && (
          <Button
            href="#star"
            aria-label="Shop now"
            tabIndex={active ? 0 : -1}
            sx={{
              position: 'absolute',
              left: '11.4%',
              top: '65%',
              width: '17.7%',
              height: '9%',
              minWidth: 0,
              borderRadius: 99,
              opacity: 0,
              '&:focus-visible': { opacity: 1, outline: '3px solid #F0AE0A' },
            }}
          />
        )}
      </div>
    </div>
  );
}
