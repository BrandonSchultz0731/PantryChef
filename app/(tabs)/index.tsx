import { Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import "../../global.css";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.headerBackgroundColor,
        dark: Colors.dark.headerBackgroundColor,
      }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          className="w-full h-[300] object-contain"
        />
      }
    >
      <ThemedView className="flex-1 items-center justify-center p-6">
        <ThemedText type="title">PantryChef</ThemedText>
        <ThemedText type="default">
          Add all of your ingredients you have and see what recipes you can
          make!
        </ThemedText>
      </ThemedView>
      <ThemedView className="flex-1 p-6"></ThemedView>
    </ParallaxScrollView>
  );
}
