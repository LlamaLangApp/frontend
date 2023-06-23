import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
// import { MemoryStackParamList } from "../../App";

const randomWords = [
  "jedzenie",
  "picie",
  "rodzina",
  "zwierzęta",
  "krajobraz",
  "jedzenie",
  "picie",
  "rodzina",
  "zwierzęta",
  "krajobraz",
];

type Props = NativeStackScreenProps<MemoryStackParamList, "Start">;

function MemoryStartScreen({ navigation }: Props) {
  async function startGameHandler() {
    try {
      navigation.navigate("Game");
    } catch (error) {
      console.error(error);
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
          data={randomWords}
          // defaultValueByIndex={1}
          // defaultValue={'Egypt'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={"-- Select type --"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
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
          data={randomWords}
          // defaultValueByIndex={1}
          // defaultValue={'Egypt'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={"-- Select set --"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
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
            // onPress={startGameHandler}
            onPress={() => navigation.navigate("Game")}
          >
            <Text style={gameStyles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>
        <FrontLlamaCenter />
      </View>
    </View>
  );
}

export default MemoryStartScreen;
