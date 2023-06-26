import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAppStore } from "./state";
import AuthStack from "./navgation/AuthStack";
import HomeDrawer from "./navgation/HomeDrawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsScreen from "./screens/Friends";

export type MainStackParamList = {
  Home: undefined;
  Memory: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Home"} component={HomeDrawer} />
      <Stack.Screen name={"Memory"} component={FriendsScreen} />
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
