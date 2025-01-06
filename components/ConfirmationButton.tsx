import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

interface ConfirmationButtonProps {
  title: string;
  onConfirm: () => void;
  confirmationMessage?: string;
}

const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  title,
  onConfirm,
  confirmationMessage = "Are you sure?",
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    onConfirm(); // Perform the confirmed action
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View className="items-center">
      {/* Button */}
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-lg"
        onPress={handlePress}
      >
        <Text className="text-white font-semibold">{title}</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              {confirmationMessage}
            </Text>

            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded-lg"
                onPress={handleCancel}
              >
                <Text className="text-white font-semibold">No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-green-500 px-4 py-2 rounded-lg"
                onPress={handleConfirm}
              >
                <Text className="text-white font-semibold">Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmationButton;
