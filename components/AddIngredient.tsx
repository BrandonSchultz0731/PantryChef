import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { useState } from "react";
import { TextInput, View } from "react-native";
import CustomPicker from "./CustomPicker";

interface AddIngredientProps {
  newItem: string;
  newQuantity: string;
  selectedUnit: MEASUREMENT_UNITS;
  setNewItem: React.Dispatch<React.SetStateAction<string>>;
  setNewQuantity: React.Dispatch<React.SetStateAction<string>>;
  setSelectedUnit: React.Dispatch<React.SetStateAction<MEASUREMENT_UNITS>>;
}

export default function AddIngredient({
  newItem,
  newQuantity,
  selectedUnit,
  setNewItem,
  setNewQuantity,
  setSelectedUnit,
}: AddIngredientProps) {
  return (
    <View className="py-5">
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
    </View>
  );
}
