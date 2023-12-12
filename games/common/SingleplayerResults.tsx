import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import { grey, lightGrey, pink } from "../../Consts";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import Llama from "../../components/games/Llama";
import React from "react";

type SinglePlayerResultsProps = {
  gameName: string;
  points: number;
  hasWon: boolean;
  setName: string;
  exitGameHandler: () => void;
  playAgainHandler: () => void;
};

const SinglePlayerResultsScreen = (props: SinglePlayerResultsProps) => {
  const {
    gameName,
    points,
    // hasWon,
    setName,
    exitGameHandler,
    playAgainHandler,
  } = props;
  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.gameName}>{gameName.toUpperCase()}</Text>
        </View>
        <View
          style={[containerGamesStyles.textWithMargin, { marginBottom: "10%" }]}
        >
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
            <Text>You were repeating words from set:</Text>
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.important}>
            <Text>{setName.toUpperCase()}</Text>
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.information}>
            <Text>You answered </Text>
            <Text style={{ fontWeight: "600", color: pink, fontSize: 20 }}>
              {points / 10}/6
            </Text>
            <Text> of them correctly</Text>
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text
            style={[textGamesStyles.information, textGamesStyles.weight700]}
          >
            Congratulations!
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.information}>
            <Text>Your earned </Text>
            <Text style={{ fontWeight: "600", color: pink, fontSize: 20 }}>
              {points}
            </Text>
            <Text> points</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={[
            buttonGamesStyles.basic,
            { backgroundColor: pink, marginTop: "10%" },
          ]}
          onPress={playAgainHandler}
        >
          <Text style={[textGamesStyles.button, { color: "white" }]}>
            Play again
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[buttonGamesStyles.basic, { backgroundColor: lightGrey }]}
          onPress={exitGameHandler}
        >
          <Text style={[textGamesStyles.button, { color: grey }]}>
            Exit game
          </Text>
        </TouchableOpacity>
      </View>
      <Llama />
    </View>
  );
};

export default SinglePlayerResultsScreen;
