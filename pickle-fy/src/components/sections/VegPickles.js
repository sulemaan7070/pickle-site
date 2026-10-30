'use client';

import Image from 'next/image';
import { Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { PRODUCT_TAGLINE } from '@/data/site';
import { VEG_PICKLES } from '@/data/vegPickles';

/**
 * "Veg Pickles – coming soon". Deliberately black & white: the photos are
 * grey-scaled and there is no Add to cart button yet.
 */
export default function VegPickles() {
  return (
    <section id="veg" className="scroll-mt-16 bg-[#f4f4f4] px-[6vw] py-12 sm:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: 30, sm: 44 }, color: '#111' }}>
            Veg Pickles
          </Typography>
          <Chip label="Coming soon" sx={{ bgcolor: '#111', color: '#fff', fontWeight: 700 }} />
        </div>
        <Typography sx={{ color: '#555', fontSize: { xs: 15, sm: 18 }, mb: { xs: 3, sm: 5 } }}>
          Our vegetarian pickles are on their way. Stay tuned!
        </Typography>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {VEG_PICKLES.map((pickle) => (
            <Card key={pickle.id} elevation={0} sx={{ borderRadius: '24px', bgcolor: '#fff', p: 1.5, border: '1px solid #d9d9d9' }}>
              <div className="relative aspect-square overflow-hidden rounded-[20px] border-4 border-solid border-[#9e9e9e]">
                <Image
                  src={pickle.image}
                  alt={`${pickle.name} (coming soon)`}
                  fill
                  sizes="(max-width: 640px) 90vw, 560px"
                  className="object-cover grayscale"
                  style={{ objectPosition: pickle.imagePosition }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                  <span className="rounded-full bg-black px-5 py-2 text-sm font-bold uppercase tracking-widest text-white">
                    Coming soon
                  </span>
                </div>
              </div>

              <CardContent sx={{ textAlign: 'center', px: 1, pt: 2, pb: '8px !important' }}>
                <Typography component="h3" sx={{ fontWeight: 500, fontSize: 22, color: '#111' }}>
                  {pickle.name}
                </Typography>
                <Typography sx={{ color: '#666', fontSize: 14, mt: 0.5, mb: 2 }}>{PRODUCT_TAGLINE}</Typography>
                <Button fullWidth disabled variant="contained" disableElevation sx={{ borderRadius: 99, py: 1 }}>
                  Coming soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
