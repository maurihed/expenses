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
  molde: string;
  ingredients: RecipeSupply[];
  steps: string[];
}

export type RecipeRequest = (Omit<RecipeType, 'id' | 'ingredients'>) & {
  ingredients: Omit<RecipeSupply, 'unitPrice'>[]
};

export type RecipeForm = Omit<RecipeType, 'ingredientSupplies'>;