import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import homeStyles from "../styles/HomeStyles";
import { serverURL } from "../backend";
import React, { useState } from "react";
// import { RootStackParamList } from "../App";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppStore } from "../state";
import GameListItem from "../components/GameListItem";

// type Props = NativeStackScreenProps<RootStackParamList, "Home">;
// function HomeScreen({ navigation }: Props) {

function HomeScreen() {
  type GameType = "singlePlayer" | "multiplayer";
  const setToken = useAppStore((store) => store.setToken);
  const [gameType, setGameType] = useState("singlePlayer");
  const singlePlayerButtonHandler = () => {
    setGameType("singlePlayer");
  };
  const multiplayerButtonHandler = () => {
    setGameType("multiplayer");
  };

  async function logoutHandler() {
    try {
      const response = await fetch(`http://${serverURL}/auth/token/logout/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(response + " " + JSON.stringify(await response.json()));
      setToken(null);
    } catch (error) {
      console.error(error);
    }
  }

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
    { id: "5", name: "gra4", type: "singlePlayer" },
    { id: "6", name: "gra5", type: "singlePlayer" },
    { id: "7", name: "gra6", type: "singlePlayer" },
    { id: "8", name: "gra7", type: "singlePlayer" },
    { id: "9", name: "gra8", type: "singlePlayer" },
    { id: "10", name: "gra9", type: "singlePlayer" },
  ];

  return (
    <View style={mainStyles.container}>
      <View style={{ paddingVertical: 40 }}>
        <TouchableOpacity
          style={homeStyles.loginButton}
          onPress={logoutHandler}
        >
          <Text style={homeStyles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 30,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: "40%",
            borderBottomLeftRadius: 15,
            borderTopLeftRadius: 15,
            backgroundColor:
              gameType === "singlePlayer" ? "#b85971" : "#c77d90",
          }}
          onPress={singlePlayerButtonHandler}
        >
          <Text style={homeStyles.buttonText}>SinglePlayer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: "40%",
            borderBottomRightRadius: 15,
            borderTopRightRadius: 15,
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
      <View style={homeStyles.logoContainer}>
        <Image
          source={require("../assets/llama_without_background.png")}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
