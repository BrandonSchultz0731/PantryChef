import { PantryItem } from "@/types/pantryItem";
import { ThemedView } from "./ThemedView";
import PantryCard from "./PantryItemCard";
import { ThemedText } from "./ThemedText";
import { useContext } from "react";
import PantryChefContext from "@/app/context/pantryChefContext";

interface PantryListProps {
  pantry: PantryItem[];
  selectedEditedPantryItem: PantryItem | null;
  handleSetSelectedEditedPantryItem: (item: PantryItem) => void;
}

export default function PantryList({
  pantry,
  selectedEditedPantryItem,
  handleSetSelectedEditedPantryItem,
}: PantryListProps) {
  const { handleDeletePantryItem } = useContext(PantryChefContext);
  if (!pantry || pantry.length === 0) {
    return (
      <ThemedView>
        <ThemedText type="title">No items in pantry :(</ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedView>
      {pantry.map((item) => (
        <PantryCard
          key={item.id}
          item={item}
          isSelected={selectedEditedPantryItem?.id === item.id}
          handleSetSelectedEditedPantryItem={handleSetSelectedEditedPantryItem}
          isEditing={Boolean(selectedEditedPantryItem)}
          handleDeletePantryItem={handleDeletePantryItem}
        />
      ))}
    </ThemedView>
  );
}
