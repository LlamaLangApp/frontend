import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../App";
import SinglePlayerResultsScreen from "../common_singleplayer/SingleplayerResults";

type Props = NativeStackScreenProps<MemoryStackParamList, "Results">;
type MainStack = NavigationProp<MainStackParamList, "Home">;

function MemoryResultsScreen({ route, navigation }: Props) {
  const parentNavigation = useNavigation<MainStack>();
  const { points, setName } = route.params;

  return (
    <SinglePlayerResultsScreen
      gameName={"Race"}
      points={points}
      hasWon={true}
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
