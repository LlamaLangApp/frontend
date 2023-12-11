import { Text, TouchableOpacity, FlatList, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React, { useEffect, useState } from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import PlayerListItem, { PlaceItem } from "../../components/PlayerListItem";
import { buttonLightPink } from "../../Consts";
import { GamesStackParamList } from "../../navgation/GamesStack";

type MultiplayerResultProps = {
  gameName: string;
  scoreboard: { username: string; points: number }[];
};
type GamesStack = NavigationProp<GamesStackParamList, "Home">;

function MultiplayerResult(props: MultiplayerResultProps) {
  const { gameName, scoreboard } = props;
  const parentNavigation = useNavigation<GamesStack>();
  const [final, setFinal] = useState<PlaceItem[]>();

  // const [yourPlace, setYourPlace] = useState<number>();
  // fix when user will be added

  function exitGameHandler() {
    parentNavigation.navigate("Home");
  }

  function handleData(): PlaceItem[] {
    const final = [];

    let currentPlace = 0;
    let currentPoints = 0;
    for (const { username, points } of scoreboard) {
      if (currentPoints !== points) {
        currentPlace += 1;
        currentPoints = points;
      }
      // if (username == ) fix when user will be added
      final.push({ username, stat: points, place: currentPlace });
    }

    return final;
  }

  useEffect(() => {
    setFinal(() => handleData());
  }, []);

  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.multiplayerContentContainer}>
        <View
          style={{
            flex: 1.5,
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: "10%",
          }}
        >
          <View
            style={{
              width: "100%",
              marginBottom: "3%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 45,
                color: "white",
                textShadowColor: "#2d2d2e",
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 4,
              }}
            >
              {gameName}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            flex: 2.5,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <FlatList
            style={{ width: "90%", flex: 2.5, marginHorizontal: "5%" }}
            data={final}
            renderItem={({ item }) => (
              <PlayerListItem
                username={item.username}
                place={item.place}
                stat={item.stat}
              />
            )}
          />
        </View>

        <View style={{ alignItems: "center", flex: 0.5 }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              width: "50%",
              backgroundColor: buttonLightPink,
              borderRadius: 30,
              margin: "1%",
            }}
            onPress={exitGameHandler}
          >
            <Text style={buttonGamesStyles.buttonText}>Exit game</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
    </View>
  );
}

export default MultiplayerResult;
