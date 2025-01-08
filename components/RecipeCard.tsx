import PantryChefContext from "@/app/context/pantryChefContext";
import { CookbookItem } from "@/types/cookbookItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

interface RecipeCardProps {
  recipe: CookbookItem;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { recipe_name, prep_time, cook_time } = recipe;
  const router = useRouter();
  const { handleDeleteCookbookItem } = useContext(PantryChefContext);

  const handleSelectRecipe = () => {
    router.push({
      pathname: "/RecipeScreen",
      params: { recipeString: JSON.stringify(recipe) },
    });
  };

  return (
    <Pressable onPress={handleSelectRecipe}>
      <View className="bg-slate-800 rounded-lg p-4 m-2 shadow-lg relative">
        <View className="flex flex-row justify-between">
          <Text className="text-lg font-bold text-white mb-4">
            {recipe_name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleDeleteCookbookItem(recipe.id);
            }}
          >
            <MaterialCommunityIcons name="trash-can" size={32} color="red" />
          </TouchableOpacity>
        </View>
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
