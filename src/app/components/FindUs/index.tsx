import Image from 'next/image';
import React from 'react';
import CityCarousel from './components/CityCarousel';

export default function FindUs() {
  const carouselItems = [
    {
      title: 'Casa do morango 1',
      subtitle:
        'Rua Aquiles Lisboa, entre Paraíba e Rio Grande do Norte, n° 756 - Mercadinho',
      city: 'Imperatriz - MA ',
    },
    {
      title: 'Casa do morango 2',
      subtitle:
        'Rua Aquiles Lisboa, entre Paraíba e Rio Grande do Norte, n° 756 - Mercadinho',
      city: 'Imperatriz - MA ',
    },
    {
      title: 'Casa do morango 3',
      subtitle:
        'Rua Aquiles Lisboa, entre Paraíba e Rio Grande do Norte, n° 756 - Mercadinho',
      city: 'Imperatriz - MA ',
    },
  ];
  return (
    <div className="mt-[89px]">
      <div className="flex items-center gap-7 justify-center md:justify-start md:pl-12 xl:pl-20">
        <Image
          alt="Ícone de pin"
          height={65}
          width={57}
          src={'/pin-icon.svg'}
        />
        <span className=" text-black font-semibold text-lg sm:text-2xl">
          Saiba onde nos encontrar
        </span>
      </div>
      <div className="mt-28 flex items-center justify-center mx-0 lg:mx-16 xl:mx-20">
        <CityCarousel items={carouselItems} />
      </div>
      <div className="w-full h-auto flex items-start justify-center mt-20">
        <Image
          alt="Imagem de uma cumbuca de açai"
          height={299}
          width={618}
          src={'/cumbuca-acai.svg'}
        />
      </div>
    </div>
  );
}
