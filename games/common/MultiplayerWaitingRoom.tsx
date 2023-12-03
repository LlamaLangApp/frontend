import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import React from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import textGamesStyles from "../../styles/games/TextGamesStyles";

type MultiPlayerWaitingRoomProps = {
  gameName: string;
};
function MultiPlayerWaitingRoomScreen(props: MultiPlayerWaitingRoomProps) {
  const { gameName } = props;
  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.contentContainer}>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.headingText}>{gameName}</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>
            Waiting for other players...
          </Text>
        </View>
      </View>
      <FrontLlamaCenter />
    </View>
  );
}

export default MultiPlayerWaitingRoomScreen;
