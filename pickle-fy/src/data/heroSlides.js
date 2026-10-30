/**
 * Slides for the big carousel at the top of the page.
 *
 *  - "image" slides show a ready-made banner (shown in a 2:1 frame; `blurFill` fills any side
 *    gaps with a blurred copy of the picture).
 *  - "text" slides show a headline with a round photo.
 */
export const HERO_SLIDES = [
  {
    id: 'chicken-offer',
    type: 'image',
    src: '/images/banner-chicken-offer.jpg',
    alt: 'Pickle-Fy Chicken Pickle special offer, starting at 199 rupees',
    background: '#f9d491', // shows if the screen is taller than the banner
    shopNowHotspot: true, // makes the "Shop Now" button in the banner clickable
  },
  {
    id: 'spice-meter',
    type: 'image',
    src: '/images/banner-spice-meter.jpg',
    alt: 'Pickle-Fy Chicken Pickle spice meter: Hot, spice level 4 out of 5',
    background: '#f2e5c4',
    blurFill: true, // this picture is 3:2, so it does not fill the 2:1 frame by itself
  },
  {
    id: 'mango-banner',
    type: 'image',
    src: '/images/banner-mango.jpg',
    alt: 'Pickle-Fy: Real Flavours. Local Roots. A jar of homemade mango pickle beside raw mangoes',
    background: '#f8e9c3',
  },
  {
    id: 'raw-mango',
    type: 'text',
    title: 'Raw mango, bold masala',
    subtitle: 'Mango Pickle · Homemade with love',
    image: '/images/badge-mango.jpg',
    imageAlt: 'Fresh green mangoes and a bowl of mango pickle',
    background: 'linear-gradient(135deg,#fff4d6,#fbe3a6)',
  },
  {
    id: 'red-chilli',
    type: 'text',
    title: 'Fiery red chilli, no shortcuts',
    subtitle: 'Red Chilli Pickle · 100% natural',
    image: '/images/badge-chilli.jpg',
    imageAlt: 'A clay bowl of spicy homemade pickle',
    background: 'linear-gradient(135deg,#fff0e6,#fcd2c0)',
  },
  {
    id: 'nothing-added',
    type: 'text',
    title: 'Nothing added, nothing hidden',
    subtitle: 'No preservatives · Real flavours, local roots',
    image: '/images/badge-jar.jpg',
    imageAlt: 'A jar of Pickle-Fy pickle',
    background: 'linear-gradient(135deg,#f3f7e4,#d8e8b4)',
  },
];
