import React from "react";
import { View } from "react-native";
import FoundRecipeCard from "./FoundRecipeCard";
import { ScoredRecipe } from "@/utils/ScoredRecipes";

interface FoundRecipesProps {
  recipes: ScoredRecipe[];
}

const FoundRecipes = ({ recipes }: FoundRecipesProps) => {
  return (
    <View>
      {recipes.map((r) => (
        <FoundRecipeCard key={r.id} recipe={r} />
      ))}
    </View>
  );
};

export default FoundRecipes;
