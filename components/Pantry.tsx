import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';

type Inventory = string[];

type Recipes = {
  name: string;
  ingredients: Inventory;
  instructions: string;
};

const Pantry = () => {
  const [inventory, setInventory] = useState<Inventory>([]);
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const [newItem, setNewItem] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');

  const addItemToInventory = () => {
    if (newItem.trim() === '') {
      Alert.alert('Error', 'Item cannot be empty.');
      return;
    }
    setInventory([...inventory, newItem.trim()]);
    setNewItem('');
  };

  const addRecipe = () => {
    if (!recipeName || !recipeIngredients || !recipeInstructions) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    const ingredientsList = recipeIngredients.split(',').map((item) => item.trim());
    setRecipes([
      ...recipes,
      { name: recipeName, ingredients: ingredientsList, instructions: recipeInstructions },
    ]);
    setRecipeName('');
    setRecipeIngredients('');
    setRecipeInstructions('');
  };

  const generateRecipes = () => {
    const availableRecipes = recipes
      .map((recipe) => {
        const matchingIngredients = recipe.ingredients.filter((ingredient) =>
          inventory.includes(ingredient)
        );
        const matchPercentage = (matchingIngredients.length / recipe.ingredients.length) * 100;
        return { ...recipe, matchPercentage };
      })
      .filter((recipe) => recipe.matchPercentage >= 50);

    if (availableRecipes.length === 0) {
      Alert.alert('No Recipes', 'No recipes can be made with the current inventory.');
      return;
    }

    const sortedRecipes = availableRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);
    Alert.alert(
      'Available Recipes',
      sortedRecipes
        .map((recipe) => `${recipe.name} (${Math.round(recipe.matchPercentage)}% match)`)
        .join('\n')
    );
  };

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center color-white">Grocery Inventory</Text>

      {/* Inventory Section */}
      <View className="mb-6">
        <Text className="text-lg font-bold mb-2">Add Item to Inventory</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-4 bg-white"
          placeholder="Enter item"
          value={newItem}
          onChangeText={setNewItem}
        />
        <Button title="Add Item" onPress={addItemToInventory} />
        <FlatList
          data={inventory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text className="text-base py-2 border-b border-gray-300">{item}</Text>}
        />
      </View>

      {/* Recipes Section */}
      <View className="mb-6">
        <Text className="text-lg font-bold mb-2">Add a Recipe</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-2 bg-white"
          placeholder="Recipe Name"
          value={recipeName}
          onChangeText={setRecipeName}
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-2 bg-white"
          placeholder="Ingredients (comma separated)"
          value={recipeIngredients}
          onChangeText={setRecipeIngredients}
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-4 bg-white"
          placeholder="Instructions"
          value={recipeInstructions}
          onChangeText={setRecipeInstructions}
        />
        <Button title="Add Recipe" onPress={addRecipe} />
        <FlatList
          data={recipes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="mb-4 p-3 border border-gray-300 rounded-md bg-white">
              <Text className="text-lg font-bold mb-1">{item.name}</Text>
              <Text className="text-sm mb-1">Ingredients: {item.ingredients.join(', ')}</Text>
              <Text className="text-sm">Instructions: {item.instructions}</Text>
            </View>
          )}
        />
      </View>

      {/* Generate Recipes Button */}
      <Button title="Generate Recipes" onPress={generateRecipes} />
    </View>
  );
};

export default Pantry;
