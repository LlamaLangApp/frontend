import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackNavigator } from "./navigaton/MainStackNavigator";
import StartScreen from "./screens/Start";
import RegisterScreen from "./screens/Register";
import HomeScreen from "./screens/Home";
import LogScreen from "./screens/Login";

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
      {/*<MainStackNavigator />*/}
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
