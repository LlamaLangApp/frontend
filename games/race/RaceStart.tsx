import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React, { useState, useContext } from "react";
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
  const [setName, setSetName] = useState<string>("");
  const [setType, setSetType] = useState<string>("");
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const token = useAppStore.getState().token;

  async function findOtherPlayersHandler() {
    ws.send(JSON.stringify({ type: "waitroom_request", game: "race" }));
  }

  const downloadWordSetsHandler = React.useCallback(async () => {
    if (setType === "Default sets") {
      console.log(setName);
      const response = await callWordSets(token);
      switch (response.type) {
        case "success":
          setWordSets(response.wordSets);
          break;
        case "error":
          setWordSets([]);
          break;
      }
    } else {
      setWordSets([]);
    }
  }, [setWordSets, setType]);

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
            onSelectFunc={async (selectedItem) => {
              setSetType(selectedItem);
              await downloadWordSetsHandler();
            }}
          />
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>Set:</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <CustomDropdown
            defaultSelectText={"set"}
            selectData={wordSets.map((wordSet) => wordSet.polish)}
            onSelectFunc={setSetName}
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
