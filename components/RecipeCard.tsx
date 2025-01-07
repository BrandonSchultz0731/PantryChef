import React from "react";
import { View, Text } from "react-native";

interface RecipeCardProps {
  recipeName: string;
  cookTime: number; // Cook time in minutes
  prepTime: number; // Prep time in minutes
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipeName,
  cookTime,
  prepTime,
}) => {
  return (
    <View className="bg-slate-800 rounded-lg p-4 m-2 shadow-lg">
      <Text className="text-lg font-bold text-white mb-4">{recipeName}</Text>
      <View className="flex-row justify-between">
        <View className="items-center">
          <Text className="text-sm text-gray-500">Prep Time</Text>
          <Text className="text-base font-semibold text-white">
            {prepTime} mins
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-gray-500">Cook Time</Text>
          <Text className="text-base font-semibold text-white">
            {cookTime} mins
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RecipeCard;
