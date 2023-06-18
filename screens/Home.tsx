import { FlatList, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import homeStyles from "../styles/HomeStyles";
import React, { useState } from "react";
import GameListItem from "../components/GameListItem";
import { buttonDarkPink, buttonLightPink } from "../Consts";
import FrontLlamaRight from "../components/FrontLlamaRight";

function HomeScreen() {
  type GameType = "singlePlayer" | "multiplayer";
  const [gameType, setGameType] = useState("singlePlayer");
  const singlePlayerButtonHandler = () => {
    setGameType("singlePlayer");
  };
  const multiplayerButtonHandler = () => {
    setGameType("multiplayer");
  };

  type GameItem = {
    id: string;
    name: string;
    type: GameType;
  };

  const games: GameItem[] = [
    { id: "1", name: "memory", type: "singlePlayer" },
    { id: "2", name: "kahoot", type: "multiplayer" },
    { id: "3", name: "gra2", type: "singlePlayer" },
    { id: "4", name: "gra3", type: "singlePlayer" },
  ];

  return (
    <View style={mainStyles.container}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          marginBottom: 30,
          backgroundColor: buttonLightPink,
          borderRadius: 15,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: "40%",
            borderRadius: 15,
            backgroundColor:
              gameType === "singlePlayer" ? buttonDarkPink : buttonLightPink,
          }}
          onPress={singlePlayerButtonHandler}
        >
          <Text style={homeStyles.buttonText}>SinglePlayer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: "40%",
            borderRadius: 15,
            backgroundColor: gameType === "multiplayer" ? "#b85971" : "#c77d90",
          }}
          onPress={multiplayerButtonHandler}
        >
          <Text style={homeStyles.buttonText}>MultiPlayer</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "90%", flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={games.filter((game) => game.type == gameType)}
          renderItem={(itemData) => {
            return (
              <GameListItem text={itemData.item.name} id={itemData.item.id} />
            );
          }}
        />
      </View>
      <FrontLlamaRight />
    </View>
  );
}

export default HomeScreen;
