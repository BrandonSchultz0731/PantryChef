import { SpoontacularIngredientResponse } from "@/types/spoontacularIngredient";

// TODO: This is not safe, so i should change the API key if im actually gonna use this for real
const spoontacularAPIKey = process.env.EXPO_PUBLIC_SPOONTACULAR_API_KEY;

export const fetchIngredient = async (
  itemName: string,
): Promise<SpoontacularIngredientResponse> => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/food/ingredients/search?query=${itemName}&apiKey=${spoontacularAPIKey}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch the grocery item");
    }
    return response.json() as unknown as SpoontacularIngredientResponse;
  } catch (err) {
    return {
      results: [],
      offset: -1,
      number: -1,
      totalResults: -1,
    };
  }
};
