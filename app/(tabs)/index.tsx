import { Button, Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import "../../global.css";
import { Colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import PantryChefContext from "../context/pantryChefContext";
import { convertCookbookItemToScoredRecipe } from "@/utils/helpers";
import { ScoredRecipe, ScoredRecipes } from "@/utils/ScoredRecipes";
import FoundRecipes from "@/components/FoundRecipes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateRecipe } from "@/api/spoontacularAPI";
import { SpoontacularRecipeFromPantryResponse } from "@/types/spoontacularIngredient";
import { SpoontacularRecipeFromIngredientsCard } from "@/components/SpoontacularRecipeFromIngredientsCard";
import { Spinner } from "@/components/Spinner";

export default function HomeScreen() {
  const [foundRecipes, setFoundRecipes] = useState<ScoredRecipe[]>([]);
  const [generatedRecipe, setGeneratedRecipe] =
    useState<SpoontacularRecipeFromPantryResponse | null>(null);
  const [hasAttemptedToGenerateRecipe, setHasAttemptedToGenerateRecipe] =
    useState(false);
  const { cookbook, pantry } = useContext(PantryChefContext);
  const {
    mutateAsync: generateRecipeMutation,
    isPending: isPendingGeneratedRecipe,
  } = useMutation({
    mutationFn: generateRecipe,
  });

  const handleGenerateRecipe = async () => {
    setHasAttemptedToGenerateRecipe(true);
    const res = await generateRecipeMutation(
      pantry.map((p) => p.spoontacularName),
    );
    if (!res) {
      return;
    }
    setGeneratedRecipe(res);
  };

  const handleFindRecipes = () => {
    const bestMatchedRecipes = new ScoredRecipes([], 3); // adjust this number for however many recipes you want to show
    for (const recipe of cookbook) {
      const scoredRecipe = convertCookbookItemToScoredRecipe(recipe, pantry);
      bestMatchedRecipes.addRecipe(scoredRecipe);
    }
    const recipesWithScores = bestMatchedRecipes.recipesWithScores();
    if (recipesWithScores.length === 0) {
      alert("No recipes found with your pantry. Go shopping!");
      return;
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
          source={require("@/assets/images/home_image.png")}
          className="w-full h-[300] object-contain"
        />
      }
    >
      <Spinner loading={isPendingGeneratedRecipe} />
      <ThemedView className="flex-1 items-center justify-center p-6">
        <ThemedText type="title">PantryChef</ThemedText>
      </ThemedView>
      <Button onPress={handleFindRecipes} title="Find Recipes" />
      <FoundRecipes recipes={foundRecipes} />
      <Button onPress={handleGenerateRecipe} title="Generate Random Recipe" />
      <SpoontacularRecipeFromIngredientsCard
        spoontacularGeneratedRecipe={generatedRecipe}
        hasAttemptedToGenerateRecipe={hasAttemptedToGenerateRecipe}
      />
    </ParallaxScrollView>
  );
}
