'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ButtonHTMLAttributes, useState } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  classNameCustom?: string;
  src?: string;
  classNameText?: string;
}

export default function Button({
  text,
  classNameCustom,
  src,
  classNameText,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-[40px] my-2">
      <button
        {...props}
        className={cn(
          `bg-darkPurple rounded-[55px] w-[225px] py-[15px] flex hover:gap-2 items-center justify-center transition-all duration-500 ease-in-out group/button ${
            isHovered ? 'px-[20px]' : 'px-[10px]'
          } overflow-hidden`,
          classNameCustom
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className={cn(
            `font-semibold text-sm sm:text-md md:text-xl`,
            classNameText
          )}
        >
          {text}
        </span>
        <div
          className={`hidden group-hover/button:block w-auto transition-opacity duration-700 ease-in-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {src && (
            <Image alt="Ícone de ação" src={src} height={10} width={30} />
          )}
        </div>
      </button>
    </div>
  );
}
