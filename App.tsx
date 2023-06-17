import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./screens/Start";
import RegisterScreen from "./screens/Register";
import HomeScreen from "./screens/Home";
import LogScreen from "./screens/Login";
import { useAppStore } from "./state";

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  const token = useAppStore((store) => store.token);

  return (
    <NavigationContainer>
      {/*<MainStackNavigator />*/}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {token ? (
          <Stack.Screen name={"Home"} component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name={"Start"} component={StartScreen} />
            <Stack.Screen name={"Login"} component={LogScreen} />
            <Stack.Screen name={"Register"} component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
