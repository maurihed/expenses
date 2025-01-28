import { Recipe } from "@/classes";
import { ConfirmModal } from "@/componets";
import { RecipeItem } from "../RecipeItem";
import { useCallback, useState } from "react";
import { useDisclosure } from "@heroui/react";
import { useRecipeMutations } from "../../hooks/useRecipeMutations";

type Props = {
  recipes: Recipe[];
};
function RecipeList({ recipes }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure({ id: "DELETE_RECIPE" });
  const { deleteRecipe } = useRecipeMutations();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = useCallback(
    (recipe: Recipe) => {
      onOpen();
      setSelectedRecipe(recipe);
    },
    [onOpen]
  );

  const handleConfirm = useCallback(async () => {
    if (selectedRecipe) {
      setIsDeleting(true);
      setDeleteError(null);
      try {
        await deleteRecipe(selectedRecipe);
        onClose();
      } catch (error) {
        setDeleteError(error as string);
      }
      setIsDeleting(false);
    }
  }, [onClose, deleteRecipe, selectedRecipe]);

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isDeleting}
        onConfirm={handleConfirm}
        confirmText={deleteError ? "Intentar de nuevo" : "Borrar"}
      >
        <p>¿Seguro que quieres borrar esta receta?</p>
        <small className="text-red-500">
          {deleteError ? `Ah ocurrio un error: ${deleteError}` : ""}
        </small>
      </ConfirmModal>
      <ul className="grid gap-4 grid-flow-dense grid-cols-responsive">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeItem recipe={recipe} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecipeList;
