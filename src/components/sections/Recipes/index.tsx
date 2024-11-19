'use client';
import React from 'react';
import RecipeCard from './RecipeCard';

interface RecipeProps {
  recipes: RecipeCardData[];
}
interface RecipeCardData {
  base64: string;
  created_at: string;
  description: string;
  final_color: string;
  id: string;
  image: string;
  recipe_id: string;
  start_color: string;
  updated_at: string;
}

export default function Recipes({ recipes }: RecipeProps) {
  return (
    <div className="w-full lg:max-h-[361px] bg-mediumWhite rounded-[30px] mt-5 lg:mt-[-30px] bg-[url('/recipe-bg.svg')] bg-no-repeat bg-center bg-cover h-auto pb-10 lg:pb-0 ">
      <div className="flex gap-5">
        <div className="flex items-center flex-col lg:flex-row gap-7 w-full lg:pl-11 pt-16">
          <img
            alt="Ícone de xícara de café"
            height={65}
            width={57}
            src={'/cup-coffe-icon.svg'}
          />
          <div className="flex flex-col items-center lg:items-start gap-6">
            <h3 className="text-black font-semibold text-2xl">Receitas</h3>
            <span className=" text-lightGray max-w-[269px] text-base font-normal text-center lg:text-left">
              Açaí Perfeito? Encontre a Combinação Ideal!
            </span>
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col lg:flex-row justify-evenly items-center lg:items-start h-auto gap-5">
        {recipes?.length === 0 ? (
          <span>Carregando receitas...</span>
        ) : (
          recipes?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              endColor={recipe.final_color || '#fff'}
              startColor={recipe.start_color || '#fff'}
              src={recipe.base64}
              text={recipe.description}
              link={`/recipes/${recipe.recipe_id}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
