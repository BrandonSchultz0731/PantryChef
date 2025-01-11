import { CookbookItem } from "@/types/cookbookItem";

export type ScoredRecipe = CookbookItem & { score: number; matches: number[] };
export type RecipesWithScore = ScoredRecipe[];

export class ScoredRecipes {
  scoredRecipes: RecipesWithScore;
  size: number;

  constructor(scoredRecipes: RecipesWithScore, size: number) {
    this.scoredRecipes = scoredRecipes;
    this.size = size;
  }

  addRecipe(scoredRecipe: ScoredRecipe) {
    if (this.scoredRecipes.length < this.size) {
      // If there's room, just add the new recipe and sort
      this.scoredRecipes.push(scoredRecipe);
    } else {
      // Find the recipe with the worst score
      const worstScoreIndex = this.scoredRecipes.reduce(
        (worstIndex, recipe, index) =>
          recipe.score < this.scoredRecipes[worstIndex].score
            ? index
            : worstIndex,
        0, // Start with the first element
      );

      // Replace the worst recipe if the new score is better
      if (scoredRecipe.score > this.scoredRecipes[worstScoreIndex].score) {
        this.scoredRecipes[worstScoreIndex] = scoredRecipe;
      }
    }

    // Sort recipes by score (descending) after the update
    this.scoredRecipes.sort((a, b) => b.score - a.score);
    return this.scoredRecipes;
  }

  recipesWithScores() {
    return this.scoredRecipes.filter((sr) => sr.score > 0);
  }
}
