import { Button } from "react-native";
import ConfirmationButton from "./ConfirmationButton";
import { ThemedView } from "./ThemedView";

interface ManageButtonsProps {
  mode: "editing" | "inserting";
  onCancel: () => void;
  onUpdate: () => void;
  onAdd: () => Promise<void>;
  onClear: () => Promise<void>;
  clearTitle: string;
  addTitle: string;
  updateTitle: string;
  confirmationMessage: string;
}

export default function ManageButtons({
  mode,
  onCancel,
  onAdd,
  onUpdate,
  onClear,
  clearTitle,
  addTitle,
  updateTitle,
  confirmationMessage,
}: ManageButtonsProps) {
  if (mode === "editing") {
    return (
      <ThemedView className="flex flex-row justify-between">
        <Button title="Cancel" onPress={onCancel} />
        <Button title={updateTitle} onPress={onUpdate} />
      </ThemedView>
    );
  }
  return (
    <ThemedView className="flex flex-row justify-between my-4">
      <ConfirmationButton
        title={clearTitle}
        onConfirm={onClear}
        confirmationMessage={confirmationMessage}
      />
      <Button title={addTitle} onPress={onAdd} />
    </ThemedView>
  );
}
