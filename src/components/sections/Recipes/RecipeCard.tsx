'use client';
import Button from '@/components/ui/Button/index';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import DOMPurify from 'dompurify';

interface RecipeCardProps {
  src: string;
  text: string;
  startColor: string;
  endColor: string;
  link?: string;
  textColor?: string;
}

export default function RecipeCard({
  src,
  text,
  link,
  endColor,
  startColor,
}: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        'max-w-[352px] transition-all h-full duration-700 ease-in-out flex flex-col items-center shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] rounded-[20px] group/recipecard',
        isHovered ? 'lg:h-[490px]' : 'lg:h-[304px]'
      )}
      style={{
        background: `linear-gradient(180deg, ${startColor}, ${endColor})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {src && (
        <img src={src} alt="Imagem da receita" height={196} width={352} />
      )}
      <div className="flex flex-col items-center px-8 mt-7 gap-20">
        <span
          className={cn(
            'font-normal text-base lg:mb-3 lg:group-hover/recipecard:mb-0'
          )}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(text),
          }}
        ></span>
        <div
          className={cn(
            `transition-opacity duration-1000 ${
              isHovered ? 'lg:opacity-100 ' : 'lg:opacity-0 '
            }`,
            'mb-12'
          )}
        >
          <Button
            classNameText="text-white"
            text="Quero ver"
            src="/arrow-right.svg"
            onClick={() => {
              if (link) window.open(link, '_self');
            }}
          />
        </div>
      </div>
    </div>
  );
}
