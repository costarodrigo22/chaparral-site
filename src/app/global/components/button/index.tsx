'use client';
import Image from 'next/image';
import { ButtonHTMLAttributes, useState } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  src: string;
}

export default function Button({ text, src }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`bg-darkPurple rounded-[55px] py-[15px] flex gap-2 items-center transition-all duration-500 ease-in-out group ${
        isHovered ? 'px-[60px]' : 'px-[50px]'
      } overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-semibold text-sm sm:text-md md:text-xl text-white">
        {text}
      </span>
      <div
        className={` hidden lg:group-hover:block transition-opacity duration-500 ease-in-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image alt="Ícone de ação" src={src} height={10} width={30} />
      </div>
    </button>
  );
}
