import { View, Text, Image, ImageSourcePropType } from "react-native";
import { useMemo } from "react";
import scoreboardStyles from "@styles/ScoreboardStyles";
import textStyles from "@styles/TextStyles";
import containerStyles from "@styles/ContainerStyles";

const playerPlaceImages: Record<1 | 2 | 3, ImageSourcePropType> = {
  1: require("../assets/scoreboard/medal-1.png"),
  2: require("../assets/scoreboard/medal-2.png"),
  3: require("../assets/scoreboard/medal-3.png"),
};

export type PlaceItem = {
  username: string;
  score: number;
  place: number;
};

const PlayerListItem = ({ username, place, score }: PlaceItem) => {
  const placeElement = useMemo(() => {
    if (place === 1 || place === 2 || place === 3) {
      return (
        <Image
          source={playerPlaceImages[place]}
          style={scoreboardStyles.podiumImage}
        />
      );
    } else {
      return <Text style={scoreboardStyles.placeText}>{place}</Text>;
    }
  }, [place]);

  return (
    <View style={containerStyles.spaceBetweenInRow}>
      <View style={scoreboardStyles.placeAndUsernameContainer}>
        <View style={scoreboardStyles.placeContainer}>{placeElement}</View>
        <Text style={textStyles.grey20Weight600}>{username}</Text>
      </View>
      <View style={scoreboardStyles.scoreContainer}>
        <Text style={textStyles.grey25Weight600}>{score}</Text>
      </View>
    </View>
  );
};

export default PlayerListItem;
