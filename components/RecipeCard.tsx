import { CookbookItem } from "@/types/cookbookItem";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Pressable } from "react-native";

interface RecipeCardProps {
  recipe: CookbookItem;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { recipe_name, prep_time, cook_time } = recipe;
  const router = useRouter();
  const handleSelectRecipe = () => {
    router.push({
      pathname: "/RecipeScreen",
      params: { recipeString: JSON.stringify(recipe) },
    });
  };
  return (
    <Pressable onPress={handleSelectRecipe}>
      <View className="bg-slate-800 rounded-lg p-4 m-2 shadow-lg">
        <Text className="text-lg font-bold text-white mb-4">{recipe_name}</Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-sm text-gray-500">Prep Time</Text>
            <Text className="text-base font-semibold text-white">
              {prep_time} mins
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-sm text-gray-500">Cook Time</Text>
            <Text className="text-base font-semibold text-white">
              {cook_time} mins
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RecipeCard;
