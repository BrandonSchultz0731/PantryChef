import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import PantryChefContext from "./context/pantryChefContext";
import { usePantry } from "@/hooks/usePantry";
import { useCookbook } from "@/hooks/useCookbook";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const {
    pantry,
    handleClearPantry,
    handleDeletePantryItem,
    handleInsertPantryItem,
    handleUpdatePantryItem,
  } = usePantry();
  const { cookbook, handleInsertCookbookItem, handleDeleteCookbookItem } =
    useCookbook();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PantryChefContext.Provider
      value={{
        pantry,
        cookbook,
        handleClearPantry,
        handleDeletePantryItem,
        handleInsertPantryItem,
        handleUpdatePantryItem,
        handleDeleteCookbookItem,
        handleInsertCookbookItem,
      }}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, title: "Back" }}
          />
          <Stack.Screen name="RecipeScreen" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PantryChefContext.Provider>
  );
}
