import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { ReactNode } from "react";

type Props = {
  onConfirm: () => void;
  onClose: () => void;
  isOpen: boolean;
  children?: ReactNode;
  isLoading?: boolean;
  confirmText?: string;
  title?: string;
};
function ConfirmModal({
  title,
  onClose,
  isOpen,
  children,
  onConfirm,
  isLoading,
  confirmText = "Confirmar",
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      size="sm"
      onClose={onClose}
      placement="center"
      shouldBlockScroll
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {title ?? "Atencion!"}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button isLoading={isLoading} color="primary" onPress={onConfirm}>
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ConfirmModal;
