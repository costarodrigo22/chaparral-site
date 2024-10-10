'use client';

import Image from 'next/image';
import { ComponentProps } from 'react';
import { useSwiper } from 'swiper/react';

interface ButtonCarouselProps extends ComponentProps<'div'> {
  src: string;
  direction: 'prev' | 'next';
}

export default function ButtonCarousel({
  src,
  direction,
  ...props
}: ButtonCarouselProps) {
  const swiper = useSwiper();

  return (
    <div
      {...props}
      onClick={() =>
        direction === 'next' ? swiper.slideNext() : swiper.slidePrev()
      }
    >
      <Image alt="Seta para passar e voltar" height={14} width={7} src={src} />
    </div>
  );
}
