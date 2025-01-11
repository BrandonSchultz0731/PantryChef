import { PantryItem } from "@/types/pantryItem";
import { ThemedText } from "./ThemedText";
import { Pressable, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PantryCardProps {
  item: PantryItem;
  isSelected: boolean;
  isEditing: boolean;
  handleSetSelectedEditedPantryItem: (item: PantryItem) => void;
  handleDeletePantryItem: (id: number) => Promise<void>;
}

export default function PantryCard({
  item,
  isSelected,
  isEditing,
  handleSetSelectedEditedPantryItem,
  handleDeletePantryItem,
}: PantryCardProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isSelected) {
      rotation.value = withRepeat(
        withSequence(
          withTiming(-2, { duration: 100 }),
          withTiming(2, { duration: 100 }),
          withTiming(0, { duration: 100 }),
        ),
        -1,
        true,
      );
    } else {
      rotation.value = withTiming(0, { duration: 200 });
    }
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  const showCard = !isEditing
    ? "opacity-100"
    : isSelected
      ? "opacity-100"
      : "opacity-20";
  const subTitle =
    item.name.toLowerCase() !== item.spoontacularName.toLowerCase()
      ? `(${item.spoontacularName})`
      : "";

  return (
    <Pressable onLongPress={() => handleSetSelectedEditedPantryItem(item)}>
      <Animated.View
        style={animatedStyle}
        className={`bg-slate-800 rounded-lg p-4 mb-3 shadow-md ${showCard}`}
      >
        <View className="flex flex-row justify-between">
          <View>
            <ThemedText className="text-lg font-bold text-gray-100">
              {item.name} {subTitle}
            </ThemedText>
            <ThemedText className="text-gray-400">
              {item.quantity} {item.unit}
            </ThemedText>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleDeletePantryItem(item.id);
            }}
          >
            <MaterialCommunityIcons name="trash-can" size={32} color="red" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
}
