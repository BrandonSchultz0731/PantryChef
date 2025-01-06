import React, { useMemo, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TextInput, View, Image } from "react-native";
import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { usePantry } from "@/hooks/usePantry";
import CustomPicker from "@/components/CustomPicker";
import PantryList from "@/components/PantryList";
import { PantryItem } from "@/types/pantryItem";
import PantryButtons from "@/components/PantryButtons";

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
  } = usePantry();

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
        <ThemedView>
          <ThemedText type="title">Pantry</ThemedText>
        </ThemedView>
        <ThemedText className="text-base leading-6">
          Manage your pantry by adding ingredients here.
        </ThemedText>

        <View className="my-5 px-4">
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-4 bg-white"
            placeholder="Add a pantry item"
            placeholderTextColor={"gray"}
            value={newItem}
            onChangeText={setNewItem}
          />
          <View className="flex-row gap-2 items-center mb-4">
            <TextInput
              className="flex-1 border border-gray-300 rounded-md p-2 bg-white h-12"
              placeholder="Enter quantity"
              keyboardType="numeric"
              placeholderTextColor={"gray"}
              value={newQuantity}
              onChangeText={setNewQuantity}
            />
            <CustomPicker
              selectedValue={selectedUnit}
              handleSetSelectedValue={setSelectedUnit}
              enumType={MEASUREMENT_UNITS}
            />
          </View>
          <PantryButtons
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
              console.log("UPDATING PANTRY ITEM ", selectedEditedPantryItem.id);
              await handleUpdatePantryItem(
                selectedEditedPantryItem.id,
                newItem,
                Number(newQuantity),
                selectedUnit,
              );
              setSelectedEditedPantryItem(null);
              setNewItem("");
              setNewQuantity("");
              setSelectedUnit(MEASUREMENT_UNITS.OZ);
            }}
            mode={Boolean(selectedEditedPantryItem) ? "editing" : "inserting"}
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
