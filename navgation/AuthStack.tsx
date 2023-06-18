import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/Start";
import LogScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import * as React from "react";

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"Start"} component={StartScreen} />
      <Stack.Screen name={"Login"} component={LogScreen} />
      <Stack.Screen name={"Register"} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
