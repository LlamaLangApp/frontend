import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import CustomDropdown from "../../components/CustomDropdown";
import { WordSet, callWordSets } from "../../backend/WordSetsBackend";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAppStore } from "../../state";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import Llama from "../../components/llama/Llama";
import BlockedButton from "../../components/buttons/BlockedButton";

type StartScreenProps = {
  gameName: string;
  setWordSetName: (selectedItem: string) => void;
  setWordSetId: (selectedItem: number) => void;
  onPressHandler: () => void;
  playWithFriends?: Dispatch<SetStateAction<boolean>>;
};

const GameStartScreen = (props: StartScreenProps) => {
  const { gameName, setWordSetName, setWordSetId, onPressHandler } = props;
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const [wordSetNameChosen, setWordSetNameChosen] = useState(false);
  const token = useAppStore.getState().token;

  useEffect(() => {
    callWordSets(token).then((response) => {
      if (response.type === "success") {
        setWordSets(response.result);
      } else {
        setWordSets([]);
      }
    });
  }, []);

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.gameName}>{gameName.toUpperCase()}</Text>
        </View>
        <View
          style={[containerGamesStyles.textWithMargin, { marginBottom: "10%" }]}
        >
          <Text style={textGamesStyles.information}>To play a game</Text>
          <Text style={textGamesStyles.information}>
            pick one of the default word sets
          </Text>
        </View>
        <View style={[containerGamesStyles.dropDown]}>
          <CustomDropdown
            defaultSelectText={"set"}
            selectData={wordSets.map((wordSet) => wordSet.polish)}
            onSelectFunc={(selectedItem) => {
              setWordSetName(selectedItem);
              setWordSetId(
                wordSets.find((wordSet) => wordSet.polish === selectedItem)
                  ?.id ?? -1
              );
              setWordSetNameChosen(true);
            }}
          />
        </View>
        <BlockedButton
          buttonText={"Play"}
          condition={wordSetNameChosen}
          onPress={onPressHandler}
        />
      </View>
      <Llama />
    </View>
  );
};

export default GameStartScreen;
