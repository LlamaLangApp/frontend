import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React from "react";
import { buttonLightPink } from "../../Consts";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";

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
        <Text></Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.headingText}>Race</Text>
        </View>
        <Text></Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>List of players:</Text>
        </View>
        <View style={{ flex: 3 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[
              { name: "alice" },
              { name: "marty" },
              { name: "micheal" },
              { name: "rafael" },
              { name: "alice" },
              { name: "marty" },
              { name: "micheal" },
              { name: "rafael" },
              { name: "alice" },
              { name: "marty" },
              { name: "micheal" },
              { name: "rafael" },
            ]}
            renderItem={(itemData) => {
              return (
                <View
                  style={{
                    margin: 8,
                    borderRadius: 15,
                    backgroundColor: buttonLightPink,
                    alignItems: "center",
                  }}
                >
                  <Text style={gameStyles.basicText}>{itemData.item.name}</Text>
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
      <FrontLlamaCenter />
    </View>
  );
}

export default RacePlayersListScreen;
