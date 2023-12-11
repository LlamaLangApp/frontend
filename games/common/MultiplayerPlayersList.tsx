import { FlatList, Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React from "react";
import { grey, pink } from "../../Consts";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import Llama from "../../components/games/Llama";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppStore } from "../../state";

type MultiplayerPlayersListProps = {
  gameName: string;
  hostName: string;
  players: string[];
};

function MultiplayerPlayersListScreen(props: MultiplayerPlayersListProps) {
  const username = useAppStore.getState().username;
  const { gameName, hostName, players } = props;

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.gameName}>{gameName.toUpperCase()}</Text>
        </View>
        <View style={[containerGamesStyles.textWithMargin, { gap: 10 }]}>
          <Text style={[textGamesStyles.information, { color: pink }]}>
            The game is starting now!
          </Text>
          <Text style={textGamesStyles.information}>Meet the players:</Text>
        </View>
        <View
          style={{
            height: "40%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FlatList
            style={{
              width: "70%",
              borderRadius: 10,
              height: "100%",
            }}
            data={players}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingVertical: 5,
                  margin: 2,
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <Text style={[textGamesStyles.button, { color: grey }]}>
                  {item}
                </Text>
                {item === hostName && (
                  <FontAwesome5 name={"crown"} size={16} color={pink} />
                )}
                {item === username && (
                  <Text style={[textGamesStyles.button, { color: grey }]}>
                    (You)
                  </Text>
                )}
              </View>
            )}
          />
        </View>
      </View>
      <Llama />
    </View>
  );
}

export default MultiplayerPlayersListScreen;
