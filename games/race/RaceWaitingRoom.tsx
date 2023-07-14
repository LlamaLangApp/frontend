import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";

function RaceWaitingRoomScreen() {
  return (
    <View style={mainStyles.container}>
      <View style={gameStyles.contentContainer}>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.headingText}>Race</Text>
        </View>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>
            Waiting for other players...
          </Text>
        </View>
        <Text></Text>
      </View>
      <FrontLlamaCenter />
    </View>
  );
}

export default RaceWaitingRoomScreen;
