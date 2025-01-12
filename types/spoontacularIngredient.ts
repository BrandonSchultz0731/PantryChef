// Search Ingredient
export type SpoontacularIngredient = {
  id: number;
  name: string;
  image: string;
};

export type SpoontacularIngredientResponse = {
  results: SpoontacularIngredient[];
  offset: number;
  number: number;
  totalResults: number;
};

// Find recipes from ingredients
export type SpoontacularRecipeFromPantryResponse = {
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: RecipeFromPantryIngredient[];
  title: string;
  unusedIngredients: RecipeFromPantryIngredient[];
  usedIngredientCount: number;
  usedIngredients: RecipeFromPantryIngredient[];
};

export type RecipeFromPantryIngredient = {
  aisle: string;
  amount: number;
  id: number;
  image: string;
  meta: any[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
  unitLong: string;
  unitShort: string;
};
