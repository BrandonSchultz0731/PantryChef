import React from "react";
import { TextInput, TextInputProps } from "react-native";

const ThemedTextInput = ({
  value,
  onChangeText,
  placeholder,
  className = "",
  ...props
}: TextInputProps) => {
  return (
    <TextInput
      className={`bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg px-4 py-2 transition-all duration-200 outline-none shadow-sm p-2 mb-4 ${className}`}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
};

export default ThemedTextInput;
