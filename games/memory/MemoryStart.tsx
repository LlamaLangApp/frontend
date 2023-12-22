import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppStore } from "../../state";
import { callTranslations } from "@backend/WordSetsBackend";
import { MemoryStackParamList } from "./MemoryStack";
import { makeCards } from "./MemoryCard";
import GameStartScreen from "../common/start/GameStart";

type Props = NativeStackScreenProps<MemoryStackParamList, "Start">;

function MemoryStartScreen({ navigation }: Props) {
  const [setName, setSetName] = useState<string>("");
  const [setId, setSetId] = useState<number>(-1);
  const token = useAppStore.getState().token;

  function startGameHandler() {
    callTranslations(token, setId, 6).then((response) => {
      if (response.type === "success") {
        navigation.navigate("Game", {
          setName: setName,
          wordsSet: makeCards(response.result),
          wordsSetID: setId,
        });
      }
    });
  }

  return (
    <GameStartScreen
      gameName={"Memory"}
      setWordSetId={setSetId}
      setWordSetName={setSetName}
      onPressHandler={startGameHandler}
    />
  );
}

export default MemoryStartScreen;
