'use client';

import RecipesBreadCrumbs from '@/components/ui/RecipesBreadCrumbs';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ChefHatIcon, TimerResetIcon } from 'lucide-react';
import RecipeCard from '@/components/sections/Recipes/RecipeCard';
import Link from 'next/link';
import api from '@/lib/axiosInstance';
import { getColors } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface RecipeData {
  base64: string;
  created_at: string;
  id: string;
  image: string;
  ingredients_description: string;
  preparation_method_description: string;
  ingredient_id: string;
  preparation_method_id: string;
  updated_at: string;
  preparation_method_background_color: string;
  ingredients_background_color: string;
  preparation_method_icon_color: string;
  ingredients_icon_color: string;
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

export default function RecipePage() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [threeRecipes, setThreeRecipes] = useState<RecipeCardData[]>([]);

  const getRecipeData = useCallback(async () => {
    try {
      const res = await api.get(`/api/without/recipes/get_recipe_page/${id}`);
      const data = res.data.data;
      setRecipeData({
        ...data,
        ingredients_description: DOMPurify.sanitize(
          data.ingredients_description || ''
        ),
        preparation_method_description: DOMPurify.sanitize(
          data.preparation_method_description || ''
        ),
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const getThreeRecipeData = useCallback(async () => {
    try {
      const res = await api.get(
        `/api/without/recipes_cards/last_three_recipes`
      );
      const data = res.data.data;
      setThreeRecipes(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getRecipeData();
    getThreeRecipeData();
  }, [getRecipeData, getThreeRecipeData]);

  return (
    <>
      {!recipeData ? (
        <section className="h-auto pb-12 pt-[90px] w-full">
          <div className="pl-24 flex flex-col gap-10">
            <Skeleton className=" bg-slate-300 w-32 h-6" />
          </div>
          <div className="w-full px-12 mt-12 z-10 relative">
            <Skeleton className=" bg-slate-300 w-full h-[350px]" />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center w-full mt-[-50px] h-auto">
            <article className="h-[715px] w-full flex items-center justify-center">
              <div className="flex flex-col gap-4">
                <Skeleton className=" bg-slate-300 w-12 h-12 rounded-full" />
                <Skeleton className=" bg-slate-300 w-48 h-8 mb-4" />
                <Skeleton className=" bg-slate-300 w-full h-48" />
              </div>
            </article>
            <article className="h-[715px] w-full flex items-center justify-center">
              <div className="flex flex-col gap-4">
                <Skeleton className=" bg-slate-300 w-12 h-12 rounded-full" />
                <Skeleton className=" bg-slate-300 w-48 h-8 mb-4" />
                <Skeleton className=" bg-slate-300 w-full h-48" />
              </div>
            </article>
          </div>
          <div className="mt-12 md:px-16 lg:px-28 w-full">
            <div className="flex justify-between">
              <Skeleton className=" bg-slate-300 w-48 h-8 mb-6" />
              <Skeleton className=" bg-slate-300 w-32 h-6" />
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-28">
              <Skeleton className=" bg-slate-300 w-80 h-96" />
              <Skeleton className=" bg-slate-300 w-80 h-96" />
              <Skeleton className=" bg-slate-300 w-80 h-96" />
            </div>
          </div>
        </section>
      ) : (
        <section className="h-auto pb-12 pt-[90px] w-full">
          <div className=" pl-4 md:pl-24 flex flex-col gap-10">
            <RecipesBreadCrumbs />
          </div>
          <div className="w-full px-3 md:px-12 mt-12 z-10 relative">
            <div className="rounded-[30px] bg-lightGray w-full">
              <Image
                alt="Imagem da receita"
                src={recipeData.base64}
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
                background: recipeData?.ingredients_background_color,
              }}
            >
              <div className="flex flex-col gap-4">
                <ChefHatIcon
                  stroke={recipeData?.ingredients_icon_color}
                  size={46}
                />
                <h2
                  style={{
                    color: getColors(recipeData.ingredients_description),
                  }}
                  className="text-4xl font-bold"
                >
                  Ingredientes
                </h2>
                <div
                  className="list-disc list-inside font-medium text-lg [&_li]:list-disc ml-4"
                  style={{
                    color: getColors(recipeData.ingredients_description),
                  }}
                  dangerouslySetInnerHTML={{
                    __html: recipeData?.ingredients_description || '',
                  }}
                ></div>
              </div>
            </article>

            <article
              className="h-[715px] w-full flex items-center justify-center"
              style={{
                background: recipeData?.preparation_method_background_color,
              }}
            >
              <div className="flex flex-col gap-4 px-3">
                <TimerResetIcon
                  stroke={recipeData?.preparation_method_icon_color}
                  size={46}
                />
                <h2
                  style={{
                    color: getColors(recipeData.preparation_method_description),
                  }}
                  className="text-4xl font-bold"
                >
                  Modo de Preparo
                </h2>
                <div
                  className="list-disc list-inside font-medium text-lg [&_li]:list-disc ml-4"
                  style={{
                    color: getColors(
                      recipeData?.preparation_method_description
                    ),
                  }}
                  dangerouslySetInnerHTML={{
                    __html: recipeData?.preparation_method_description || '',
                  }}
                ></div>
              </div>
            </article>
          </div>
          <div className="mt-12 md:px-16 lg:px-28 w-full">
            <div className="flex justify-between px-3 sm:px-0">
              <h3 className="font-semibold text-2xl mb-6 text-center md:text-left">
                Outras receitas
              </h3>
              <Link
                href={'/recipes'}
                className="text-pastelBlue font-semibold text-base hover:opacity-85 transition-all duration-300"
              >
                Veja mais receitas
              </Link>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-28">
              {threeRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  startColor={recipe.start_color}
                  endColor={recipe.final_color}
                  src={`${recipe.base64}`}
                  text={DOMPurify.sanitize(recipe.description)}
                  link={`/recipes/${recipe.recipe_id}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
