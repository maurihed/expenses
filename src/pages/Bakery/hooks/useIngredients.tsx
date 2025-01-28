import { IngredientObject } from "@/classes";
import { IngredientService } from "@/services";
import { useQuery } from "react-query";

export const useIngredients = () => {
  const { data, isLoading, error, refetch } = useQuery<IngredientObject[]>(
    "ingredients",
    IngredientService.getIngredients,
    {
      staleTime: Infinity, // Disable background fetching
      retry: false,
    }
  );

  return {
    ingredients: data,
    isLoading,
    error,
    refetch,
  };
};
