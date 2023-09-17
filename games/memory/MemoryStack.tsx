import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MemoryStartScreen from "./MemoryStart";
import * as React from "react";
import MemoryGameScreen from "./MemoryGame";
import MemoryResultsScreen from "./MemoryResults";
import { Card } from "./MemoryCard";

export type MemoryStackParamList = {
  Start: undefined;
  Game: {
    setName: string;
    wordsSet: Card[];
    wordsSetID: number;
  };
  Results: {
    points: number;
    accuracy: number;
    duration: number;
    wordsSetID: number;
    setName: string;
  };
};

const Stack = createNativeStackNavigator<MemoryStackParamList>();

const MemoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Start"} component={MemoryStartScreen} />
      <Stack.Screen name={"Game"} component={MemoryGameScreen} />
      <Stack.Screen name={"Results"} component={MemoryResultsScreen} />
    </Stack.Navigator>
  );
};

export default MemoryStack;
