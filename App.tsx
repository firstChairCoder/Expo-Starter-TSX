import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
//hooks
import useCachedResources from "@utils/hooks";
import useColorScheme from "@utils/hooks";
//nav
import RootNavigator from "@navigation";

LogBox.ignoreAllLogs();

const assets = [];

const fonts = {
  "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
  "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("rgba(0,0,0,0.15)");
      StatusBar.setTranslucent(true);
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 900);
  }, [scheme, isDarkMode]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <LoadAssets {...{ fonts, assets }}>
        <SafeAreaProvider>
          <RootNavigator colorScheme={colorScheme} />
        </SafeAreaProvider>
      </LoadAssets>
    );
  }
}
