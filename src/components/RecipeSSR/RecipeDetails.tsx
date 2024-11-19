'use client';

import { ChefHatIcon, TimerResetIcon } from 'lucide-react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { getColors } from '@/lib/utils';

interface RecipeData {
  base64: string;
  ingredients_description: string;
  preparation_method_description: string;
  ingredients_background_color: string;
  preparation_method_background_color: string;
  ingredients_icon_color: string;
  preparation_method_icon_color: string;
}

export default function RecipeDetails({ recipe }: { recipe: RecipeData }) {
  return (
    <section className="h-auto pb-12 pt-[90px] w-full">
      <div className="w-full px-3 md:px-12 mt-12 z-10 relative">
        <div className="rounded-[30px] bg-lightGray w-full">
          <Image
            alt="Imagem da receita"
            src={recipe?.base64}
            width={1340}
            height={549}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full mt-[-50px] h-auto">
        <article
          className="h-[715px] w-full flex items-center justify-center"
          style={{
            background: recipe?.ingredients_background_color,
          }}
        >
          <div className="flex flex-col gap-4">
            <ChefHatIcon stroke={recipe?.ingredients_icon_color} size={46} />
            <h2
              style={{
                color: getColors(recipe?.ingredients_description),
              }}
              className="text-4xl font-bold"
            >
              Ingredientes
            </h2>
            <div
              className="list-disc list-inside font-medium text-lg [&_li]:list-disc ml-4"
              style={{
                color: getColors(recipe?.ingredients_description),
              }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(recipe?.ingredients_description),
              }}
            ></div>
          </div>
        </article>

        <article
          className="h-[715px] w-full flex items-center justify-center"
          style={{
            background: recipe?.preparation_method_background_color,
          }}
        >
          <div className="flex flex-col gap-4 px-3">
            <TimerResetIcon
              stroke={recipe?.preparation_method_icon_color}
              size={46}
            />
            <h2
              style={{
                color: getColors(recipe?.preparation_method_description),
              }}
              className="text-4xl font-bold"
            >
              Modo de Preparo
            </h2>
            <div
              className="list-disc list-inside font-medium text-lg [&_li]:list-disc ml-4"
              style={{
                color: getColors(recipe?.preparation_method_description),
              }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  recipe?.preparation_method_description
                ),
              }}
            ></div>
          </div>
        </article>
      </div>
    </section>
  );
}
