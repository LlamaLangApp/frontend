import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React, { useState } from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
import Toast from "react-native-toast-message";
import { callTranslations, callWordSets } from "../../backend";
import { useAppStore } from "../../state";
import { makeCards } from "./MemoryCard";
import CustomDropdown from "../../components/CustomDropdown";
import { WordSet } from "../GamesTypes";

type Props = NativeStackScreenProps<MemoryStackParamList, "Start">;

function MemoryStartScreen({ navigation }: Props) {
  const [setName, setSetName] = useState<string>("");
  const [setType, setSetType] = useState<string>("");
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const token = useAppStore.getState().token;

  async function startGameHandler() {
    try {
      const setId = wordSets.find((wordSet) => wordSet.polish === setName)?.id;
      const response = await callTranslations(token, setId, 6);
      switch (response.type) {
        case "success":
          navigation.navigate("Game", {
            setName: setName,
            wordsSet: makeCards(response.translations),
          });
          break;
        case "error":
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const downloadWordSetsHandler = React.useCallback(async () => {
    if (setType === "Default sets") {
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
      <View style={gameStyles.contentContainer}>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.headingText}>Memory</Text>
        </View>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>Pick set of words:</Text>
        </View>
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>Type of set:</Text>
        </View>
        <CustomDropdown
          defaultSelectText={"type"}
          selectData={["Default sets", "Custom sets (coming soon...)"]}
          onSelectFunc={async (selectedItem) => {
            setSetType(selectedItem);
            await downloadWordSetsHandler();
          }}
        />
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>Set:</Text>
        </View>
        <CustomDropdown
          defaultSelectText={"set"}
          selectData={wordSets.map((wordSet) => wordSet.polish)}
          onSelectFunc={setSetName}
        />
        <Text> </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={gameStyles.startButton}
            onPress={startGameHandler}
          >
            <Text style={gameStyles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
}

export default MemoryStartScreen;
