'use client';

import { Avatar, Typography } from '@mui/material';
import { FREE_SHIPPING_ABOVE } from '@/data/site';

const PROMISES = [
  {
    title: 'Outstanding Quality',
    icon: '/icons/quality.png',
    text: 'We pride ourselves on offering the best quality in class. No compromises!',
  },
  {
    title: 'Free Shipping',
    icon: '/icons/shipping.png',
    text: (
      <>
        Have a treat with free shipping on all orders above <strong>₹{FREE_SHIPPING_ABOVE}</strong>.
      </>
    ),
  },
  {
    title: 'Secure Payments',
    icon: '/icons/secure-payments.png',
    text: '100% secure and protected payments. Buy with confidence.',
  },
];

/** Three icons with a short promise each, just above the footer. */
export default function TrustStrip() {
  return (
    <section id="promise" className="bg-[#fffdf0] px-[6vw] py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
        {PROMISES.map((promise) => (
          <div key={promise.title} className="flex flex-col items-center text-center">
            <Avatar
              variant="square"
              src={promise.icon}
              alt=""
              imgProps={{ draggable: false }}
              sx={{ width: { xs: 80, sm: 92 }, height: { xs: 80, sm: 92 }, bgcolor: 'transparent', mb: 2 }}
            />
            <Typography component="h3" sx={{ fontSize: { xs: 22, sm: 24 }, fontWeight: 400, color: '#1d1d1b', mb: 1 }}>
              {promise.title}
            </Typography>
            <Typography sx={{ fontSize: { xs: 15, sm: 17 }, color: '#333', maxWidth: 360, lineHeight: 1.6 }}>
              {promise.text}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
}
