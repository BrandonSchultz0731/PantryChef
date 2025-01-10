import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useContext } from "react";
import PantryChefContext from "@/app/context/pantryChefContext";
import { CookbookItem } from "@/types/cookbookItem";
import RecipeCard from "./RecipeCard";

interface CookbookListProps {
  cookbook: CookbookItem[];
  selectedEditedCookbookItem: CookbookItem | null;
  handleSetSelectedEditedCookbookItem: (item: CookbookItem) => void;
}

export default function CookbookList({
  cookbook,
  selectedEditedCookbookItem,
  handleSetSelectedEditedCookbookItem,
}: CookbookListProps) {
  const { handleDeleteCookbookItem } = useContext(PantryChefContext);
  if (!cookbook || cookbook.length === 0) {
    return (
      <ThemedView>
        <ThemedText type="title">No items in Cookbook :(</ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedView>
      {cookbook.map((item) => (
        <RecipeCard
          key={item.id}
          recipe={item}
          isSelected={selectedEditedCookbookItem?.id === item.id}
          handleSetSelectedEditedCookbookItem={
            handleSetSelectedEditedCookbookItem
          }
          isEditing={Boolean(selectedEditedCookbookItem)}
        />
      ))}
    </ThemedView>
  );
}
