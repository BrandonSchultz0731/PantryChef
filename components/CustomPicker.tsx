import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

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
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View className="flex-1 rounded-md bg-white justify-center overflow-hidden">
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={Object.values(enumType).map((key) => ({
          label: key,
          value: key,
        }))}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={selectedValue.toString()}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          const value = item.value as K;
          handleSetSelectedValue(value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <FontAwesome
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="balance-scale"
            size={20}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
