'use client';

import { Typography } from '@mui/material';
import { STAR_PRODUCTS } from '@/data/products';
import ProductRow from './ProductRow';

/** "Our Star Items": one draggable row of pack-size cards per product. */
export default function StarItems() {
  return (
    <section id="star" className="mx-auto max-w-[1400px] scroll-mt-16 px-[6vw] pb-4 pt-12 sm:pt-16">
      <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: 30, sm: 44 }, mb: 1 }}>
        Our Star Items
      </Typography>
      <Typography sx={{ fontSize: { xs: 15, sm: 18 }, mb: { xs: 3, sm: 5 } }}>
        Drag or swipe through the pack sizes and add your favourite to the cart.
      </Typography>

      {STAR_PRODUCTS.map((product) => (
        <ProductRow key={product.id} product={product} />
      ))}
    </section>
  );
}
