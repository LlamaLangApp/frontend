import { Switch, Text, View } from "react-native";
import mainStyles from "../../../styles/MainStyles";
import CustomDropdown from "../../../components/CustomDropdown";
import { WordSet, callWordSets } from "../../../backend/WordSetsBackend";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAppStore } from "../../../state";
import textGamesStyles from "../../../styles/games/TextGamesStyles";
import containerGamesStyles from "../../../styles/games/ContainerGamesStyles";
import Llama from "../../../components/llama/Llama";
import BlockedButton from "../../../components/buttons/BlockedButton";
import { buttonLightPink, grey, lightGrey, pink } from "../../../Consts";

type StartScreenProps = {
  gameName: string;
  setWordSetName: (selectedItem: string) => void;
  setWordSetId: (selectedItem: number) => void;
  onPressHandler: () => void;
  playWithFriends?: Dispatch<SetStateAction<boolean>>;
};

const GameStartScreen = ({
  gameName,
  setWordSetName,
  setWordSetId,
  onPressHandler,
  playWithFriends,
}: StartScreenProps) => {
  const token = useAppStore.getState().token;
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const [withFriendsChecked, setWithFriendsChecked] = useState(false);
  const [wordSetNameChosen, setWordSetNameChosen] = useState(false);

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
        {playWithFriends && (
          <View>
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Switch
                trackColor={{ false: lightGrey, true: pink }}
                thumbColor={buttonLightPink}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  playWithFriends((previousState) => !previousState);
                  setWithFriendsChecked((previousState) => !previousState);
                }}
                value={withFriendsChecked}
              />
              <Text style={{ marginLeft: 8, fontSize: 16, color: grey }}>
                Play with friends
              </Text>
            </View>
          </View>
        )}
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
