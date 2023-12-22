import { FlatList, View } from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GamesStackParamList } from "@navigation/GamesStack";
import FrontLlamaRight from "@components/llama/FrontLlamaRight";
import ButtonRow from "@components/ButtonRow";
import GameCover from "@components/GameCover";
import { GameItem, games } from "../Consts";
import mainStyles from "@styles/MainStyles";
import homeStyles from "@styles/HomeStyles";
import containerStyles from "@styles/ContainerStyles";

type GamesStack = NavigationProp<GamesStackParamList, "Home">;

function HomeScreen() {
  const navigation = useNavigation<GamesStack>();
  const [gameType, setGameType] = useState("SinglePlayer");

  const goToGame = (item: GameItem) => {
    if (item.screenName === "Race" || item.screenName === "FindingWords") {
      navigation.navigate(item.screenName, {
        fromInvite: false,
        invite: null,
      });
    } else {
      navigation.navigate(item.screenName);
    }
  };

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerStyles.buttonRow}>
        <ButtonRow
          choices={[
            { choice: "SinglePlayer", icon: "user-alt" },
            { choice: "MultiPlayer", icon: "user-friends" },
          ]}
          onSelect={setGameType}
        />
      </View>
      <View style={homeStyles.gamesListContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={games.filter((game) => game.type == gameType)}
          renderItem={({ item }) => {
            return (
              <GameCover
                gameName={item.name}
                onPressItem={() => goToGame(item)}
              />
            );
          }}
        />
      </View>
      <FrontLlamaRight />
      <Toast position="top" bottomOffset={5} />
    </View>
  );
}

export default HomeScreen;
