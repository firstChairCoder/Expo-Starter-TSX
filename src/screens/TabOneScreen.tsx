import React from "react";
import { StyleSheet } from "react-native";
import { EditScreenInfo } from "@components";
import { Text, View } from "@components/Themed";

import { RootTabScreenProps } from "../types";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: "80%"
  }
});

export default function TabOneScreen({
  navigation
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}
