import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../App";
import SinglePlayerResultsScreen from "../common_singleplayer/SingleplayerResults";
import { saveMemoryGame } from "../../backend/GamesBackend";
import { useAppStore } from "../../state";

type Props = NativeStackScreenProps<MemoryStackParamList, "Results">;
type MainStack = NavigationProp<MainStackParamList, "Home">;

function MemoryResultsScreen({ route, navigation }: Props) {
  const parentNavigation = useNavigation<MainStack>();
  const { points, accuracy, duration, wordsSetID, setName } = route.params;
  const token = useAppStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      console.warn("No token when saving memory results!");
      return;
    }
    saveMemoryGame(token, points, accuracy, duration, wordsSetID);
  });

  return (
    <SinglePlayerResultsScreen
      gameName={"Memory"}
      points={points}
      hasWon={points >= 60}
      setName={setName}
      exitGameHandler={() => {
        parentNavigation.navigate("Home");
      }}
      playAgainHandler={() => {
        navigation.navigate("Start");
      }}
    />
  );
}

export default MemoryResultsScreen;
