import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";

type Props = NativeStackScreenProps<RaceStackParamList, "WaitingRoom">;

function RaceWaitingRoomScreen({ navigation }: Props) {
  async function displayPlayersListHandler() {
    try {
      navigation.navigate("PlayersList");
    } catch (error) {
      console.error(error);
    }
  }

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
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={gameStyles.startButton}
            onPress={displayPlayersListHandler}
          >
            <Text style={gameStyles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
    </View>
  );
}

export default RaceWaitingRoomScreen;
