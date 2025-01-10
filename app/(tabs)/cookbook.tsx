import React, { useContext, useMemo, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { MEASUREMENT_UNITS } from "@/constants/measurements";
import AddIngredientButton from "@/components/ui/AddIndredientButton";
import AddIngredient from "@/components/AddIngredient";
import { CookbookIngredients, CookbookItem } from "@/types/cookbookItem";
import ThemedTextInput from "@/components/ThemedTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PantryChefContext from "../context/pantryChefContext";
import ManageButtons from "@/components/ManageButtons";
import CookbookList from "@/components/CookbookList";

type CookbookIngredient = {
  id: number;
  name: string;
  quantity: string;
  unit: MEASUREMENT_UNITS;
};

export default function Cookbook() {
  const [recipeName, setRecipeName] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [ingredients, setIngredients] = useState<CookbookIngredient[]>([
    {
      id: Date.now(),
      name: "",
      quantity: "",
      unit: MEASUREMENT_UNITS.OZ,
    },
  ]);
  const [selectedEditedCookbookItem, setSelectedEditedCookbookItem] =
    useState<CookbookItem | null>(null);
  const { handleInsertCookbookItem, handleUpdateCookbookItem, cookbook } =
    useContext(PantryChefContext);
  const canDeleteIngredient = ingredients.length > 1;

  const sortedCookbook = useMemo(() => {
    if (!selectedEditedCookbookItem) {
      return cookbook.sort((a, b) => (a.recipe_name < b.recipe_name ? -1 : 1));
    }
    // bring selected edited pantry item to top
    const cookbookWithoutSelectedEditedItem = cookbook
      .filter((c) => c.id !== selectedEditedCookbookItem.id)
      .sort((a, b) => (a.recipe_name < b.recipe_name ? -1 : 1));
    return [selectedEditedCookbookItem, ...cookbookWithoutSelectedEditedItem];
  }, [cookbook, selectedEditedCookbookItem]);

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
    ingredient: CookbookIngredient,
  ) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ing) =>
        ingredient.id === ing.id ? { ...ing, unit: text } : ing,
      ),
    );
  };

  const handleRemoveIngredient = (ingredient: CookbookIngredient) => {
    if (!canDeleteIngredient) {
      return;
    }
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ing) => ing.id !== ingredient.id),
    );
  };

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
            <ThemedTextInput
              placeholder="Recipe Name"
              placeholderTextColor={"gray"}
              value={recipeName}
              onChangeText={setRecipeName}
            />
          </ThemedView>
          {ingredients.map((ingredient) => (
            <ThemedView key={ingredient.id}>
              <TouchableOpacity
                onPress={() => {
                  handleRemoveIngredient(ingredient);
                }}
                disabled={!canDeleteIngredient}
              >
                <MaterialCommunityIcons
                  name="trash-can"
                  size={24}
                  color={`${canDeleteIngredient ? "red" : "gray"}`}
                />
              </TouchableOpacity>
              <AddIngredient
                placeholder="Ingredient Name"
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
            </ThemedView>
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
          <ThemedTextInput
            placeholder="Prep Time (min)"
            placeholderTextColor={"gray"}
            keyboardType="numeric"
            value={prepTime}
            onChangeText={setPrepTime}
          />
          <ThemedTextInput
            placeholder="Cook Time (min)"
            placeholderTextColor={"gray"}
            keyboardType="numeric"
            value={cookTime}
            onChangeText={setCookTime}
          />
          <ThemedTextInput
            className="h-20"
            placeholder="Instructions"
            placeholderTextColor={"gray"}
            value={instructions}
            onChangeText={setInstructions}
            multiline
          />
          <ManageButtons
            onAdd={async () => {
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
                quantity: parseFloat(ing.quantity),
                unit: ing.unit,
              })) as CookbookIngredients;
              await handleInsertCookbookItem(
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
            onClear={async () => {}}
            onCancel={() => {
              setSelectedEditedCookbookItem(null);
              setRecipeName("");
              setIngredients([]);
              setCookTime("");
              setPrepTime("");
              setInstructions("");
            }}
            onUpdate={async () => {
              if (!selectedEditedCookbookItem) {
                return;
              }
              const mappedIngredients = ingredients.map((ing) => ({
                ...ing,
                quantity: parseFloat(ing.quantity),
              }));
              handleUpdateCookbookItem(
                selectedEditedCookbookItem.id,
                recipeName,
                mappedIngredients,
                parseInt(prepTime),
                parseInt(cookTime),
                instructions,
              );
              setSelectedEditedCookbookItem(null);
              setRecipeName("");
              setIngredients([]);
              setCookTime("");
              setPrepTime("");
              setInstructions("");
            }}
            mode={Boolean(selectedEditedCookbookItem) ? "editing" : "inserting"}
            confirmationMessage="Are you sure you want to clear your cookbook? This action cannot be undone"
            addTitle="Add Cookbook Item"
            clearTitle="Clear Cookbook"
            updateTitle="Update Cookbook Item"
          />
          <CookbookList
            cookbook={sortedCookbook}
            handleSetSelectedEditedCookbookItem={(item) => {
              const ingredientsWithID = item.ingredients.map((ing) => ({
                ...ing,
                id: Date.now(),
                quantity: ing.quantity.toString(),
              }));
              setSelectedEditedCookbookItem(item);
              setRecipeName(item.recipe_name);
              setCookTime(item.cook_time.toString());
              setPrepTime(item.prep_time.toString());
              setInstructions(item.instructions);
              setIngredients(ingredientsWithID);
            }}
            selectedEditedCookbookItem={selectedEditedCookbookItem}
          />
        </ThemedView>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}
