import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { useState } from "react";
import { View } from "react-native";
import CustomPicker from "./CustomPicker";
import ThemedTextInput from "./ThemedTextInput";

interface AddIngredientProps {
  newItem: string;
  newQuantity: string;
  selectedUnit: MEASUREMENT_UNITS;
  setNewItem: React.Dispatch<React.SetStateAction<string>>;
  setNewQuantity: React.Dispatch<React.SetStateAction<string>>;
  setSelectedUnit: React.Dispatch<React.SetStateAction<MEASUREMENT_UNITS>>;
  placeholder?: string;
}

export default function AddIngredient({
  newItem,
  newQuantity,
  selectedUnit,
  placeholder = "Add a pantry item",
  setNewItem,
  setNewQuantity,
  setSelectedUnit,
}: AddIngredientProps) {
  return (
    <View className="py-5">
      <ThemedTextInput
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        value={newItem}
        onChangeText={setNewItem}
      />
      <View className="flex-row gap-2 mb-4">
        <ThemedTextInput
          className="flex-1 h-full"
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
    </View>
  );
}
