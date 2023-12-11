import { FlatList, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import React, { useState } from "react";
import GameListItem from "../components/GameListItem";
import FrontLlamaRight from "../components/FrontLlamaRight";
import { GamesStackParamList } from "../navgation/GamesStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ButtonRow from "../components/ButtonRow";
import Toast from "react-native-toast-message";

type GamesStack = NavigationProp<GamesStackParamList, "Home">;

function HomeScreen() {
  const navigation = useNavigation<GamesStack>();
  type GameType = "SinglePlayer" | "MultiPlayer";
  const [gameType, setGameType] = useState("SinglePlayer");

  type GameItem = {
    id: string;
    name: string;
    type: GameType;
    screenName: keyof GamesStackParamList;
  };

  const games: GameItem[] = [
    { id: "1", name: "memory", type: "SinglePlayer", screenName: "Memory" },
    { id: "2", name: "race", type: "MultiPlayer", screenName: "Race" },
    {
      id: "3",
      name: "falling words",
      type: "SinglePlayer",
      screenName: "FallingWords",
    },
    {
      id: "4",
      name: "finding words",
      type: "MultiPlayer",
      screenName: "FindingWords",
    },
    // { id: "5", name: "memory", type: "SinglePlayer", screenName: "Memory" },
    // { id: "6", name: "memory", type: "SinglePlayer", screenName: "Memory" },
    // { id: "7", name: "memory", type: "SinglePlayer", screenName: "Memory" },
  ];

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={{ marginTop: 30, marginBottom: 15, width: "100%" }}>
        <ButtonRow
          choices={[
            { choice: "SinglePlayer", icon: "user-alt" },
            { choice: "MultiPlayer", icon: "user-friends" },
          ]}
          onSelect={setGameType}
        />
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={games.filter((game) => game.type == gameType)}
          renderItem={(itemData) => {
            return (
              <GameListItem
                text={itemData.item.name}
                id={itemData.item.id}
                disableHighlight={true}
                onPressItem={() => {
                  navigation.navigate(itemData.item.screenName);
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
