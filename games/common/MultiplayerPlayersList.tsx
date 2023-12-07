import { FlatList, Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React from "react";
import { buttonLightPink } from "../../Consts";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import textGamesStyles from "../../styles/games/TextGamesStyles";

type MultiplayerPlayersListProps = {
  gameName: string;
  players: string[];
};

function MultiplayerPlayersListScreen(props: MultiplayerPlayersListProps) {
  const { gameName, players } = props;

  return (
    <View style={mainStyles.container}>
      <View style={{ marginTop: 100, width: "80%" }}>
        <Text style={textGamesStyles.basicText}></Text>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={[textGamesStyles.headingText, { alignSelf: "flex-start" }]}
          >
            {gameName}
          </Text>
        </View>
        <View style={[textGamesStyles.textWithMarginContainer]}>
          <Text style={[textGamesStyles.secondaryText, { margin: 5 }]}>
            List of players:
          </Text>
        </View>
        <View style={{ justifyContent: "center", marginTop: 20 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={players}
            renderItem={(itemData) => {
              return (
                <View
                  style={{
                    paddingVertical: 5,
                    margin: 8,
                    borderRadius: 7,
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
        <View style={{ flex: 4 }} />
      </View>
      <FrontLlamaCenter />
    </View>
  );
}

export default MultiplayerPlayersListScreen;
