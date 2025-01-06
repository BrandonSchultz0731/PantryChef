import { Text, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  lightColor,
  darkColor,
  type = "default",
  className = "",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  // Define Tailwind classes for each type
  const typeClasses = {
    default: "text-base",
    defaultSemiBold: "text-base font-semibold",
    title: "text-4xl font-bold",
    subtitle: "text-xl font-bold",
    link: "text-base text-blue-600",
  };

  // Combine the selected type class with any custom className
  const combinedClasses = `${typeClasses[type]} ${className}`.trim();

  return <Text style={{ color }} className={combinedClasses} {...rest} />;
}
