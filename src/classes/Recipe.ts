import { Ingredient, IngredientRequest, RecipeRequest, RecipeType } from "@/types";
import { IngredientObject } from './IngredientObject';

export class Recipe {
  private _id: string;
  private _name: string;
  private _description: string;
  private _molde: string;
  private _ingredients: IngredientObject[];
  private _steps: string[]

  constructor(recipe: RecipeRequest | RecipeType, ingredients?: IngredientObject[]) {
    this._id = recipe.id ?? "";
    this._name = recipe.name;
    this._description = recipe.description;
    this._molde = recipe.molde;
    this._steps = recipe.steps;
    console.log(recipe);
    this._ingredients = this.parseIngredients(recipe.ingredients, ingredients);
    console.log(this.ingredients);
  }

  private isIngredient(ingredients: IngredientRequest[] | Ingredient[]): ingredients is Ingredient[] {
    return ingredients.every((ingredient) => "quantity" in ingredient && "unitPrice" in ingredient);
  }

  private parseIngredients(ingredientRequests: IngredientRequest[] | Ingredient[], ingredients?: Ingredient[]): IngredientObject[] {
    if (this.isIngredient(ingredientRequests)) {
      return ingredientRequests.map((ingredient) => {
        const ingredientObject = new IngredientObject(ingredient);
        ingredientObject.id = ingredient.id;
        ingredientObject.price = ingredient.unitPrice * ingredient.quantity;
        return ingredientObject;
      });
    }

    return ingredientRequests.map((ingredientRequest) => {
      const ingredient = ingredients?.find((i) => i.id === ingredientRequest.id);
      if (!ingredient) {
        return null;
      }
      return new IngredientObject({
        ...ingredient,
        ...ingredientRequest,
      });
    }).filter(item => item !== null);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get ingredients(): IngredientObject[] {
    return this._ingredients;
  }

  public get steps(): string[] {
    return this._steps;
  }

  public get molde(): string {
    return this._molde
  }

  public get totalCost(): number {
    return this.ingredients.reduce((total, supply) => total + supply.unitPrice * supply.quantity, 0);
  }
}