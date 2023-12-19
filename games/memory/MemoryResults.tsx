import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import SinglePlayerResultScreen from "../common/SingleplayerResult";
import { saveSinglePlayerGame } from "../../backend/GamesBackend";
import { useAppStore } from "../../state";
import { GamesStackParamList } from "../../navgation/GamesStack";

type Props = NativeStackScreenProps<MemoryStackParamList, "Results">;
type GamesStack = NavigationProp<GamesStackParamList, "Home">;

function MemoryResultsScreen({ route, navigation }: Props) {
  const parentNavigation = useNavigation<GamesStack>();
  const { points, accuracy, duration, wordsSetID, setName } = route.params;
  const token = useAppStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      console.warn("No token when saving memory results!");
      return;
    }
    saveSinglePlayerGame(
      token,
      "memory-game",
      points,
      accuracy,
      duration,
      wordsSetID
    ).then();
  });

  return (
    <SinglePlayerResultScreen
      gameName={"Memory"}
      points={points}
      rounds={6}
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
