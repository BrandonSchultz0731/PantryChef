import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { convertRecipeToObject } from "@/utils/helpers";

export default function RecipeScreen() {
  const { recipeString } = useLocalSearchParams<{ recipeString: string }>();
  const recipe = convertRecipeToObject(recipeString);

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
              let color;
              if ("matches" in recipe) {
                color = recipe.matches.includes(ingredient.name)
                  ? "green"
                  : "red";
              }
              return (
                <ThemedText
                  key={index}
                  style={{ ...styles.ingredientText, color }}
                >
                  - {ingredient.name} ({ingredient.quantity} {ingredient.unit})
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
