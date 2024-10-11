'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'; // Import the autoplay styles

// Import required modules
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Import the Autoplay module
import ButtonCarousel from './ButtonCarousel';

interface CarouselItem {
  title: string;
  subtitle: string;
  city: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export default function CityCarousel({ items }: CarouselProps) {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        className="w-full h-full"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <ButtonCarousel
          direction="prev"
          src="/arrow-left.svg"
          className="absolute top-[20%] left-0 lg:left-6 w-16 h-16 z-30 flex text-3xl items-center justify-center rounded-full transition-colors hover:bg-black/10 cursor-pointer"
        />
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-center h-auto text-center">
              <h2 className="text-2xl font-bold text-darkPurple mb-5">
                {item.title}
              </h2>
              <div className="flex gap-1">
                <Image
                  alt="Pin de mapa"
                  height={14}
                  width={17}
                  src={'/pin-carousel-icon.svg'}
                />
                <h3 className="text-sm max-w-[250px] font-normal sm:max-w-[350px] md:max-w-none lg:text-xl mt-2 text-lightGray">
                  {item.subtitle}
                </h3>
              </div>
              <p className="text-lg mt-1 text-lightGray font-semibold">
                {item.city}
              </p>
            </div>
          </SwiperSlide>
        ))}
        <ButtonCarousel
          direction="next"
          src="/arrow-right-carousel.svg"
          className="absolute top-[20%] right-0 lg:right-6 w-16 h-16 z-30 text-3xl flex items-center justify-center rounded-full transition-colors hover:bg-black/10 cursor-pointer"
        />
      </Swiper>
    </>
  );
}
