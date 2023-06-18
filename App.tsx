import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAppStore } from "./state";
import AuthStack from "./navgation/AuthStack";
import HomeDrawer from "./navgation/HomeDrawer";

export default function App() {
  const token = useAppStore((store) => store.token);

  return (
    <NavigationContainer>
      {token ? <HomeDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
}
