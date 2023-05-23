import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LogScreen from "./components/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/Home";
import RegisterScreen from "./components/Register";
import StartScreen from "./components/Start";

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"Start"} component={StartScreen} />
        <Stack.Screen name={"Login"} component={LogScreen} />
        <Stack.Screen name={"Register"} component={RegisterScreen} />
        <Stack.Screen name={"Home"} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
