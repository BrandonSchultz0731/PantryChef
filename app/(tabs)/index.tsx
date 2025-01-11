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

export default function HomeScreen() {
  const [foundRecipes, setFoundRecipes] = useState<ScoredRecipe[]>([]);
  const { cookbook, pantry } = useContext(PantryChefContext);

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
      <ThemedView className="flex-1 items-center justify-center p-6">
        <ThemedText type="title">PantryChef</ThemedText>
      </ThemedView>
      <Button onPress={handleFindRecipes} title="Find Recipes" />
      <FoundRecipes recipes={foundRecipes} />
    </ParallaxScrollView>
  );
}
