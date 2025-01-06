import { Button } from "react-native";
import ConfirmationButton from "./ConfirmationButton";
import { ThemedView } from "./ThemedView";

interface PantryButtonsProps {
  mode: "editing" | "inserting";
  onCancel: () => void;
  onUpdate: () => void;
  onAdd: () => Promise<void>;
  onClear: () => Promise<void>;
}

export default function PantryButtons({
  mode,
  onCancel,
  onAdd,
  onUpdate,
  onClear,
}: PantryButtonsProps) {
  if (mode === "editing") {
    return (
      <ThemedView className="flex flex-row justify-between">
        <Button title="Cancel" onPress={onCancel} />
        <Button title="Update Item" onPress={onUpdate} />
      </ThemedView>
    );
  }
  return (
    <ThemedView className="flex flex-row justify-between">
      <ConfirmationButton
        title="Clear Pantry"
        onConfirm={onClear}
        confirmationMessage="Are you sure you want to clear your pantry? This action cannot be undone."
      />
      <Button title="Add Item" onPress={onAdd} />
    </ThemedView>
  );
}
