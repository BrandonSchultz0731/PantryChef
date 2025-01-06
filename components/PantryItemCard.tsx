import { PantryItem } from "@/types/pantryItem";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

interface PantryCardProps {
  item: PantryItem;
  isSelected: boolean;
  isEditing: boolean;
  handleSetSelectedEditedPantryItem: (item: PantryItem) => void;
}

export default function PantryCard({
  item,
  isSelected,
  isEditing,
  handleSetSelectedEditedPantryItem,
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

  return (
    <Pressable onLongPress={() => handleSetSelectedEditedPantryItem(item)}>
      <Animated.View
        style={animatedStyle}
        className={`bg-slate-800 rounded-lg p-4 mb-3 shadow-md ${showCard}`}
      >
        <ThemedText className="text-lg font-bold text-gray-100">
          {item.name}
        </ThemedText>
        <ThemedText className="text-gray-400">
          {item.quantity} {item.unit}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}
