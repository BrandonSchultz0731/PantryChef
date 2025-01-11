import { Modal, TouchableOpacity } from "react-native";
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import CustomPicker from "./CustomPicker";
import { ScoredRecipe } from "@/utils/ScoredRecipes";

interface MadeRecipeModalProps {
  isModalVisible: boolean;
  scoredRecipe: ScoredRecipe;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (
    checkedIngredients: { [x in string]: boolean },
    multiplier: number,
  ) => Promise<void>;
}

enum MULTIPLIERS {
  ONE = "1",
  TWO = "2",
  THREE = "3",
}

export const MadeRecipeModal = ({
  isModalVisible,
  scoredRecipe,
  setIsModalVisible,
  onConfirm,
}: MadeRecipeModalProps) => {
  const [multiplier, setMultiplier] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState<{
    [x in number]: boolean;
  }>({});
  return (
    <Modal
      transparent
      visible={isModalVisible}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <ThemedView className="flex-1 justify-center items-center bg-black/50">
        <ThemedView className="bg-white p-6 rounded-lg w-4/5">
          <ThemedText className="text-lg font-semibold text-gray-800 mb-4">
            Multiplier
          </ThemedText>
          <CustomPicker
            selectedValue={multiplier}
            handleSetSelectedValue={setMultiplier}
            enumType={MULTIPLIERS}
          />
          <ThemedView className="flex flex-col my-20 gap-y-4">
            {scoredRecipe.ingredients.map((sr) => (
              <BouncyCheckbox
                key={`${sr.name}-${sr.quantity}-${sr.unit}`}
                isChecked={checkedIngredients[sr.spoontacularId]}
                fillColor="green"
                size={30}
                iconStyle={{ borderColor: "green" }}
                onPress={(checked: boolean) => {
                  setCheckedIngredients((prev) => {
                    return {
                      ...prev,
                      [sr.spoontacularId]: checked,
                    };
                  });
                }}
                textComponent={
                  <ThemedText className="ml-3">{sr.name}</ThemedText>
                }
              />
            ))}
          </ThemedView>
          <ThemedView className="flex-row justify-between mt-6">
            <TouchableOpacity
              className="bg-red-500 px-4 py-2 rounded-lg"
              onPress={() => setIsModalVisible(false)}
            >
              <ThemedText className="text-white font-semibold">
                Cancel
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-green-500 px-4 py-2 rounded-lg"
              onPress={() => {
                onConfirm(checkedIngredients, multiplier);
              }}
            >
              <ThemedText className="text-white font-semibold">
                Confirm
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};
