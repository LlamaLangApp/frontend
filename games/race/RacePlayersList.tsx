import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { FlatList, Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React from "react";
import { buttonLightPink } from "../../Consts";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";

type Props = NativeStackScreenProps<RaceStackParamList, "PlayersList">;

function RacePlayersListScreen({ route }: Props) {
  const { players } = route.params;

  return (
    <View style={mainStyles.container}>
      <View style={gameStyles.contentContainer}>
        <Text style={gameStyles.basicText}>
          . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        </Text>
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
            data={players}
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
                  <Text style={gameStyles.basicText}>{itemData.item}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      <FrontLlamaCenter />
    </View>
  );
}

export default RacePlayersListScreen;
