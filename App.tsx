import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAppStore } from "./state";
import AuthStack from "@navigation/AuthStack";
import GamesStack from "@navigation/GamesStack";

export default function App() {
  const token = useAppStore((store) => store.token);

  return (
    <NavigationContainer>
      {token ? <GamesStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
