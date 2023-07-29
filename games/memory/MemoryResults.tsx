import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../App";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";

type Props = NativeStackScreenProps<MemoryStackParamList, "Results">;
type MainStack = NavigationProp<MainStackParamList, "Home">;

function MemoryResultsScreen({ route, navigation }: Props) {
  const parentNavigation = useNavigation<MainStack>();
  const { points, setName } = route.params;

  async function exitGameHandler() {
    try {
      parentNavigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  }

  async function playAgainHandler() {
    try {
      navigation.navigate("Start");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.contentContainer}>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.headingText}>Memory</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.basicText}>You have earned:</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>{points}/60 pkt</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.basicText}>
            {60 <= points
              ? "Yay! You learned set:"
              : "Unfortunately, you don't know all words from set:"}
          </Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>{setName}</Text>
        </View>
        <Text> </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={buttonGamesStyles.button}
            onPress={exitGameHandler}
          >
            <Text style={buttonGamesStyles.buttonText}>Exit game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonGamesStyles.button}
            onPress={playAgainHandler}
          >
            <Text style={buttonGamesStyles.buttonText}>Play again</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
    </View>
  );
}

export default MemoryResultsScreen;
