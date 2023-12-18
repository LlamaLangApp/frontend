import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { Games } from "../Consts";
import homeStyles from "../styles/HomeStyles";

const gameCoverImages: Record<Games, ImageSourcePropType> = {
  memory: require("../assets/games/Memory.png"),
  race: require("../assets/games/Race.png"),
  "falling words": require("../assets/games/FallingWords.png"),
  "finding words": require("../assets/games/FindingWords.png"),
};

type GameCoverProps = {
  gameName: Games;
  onPressItem: () => void;
};

function GameCover({ gameName, onPressItem }: GameCoverProps) {
  return useMemo(() => {
    const gameCoverPath = gameCoverImages[gameName];
    return (
      <TouchableOpacity
        onPress={onPressItem}
        style={homeStyles.coverImageContainer}
      >
        {gameCoverPath && (
          <Image source={gameCoverPath} style={homeStyles.coverImage} />
        )}
      </TouchableOpacity>
    );
  }, [gameName]);
}

export default GameCover;
