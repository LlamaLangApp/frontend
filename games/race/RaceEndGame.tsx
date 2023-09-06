import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../App";
import { RaceStackParamList } from "./RaceStack";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";

type Props = NativeStackScreenProps<RaceStackParamList, "EndGame">;
type MainStack = NavigationProp<MainStackParamList, "Home">;

function RaceEndGameScreen({ route }: Props) {
  const parentNavigation = useNavigation<MainStack>();
  const { points, isWinner } = route.params;

  function exitGameHandler() {
    parentNavigation.navigate("Home");
  }

  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.contentContainer}>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.basicText}>
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          </Text>
          <Text style={textGamesStyles.headingText}>Race</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.basicText}>You have earned:</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>{points} pkt</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.headingText}>
            {isWinner ? "Yay! You win" : "Unfortunately, you lost"}
          </Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}></Text>
        </View>
        <Text> </Text>
        <Text> </Text>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={buttonGamesStyles.button}
            onPress={exitGameHandler}
          >
            <Text style={buttonGamesStyles.buttonText}>Exit game</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
}

export default RaceEndGameScreen;
