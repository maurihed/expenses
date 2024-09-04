import { Recipe } from "@/classes";
import { RecipeService } from "@/services";
import { useMutation, useQueryClient } from "react-query";

export const useRecipeMutations = () => {
  const queryClient = useQueryClient();

  const { mutate: createRecipe } = useMutation(RecipeService.addRecipe, {
    onSuccess: (newRecipe: Recipe) => {
      queryClient.setQueryData<Recipe[]>("recipes", (prevRecipes) => [
        newRecipe,
        ...(prevRecipes ?? []),
      ]);
    },
  });

  const { mutate: updateRecipe } = useMutation(RecipeService.updateRecipe, {
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

  const { mutate: deleteRecipe } = useMutation(RecipeService.deleteRecipe, {
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
