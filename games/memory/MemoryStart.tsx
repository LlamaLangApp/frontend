import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
import { useAppStore } from "../../state";
import { makeCards } from "./MemoryCard";
import SinglePlayerStartScreen from "../common_singleplayer/SingleplayerStart";
import { callTranslations } from "../../backend/WordSetsBackend";

type Props = NativeStackScreenProps<MemoryStackParamList, "Start">;

function MemoryStartScreen({ navigation }: Props) {
  const [setName, setSetName] = useState<string>("");
  const [setId, setSetId] = useState<number>(-1);
  const token = useAppStore.getState().token;

  // const [isSetTypeDisabled, setIsSetTypeDisabled] = useState<string>("");
  // const [isPlayButtonDisabled, setIsPlayButtonDisabled] = useState<string>("");

  function startGameHandler() {
    callTranslations(token, setId, 6).then((response) => {
      if (response.type === "success") {
        navigation.navigate("Game", {
          setName: setName,
          wordsSet: makeCards(response.translations),
          wordsSetID: setId,
        });
      }
    });
  }

  return (
    <SinglePlayerStartScreen
      gameName={"Memory"}
      setWordSetId={setSetId}
      setWordSetName={setSetName}
      startGameHandler={startGameHandler}
    />
  );
}

export default MemoryStartScreen;
