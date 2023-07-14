import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../App";
import { RaceStackParamList } from "./RaceStack";

type Props = NativeStackScreenProps<RaceStackParamList, "EndGame">;
type MainStack = NavigationProp<MainStackParamList, "Home">;

function RaceEndGameScreen({ route }: Props) {
  const parentNavigation = useNavigation<MainStack>();
  const { points, isWinner } = route.params;

  async function exitGameHandler() {
    try {
      parentNavigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={mainStyles.container}>
      <View style={gameStyles.contentContainer}>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.basicText}>
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
          </Text>
          <Text style={gameStyles.headingText}>Race</Text>
        </View>
        <Text> </Text>
        <View style={gameStyles.textWithMarginContainer}>
          <Text style={gameStyles.basicText}>You have earned:</Text>
        </View>
        <View style={gameStyles.textWithMarginContainer}>
          <Text style={gameStyles.secondaryText}>{points} pkt</Text>
        </View>
        <View style={gameStyles.textWithMarginContainer}>
          <Text style={gameStyles.headingText}>
            {isWinner ? "Yay! You win" : "Unfortunately, you lost"}
          </Text>
        </View>
        <View style={gameStyles.textWithMarginContainer}>
          <Text style={gameStyles.secondaryText}></Text>
        </View>
        <Text> </Text>
        <Text> </Text>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={gameStyles.button} onPress={exitGameHandler}>
            <Text style={gameStyles.buttonText}>Exit game</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
}

export default RaceEndGameScreen;
