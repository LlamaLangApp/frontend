import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import RaceStartScreen from "./RaceStart";
import RaceGameScreen from "./RaceGame";
import RaceWaitingRoomScreen from "./RaceWaitingRoom";
import RacePlayersListScreen from "./RacePlayersList";
import RaceAnswerScreen from "./RaceAnswer";
import { RaceWebSocketProvider } from "./RaceWebSocket";
import { useNavigation } from "@react-navigation/native";
import RaceEndGameScreen from "./RaceEndGame";

export type RaceStackParamList = {
  Start: undefined;
  WaitingRoom: undefined;
  PlayersList: {
    players: string[];
  };
  Game: {
    question: string;
    answers: string[];
  };
  Answer: {
    question: string;
    answer: string;
    correctAnswer: string;
  };
  EndGame: {
    points: number;
    isWinner: boolean;
  };
};
const Stack = createNativeStackNavigator<RaceStackParamList>();

const RaceStack = () => {
  return (
    <RaceWebSocketProvider navigation={useNavigation()}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Start"} component={RaceStartScreen} />
        <Stack.Screen name={"WaitingRoom"} component={RaceWaitingRoomScreen} />
        <Stack.Screen name={"PlayersList"} component={RacePlayersListScreen} />
        <Stack.Screen name={"Game"} component={RaceGameScreen} />
        <Stack.Screen name={"Answer"} component={RaceAnswerScreen} />
        <Stack.Screen name={"EndGame"} component={RaceEndGameScreen} />
      </Stack.Navigator>
    </RaceWebSocketProvider>
  );
};

export default RaceStack;
