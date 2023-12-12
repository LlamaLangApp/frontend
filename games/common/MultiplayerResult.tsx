import { FlatList, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useEffect, useState } from "react";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import PlayerListItem, { PlaceItem } from "../../components/PlayerListItem";
import { buttonDarkPink, pink } from "../../Consts";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import Llama from "../../components/games/Llama";
import { useAppStore } from "../../state";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GamesStackParamList } from "../../navgation/GamesStack";

type MultiplayerResultProps = {
  gameName: string;
  scoreboard: { username: string; points: number }[];
};

type GamesStack = NavigationProp<GamesStackParamList, "Home">;

function MultiplayerResult(props: MultiplayerResultProps) {
  const { gameName, scoreboard } = props;
  const user = useAppStore.getState().username;
  const [final, setFinal] = useState<PlaceItem[]>();
  const [place, setPlace] = useState<number>(0);
  const parentNavigation = useNavigation<GamesStack>();

  function handleData(): PlaceItem[] {
    const final = [];

    let currentPlace = 0;
    let currentPoints = 0;
    for (const { username, points } of scoreboard) {
      if (currentPoints !== points) {
        currentPlace += 1;
        currentPoints = points;
      }
      if (username === user) {
        setPlace(currentPlace);
      }
      final.push({ username, stat: points, place: currentPlace });
    }

    return final;
  }

  useEffect(() => {
    setFinal(() => handleData());
  }, []);

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
            data={final}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
            }}
            renderItem={({ item }) => (
              <PlayerListItem
                username={item.username}
                place={item.place}
                stat={item.stat}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={[buttonGamesStyles.basic, { backgroundColor: pink }]}
          onPress={() => parentNavigation.navigate("Home")}
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
