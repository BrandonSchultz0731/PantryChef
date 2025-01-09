import React, { useMemo } from "react";
import { Text, Pressable } from "react-native";
import { ScoredRecipe } from "@/utils/ScoredRecipes";
import { useRouter } from "expo-router";

interface FoundRecipeCardProps {
  recipe: ScoredRecipe;
}

const FoundRecipeCard = ({ recipe }: FoundRecipeCardProps) => {
  const router = useRouter();
  const scorePercent = useMemo(() => {
    const percent = recipe.score * 100;
    return `${percent.toFixed(2)}%`;
  }, [recipe]);
  const handleSelectRecipe = () => {
    router.push({
      pathname: "/RecipeScreen",
      params: { recipeString: JSON.stringify(recipe) },
    });
  };
  return (
    <Pressable
      onPress={handleSelectRecipe}
      className="bg-white rounded-lg p-4 mb-4 shadow-md"
    >
      <Text className="text-lg font-bold mb-2">{recipe.recipe_name}</Text>
      <Text className="text-gray-600">Score: {scorePercent}</Text>
    </Pressable>
  );
};

export default FoundRecipeCard;
