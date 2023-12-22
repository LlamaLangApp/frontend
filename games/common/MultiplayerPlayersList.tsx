import { FlatList, Text, View } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppStore } from "../../state";
import Llama from "@components/llama/Llama";
import { grey, pink } from "../../Consts";
import mainStyles from "@styles/MainStyles";
import containerGamesStyles from "@styles/games/ContainerGamesStyles";
import textStyles from "@styles/TextStyles";

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
          <Text style={textStyles.grey27Weight800}>
            {gameName.toUpperCase()}
          </Text>
        </View>
        <View style={[containerGamesStyles.textWithMargin, { gap: 10 }]}>
          <Text style={[textStyles.grey18, { color: pink }]}>
            The game is starting now!
          </Text>
          <Text style={textStyles.grey18}>Meet the players:</Text>
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
                <Text style={[textStyles.button, { color: grey }]}>{item}</Text>
                {item === username && (
                  <Text
                    style={{ fontWeight: "600", fontSize: 13, color: grey }}
                  >
                    (YOU)
                  </Text>
                )}
                {item === hostName && (
                  <FontAwesome5 name={"crown"} size={16} color={pink} />
                )}
              </View>
            )}
          />
        </View>
      </View>
      <Llama />
      <Toast position="top" topOffset={30} />
    </View>
  );
}

export default MultiplayerPlayersListScreen;
