import { SpoontacularRecipeFromPantryResponse } from "@/types/spoontacularIngredient";
import React from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";

interface SpoontacularRecipeFromIngredientsCardProps {
  spoontacularGeneratedRecipe: SpoontacularRecipeFromPantryResponse | null;
  hasAttemptedToGenerateRecipe: boolean;
}

export const SpoontacularRecipeFromIngredientsCard = ({
  spoontacularGeneratedRecipe,
  hasAttemptedToGenerateRecipe,
}: SpoontacularRecipeFromIngredientsCardProps) => {
  if (!hasAttemptedToGenerateRecipe) {
    return null;
  }
  if (!spoontacularGeneratedRecipe) {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.noRecipeText}>
            No recipe could be generated with the current pantry.
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.cardContainer}>
      {/* Recipe Image */}
      <Image
        source={{ uri: spoontacularGeneratedRecipe.image }}
        style={styles.recipeImage}
      />

      {/* Recipe Info */}
      <View style={styles.infoContainer}>
        {/* Title */}
        <Text style={styles.title}>{spoontacularGeneratedRecipe.title}</Text>

        {/* Likes */}
        <Text style={styles.likes}>
          👍 {spoontacularGeneratedRecipe.likes} Likes
        </Text>

        {/* Used and Missed Ingredients */}
        <View style={styles.ingredientsContainer}>
          <Text style={styles.subtitle}>Used Ingredients:</Text>
          {spoontacularGeneratedRecipe.usedIngredients.map((usedIngredient) => (
            <Text key={usedIngredient.id} style={styles.ingredientText}>
              - {usedIngredient.original}
            </Text>
          ))}

          <Text style={styles.subtitle}>Missed Ingredients:</Text>
          {spoontacularGeneratedRecipe.missedIngredients.map(
            (missedIngredient) => (
              <Text key={missedIngredient.id} style={styles.ingredientText}>
                - {missedIngredient.original}
              </Text>
            ),
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  likes: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  ingredientsContainer: {
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#555",
  },
  ingredientText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
  },
  noRecipeText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    padding: 20,
  },
});
