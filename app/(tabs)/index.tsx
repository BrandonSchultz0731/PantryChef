import { Button, Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import "../../global.css";
import { Colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import PantryChefContext from "../context/pantryChefContext";
import { calculateSimilarity } from "@/utils/helpers";
import { ScoredRecipe, ScoredRecipes } from "@/utils/ScoredRecipes";
import FoundRecipes from "@/components/FoundRecipes";

export default function HomeScreen() {
  const [foundRecipes, setFoundRecipes] = useState<ScoredRecipe[]>([]);
  const { cookbook, pantry } = useContext(PantryChefContext);

  const handleFindRecipes = () => {
    const bestMatchedRecipes = new ScoredRecipes([], 3); // adjust this number for however many recipes you want to show
    for (const recipe of cookbook) {
      const ingredients = recipe.ingredients;
      let ingredientMatches = 0;
      const matches = [];
      for (const ingredient of ingredients) {
        const ingredientName = ingredient.name;
        // check if we have the ingredient
        let largestMatch = 0;
        for (const pantryItem of pantry) {
          const matchValue = calculateSimilarity(
            ingredientName,
            pantryItem.name,
          ); // 0 to 1
          largestMatch = Math.max(largestMatch, matchValue);
        }
        // assume 80% means we can say we have that ingredient
        if (largestMatch >= 0.8) {
          ingredientMatches++;
          matches.push(ingredient.name);
        }
      }
      // we went through all of the ingredients for this recipe and now have the number of matches
      const score = ingredientMatches / ingredients.length;
      const recipeWithScore: ScoredRecipe = { ...recipe, score, matches };
      bestMatchedRecipes.addRecipe(recipeWithScore);
    }
    setFoundRecipes(bestMatchedRecipes.recipesWithScores());
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.headerBackgroundColor,
        dark: Colors.dark.headerBackgroundColor,
      }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          className="w-full h-[300] object-contain"
        />
      }
    >
      <ThemedView className="flex-1 items-center justify-center p-6">
        <ThemedText type="title">PantryChef</ThemedText>
      </ThemedView>
      <Button onPress={handleFindRecipes} title="Find Recipes" />
      <FoundRecipes recipes={foundRecipes} />
    </ParallaxScrollView>
  );
}
