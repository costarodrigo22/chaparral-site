'use client';

import RecipeCard from '@/components/sections/Recipes/RecipeCard';
import DOMPurify from 'dompurify';

interface RecipeCardData {
  id: string;
  base64: string;
  description: string;
  start_color: string;
  final_color: string;
  recipe_id: string;
}

export default function RelatedRecipes({
  recipes,
}: {
  recipes: RecipeCardData[];
}) {
  return (
    <section className="my-12 md:px-16 lg:px-28 w-full">
      <div className="flex justify-between px-3 sm:px-0">
        <h3 className="font-semibold text-2xl mb-6 text-center md:text-left">
          Outras receitas
        </h3>
        <a
          href="/recipes"
          className="text-pastelBlue font-semibold text-base hover:opacity-85 transition-all duration-300"
        >
          Veja mais receitas
        </a>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-28">
        {recipes?.map((recipe) => (
          <RecipeCard
            key={recipe?.id}
            startColor={recipe?.start_color}
            endColor={recipe?.final_color}
            src={recipe?.base64}
            text={DOMPurify.sanitize(recipe?.description)}
            link={`/recipes/${recipe?.recipe_id}`}
          />
        ))}
      </div>
    </section>
  );
}
