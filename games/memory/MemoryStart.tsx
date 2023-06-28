import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React, { useState } from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
import Toast from "react-native-toast-message";
import { serverURL } from "../../backend";
import { useAppStore } from "../../state";
import { makeCards } from "./MemoryCard";

interface WordSet {
  id: number;
  english: string;
  polish: string;
  words: number[];
}

export interface Translation {
  id: number;
  english: string;
  polish: string;
}

type Props = NativeStackScreenProps<MemoryStackParamList, "Start">;

function MemoryStartScreen({ navigation }: Props) {
  const [setType, setSetType] = useState<string>("");
  const [setName, setSetName] = useState<string>("");
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const token = useAppStore.getState().token;

  async function startGameHandler() {
    try {
      const setId = wordSets.find((wordSet) => wordSet.polish === setName)?.id;
      const response = await fetch(
        `http://${serverURL}/wordset/${setId}/translations?limit=6`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Token " + token,
          },
        }
      );
      const translations: Translation[] = await response.json();

      navigation.navigate("Game", {
        setName: setName,
        wordsSet: makeCards(translations),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function downloadWordSetsHandler(selectedItem: string) {
    console.log(setType);
    setSetType(selectedItem);
    if (setType === "Default sets") {
      try {
        const response = await fetch(`http://${serverURL}/wordset/`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Token " + token,
          },
        });
        setWordSets(await response.json());
      } catch (error) {
        console.error(error);
      }
    } else {
      setWordSets([]);
    }
  }

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
        <SelectDropdown
          data={["Default sets", "Custom sets (coming soon...)"]}
          onSelect={(selectedItem) => downloadWordSetsHandler(selectedItem)}
          defaultButtonText={"-- Select type --"}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
          buttonStyle={gameStyles.dropdownButton}
          buttonTextStyle={gameStyles.dropdownButtonText}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444444"}
                size={18}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={gameStyles.dropdown}
          rowStyle={gameStyles.dropdownRow}
          rowTextStyle={gameStyles.dropdownRowText}
        />
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>Set:</Text>
        </View>
        <SelectDropdown
          data={wordSets.map((wordSet) => wordSet.polish)}
          onSelect={(selectedItem) => {
            setSetName(selectedItem);
          }}
          defaultButtonText={"-- Select set --"}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
          buttonStyle={gameStyles.dropdownButton}
          buttonTextStyle={gameStyles.dropdownButtonText}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444444"}
                size={18}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={gameStyles.dropdown}
          rowStyle={gameStyles.dropdownRow}
          rowTextStyle={gameStyles.dropdownRowText}
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
