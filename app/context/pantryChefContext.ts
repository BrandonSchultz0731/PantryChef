import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { CookbookIngredients, CookbookItem } from "@/types/cookbookItem";
import { PantryItem } from "@/types/pantryItem";
import { createContext } from "react";

interface IPantryChefContext {
  pantry: PantryItem[];
  cookbook: CookbookItem[];
  handleInsertPantryItem: (
    name: string,
    quantity: number,
    unit: MEASUREMENT_UNITS,
  ) => Promise<void>;
  handleClearPantry: () => Promise<void>;
  handleUpdatePantryItem: (
    id: number,
    name: string,
    quantity: number,
    unit: MEASUREMENT_UNITS,
  ) => Promise<void>;
  handleDeletePantryItem: (id: number) => Promise<void>;
  handleInsertCookbookItem: (
    recipeName: string,
    ingredients: CookbookIngredients,
    prep_time: number,
    cook_time: number,
    instructions: string,
  ) => Promise<void>;
  handleDeleteCookbookItem: (id: number) => Promise<void>;
}

const PantryChefContext = createContext<IPantryChefContext>({
  pantry: [],
  cookbook: [],
  handleClearPantry: async () => {},
  handleInsertPantryItem: async () => {},
  handleDeletePantryItem: async () => {},
  handleUpdatePantryItem: async () => {},
  handleDeleteCookbookItem: async () => {},
  handleInsertCookbookItem: async () => {},
});

export default PantryChefContext;
