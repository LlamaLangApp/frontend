import { FlatList, View } from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GamesStackParamList } from "../navgation/GamesStack";
import FrontLlamaRight from "../components/llama/FrontLlamaRight";
import { games } from "../Consts";
import ButtonRow from "../components/ButtonRow";
import GameCover from "../components/GameCover";
import mainStyles from "../styles/MainStyles";
import homeStyles from "../styles/HomeStyles";
import containerStyles from "../styles/ContainerStyles";

type GamesStack = NavigationProp<GamesStackParamList, "Home">;

function HomeScreen() {
  const navigation = useNavigation<GamesStack>();
  const [gameType, setGameType] = useState("SinglePlayer");

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
          renderItem={(itemData) => {
            return (
              <GameCover
                gameName={itemData.item.name}
                onPressItem={() => {
                  if (
                    itemData.item.screenName === "Race" ||
                    itemData.item.screenName === "FindingWords"
                  ) {
                    navigation.navigate(itemData.item.screenName, {
                      fromInvite: false,
                      invite: null,
                    });
                  } else {
                    navigation.navigate(itemData.item.screenName);
                  }
                }}
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
