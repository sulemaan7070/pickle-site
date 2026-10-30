'use client';

import { Avatar, Typography } from '@mui/material';

/** A carousel slide with a headline on one side and a round photo on the other. */
export default function TextSlide({ slide, position, total, active }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${position} of ${total}`}
      aria-hidden={!active}
      className="flex min-w-0 shrink-0 grow-0 basis-full flex-row-reverse items-center justify-end gap-4 px-5 pb-14 pt-5 sm:flex-row sm:justify-between sm:gap-6 sm:px-12 sm:py-12 sm:pb-16 md:px-[72px] md:py-16"
      style={{ background: slide.background }}
    >
      <div className="min-w-0 flex-1">
        <Typography
          component="h2"
          sx={{ fontWeight: 800, lineHeight: 1.08, color: 'primary.main', mb: { xs: 0.75, sm: 1.5 }, fontSize: { xs: 20, sm: 34, md: 52 } }}
        >
          {slide.title}
        </Typography>
        <Typography sx={{ color: '#6a7a4f', fontSize: { xs: 13, sm: 18, md: 22 } }}>{slide.subtitle}</Typography>
      </div>

      {/* Round photo inside a green-to-gold ring */}
      <div className="aspect-square w-[104px] shrink-0 rounded-full bg-gradient-to-br from-[#273E10] via-[#5FA52A] to-[#F0AE0A] p-[3.5%] sm:w-[210px] md:w-[310px]">
        <Avatar
          src={slide.image}
          alt={slide.imageAlt}
          imgProps={{ draggable: false }}
          sx={{ width: '100%', height: '100%', boxSizing: 'border-box', border: { xs: '3px solid #fff', md: '8px solid #fff' } }}
        />
      </div>
    </div>
  );
}
