import { Icon } from "@/componets";
import { Button, Input } from "@heroui/react";

type Props = {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
};

function StepsInput({ label, value, onChange }: Props) {
  const removeStep = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleStepChange = (index: number, _value: string) => {
    const newSteps = [...value];
    newSteps[index] = _value;
    onChange(newSteps);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <span>{label}</span>
        <Button
          color="primary"
          size="sm"
          variant="bordered"
          onPress={() => onChange([...value, ""])}
        >
          <Icon prefix="fas" name="plus" />
          Agregar Paso
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {value.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="mr-2">{index + 1}.</span>
            <Input
              type="text"
              name={`step-${index}`}
              value={item}
              onChange={(e) => handleStepChange(index, e.target.value)}
            />
            <Button
              className="rounded-full ml-2"
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

export default StepsInput;
