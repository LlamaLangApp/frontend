import * as React from "react";
import { StyleSheet, View } from "react-native";
import LogScreen from "./components/Login";

export default function App() {
  return (
    <View style={styles.container}>
      <LogScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
