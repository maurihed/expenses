import { IngredientObject } from "@/classes";
import { Ingredient } from "@/types";

const { VITE_GO_BASE_URL } = import.meta.env;
const ACCOUNTS_URL = `${VITE_GO_BASE_URL}/ingredients`;

export class IngredientService {
  public static async getIngredients(): Promise<IngredientObject[]> {
    try {
      const response = await fetch(ACCOUNTS_URL);
      const ingredients = await response.json() as Ingredient[];
      return Promise.resolve(ingredients.map((ingredient) => new IngredientObject(ingredient)));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
