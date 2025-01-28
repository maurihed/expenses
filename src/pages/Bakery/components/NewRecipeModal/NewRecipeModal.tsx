import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { RecipeForm } from "../RecipeForm";
import { RecipeRequest } from "@/types";
import { useRecipeMutations } from "../../hooks/useRecipeMutations";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewRecipeModal({ isOpen, onClose }: Props) {
  const newRecipe: RecipeRequest = {
    name: "",
    description: "",
    molde: "",
    ingredients: [],
    steps: [],
  };
  const { createRecipe } = useRecipeMutations();

  return (
    <Modal className="text-slate-100" isOpen={isOpen} onClose={onClose} size="full">
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
