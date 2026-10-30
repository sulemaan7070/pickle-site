'use client';

import { Avatar, Typography } from '@mui/material';

const REASONS = [
  { label: 'No Preservatives', icon: '/icons/no-preservatives.svg' },
  { label: 'Traditional Recipes', icon: '/icons/traditional-recipes.svg' },
  { label: 'No Palm Oil', icon: '/icons/no-palm-oil.svg' },
];

/** Orange band with three round icons. */
export default function WhyPickleFy() {
  return (
    <section id="why" className="scroll-mt-16 bg-[#E79114] px-[6vw] py-12 sm:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <Typography component="h2" sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: 26, sm: 36 }, mb: 1 }}>
          Why Pickle-Fy?
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,.95)', mb: { xs: 4, sm: 6 }, fontSize: { xs: 14, sm: 18 } }}>
          Small-batch pickles, made the way they have always been made.
        </Typography>

        <div className="grid grid-cols-3 gap-3 sm:gap-10">
          {REASONS.map((reason) => (
            <div key={reason.label} className="flex flex-col items-center">
              <Avatar
                src={reason.icon}
                alt=""
                imgProps={{ draggable: false }}
                sx={{ width: { xs: 84, sm: 150, md: 180 }, height: { xs: 84, sm: 150, md: 180 }, bgcolor: 'transparent', mb: 2 }}
              />
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: 13, sm: 18, md: 20 }, lineHeight: 1.25 }}>
                {reason.label}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
