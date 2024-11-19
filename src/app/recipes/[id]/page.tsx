import { Metadata } from 'next';
import api from '@/lib/axiosInstance';
import RecipeDetails from '@/components/RecipeSSR/RecipeDetails';
import RelatedRecipes from '@/components/RecipeSSR/RelatedRecipes';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const res = await api.get(
    `/api/without/recipes/get_recipe_page/${params.id}`
  );
  const recipe = res.data.data;
  return { title: recipe?.title || 'Receita' };
}

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const recipeRes = await api.get(
    `/api/without/recipes/get_recipe_page/${params.id}`
  );
  const threeRecipesRes = await api.get(
    '/api/without/recipes_cards/last_three_recipes'
  );

  const recipeData = recipeRes.data.data;
  const threeRecipes = threeRecipesRes.data.data;

  return (
    <>
      <RecipeDetails recipe={recipeData} />
      <RelatedRecipes recipes={threeRecipes} />
    </>
  );
}
