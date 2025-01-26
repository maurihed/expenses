import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Icon } from "@/componets";
import { MonthYearType } from "@/types";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

type Props = {
  value: MonthYearType;
  onChange: (value: MonthYearType) => void;
};

export default function MonthYearPicker({ value, onChange }: Props) {
  const displayName = MONTHS[value.month];

  const handleChange = (newMonth: number, newYear?: number) => {
    const newMonthYear = { month: newMonth, year: newYear || value.year };
    onChange(newMonthYear);
  };

  const handleArrowClick = (increment: number) => {
    const newMonth = value.month + increment;
    if (newMonth < 0) {
      handleChange(11, value.year - 1);
    } else if (newMonth > 11) {
      handleChange(0, value.year + 1);
    } else {
      handleChange(newMonth);
    }
  };

  return (
    <div className="pt-2">
      <span className="text-slate-300">{value.year}</span>
      <div>
        <Button
          variant="light"
          className="rounded-full text-withe"
          isIconOnly
          onPress={() => handleArrowClick(-1)}
        >
          <Icon prefix="fas" name="arrow-left" />
        </Button>
        <Dropdown className="bg-slate-800 text-white">
          <DropdownTrigger>
            <Button className="text-white min-w-40 text-2xl" variant="light">
              {displayName}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            color="primary"
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={[value.month]}
            onSelectionChange={(keys) => handleChange(+(keys.currentKey ?? value.month))}
          >
            {MONTHS.map((month, index) => (
              <DropdownItem key={index}>{month}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button
          variant="light"
          className="rounded-full text-withe"
          isIconOnly
          onPress={() => handleArrowClick(1)}
        >
          <Icon prefix="fas" name="arrow-right" />
        </Button>
      </div>
    </div>
  );
}
