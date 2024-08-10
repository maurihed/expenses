import { Input, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { Icon } from "../Icon";
import { IconName } from "@fortawesome/fontawesome-svg-core";

type Item = { icon: IconName; value: string, name: string };
type Props = {
  items: Item[];
  value: string;
  onChange: (value: string) => void;
};

function ModalSelector({items, value, onChange }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure({ id: "SELECTOR" });
  const selectedItem = items.find((item) => item.value === value) || items[0];
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const onSelect = (item: Item) => {
    onChange(item.value);
    setSearch("");
    onClose();
  }

  return (
    <div>
      <button onClick={onOpen} className="bg-gray-100 w-full px-2 py-3 rounded-lg flex items-center">
        <span className="w-8 h-8 rounded-full bg-slate-300 mr-2 flex justify-center items-center">
          <Icon prefix="fas" name={selectedItem.icon} />
        </span>
        <span>{selectedItem.name}</span>
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalBody>
          <Input className="text-white" label="Buscar" type="text" value={search} onChange={(e) => setSearch(e.target.value)} variant="underlined" />
          <ul className="h-96 overflow-auto">
            {filteredItems.map((item) => (
              <li key={item.name} className="mb-2">
                  <button
                    className="flex items-center px-2 py-4 w-full border-b border-slate-300"
                    onClick={() => onSelect(item)}
                  >
                    <span className="w-8 h-8 rounded-full bg-slate-300 mr-4 flex justify-center items-center">
                      <Icon prefix="fas" name={item.icon} />
                    </span>
                    <span>{item.name}</span>
                  </button>
              </li>
            ))}
          </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalSelector;
