import { RecipeSupply, RecipeType } from "@/types";

export class Recipe {
  private _id: string;
  private _name: string;
  private _description: string;
  private _ingredients: RecipeSupply[];
  private _steps: string[]

  constructor(recipe: RecipeType) {
    this._id = recipe.id;
    this._name = recipe.name;
    this._description = recipe.description;
    this._ingredients = recipe.ingredients;
    this._steps = recipe.steps;
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

  public get ingredients(): RecipeSupply[] {
    return this._ingredients;
  }

  public get steps(): string[] {
    return this._steps;
  }

  public get totalCost(): number {
    return this.ingredients.reduce((total, supply) => total + supply.unitPrice * supply.quantity, 0);
  }
}