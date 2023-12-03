import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import FindingWordsStartScreen from "./Start";
import FindingWordsGameScreen from "./Game";
import FindingWordsWaitingRoomScreen from "./WaitingRoom";
import FindingWordsPlayersListScreen from "./PlayersList";
import { FindingWordsWebSocketProvider } from "./WebSocket";
import { useNavigation } from "@react-navigation/native";
import FindingWordsEndGameScreen from "./EndGame";
import FindingWordsAnswerScreen from "./Answer";

export type FindingWordsStackParamList = {
  Start: undefined;
  WaitingRoom: undefined;
  PlayersList: {
    players: string[];
  };
  Game: {
    letters: string[];
  };
  Answer: {
    answer: string;
    correctAnswer: string;
  };
  EndGame: {
    scoreboard: { username: string; points: number }[];
  };
};
const Stack = createNativeStackNavigator<FindingWordsStackParamList>();

const FindingWordsStack = () => {
  return (
    <FindingWordsWebSocketProvider navigation={useNavigation()}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Start"} component={FindingWordsStartScreen} />
        <Stack.Screen
          name={"WaitingRoom"}
          component={FindingWordsWaitingRoomScreen}
        />
        <Stack.Screen
          name={"PlayersList"}
          component={FindingWordsPlayersListScreen}
        />
        <Stack.Screen name={"Game"} component={FindingWordsGameScreen} />
        <Stack.Screen name={"Answer"} component={FindingWordsAnswerScreen} />
        <Stack.Screen name={"EndGame"} component={FindingWordsEndGameScreen} />
      </Stack.Navigator>
    </FindingWordsWebSocketProvider>
  );
};

export default FindingWordsStack;
