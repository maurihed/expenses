import { IngredientRequest, RecipeRequest } from "@/types";
import { Button, Form, Input, Select, SelectItem, Textarea } from "@heroui/react";

import { FormEvent, useState } from "react";
import { IngredientsInput } from "../IngredientsInput";
import { StepsInput } from "../StepsInput";

const MODELS = [
  { key: "molde_10_cm", label: "Molde 10cm" },
  { key: "molde_19_cm", label: "Molde 19cm" },
];

type Errors = {
  [field: string]: string;
};

type Props = {
  recipe: RecipeRequest;
  action: (recipe: RecipeRequest) => void;
};

function RecipeForm({ recipe, action }: Props) {
  const [newRecipe, setNewRecipe] = useState<RecipeRequest>(recipe);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    field: string,
    value: number | string | IngredientRequest[] | string[]
  ) => {
    setNewRecipe({ ...newRecipe, [field]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _errors: Errors = {};
    if (newRecipe.name === "") {
      _errors.name = "El nombre es requerido";
    }

    if (newRecipe.description === "") {
      _errors.description = "La descripción es requerida";
    }

    if (newRecipe.molde === "") {
      _errors.molde = "El molde es requerido";
    }

    if (newRecipe.ingredients.length === 0) {
      _errors.ingredients = "Debes ingresar al menos un ingredien";
    }

    if (newRecipe.steps.length === 0) {
      _errors.steps = "Debes ingresar al menos un paso";
    }

    if (Object.values(_errors).length > 0) {
      setErrors(_errors);
      return;
    }

    action(newRecipe);
  };

  const ingredientsAdded = newRecipe.ingredients.map((ingredient) => ingredient.id);

  return (
    <Form
      className="flex flex-col min-h-full gap-4"
      validationErrors={errors}
      validationBehavior="aria"
      onSubmit={handleSubmit}
    >
      <div className="grow grid grid-cols-1 gap-4 grow-0 w-full max-h-full">
        <Input
          autoFocus
          isRequired
          type="text"
          label="Nombre"
          name="name"
          value={newRecipe.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Textarea
          label="Descripción"
          name="description"
          isRequired
          value={newRecipe.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <Select
          label="Molde"
          isRequired
          placeholder="Elige el molde"
          selectedKeys={[newRecipe.molde]}
          variant="flat"
          onSelectionChange={(e) => handleChange("molde", [...e][0])}
          name="molde"
        >
          {MODELS.map((molde) => (
            <SelectItem key={molde.key}>{molde.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full overflow-auto">
        <StepsInput
          label="Pasos"
          value={newRecipe.steps}
          onChange={(newSteps: string[]) => handleChange("steps", newSteps)}
        />
        <IngredientsInput
          ingredientsAdded={ingredientsAdded}
          label="Ingredientes"
          value={newRecipe.ingredients}
          onChange={(newIngredients: IngredientRequest[]) =>
            handleChange("ingredients", newIngredients)
          }
        />
      </div>
      <Button className="w-full mt-auto shrink-0 mb-2" color="primary" type="submit">
        Guardar receta
      </Button>
    </Form>
  );
}

export default RecipeForm;
