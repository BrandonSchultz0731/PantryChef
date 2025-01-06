import React, { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TextInput, Button, View, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { usePantry } from "@/hooks/usePantry";

export default function Pantry() {
  const [newItem, setNewItem] = useState<string>("");
  const [newQuantity, setNewQuantity] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<MEASUREMENT_UNITS>(
    MEASUREMENT_UNITS.OZ,
  );
  const { pantry, handleInsertPantryItem } = usePantry();

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
              placeholderTextColor={"gray"}
              value={newQuantity}
              onChangeText={setNewQuantity}
            />
            <View className="flex-1 border border-gray-300 rounded-md bg-white h-20 justify-center overflow-hidden">
              <Picker
                selectedValue={selectedUnit}
                onValueChange={(itemValue) => setSelectedUnit(itemValue)}
              >
                <Picker.Item
                  label={MEASUREMENT_UNITS.OZ}
                  value={MEASUREMENT_UNITS.OZ}
                  color="gray"
                />
                <Picker.Item
                  label={MEASUREMENT_UNITS.CUPS}
                  value={MEASUREMENT_UNITS.CUPS}
                  color="gray"
                />
                <Picker.Item
                  label={MEASUREMENT_UNITS.GRAMS}
                  value={MEASUREMENT_UNITS.GRAMS}
                  color="gray"
                />
                <Picker.Item
                  label={MEASUREMENT_UNITS.LITERS}
                  value={MEASUREMENT_UNITS.LITERS}
                  color="gray"
                />
                <Picker.Item
                  label={MEASUREMENT_UNITS.COUNT}
                  value={MEASUREMENT_UNITS.COUNT}
                  color="gray"
                />
              </Picker>
            </View>
          </View>
          <Button title="Add Item" onPress={addPantryItem} />
        </View>
      </View>
      <ThemedView>
        {pantry.map((item) => (
          <ThemedText key={item.id}>
            {item.name} - {item.quantity} {item.unit}
          </ThemedText>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}
