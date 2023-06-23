import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MemoryStartScreen from "./MemoryStart";
import * as React from "react";
import MemoryGameScreen from "./MemoryGame";

export type MemoryStackParamList = {
  Start: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<MemoryStackParamList>();

const MemoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"Start"} component={MemoryStartScreen} />
      <Stack.Screen name={"Game"} component={MemoryGameScreen} />
    </Stack.Navigator>
  );
};

export default MemoryStack;
