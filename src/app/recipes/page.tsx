'use client';
import { useState, useEffect } from 'react';
import RecipeCard from '@/components/sections/Recipes/RecipeCard';
import api from '@/lib/axiosInstance';
import Image from 'next/image';
import CustomPagination from '@/components/ui/CustomPagination';
import RecipesBreadCrumbs from '@/components/ui/RecipesBreadCrumbs';
import { Skeleton } from '@/components/ui/skeleton';

interface Recipe {
  id: string;
  description: string;
  image: string;
  recipe_id: string;
  created_at: string;
  updated_at: string;
  start_color: string;
  final_color: string;
  base64: string;
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchRecipes(page: number) {
    try {
      setIsLoading(true);
      const res = await api.get(
        `/api/without/recipes_cards/get_all?page=${page}`
      );
      const data = res.data;
      console.log(data.data);

      setRecipes(data.data);
      setTotalPages(data.last_page);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="pt-24 mx-28">
        <RecipesBreadCrumbs />
      </div>
      <div className="pt-[90px] pb-[200px] mx-8">
        <div className="w-full bg-mediumWhite rounded-[30px] mt-5 lg:mt-[-30px] bg-[url('/recipe-bg.svg')] bg-no-repeat bg-center bg-cover h-[361px] pb-10 lg:pb-0 ">
          <div className="flex gap-5">
            <div className="flex items-center flex-col lg:flex-row gap-7 w-full lg:pl-11 pt-16">
              <Image
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
        </div>
        <div className="mt-[-100px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5 gap-y-40">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-[350px] bg-slate-200 h-[350px] rounded-[30px] flex flex-col items-center gap-4"
                >
                  <Skeleton className="w-full h-36 bg-slate-300 rounded-[30px]" />
                  <Skeleton className="w-2/3 h-20 bg-slate-300" />
                </Skeleton>
              ))
            : recipes?.map((recipe, key) => (
                <RecipeCard
                  key={key}
                  src={recipe.base64}
                  startColor={recipe.start_color}
                  endColor={recipe.final_color}
                  text={recipe.description}
                  link={`/recipes/${recipe.recipe_id}`}
                />
              ))}
        </div>
      </div>

      <div className="w-full items-center justify-center flex pb-10">
        <CustomPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages || 0}
        />
      </div>
    </>
  );
}
