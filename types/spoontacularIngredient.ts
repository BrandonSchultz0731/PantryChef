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
