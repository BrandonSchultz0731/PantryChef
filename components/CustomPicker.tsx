import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

// Define a generic utility type to infer the type of the enum values
type EnumType = { [key: string]: string | number };

interface CustomPickerProps<K extends string | number, E extends EnumType> {
  selectedValue: K;
  handleSetSelectedValue: (value: K) => void;
  enumType: E;
}

export default function CustomPicker<
  K extends string | number,
  E extends EnumType,
>({
  selectedValue,
  handleSetSelectedValue,
  enumType,
}: CustomPickerProps<K, E>) {
  return (
    <View className="flex-1 border border-gray-300 rounded-md bg-white h-20 justify-center overflow-hidden">
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleSetSelectedValue}
      >
        {Object.keys(enumType).map((key) => {
          const enumKey = key as keyof E;
          const value = enumType[enumKey];
          return (
            <Picker.Item
              key={value}
              label={value.toString()}
              value={value}
              color="gray"
            />
          );
        })}
      </Picker>
    </View>
  );
}
