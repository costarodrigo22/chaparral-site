import React from 'react';
import ProductCard from './components/ProductCard';

export default function Products() {
  const dataArray = [
    {
      text: 'Texto 1',
      src: '/acai-puro-sombreado.svg',
      logoSrc: '/iaca-logo-purple.svg',
      backgroundImage: '/yellow-products-bg.svg',
      background: '#FBA301',
    },
    {
      text: 'Texto 2',
      src: '/acai-puro-sombreado.svg',
      logoSrc: '/iaca-logo-purple.svg',
      backgroundImage: '/pink-products-bg.svg',
      background: '#DB0084',
    },
    {
      text: 'Texto 3',
      src: '/acai-puro-sombreado.svg',
      logoSrc: '/iaca-logo-purple.svg',
      backgroundImage: '/cyan-products-bg.svg',
      background: '#00DB99',
    },
  ];

  const getRoundedClass = (index: number, arrayLength: number) => {
    if (arrayLength === 1) {
      return ' rounded-[30px]';
    } else if (arrayLength === 2) {
      if (index === 0)
        return ' rounded-t-[30px] lg:rounded-l-[30px] lg:rounded-tr-[0px]';
      if (index === 1)
        return ' rounded-b-[30px] lg:rounded-r-[30px] lg:rounded-bl-[0px]';
    } else if (arrayLength >= 3) {
      if (index === 0)
        return ' rounded-t-[30px] lg:rounded-l-[30px] lg:rounded-r-none';
      if (index === arrayLength - 1)
        return ' rounded-b-[30px] lg:rounded-r-[30px] lg:rounded-l-none';
    }
    return '';
  };

  return (
    <div
      className="mx-5 lg:mx-10 h-auto mb-3 lg:mb-[-30px] z-30 relative"
      id="produtos"
    >
      <div className="w-full h-full flex flex-col lg:flex-row rounded-[30px]">
        {dataArray.map((item, index) => (
          <ProductCard
            backgroundImage={item.backgroundImage}
            backgroundColor={item.background}
            srcLogo={item.logoSrc}
            src={item.src}
            key={index}
            customClass={`h-full${getRoundedClass(index, dataArray.length)}`}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
}
