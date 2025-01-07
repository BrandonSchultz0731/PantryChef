import { PantryItem } from "./pantryItem";

export type CookbookIngredients = Omit<PantryItem, "id">[];

export type CookbookItem = {
  id: number;
  recipe_name: string;
  ingredients: CookbookIngredients;
  prep_time: number;
  cook_time: number;
  instructions: string;
};
