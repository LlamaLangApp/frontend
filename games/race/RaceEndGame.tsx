import { Text, TouchableOpacity, FlatList, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React, { useEffect, useState } from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../App";
import { RaceStackParamList } from "./RaceStack";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import PlayerListItem, { PlaceItem } from "../../components/PlayerListItem";

type Props = NativeStackScreenProps<RaceStackParamList, "EndGame">;
type MainStack = NavigationProp<MainStackParamList, "Home">;

function RaceEndGameScreen({ route }: Props) {
  const parentNavigation = useNavigation<MainStack>();
  const { scoreboard } = route.params;
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
      final.push({ username, stat: points.toString(), place: currentPlace });
    }

    return final;
  }

  useEffect(() => {
    setFinal(() => handleData());
  }, []);

  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.multiplayerContentContainer}>
        <View style={{ flex: 2 }}>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={textGamesStyles.headingText}>Race</Text>
          </View>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={textGamesStyles.basicText}>You have earned:</Text>
          </View>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={textGamesStyles.secondaryText}> pkt</Text>
          </View>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={textGamesStyles.headingText}>
              "Yay! You win"
              {/*{true ? "Yay! You win" : "Unfortunately, you lost"}*/}
              {/*fix when user will be added*/}
            </Text>
          </View>
          <View style={textGamesStyles.textWithMarginContainer}>
            <Text style={textGamesStyles.secondaryText}>gg</Text>
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
            style={buttonGamesStyles.button}
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

export default RaceEndGameScreen;
