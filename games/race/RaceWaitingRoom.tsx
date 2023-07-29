import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import textGamesStyles from "../../styles/games/TextGamesStyles";

function RaceWaitingRoomScreen() {
  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.contentContainer}>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.headingText}>Race</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>
            Waiting for other players...
          </Text>
        </View>
      </View>
      <FrontLlamaCenter />
    </View>
  );
}

export default RaceWaitingRoomScreen;
