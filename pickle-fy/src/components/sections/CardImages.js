'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './cardCarousel.css';

const AUTOPLAY_DELAY_MS = 3000;
const IMAGE_SIZES = '(max-width: 640px) 78vw, 420px';

/**
 * The picture area of one pack-size card, as a Swiper carousel:
 * slide 1 = the product photo, slide 2 = the "pairs with everything" picture.
 *
 * Autoplay is OFF to begin with. It only starts for THIS card once the visitor
 * touches its pictures, uses its arrows/dots/keyboard, or scrolls it sideways.
 */
export default function CardImages({ product, size }) {
  const swiperRef = useRef(null);
  const autoplayStarted = useRef(false);

  const startAutoplay = () => {
    if (autoplayStarted.current || !swiperRef.current) return;
    autoplayStarted.current = true;
    swiperRef.current.autoplay.start();
  };

  // Only a sideways scroll counts (a normal up/down scroll just moves the page).
  const handleWheel = (event) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) startAutoplay();
  };

  return (
    // data-no-drag: dragging here swipes the pictures, not the row of cards around it.
    <div
      data-no-drag
      className="overflow-hidden rounded-[20px] border-4 border-solid border-[#E79114]"
      onPointerDown={startAutoplay}
      onKeyDown={startAutoplay}
      onWheel={handleWheel}
    >
      <Swiper
        className="card-swiper"
        modules={[Navigation, Pagination, Autoplay, Mousewheel, Keyboard]}
        rewind // after the last picture, go back to the first
        grabCursor
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
        autoplay={{ delay: AUTOPLAY_DELAY_MS, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onAfterInit={(swiper) => swiper.autoplay.stop()} // autoplay waits for the first interaction
      >
        <SwiperSlide>
          <div className="relative aspect-square w-full">
            <Image
              src={product.image}
              alt={`${product.name}, ${size}`}
              fill
              sizes={IMAGE_SIZES}
              draggable={false}
              className="pointer-events-none select-none object-cover"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative aspect-square w-full bg-[#eaf3e0]">
            <Image
              src={product.slideImage}
              alt={`${product.name} pairs with everything: rice, parathas, dosa and curd rice`}
              fill
              sizes={IMAGE_SIZES}
              draggable={false}
              className="pointer-events-none select-none object-contain"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
