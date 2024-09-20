import Button from '@/app/global/components/button';
import { cn } from '@/app/utils/CN';
import Image from 'next/image';
import React from 'react';
interface ProductCardProps {
  text: string;
  customClass: string;
  src: string;
  backgroundImage: string;
  srcLogo: string;
}
export default function ProductCard({
  text,
  customClass,
  src,
  srcLogo,
  backgroundImage,
}: ProductCardProps) {
  return (
    <div
      className={cn('w-full h-full flex flex-col ', customClass)}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full h-full flex items-start justify-end pt-5 pr-7">
        <Image alt="logo do Iaça" height={71} width={123} src={srcLogo} />
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 pb-5">
        <Image alt="Produto iaça" height={250} width={368} src={src} />
        <Button text="Quero o meu" src="/arrow-right.svg" />
      </div>
    </div>
  );
}
