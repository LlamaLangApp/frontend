import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React from "react";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import { grey, pink } from "../../Consts";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import Llama from "../../components/llama/Llama";
import { FontAwesome } from "@expo/vector-icons";

type StartScreenProps = {
  gameName: string;
  onPressHandler: () => void;
};

const MultiplayerJoinRoomScreen = (props: StartScreenProps) => {
  const { gameName, onPressHandler } = props;

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.gameName}>{gameName.toUpperCase()}</Text>
        </View>
        <View
          style={[
            containerGamesStyles.textWithMargin,
            { marginBottom: "6%", gap: 10 },
          ]}
        >
          <Text style={[textGamesStyles.information, { textAlign: "center" }]}>
            <Text style={{ color: pink, fontWeight: "700" }}>Steve</Text>
            <Text> has invited you to play together!</Text>
          </Text>
          <Text style={textGamesStyles.information}>
            Here is the chosen set:
          </Text>
        </View>
        <View style={[containerGamesStyles.dropDown]}>
          <View style={containerGamesStyles.fakeDropDown}>
            <Text
              style={{
                color: grey,
                textAlign: "left",
                fontSize: 17,
                fontWeight: "600",
              }}
            >
              zwierzęta
            </Text>
            <FontAwesome name={"lock"} size={19} color={grey} />
          </View>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.finePrint}>
            You will join Steve's waiting room
          </Text>
          <Text style={textGamesStyles.finePrint}>
            The game will begin when Steve decides
          </Text>
        </View>
        <TouchableOpacity
          style={[buttonGamesStyles.basic, { backgroundColor: pink }]}
          onPress={onPressHandler}
        >
          <Text
            style={{
              padding: 10,
              fontSize: 20,
              color: "white",
            }}
          >
            Join game
          </Text>
        </TouchableOpacity>
      </View>
      <Llama />
    </View>
  );
};
export default MultiplayerJoinRoomScreen;
