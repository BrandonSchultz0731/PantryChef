import PantryChefContext from "@/app/context/pantryChefContext";
import { CookbookItem } from "@/types/cookbookItem";
import { convertCookbookItemToScoredRecipe } from "@/utils/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Button,
  Animated,
} from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface RecipeCardProps {
  recipe: CookbookItem;
  isSelected: boolean;
  isEditing: boolean;
  handleSetSelectedEditedCookbookItem: (item: CookbookItem) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isEditing,
  isSelected,
  handleSetSelectedEditedCookbookItem,
}) => {
  const { recipe_name, prep_time, cook_time } = recipe;
  const router = useRouter();
  const { handleDeleteCookbookItem, pantry } = useContext(PantryChefContext);

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isSelected) {
      rotation.value = withRepeat(
        withSequence(
          withTiming(-2, { duration: 100 }),
          withTiming(2, { duration: 100 }),
          withTiming(0, { duration: 100 }),
        ),
        -1,
        true,
      );
    } else {
      rotation.value = withTiming(0, { duration: 200 });
    }
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  const handleSelectRecipe = () => {
    const scoredRecipe = convertCookbookItemToScoredRecipe(recipe, pantry);
    router.push({
      pathname: "/RecipeScreen",
      params: { recipeString: JSON.stringify(scoredRecipe) },
    });
  };

  const showCard = !isEditing
    ? "opacity-100"
    : isSelected
      ? "opacity-100"
      : "opacity-20";

  return (
    <Pressable
      onPress={handleSelectRecipe}
      onLongPress={() => handleSetSelectedEditedCookbookItem(recipe)}
    >
      <Animated.View
        style={animatedStyle}
        className={`bg-slate-800 rounded-lg p-4 mb-3 shadow-md ${showCard}`}
      >
        <View>
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
      </Animated.View>
    </Pressable>
  );
};

export default RecipeCard;
