import { CookbookIngredient, CookbookItem } from "@/types/cookbookItem";
import { ScoredRecipe } from "./ScoredRecipes";
import { PantryItem } from "@/types/pantryItem";
import { MEASUREMENT_UNITS, UNIT_CONVERSIONS } from "@/constants/measurements";
import { SpoontacularIngredientResponse } from "@/types/spoontacularIngredient";

// For some reason i have to parse it twice
export const convertRecipeToObject = (recipeString: string) => {
  try {
    const recipe: CookbookItem | ScoredRecipe = JSON.parse(recipeString);
    if (typeof recipe.ingredients === "object") {
      // we are good
      return recipe;
    }
    recipe.ingredients = JSON.parse(`${recipe.ingredients}`);
    return recipe;
  } catch (err) {
    throw new Error("Could not convert string to recipe");
  }
};

/**
 * Calculate similarity score between two strings
 * using a combination of token matching and Levenshtein distance.
 */
export const calculateSimilarity = (str1: string, str2: string) => {
  const levenshteinDistance = (a: string, b: string) => {
    const matrix = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0),
    );

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + cost, // substitution
        );
      }
    }

    return matrix[a.length][b.length];
  };

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim();

  const tokens1 = new Set(normalize(str1).split(/\s+/));
  const tokens2 = new Set(normalize(str2).split(/\s+/));

  // Check token overlap
  const commonTokens = [...tokens1].filter((token) => tokens2.has(token));
  if (commonTokens.length > 0) return 1; // Perfect match on tokens

  // Fallback to Levenshtein similarity
  const normalizedStr1 = normalize(str1);
  const normalizedStr2 = normalize(str2);
  const maxLength = Math.max(normalizedStr1.length, normalizedStr2.length);

  if (maxLength === 0) return 0; // Avoid division by zero

  const distance = levenshteinDistance(normalizedStr1, normalizedStr2);
  return 1 - distance / maxLength; // Similarity score (0 to 1)
};

export const convertCookbookItemToScoredRecipe = (
  recipe: CookbookItem,
  pantry: PantryItem[],
): ScoredRecipe => {
  const ingredients = recipe.ingredients;
  let ingredientMatches = 0;
  const matches = [];
  for (const ingredient of ingredients) {
    const ingredientName = ingredient.name;
    // check if we have the ingredient
    let largestMatch = 0;
    // for (const pantryItem of pantry) {
    //   const matchValue = calculateSimilarity(ingredientName, pantryItem.name); // 0 to 1
    //   largestMatch = Math.max(largestMatch, matchValue);
    // }
    const hasMatch = pantry.find(
      (p) => p.spoontacularId === ingredient.spoontacularId,
    );
    if (hasMatch) {
      ingredientMatches++;
      matches.push(ingredient.spoontacularId);
    }
  }
  // we went through all of the ingredients for this recipe and now have the number of matches
  const score = ingredientMatches / ingredients.length;
  const scoredRecipe: ScoredRecipe = { ...recipe, score, matches };
  return scoredRecipe;
};

function convertQuantity(
  quantity: number,
  fromUnit: MEASUREMENT_UNITS,
  toUnit: MEASUREMENT_UNITS,
): number {
  if (fromUnit === toUnit) return quantity;

  const conversionRate = UNIT_CONVERSIONS[fromUnit]?.[toUnit];
  if (conversionRate === undefined) {
    throw new Error(
      `Conversion from ${fromUnit} to ${toUnit} is not supported.`,
    );
  }

  return quantity * conversionRate;
}

export function calculateQuantityDifference(
  pantryItem: PantryItem,
  cookbookIngredient: CookbookIngredient,
  multiplier: number,
): number {
  if (pantryItem.unit !== cookbookIngredient.unit) {
    try {
      const convertedQuantity = convertQuantity(
        pantryItem.quantity,
        pantryItem.unit,
        cookbookIngredient.unit,
      );
      const diff = convertedQuantity - cookbookIngredient.quantity * multiplier;
      return Number(diff.toFixed(2));
    } catch (error: any) {
      throw new Error(`Unable to calculate difference: ${error.message}`);
    }
  }
  const diff = pantryItem.quantity - cookbookIngredient.quantity * multiplier;
  return Number(diff.toFixed(2));
}

// Spoontacular Helpers
export const getFirstIngredient = (
  spoontacularIngredientResponse: SpoontacularIngredientResponse,
) => {
  if (!spoontacularIngredientResponse?.results?.length) {
    return null;
  }
  return spoontacularIngredientResponse.results[0];
};
