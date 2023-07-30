import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { FlatList, Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React from "react";
import { buttonLightPink } from "../../Consts";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import textGamesStyles from "../../styles/games/TextGamesStyles";

type Props = NativeStackScreenProps<RaceStackParamList, "PlayersList">;

function RacePlayersListScreen({ route }: Props) {
  const { players } = route.params;

  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.contentContainer}>
        <Text style={textGamesStyles.basicText}>
          . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        </Text>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.headingText}>Race</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>List of players:</Text>
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
                  <Text style={textGamesStyles.basicText}>{itemData.item}</Text>
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
