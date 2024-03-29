import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { FindingWordsWebSocketProvider } from "./FindingWordsWebSocket";
import FindingWordsStartScreen from "./FindingWordsStart";
import FindingWordsGameScreen from "./FindingWordsGame";
import FindingWordsWaitingRoomScreen from "./FindingWordsWaitingRoom";
import FindingWordsPlayersListScreen from "./FindingWordsPlayersList";
import FindingWordsEndGameScreen from "./FindingWordsEndGame";
import FindingWordsAnswerScreen from "./FindingWordsAnswer";
import { GamesStackParamList } from "@navigation/GamesStack";

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
    answer: string | null;
    correctAnswer: string;
    earnedPoints: number;
  };
  EndGame: {
    scoreboard: { username: string; score: number; place: number }[];
  };
};
const Stack = createNativeStackNavigator<FindingWordsStackParamList>();

type FindingWordsStackProps = {
  route: RouteProp<GamesStackParamList, "FindingWords">;
};

const FindingWordsStack = ({ route }: FindingWordsStackProps) => {
  const fromInvite = route.params?.fromInvite ?? false;
  const invite = route.params?.invite ?? null;

  return (
    <FindingWordsWebSocketProvider
      navigation={useNavigation()}
      fromInvite={fromInvite}
      invite={invite}
    >
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
