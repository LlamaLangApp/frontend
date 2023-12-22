import { Text, View } from "react-native";
import React from "react";
import Llama from "../../components/llama/Llama";
import {
  LightGreyButton,
  PinkButton,
} from "../../components/buttons/BasicButton";
import { pink } from "../../Consts";
import mainStyles from "../../styles/MainStyles";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import textStyles from "../../styles/TextStyles";

type SinglePlayerResultProps = {
  gameName: string;
  points: number;
  rounds: number;
  setName: string;
  exitGameHandler: () => void;
  playAgainHandler: () => void;
};

const SinglePlayerResultScreen = (props: SinglePlayerResultProps) => {
  const {
    gameName,
    points,
    rounds,
    setName,
    exitGameHandler,
    playAgainHandler,
  } = props;
  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey27Weight800}>
            {gameName.toUpperCase()}
          </Text>
        </View>
        <View
          style={[containerGamesStyles.textWithMargin, { marginBottom: "10%" }]}
        >
          <Text style={[textStyles.grey18, { color: pink, fontWeight: "600" }]}>
            FINAL RESULTS
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey18}>
            <Text>You were repeating words from set:</Text>
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.pink30weight700}>
            <Text>{setName.toUpperCase()}</Text>
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey18}>
            <Text>You answered </Text>
            <Text style={{ fontWeight: "600", color: pink, fontSize: 20 }}>
              {points / 10}/{rounds}
            </Text>
            <Text> of them correctly</Text>
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={[textStyles.grey18, textStyles.weight700]}>
            Congratulations!
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey18}>
            <Text>Your earned </Text>
            <Text style={{ fontWeight: "600", color: pink, fontSize: 20 }}>
              {points}
            </Text>
            <Text> points</Text>
          </Text>
        </View>
        <PinkButton buttonText={"Play again"} onPress={playAgainHandler} />
        <LightGreyButton buttonText={"Exit game"} onPress={exitGameHandler} />
      </View>
      <Llama />
    </View>
  );
};

export default SinglePlayerResultScreen;
