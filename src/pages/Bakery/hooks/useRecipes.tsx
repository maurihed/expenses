import { Recipe } from "@/classes";
import { RecipeService } from "@/services";
import { useQuery } from "react-query";

export const useRecipes = () => {
  // const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Recipe[]>(
    "recipes",
    RecipeService.getRecipes,
    {
      staleTime: Infinity, // Disable background fetching
    }
  );

  return {
    recipes: data,
    isLoading,
    error,
  };
};
