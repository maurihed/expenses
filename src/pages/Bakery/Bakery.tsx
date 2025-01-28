import { Button, useDisclosure } from "@heroui/react";
import { Icon } from "@/componets";
import { NewRecipeModal, RecipeList } from "./components";
import { useRecipes } from "./hooks";

function Bakery() {
  const { recipes, isLoading, error } = useRecipes();
  const { isOpen, onOpen, onClose } = useDisclosure({ id: "NEW_RECIPE" });

  if (isLoading) {
    return "Cargando...";
  }

  if (error || !recipes) {
    return "Error" + JSON.stringify(error);
  }

  return (
    <div className="py-4">
      <h1 className="text-3xl mb-4">Lista de recetas</h1>
      <div className="text-right mb-4">
        <Button color="primary" onPress={onOpen}>
          <Icon prefix="fas" name="plus"></Icon>
          Nueva Receta
        </Button>
      </div>
      <RecipeList recipes={recipes} />
      <NewRecipeModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default Bakery;
