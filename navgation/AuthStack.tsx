import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/auth/Start";
import LogScreen from "../screens/auth/Login";
import RegisterScreen from "../screens/auth/Register";
import * as React from "react";

export type AuthStackParamList = {
  Start: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

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
