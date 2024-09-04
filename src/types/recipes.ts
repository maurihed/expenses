export type SupplyType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
};

export type RecipeSupply = {
  id: string;
  quantity: number;
  unitPrice: number;
}

export type RecipeType = {
  id: string;
  name: string;
  description: string;
  ingredients: RecipeSupply[];
  steps: string[];
}

export type RecipeForm = Omit<RecipeType, 'ingredientSupplies'>;