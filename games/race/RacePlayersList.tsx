import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React from "react";

type Props = NativeStackScreenProps<RaceStackParamList, "PlayersList">;

function RacePlayersListScreen({ navigation }: Props) {
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
          <Text style={gameStyles.headingText}>Race</Text>
        </View>
        <View style={{ width: "90%", flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[{ name: "alice" }, { name: "marty" }]}
            renderItem={(itemData) => {
              return (
                <View style={{ width: "90%" }}>
                  <Text>{itemData.item.name}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={gameStyles.startButton}
            onPress={startGameHandler}
          >
            <Text style={gameStyles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default RacePlayersListScreen;
