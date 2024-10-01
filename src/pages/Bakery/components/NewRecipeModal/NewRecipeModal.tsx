import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { RecipeForm } from "../RecipeForm";
import { RecipeType } from "@/types";
import { useRecipeMutations } from "../../hooks/useRecipeMutations";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewRecipeModal({ isOpen, onClose }: Props) {
  const newRecipe: RecipeType = {
    id: "",
    name: "",
    description: "",
    ingredients: [],
    steps: [],
  };
  const { createRecipe } = useRecipeMutations();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalContent>
        <ModalHeader>
          <div className="w-full flex justify-between align-center pr-4">
            <span>Nueva receta</span>
          </div>
        </ModalHeader>
        <ModalBody className="overflow-y-auto">
          <RecipeForm action={createRecipe} recipe={newRecipe} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
