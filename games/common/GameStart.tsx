import { Text, TouchableOpacity, View, Switch } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import CustomDropdown from "../../components/CustomDropdown";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { callWordSets } from "../../backend/WordSetsBackend";
import { useAppStore } from "../../state";
import { WordSet } from "../GamesTypes";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import { buttonLightPink, grey } from "../../Consts";

type StartScreenProps = {
  gameName: string;
  setWordSetName: (selectedItem: string) => void;
  setWordSetId: (selectedItem: number) => void;
  onPressHandler: () => void;
  playWithFriends?: Dispatch<SetStateAction<boolean>>;
};

const GameStartScreen = (props: StartScreenProps) => {
  const {
    gameName,
    setWordSetName,
    setWordSetId,
    onPressHandler,
    playWithFriends,
  } = props;
  const [wordSetType, setWordSetType] = useState<string>("");
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const [isChecked, setChecked] = useState(false);
  const token = useAppStore.getState().token;

  useEffect(() => {
    if (wordSetType === "Default sets") {
      callWordSets(token).then((response) => {
        if (response.type === "success") {
          setWordSets(response.result);
        } else {
          setWordSets([]);
        }
      });
    } else {
      setWordSets([]);
      setWordSetId(-1);
    }
  }, [wordSetType]);

  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.mainContentContainer}>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.headingText}>{gameName}</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>Pick set of words:</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>Type of set:</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <CustomDropdown
            defaultSelectText={"type"}
            selectData={["Default sets", "Custom sets (coming soon...)"]}
            onSelectFunc={setWordSetType}
          />
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>Set:</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
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

        {(gameName === "Finding words" || gameName === "Race") &&
          playWithFriends && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Switch
                trackColor={{ false: grey, true: "white" }}
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
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={buttonGamesStyles.startButton}
            onPress={onPressHandler}
          >
            <Text style={buttonGamesStyles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
    </View>
  );
};

export default GameStartScreen;
