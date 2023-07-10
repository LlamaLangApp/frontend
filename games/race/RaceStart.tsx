import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React, { useState } from "react";
import CustomDropdown from "../../components/CustomDropdown";
import { callWordSets } from "../../backend";
import { useAppStore } from "../../state";
import { WordSet } from "../common/WordSet";
import Toast from "react-native-toast-message";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";

type Props = NativeStackScreenProps<RaceStackParamList, "Start">;

function RaceStartScreen({ navigation }: Props) {
  const [setName, setSetName] = useState<string>("");
  const [setType, setSetType] = useState<string>("");
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const token = useAppStore.getState().token;

  async function findOtherPlayersHandler() {
    try {
      console.log(setName);
      navigation.navigate("WaitingRoom");
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
          <Text style={gameStyles.headingText}>Race</Text>
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
            onPress={findOtherPlayersHandler}
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

export default RaceStartScreen;
