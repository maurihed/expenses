import { Icon } from "@/componets";
import { RecipeSupply } from "@/types";
import { Autocomplete, AutocompleteItem, Button, Input } from "@heroui/react";
import { useSupplies } from "../../hooks";

type Props = {
  label: string;
  value: RecipeSupply[];
  onChange: (value: RecipeSupply[]) => void;
};
export default function IngredientsInput({ label, value, onChange }: Props) {
  const { supplies, isLoading, error } = useSupplies();

  if (isLoading) {
    return "Cargando...";
  }

  if (error) {
    return "Error";
  }
  const removeStep = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof RecipeSupply,
    _value: number | string
  ) => {
    onChange(value.map((item, i) => (i === index ? { ...item, [field]: _value } : item)));
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <span>{label}</span>
        <Button
          size="sm"
          variant="bordered"
          onPress={() => onChange([...value, { id: "", quantity: 0, unitPrice: 0 }])}
          color="primary"
        >
          <Icon prefix="fas" name="plus" />
          Agregar ingrediente
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {value.map((item, index) => (
          <div key={index} className="flex items-center">
            <Autocomplete
              name={`supplyId-${index}`}
              label="Ingredientes"
              variant="flat"
              defaultItems={supplies}
              placeholder="Busca un ingrediente"
              className="max-w-xs mr-2"
              selectedKey={item.id}
              onSelectionChange={(val) => handleChange(index, "id", val ?? "")}
              size="sm"
            >
              {(supplyItem) => (
                <AutocompleteItem key={supplyItem.id}>{supplyItem.name}</AutocompleteItem>
              )}
            </Autocomplete>
            <Input
              name={`supplyQuantity-${index}`}
              className="max-w-20 mr-2"
              type="number"
              size="lg"
              min={0}
              step={0.01}
              value={"" + item.quantity}
              onChange={(e) => handleChange(index, "quantity", +e.target.value)}
            />
            <Button
              className="rounded-full"
              color="danger"
              size="sm"
              isIconOnly
              onPress={() => removeStep(index)}
            >
              <Icon prefix="fas" name="trash" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
