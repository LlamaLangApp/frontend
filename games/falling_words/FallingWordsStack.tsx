import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import FallingWordsStartScreen, { Round } from "./FallingWordsStart";
import FallingWordsGameScreen from "./FallingWordsGame";
import FallingWordsResultsScreen from "./FallingWordsResults";

export type FallingWordsStackParamList = {
  Start: undefined;
  Game: {
    setName: string;
    wordsSetID: number;
    roundsNumber: number;
    rounds: Round[];
  };
  Results: {
    points: number;
    accuracy: number;
    duration: number;
    wordsSetID: number;
    setName: string;
  };
};

const Stack = createNativeStackNavigator<FallingWordsStackParamList>();

const FallingWordsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Start"} component={FallingWordsStartScreen} />
      <Stack.Screen name={"Game"} component={FallingWordsGameScreen} />
      <Stack.Screen name={"Results"} component={FallingWordsResultsScreen} />
    </Stack.Navigator>
  );
};

export default FallingWordsStack;
