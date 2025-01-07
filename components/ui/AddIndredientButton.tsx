import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  GestureResponderEvent,
} from "react-native";

interface AddIngredientButtonProps {
  onPress: (event: GestureResponderEvent) => void; // Function to handle button press
}

const AddIngredientButton: React.FC<AddIngredientButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    alignItems: "center",
  },
  plus: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default AddIngredientButton;
