# Pickle-Fy – Next.js store

Next.js (App Router) + Material UI + Tailwind CSS.
Customers browse the star items, add packs to a cart and send the order to WhatsApp.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Where to change things

| I want to change…                               | Edit this file                          |
| ----------------------------------------------- | --------------------------------------- |
| Prices, product names, photos, the +₹100 strike | `src/data/products.js`                  |
| WhatsApp number, Instagram link, free shipping  | `src/data/site.js`                      |
| Hero carousel slides                            | `src/data/heroSlides.js`                |
| Veg pickles (coming soon section)               | `src/data/vegPickles.js`                |
| Special-offer pop-up picture and delay          | `src/data/promo.js`                     |
| Brand colours and font                          | `src/theme/theme.js`                    |
| Pictures and icons                              | `public/images`, `public/icons`         |

## Project map

```
src/
  app/
    layout.js            page shell: font, theme, cart provider, loader
    page.js              the home page – every section in order
    globals.css          Tailwind
  components/
    loader/              seed-burst loading animation
      PickleLoader.js        server component: overlay markup
      LoaderAnimation.js     client component: starts the animation
      startLoaderAnimation.js  the animation itself (commented)
      loader-scene.svg / loader.css
    layout/              Header, MobileMenu (hamburger), Logo, Footer,
                         SmoothScroll (Lenis)
    hero/                HeroCarousel, ImageSlide, TextSlide
    sections/            WhyPickleFy, StarItems, ProductRow, SizeCard,
                         CardImages (Swiper), TagChips, VegPickles, TrustStrip
    cart/                CartProvider (state), CartButton, CartDrawer,
                         CartLine, AddedToast
    promo/               PromoModal (offer pop-up, opens 5 s after the loader)
    ui/                  CircleArrowButton, PillDots, DynamicDots, icons
  hooks/
    useDragSlider.js     mouse/touch drag + snap (used by the hero carousel)
    useAutoplay.js       timed slide changes
  data/                  all content: products, slides, site settings
  lib/                   cart maths, WhatsApp link, loader flag
  theme/                 Material UI theme + Next.js registry
```

## Notes

- Tailwind's reset (preflight) is off because Material UI's `CssBaseline` already resets styles.
  Tailwind classes are used for layout on plain elements; Material UI components are styled with `sx`.
- Each pack-size card has its own Swiper picture carousel (`CardImages.js`: product photo + "pairs with
  everything" picture). Autoplay is off until the visitor touches it, uses its arrows/dots/keyboard, or
  scrolls it sideways; then only that card auto-advances.
- Smooth scrolling is Lenis (`SmoothScroll.js`). It pauses while a drawer/dialog is open; give any
  element that must scroll on its own the attribute `data-lenis-prevent`.
- `src/app/icon.png` is the browser-tab icon (Next.js picks it up automatically).
- The cart is saved in the browser (`localStorage`) so it survives a refresh.
- Orders open `https://wa.me/<number>?text=...` with the cart contents already typed.
