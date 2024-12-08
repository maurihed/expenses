import { RecipeSupply, RecipeType } from "@/types";
import { Button, Input, Textarea } from "@nextui-org/react";

import { FormEvent, useState } from "react";
import { IngredientsInput } from "../IngredientsInput";
import { StepsInput } from "../StepsInput";

type Props = {
  recipe: RecipeType;
  action: (recipe: RecipeType) => void;
};

function RecipeForm({ recipe, action }: Props) {
  const [newRecipe, setNewRecipe] = useState<RecipeType>(recipe);

  const handleChange = (
    field: string,
    value: number | string | RecipeSupply[] | string[]
  ) => {
    setNewRecipe({ ...newRecipe, [field]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    action(newRecipe);
  };

  return (
    <form className="flex flex-col min-h-full gap-4" onSubmit={handleSubmit}>
      <div className="grow grid grid-cols-1 gap-4 grow-0 max-h-full">
        <Input
          autoFocus
          type="text"
          label="Nombre"
          value={newRecipe.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Textarea
          label="Descripción"
          value={newRecipe.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <div>Molde:</div>
      </div>
      <div className="grid grid-cols-1 gap-4 overflow-auto">
        <StepsInput
          label="Pasos"
          value={newRecipe.steps}
          onChange={(newSteps: string[]) => handleChange("steps", newSteps)}
        />
        <IngredientsInput
          label="Ingredientes"
          value={newRecipe.ingredients}
          onChange={(newIngredients: RecipeSupply[]) =>
            handleChange("ingredients", newIngredients)
          }
        />
      </div>
      <Button
        className="w-full mt-auto shrink-0 mb-2"
        variant="flat"
        color="primary"
        type="submit"
      >
        Guardar receta
      </Button>
    </form>
  );
}

export default RecipeForm;
