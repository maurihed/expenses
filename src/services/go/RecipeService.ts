import { Recipe } from "@/classes";
import { RecipeRequest, RecipeType } from "@/types";

const { VITE_GO_BASE_URL } = import.meta.env;
const RECIPES_URL = `${VITE_GO_BASE_URL}/recipes`;

export class RecipeService {

  public static async deleteRecipe(recipe: Recipe): Promise<Recipe> {
    try {
      await fetch(`${RECIPES_URL}/${recipe.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
  public static async addRecipe(recipe: RecipeRequest): Promise<RecipeRequest> {
    try {
      const response = await fetch(RECIPES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      const { id: recipeInsertedId } = await response.json();
      return Promise.resolve({...recipe, id: recipeInsertedId});
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
  public static async getRecipes(): Promise<Recipe[]> {
    try {
      const response = await fetch(RECIPES_URL);
      const recipes = await response.json();
      return Promise.resolve(recipes.map((recipe: RecipeType) => new Recipe(recipe)));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}