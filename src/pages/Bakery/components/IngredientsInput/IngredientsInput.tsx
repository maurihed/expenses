import { Icon } from "@/componets";
import { IngredientRequest } from "@/types";
import { Autocomplete, AutocompleteItem, Button, Input } from "@heroui/react";
import { useIngredients } from "../../hooks";

type Props = {
  label: string;
  ingredientsAdded: string[];
  value: IngredientRequest[];
  onChange: (value: IngredientRequest[]) => void;
};

const EMPTY_INGREDIENT = { id: "", quantity: 0 } as const;

export default function IngredientsInput({
  label,
  ingredientsAdded,
  value,
  onChange,
}: Props) {
  const { ingredients, isLoading, error, refetch } = useIngredients();

  if (isLoading) {
    return "Cargando...";
  }

  if (error) {
    return (
      <div>
        <small>
          Error al cargar los ingredientes,
          <Button color="primary" size="sm" variant="light" onPress={() => refetch()}>
            intentar de nuevo
          </Button>
        </small>
      </div>
    );
  }
  const removeStep = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof IngredientRequest,
    _value: number | string
  ) => {
    onChange(value.map((item, i) => (i === index ? { ...item, [field]: _value } : item)));
  };

  const filteredIngredients = ingredients?.filter(
    (ingredient) => !ingredientsAdded.includes(ingredient.id)
  );

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <span>{label}</span>
        <Button
          size="sm"
          variant="bordered"
          onPress={() => onChange([...value, EMPTY_INGREDIENT])}
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
              defaultItems={filteredIngredients ?? []}
              placeholder="Busca un ingrediente"
              className="max-w-xs mr-2"
              selectedKey={item.id}
              onSelectionChange={(val) => handleChange(index, "id", val ?? "")}
              size="sm"
            >
              {(supplyItem) => (
                <AutocompleteItem key={supplyItem.id}>
                  {supplyItem.name} ({supplyItem.unit})
                </AutocompleteItem>
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
