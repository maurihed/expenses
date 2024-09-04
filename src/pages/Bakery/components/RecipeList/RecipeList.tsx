import { Recipe } from "@/classes";
import { RecipeItem } from "../RecipeItem";

type Props = {
  recipes: Recipe[];
};
function RecipeList({ recipes }: Props) {
  return (
    <ul className="grid gap-4 grid-flow-dense grid-cols-responsive">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeItem recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;
