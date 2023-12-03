import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React, { useState, useContext, useEffect } from "react";
import CustomDropdown from "../../components/CustomDropdown";
import { callWordSets } from "../../backend/WordSetsBackend";
import { useAppStore } from "../../state";
import { WordSet } from "../GamesTypes";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { RaceWebSocketContext } from "./RaceWebSocket";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";

function RaceStartScreen() {
  const { ws } = useContext(RaceWebSocketContext);
  const [setType, setSetType] = useState<string>("");
  const [setId, setSetId] = useState<number>(0);
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const token = useAppStore.getState().token;

  async function findOtherPlayersHandler() {
    ws.send(
      JSON.stringify({
        type: "waitroom_request",
        game: "race",
        wordset_id: setId,
      })
    );
  }

  useEffect(() => {
    if (setType === "Default sets") {
      callWordSets(token).then((response) => {
        if (response.type === "success") {
          setWordSets(response.result);
        } else {
          setWordSets([]);
        }
      });
    } else {
      setWordSets([]);
      setSetId(-1);
    }
  }, [setType]);

  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.contentContainer}>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.headingText}>Race</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>Pick set of words:</Text>
        </View>
        <Text> </Text>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>Type of set:</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <CustomDropdown
            defaultSelectText={"type"}
            selectData={["Default sets", "Custom sets (coming soon...)"]}
            onSelectFunc={setSetType}
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
              setSetId(
                wordSets.find((wordSet) => wordSet.polish === selectedItem)
                  ?.id ?? -1
              );
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={buttonGamesStyles.startButton}
            onPress={findOtherPlayersHandler}
          >
            <Text style={buttonGamesStyles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
    </View>
  );
}

export default RaceStartScreen;
