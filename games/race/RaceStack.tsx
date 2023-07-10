import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import RaceStartScreen from "./RaceStart";
import RaceGameScreen from "./RaceGame";
import RaceWaitingRoomScreen from "./RaceWaitingRoom";
import RacePlayersListScreen from "./RacePlayersList";

export type RaceStackParamList = {
  Start: undefined;
  WaitingRoom: undefined;
  PlayersList: undefined;
  Game: undefined;
};
const Stack = createNativeStackNavigator<RaceStackParamList>();

const RaceStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Start"} component={RaceStartScreen} />
      <Stack.Screen name={"WaitingRoom"} component={RaceWaitingRoomScreen} />
      <Stack.Screen name={"PlayersList"} component={RacePlayersListScreen} />
      <Stack.Screen name={"Game"} component={RaceGameScreen} />
    </Stack.Navigator>
  );
};

export default RaceStack;
