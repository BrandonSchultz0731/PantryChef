import React, { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  TextInput,
  View,
  Image,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { useCookbook } from "@/hooks/useCookbook";
import AddIngredientButton from "@/components/ui/AddIndredientButton";
import AddIngredient from "@/components/AddIngredient";
import { CookbookIngredients } from "@/types/cookbookItem";
import RecipeCard from "@/components/RecipeCard";

export default function Cookbook() {
  const [recipeName, setRecipeName] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [ingredients, setIngredients] = useState<
    { id: number; name: string; quantity: string; unit: MEASUREMENT_UNITS }[]
  >([]);

  const handleIngredientNameChange = (
    text: string,
    ingredient: {
      id: number;
      name: string;
      quantity: string;
      unit: MEASUREMENT_UNITS;
    },
  ) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ing) =>
        ingredient.id === ing.id ? { ...ing, name: text } : ing,
      ),
    );
  };
  const handleIngredientQuantityChange = (
    text: string,
    ingredient: {
      id: number;
      name: string;
      quantity: string;
      unit: MEASUREMENT_UNITS;
    },
  ) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ing) =>
        ingredient.id === ing.id ? { ...ing, quantity: text } : ing,
      ),
    );
  };
  const handleIngredientUnitChange = (
    text: MEASUREMENT_UNITS,
    ingredient: {
      id: number;
      name: string;
      quantity: string;
      unit: MEASUREMENT_UNITS;
    },
  ) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ing) =>
        ingredient.id === ing.id ? { ...ing, unit: text } : ing,
      ),
    );
  };

  const { cookbook, handleInsertCookbookItem } = useCookbook();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <Image
            source={require("@/assets/images/cookbook-image.png")}
            className="w-full h-[300] object-contain"
          />
        }
      >
        <ThemedView>
          <ThemedText type="title">Cookbook</ThemedText>
        </ThemedView>
        <ThemedText className="text-base leading-6">
          Here is where you can add and save all of your recipes.
        </ThemedText>
        <ThemedView className="py-10">
          <ThemedView className="my-5 px-4">
            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-4 bg-white"
              placeholder="Recipe Name"
              placeholderTextColor={"gray"}
              value={recipeName}
              onChangeText={setRecipeName}
            />
          </ThemedView>
          {ingredients.map((ingredient) => (
            <AddIngredient
              key={ingredient.id}
              newItem={ingredient.name}
              newQuantity={ingredient.quantity.toString()}
              selectedUnit={ingredient.unit}
              setNewItem={(value) =>
                handleIngredientNameChange(value as string, ingredient)
              }
              setNewQuantity={(value) =>
                handleIngredientQuantityChange(value as string, ingredient)
              }
              setSelectedUnit={(value) =>
                handleIngredientUnitChange(
                  value as MEASUREMENT_UNITS,
                  ingredient,
                )
              }
            />
          ))}
          <View className="flex items-center pb-7">
            <AddIngredientButton
              onPress={() => {
                setIngredients((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    name: "",
                    quantity: "",
                    unit: MEASUREMENT_UNITS.OZ,
                  },
                ]);
              }}
            />
          </View>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-4 bg-white"
            placeholder="Prep Time (min)"
            placeholderTextColor={"gray"}
            keyboardType="numeric"
            value={prepTime}
            onChangeText={setPrepTime}
          />
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-4 bg-white"
            placeholder="Cook Time (min)"
            placeholderTextColor={"gray"}
            keyboardType="numeric"
            value={cookTime}
            onChangeText={setCookTime}
          />
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-4 bg-white h-20"
            placeholder="Instructions"
            placeholderTextColor={"gray"}
            value={instructions}
            onChangeText={setInstructions}
            multiline
          />
          <Button
            title="Add Recipe"
            onPress={() => {
              if (
                !recipeName ||
                ingredients.length === 0 ||
                !prepTime ||
                !cookTime
              ) {
                alert("Please fill out all of the information");
                return;
              }
              const ingredientsWithoutID = ingredients.map((ing) => ({
                name: ing.name,
                quantity: parseInt(ing.quantity),
                unit: ing.unit,
              })) as CookbookIngredients;
              handleInsertCookbookItem(
                recipeName,
                ingredientsWithoutID,
                parseInt(prepTime),
                parseInt(cookTime),
                instructions,
              );
              setRecipeName("");
              setIngredients([]);
              setCookTime("");
              setPrepTime("");
              setInstructions("");
            }}
          />
          {cookbook.map((cb) => (
            <RecipeCard
              key={cb.id}
              recipeName={cb.recipe_name}
              cookTime={cb.cook_time}
              prepTime={cb.prep_time}
            />
          ))}
        </ThemedView>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}
