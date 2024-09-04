import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { RecipeForm } from "../RecipeForm";
import { RecipeType } from "@/types";

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalContent>
        <ModalHeader>
          <div className="w-full flex justify-between align-center pr-4">
            <span>Nueva receta</span>
          </div>
        </ModalHeader>
        <ModalBody className="overflow-y-auto">
          <RecipeForm recipe={newRecipe} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
