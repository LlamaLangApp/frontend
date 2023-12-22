import { FlatList, Text, View } from "react-native";
import React from "react";
import { useAppStore } from "../../state";
import PlayerListItem from "@components/PlayerListItem";
import Llama from "@components/llama/Llama";
import { PinkButton } from "@components/buttons/BasicButton";
import { buttonDarkPink, pink } from "../../Consts";
import mainStyles from "@styles/MainStyles";
import containerGamesStyles from "@styles/games/ContainerGamesStyles";
import textStyles from "@styles/TextStyles";

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
          <Text style={textStyles.grey27Weight800}>
            {gameName.toUpperCase()}
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={[textStyles.grey18, { color: pink, fontWeight: "600" }]}>
            FINAL RESULTS
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey18}>
            <Text>Your place:</Text>
            <Text style={{ color: buttonDarkPink }}> {place}</Text>
          </Text>
          <Text style={textStyles.grey18}>
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
        <PinkButton buttonText={"Exit game"} onPress={leaveGame} />
      </View>
      <Llama />
    </View>
  );
}

export default MultiplayerResult;
