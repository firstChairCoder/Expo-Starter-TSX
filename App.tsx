import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
//hooks
import useCachedResources from "@utils/hooks";
import useColorScheme from "@utils/hooks";
//nav
import Navigation from "@navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar barStyle="inverted" />
      </SafeAreaProvider>
    );
  }
}
