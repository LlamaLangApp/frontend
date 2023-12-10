import { Text, TouchableOpacity, View, Switch } from "react-native";
import mainStyles from "../../styles/MainStyles";
import CustomDropdown from "../../components/CustomDropdown";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { callWordSets } from "../../backend/WordSetsBackend";
import { useAppStore } from "../../state";
import { WordSet } from "../GamesTypes";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import { buttonLightPink, grey, lightGrey, pink } from "../../Consts";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import Llama from "../../components/games/Llama";

type StartScreenProps = {
  gameName: string;
  setWordSetName: (selectedItem: string) => void;
  setWordSetId: (selectedItem: number) => void;
  onPressHandler: () => void;
  playWithFriends?: Dispatch<SetStateAction<boolean>>;
};

const MultiplayerGameStartScreen = (props: StartScreenProps) => {
  const {
    gameName,
    setWordSetName,
    setWordSetId,
    onPressHandler,
    playWithFriends,
  } = props;
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const [isChecked, setChecked] = useState(false);
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
            }}
          />
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.finePrint}>
            You also have a decision to make
          </Text>
          <Text style={textGamesStyles.finePrint}>
            Would you like to play with random people?
          </Text>
          <Text style={textGamesStyles.finePrint}>
            Or create your own room and invite your friends?
          </Text>
        </View>
        {playWithFriends && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Switch
              trackColor={{ false: grey, true: lightGrey }}
              thumbColor={buttonLightPink}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                playWithFriends((previousState) => !previousState);
                setChecked((previousState) => !previousState);
              }}
              value={isChecked}
            />
            <Text style={{ marginLeft: 8, fontSize: 16, color: grey }}>
              Play with friends
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[buttonGamesStyles.basic, { backgroundColor: pink }]}
          onPress={onPressHandler}
        >
          <Text style={buttonGamesStyles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>
      <Llama />
    </View>
  );
};
export default MultiplayerGameStartScreen;
