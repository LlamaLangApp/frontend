import { Games } from "../Consts";
import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import homeStyles from "../styles/HomeStyles";
import { useMemo } from "react";

const gameCoverImages: Record<Games, ImageSourcePropType> = {
  memory: require("../assets/games_covers/Memory.png"),
  race: require("../assets/games_covers/Race.png"),
  "falling words": require("../assets/games_covers/FallingWords.png"),
  "finding words": require("../assets/games_covers/FindingWords.png"),
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
          <Image
            source={gameCoverPath}
            style={{ width: "100%", height: 180 }}
          />
        )}
      </TouchableOpacity>
    );
  }, [gameName]);
}

export default GameCover;
