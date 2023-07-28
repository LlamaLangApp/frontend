import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import gameStyles from "../styles/GamesStyles";
import FrontLlamaCenter from "../components/FrontLlamaCenter";
import Toast from "react-native-toast-message";

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
      <View style={gameStyles.contentContainer}>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.headingText}>{gameName}</Text>
        </View>
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.basicText}>You have earned:</Text>
        </View>
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>{points} pkt</Text>
        </View>
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.basicText}>
            {hasWon
              ? "Yay! You learned set:"
              : "Unfortunately, you don't know all words from set:"}
          </Text>
        </View>
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>{setName}</Text>
        </View>
        <Text> </Text>
        <Text> </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={gameStyles.button} onPress={exitGameHandler}>
            <Text style={gameStyles.buttonText}>Exit game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={gameStyles.button}
            onPress={playAgainHandler}
          >
            <Text style={gameStyles.buttonText}>Play again</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
};

export default SinglePlayerResultsScreen;
