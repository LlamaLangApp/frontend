import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import RaceStartScreen from "./RaceStart";
import RaceGameScreen from "./RaceGame";
import { Translation } from "../common/Translation";

export type RaceStackParamList = {
  Start: undefined;
  Game: {
    translations: Translation[];
  };
};
const Stack = createNativeStackNavigator<RaceStackParamList>();

const RaceStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Start"} component={RaceStartScreen} />
      <Stack.Screen name={"Game"} component={RaceGameScreen} />
    </Stack.Navigator>
  );
};

export default RaceStack;
