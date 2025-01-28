import { Recipe } from "@/classes";
import { RecipeService } from "@/services";
import { RecipeRequest } from "@/types";
import { useMutation, useQueryClient } from "react-query";
import { useIngredients } from "./useIngredients";

export const useRecipeMutations = () => {
  const queryClient = useQueryClient();

  const { ingredients } = useIngredients();

  const { mutate: createRecipe } = useMutation(RecipeService.addRecipe, {
    onSuccess: (newRecipe: RecipeRequest) => {
      const recipe = new Recipe(newRecipe, ingredients);
      queryClient.setQueryData<Recipe[]>("recipes", (prevRecipes) => [
        recipe,
        ...(prevRecipes ?? []),
      ]);
    },
  });

  const { mutateAsync: updateRecipe } = useMutation(RecipeService.updateRecipe, {
    onSuccess: (editedRecipe: Recipe) => {
      queryClient.setQueryData<Recipe[]>(
        "recipes",
        (prevRecipes) =>
          prevRecipes?.map((prevRecipe) =>
            prevRecipe.id === editedRecipe.id ? new Recipe(editedRecipe) : prevRecipe
          ) ?? []
      );
    },
  });

  const { mutateAsync: deleteRecipe } = useMutation(RecipeService.deleteRecipe, {
    onSuccess: (deletedRecipe: Recipe) => {
      queryClient.setQueryData<Recipe[]>(
        "recipes",
        (prevRecipes) =>
          prevRecipes?.filter((prevRecipe) => prevRecipe.id !== deletedRecipe.id) ?? []
      );
    },
  });

  return {
    createRecipe,
    updateRecipe,
    deleteRecipe,
  };
};
