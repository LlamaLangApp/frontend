import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAppStore } from "./state";
import AuthStack from "./navgation/AuthStack";
import HomeDrawer from "./navgation/HomeDrawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MemoryStack from "./games/memory/MemoryStack";
import RaceStack from "./games/race/RaceStack";
import FallingWordsStack from "./games/falling_words/FallingWordsStack";

export type MainStackParamList = {
  Home: undefined;
  Memory: undefined;
  Race: undefined;
  FallingWords: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Home"} component={HomeDrawer} />
      <Stack.Screen name={"Memory"} component={MemoryStack} />
      <Stack.Screen name={"Race"} component={RaceStack} />
      <Stack.Screen name={"FallingWords"} component={FallingWordsStack} />
    </Stack.Navigator>
  );
}

export default function App() {
  const token = useAppStore((store) => store.token);

  return (
    <NavigationContainer>
      {token ? <MainNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
}
