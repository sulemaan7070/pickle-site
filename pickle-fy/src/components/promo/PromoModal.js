'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Dialog, IconButton } from '@mui/material';
import { PROMO } from '@/data/promo';
import { isLoaderFinished } from '@/lib/loaderState';

const TICK_MS = 250;

// The poster has its own "X" and "Shop Now" button drawn in the picture.
// We lay real, invisible buttons over them (positions are % of the poster).
const CLOSE_SPOT = { left: '88.7%', top: '1.67%', width: '8.5%' };
const SHOP_NOW_SPOT = { left: '28.2%', top: '89.1%', width: '43.6%', height: '6.9%' };

const focusRing = { '&:focus-visible': { outline: '3px solid #F0AE0A' } };

/**
 * Special-offer pop-up.
 *  - opens PROMO.delayMs after the loading animation has finished
 *  - closes when the dark overlay, the X in the corner, or "Shop Now" is clicked
 *    (Esc works too)
 */
export default function PromoModal() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    let waited = 0;
    const timer = setInterval(() => {
      if (!isLoaderFinished()) {
        waited = 0; // don't start counting until the loader has faded away
        return;
      }
      waited += TICK_MS;
      if (waited >= PROMO.delayMs) {
        clearInterval(timer);
        setOpen(true);
      }
    }, TICK_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={close} // called for overlay clicks and the Esc key
      keepMounted // loads the picture in the background so it appears instantly
      maxWidth={false}
      aria-label="Special offer"
      BackdropProps={{ sx: { bgcolor: 'rgba(0,0,0,.7)' } }}
      PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none', m: 2, overflow: 'hidden', borderRadius: '24px' } }}
    >
      {/* Sized so the whole poster always fits the screen */}
      <div
        className="relative"
        style={{
          width: `min(92vw, 520px, calc(86vh * ${PROMO.width} / ${PROMO.height}))`,
          aspectRatio: `${PROMO.width} / ${PROMO.height}`,
        }}
      >
        <Image
          src={PROMO.image}
          alt={PROMO.alt}
          fill
          loading="eager"
          sizes="(max-width: 600px) 92vw, 520px"
          draggable={false}
          className="select-none object-cover"
        />

        <IconButton
          aria-label="Close offer"
          onClick={close}
          sx={{ position: 'absolute', ...CLOSE_SPOT, aspectRatio: '1', p: 0, borderRadius: '50%', ...focusRing }}
        />

        <Button
          href="#star"
          aria-label="Shop now"
          onClick={close}
          sx={{ position: 'absolute', ...SHOP_NOW_SPOT, minWidth: 0, borderRadius: 99, ...focusRing }}
        />
      </div>
    </Dialog>
  );
}
