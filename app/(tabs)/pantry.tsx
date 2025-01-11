import React, { useContext, useMemo, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Image } from "react-native";
import { MEASUREMENT_UNITS } from "@/constants/measurements";
import PantryList from "@/components/PantryList";
import { PantryItem } from "@/types/pantryItem";
import ManageButtons from "@/components/ManageButtons";
import AddIngredient from "@/components/AddIngredient";
import PantryChefContext from "../context/pantryChefContext";
import { useMutation } from "@tanstack/react-query";
import {} from '@/api/spoontacularAPI'

export default function Pantry() {
  const [newItem, setNewItem] = useState<string>("");
  const [newQuantity, setNewQuantity] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<MEASUREMENT_UNITS>(
    MEASUREMENT_UNITS.OZ,
  );
  const [selectedEditedPantryItem, setSelectedEditedPantryItem] =
    useState<PantryItem | null>(null);
  const {
    pantry,
    handleInsertPantryItem,
    handleClearPantry,
    handleUpdatePantryItem,
  } = useContext(PantryChefContext);
  // const {} = useMutation()

  const sortedPantry = useMemo(() => {
    if (!selectedEditedPantryItem) {
      return pantry.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
    // bring selected edited pantry item to top
    const pantryWithoutSelectedEditedItem = pantry
      .filter((p) => p.id !== selectedEditedPantryItem.id)
      .sort((a, b) => (a.name < b.name ? -1 : 1));
    return [selectedEditedPantryItem, ...pantryWithoutSelectedEditedItem];
  }, [pantry, selectedEditedPantryItem]);

  const addPantryItem = async () => {
    if (newItem.trim() === "" || newQuantity.trim() === "") {
      alert("Please enter a valid item and quantity.");
      return;
    }
    const name = newItem.trim();
    const quantity = Number(newQuantity.trim());
    const unit = selectedUnit;
    if (isNaN(quantity)) {
      alert("The value entered is not a number.");
      return;
    }
    await handleInsertPantryItem(name, quantity, unit);
    setNewItem("");
    setNewQuantity("");
    setSelectedUnit(MEASUREMENT_UNITS.OZ);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/pantry_image.jpg")}
          className="w-full h-[300] object-contain"
        />
      }
    >
      <View>
        <ThemedText>PLAIN {process.env.TEST_API_KEY_PLAIN}</ThemedText>
        <ThemedText>SENSITIVE {process.env.TEST_API_KEY_SENSITIVE}</ThemedText>
        <ThemedText>SECRET {process.env.TEST_API_KEY_SECRET}</ThemedText>
        <ThemedView>
          <ThemedText type="title">Pantry</ThemedText>
        </ThemedView>
        <ThemedText className="text-base leading-6">
          Manage your pantry by adding ingredients here. Press and hold on an
          ingredient to edit.
        </ThemedText>

        <View className="mt-3 px-4">
          <AddIngredient
            newItem={newItem}
            newQuantity={newQuantity}
            selectedUnit={selectedUnit}
            setNewItem={setNewItem}
            setNewQuantity={setNewQuantity}
            setSelectedUnit={setSelectedUnit}
          />
          <ManageButtons
            onAdd={addPantryItem}
            onClear={handleClearPantry}
            onCancel={() => {
              setSelectedEditedPantryItem(null);
              setNewItem("");
              setNewQuantity("");
              setSelectedUnit(MEASUREMENT_UNITS.OZ);
            }}
            onUpdate={async () => {
              if (!selectedEditedPantryItem) {
                return;
              }
              await handleUpdatePantryItem(
                selectedEditedPantryItem.id,
                newItem,
                parseFloat(newQuantity),
                selectedUnit,
              );
              setSelectedEditedPantryItem(null);
              setNewItem("");
              setNewQuantity("");
              setSelectedUnit(MEASUREMENT_UNITS.OZ);
            }}
            mode={Boolean(selectedEditedPantryItem) ? "editing" : "inserting"}
            confirmationMessage="Are you sure you want to clear your pantry? This action cannot be undone"
            addTitle="Add Pantry Item"
            clearTitle="Clear Pantry"
            updateTitle="Update Pantry Item"
          />
        </View>
      </View>
      <PantryList
        pantry={sortedPantry}
        handleSetSelectedEditedPantryItem={(item) => {
          setSelectedEditedPantryItem(item);
          setNewItem(item.name);
          setNewQuantity(item.quantity.toString());
          setSelectedUnit(item.unit);
        }}
        selectedEditedPantryItem={selectedEditedPantryItem}
      />
    </ParallaxScrollView>
  );
}
