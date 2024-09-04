import { Recipe } from "@/classes";
import { Icon } from "@/componets";
import { formatMoney } from "@/utils";
import { Button } from "@nextui-org/react";

type Props = {
  recipe: Recipe;
};
function RecipeItem({ recipe }: Props) {
  return (
    <div className="rounded-lg border shadow-sm p-6 bg-slate-800">
      <h3 className="text-xl mb-2">{recipe.name}</h3>
      <p className="line-clamp-3">{recipe.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg">{formatMoney(recipe.totalCost)}</span>
        <div>
          <Button
            className="mr-2 rounded-full"
            size="sm"
            isIconOnly
            aria-label="Editar receta"
          >
            <Icon prefix="fas" name="pencil" />
          </Button>
          <Button
            className="mr-2 rounded-full"
            size="sm"
            color="danger"
            isIconOnly
            aria-label="Eliminar receta"
          >
            <Icon prefix="fas" name="trash" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;
