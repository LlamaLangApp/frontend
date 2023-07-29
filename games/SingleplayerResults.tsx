import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import mainGamesStyles from "../styles/games/MainGamesStyles";
import FrontLlamaCenter from "../components/FrontLlamaCenter";
import Toast from "react-native-toast-message";
import buttonGamesStyles from "../styles/games/ButtonGamesStyles";
import textGamesStyles from "../styles/games/TextGamesStyles";

type SinglePlayerResultsProps = {
  gameName: string;
  points: string;
  hasWon: boolean;
  setName: string;
  exitGameHandler: () => void;
  playAgainHandler: () => void;
};

const SinglePlayerResultsScreen = (props: SinglePlayerResultsProps) => {
  const {
    gameName,
    points,
    hasWon,
    setName,
    exitGameHandler,
    playAgainHandler,
  } = props;
  return (
    <View style={mainStyles.container}>
      <View style={mainGamesStyles.contentContainer}>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.headingText}>{gameName}</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.basicText}>You have earned:</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>{points} pkt</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.basicText}>
            {hasWon
              ? "Yay! You learned set:"
              : "Unfortunately, you don't know all words from set:"}
          </Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>{setName}</Text>
        </View>
        <Text> </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={buttonGamesStyles.button}
            onPress={exitGameHandler}
          >
            <Text style={buttonGamesStyles.buttonText}>Exit game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonGamesStyles.button}
            onPress={playAgainHandler}
          >
            <Text style={buttonGamesStyles.buttonText}>Play again</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
    </View>
  );
};

export default SinglePlayerResultsScreen;
