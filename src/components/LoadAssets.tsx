import type { ReactElement } from "react";
import React, { useCallback, useEffect, useState } from "react";
import type { ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import type { InitialState } from "@react-navigation/native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Constants from "expo-constants";

import LinkingConfiguration from "../navigation/LinkingConfiguration";

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Constants.manifest?.sdkVersion}`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FontSource = Parameters<typeof Font.loadAsync>[0];
const usePromiseAll = (promises: Promise<any | any[]>[], cb: () => any) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
  const [ready, setReady] = useState(false);
  usePromiseAll(
    [Font.loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))],
    () => setReady(true)
  );
  return ready;
};

interface LoadAssetsProps {
  fonts?: FontSource;
  assets?: number[];
  children: ReactElement | ReactElement[];
  colorScheme: ColorSchemeName;
}

const LoadAssets = ({
  assets,
  fonts,
  children,
  colorScheme,
}: LoadAssetsProps) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const ready = useLoadAssets(assets || [], fonts || {});
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);
  const onStateChange = useCallback(
    (state) =>
      AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    []
  );
  if (!ready || !isNavigationReady) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer
      {...{ onStateChange, initialState }}
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {children}
    </NavigationContainer>
  );
};

export default LoadAssets;
