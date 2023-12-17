import { FlatList, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React from "react";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import PlayerListItem from "../../components/PlayerListItem";
import { buttonDarkPink, pink } from "../../Consts";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import Llama from "../../components/llama/Llama";
import { useAppStore } from "../../state";

type MultiplayerResultProps = {
  gameName: string;
  scoreboard: { username: string; score: number; place: number }[];
  leaveGame: () => void;
};

function MultiplayerResult(props: MultiplayerResultProps) {
  const { gameName, scoreboard, leaveGame } = props;
  const user = useAppStore.getState().username;
  const place = scoreboard.filter((item) => item.username === user)[0].place;

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.gameName}>{gameName.toUpperCase()}</Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text
            style={[
              textGamesStyles.information,
              { color: pink, fontWeight: "600" },
            ]}
          >
            FINAL RESULTS
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.information}>
            <Text>Your place:</Text>
            <Text style={{ color: buttonDarkPink }}> {place}</Text>
          </Text>
          <Text style={textGamesStyles.information}>
            <Text>Congratulations!</Text>
          </Text>
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
              width: "80%",
              borderRadius: 10,
              height: "100%",
            }}
            data={scoreboard}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
            }}
            renderItem={({ item }) => (
              <PlayerListItem
                username={item.username}
                place={item.place}
                score={item.score}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={[buttonGamesStyles.basic, { backgroundColor: pink }]}
          onPress={leaveGame}
        >
          <Text style={[textGamesStyles.button, { color: "white" }]}>
            Exit game
          </Text>
        </TouchableOpacity>
      </View>
      <Llama />
    </View>
  );
}

export default MultiplayerResult;
