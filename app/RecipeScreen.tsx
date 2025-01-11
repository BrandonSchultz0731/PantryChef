import React, { useContext, useState } from "react";
import { StyleSheet, ScrollView, View, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  calculateQuantityDifference,
  convertRecipeToObject,
} from "@/utils/helpers";
import { ScoredRecipe } from "@/utils/ScoredRecipes";
import { MadeRecipeModal } from "@/components/MadeRecipeModal";
import PantryChefContext from "./context/pantryChefContext";

export default function RecipeScreen() {
  const { recipeString } = useLocalSearchParams<{ recipeString: string }>();
  const recipe = convertRecipeToObject(recipeString) as ScoredRecipe;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleUpdatePantryItem, pantry } = useContext(PantryChefContext);
  const handleUpdatePantryQuantity = async (
    checkedIngredients: { [x in string]: boolean },
    multiplier: number,
  ) => {
    for (const spoontacularId of Object.keys(checkedIngredients)) {
      if (!checkedIngredients[spoontacularId]) {
        // skip over ingredients that weren't checked
        continue;
      }
      const pantryItemFromSpoontacularId = pantry.find(
        (p) => p.spoontacularId.toString() == spoontacularId,
      );
      if (!pantryItemFromSpoontacularId) {
        console.log(`Could not find ingredient in pantry list`);
        continue;
      }
      const cookbookIngredient = recipe.ingredients.find(
        (ci) => ci.spoontacularId.toString() === spoontacularId,
      );
      if (!cookbookIngredient) {
        console.log(`Could not find ingredient in recipe`);
        continue;
      }
      // we found the pantry item and cookbook ingredient
      const newQuantity = calculateQuantityDifference(
        pantryItemFromSpoontacularId,
        cookbookIngredient,
        multiplier,
      );
      await handleUpdatePantryItem(
        pantryItemFromSpoontacularId.id,
        pantryItemFromSpoontacularId.name,
        newQuantity,
        pantryItemFromSpoontacularId.unit,
      );
    }
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.recipeName}>
            {recipe.recipe_name}
          </ThemedText>
          <View style={styles.section}>
            <ThemedText style={styles.sectionHeader}>Ingredients</ThemedText>
            {recipe.ingredients.map((ingredient, index) => {
              const subTitle =
                ingredient.name.toLowerCase() !==
                ingredient.spoontacularName.toLowerCase()
                  ? `(${ingredient.spoontacularName})`
                  : "";
              // TODO: Modify this so that it also checks if we have enough of the ingredient
              const color = recipe.matches.includes(ingredient.spoontacularId)
                ? "green"
                : "red";
              return (
                <ThemedText
                  key={index}
                  style={{ ...styles.ingredientText, color }}
                >
                  - {ingredient.name} {subTitle} ({ingredient.quantity}{" "}
                  {ingredient.unit})
                </ThemedText>
              );
            })}
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionHeader}>
              Preparation Time
            </ThemedText>
            <ThemedText style={styles.timeText}>
              {recipe.prep_time} minutes
            </ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionHeader}>Cooking Time</ThemedText>
            <ThemedText style={styles.timeText}>
              {recipe.cook_time} minutes
            </ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionHeader}>Instructions</ThemedText>
            <ThemedText style={styles.instructionsText}>
              {recipe.instructions}
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
      <Button onPress={() => setIsModalVisible(true)} title="Made Recipe" />
      <MadeRecipeModal
        scoredRecipe={recipe}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        onConfirm={handleUpdatePantryQuantity}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 16,
    color: "#555",
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
  },
});
