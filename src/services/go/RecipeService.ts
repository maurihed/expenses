import { Recipe } from "@/classes";
import { RecipeType } from "@/types";

// const { VITE_GO_BASE_URL } = import.meta.env;
// const RECIPES_URL = `${VITE_GO_BASE_URL}/recipes`;

export class RecipeService {
  public static async deleteRecipe({ recipe }: {recipe: Recipe}): Promise<Recipe> {
    try {
      // const response = await fetch(`${RECIPES_URL}/${recipe.id}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      return Promise.resolve(recipe);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public static async updateRecipe({ recipeToEdit, recipeEdited }: { recipeToEdit: Recipe; recipeEdited: Recipe; }): Promise<Recipe> {
    try {
      // const response = await fetch(`${RECIPES_URL}/${id}`, {
        // method: "PUT",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(recipe),
      // });
      // const recipe = await response.json();
      console.log('Updating recipe', recipeToEdit, recipeEdited);
      const recipe = recipeEdited;
      return Promise.resolve(new Recipe(recipe));
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public static async addRecipe(recipe: RecipeType): Promise<Recipe> {
    try {
      // const response = await fetch(RECIPES_URL, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(recipe),
      // });
      // const newRecipe = await response.json();
      console.log('Creating new recipe', recipe);
      const newRecipe = new Recipe(recipe);
      return Promise.resolve(newRecipe);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public static async getRecipes(): Promise<Recipe[]> {
    try {
      // const response = await fetch(RECIPES_URL);
      // const recipes = await response.json();
      const dumpResponse = await fetch('./recipes.json');
      const recipes = await dumpResponse.json() as RecipeType[];
      return Promise.resolve(recipes.map((recipe) => new Recipe(recipe)));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}