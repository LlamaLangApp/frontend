import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import { buttonLightPink } from "../../Consts";

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
    hasWon,
    setName,
    exitGameHandler,
    playAgainHandler,
  } = props;
  return (
    <View style={mainStyles.container}>
      <View
        style={{
          flex: 5.2,
          justifyContent: "flex-end",
          marginHorizontal: "10%",
          marginTop: "10%",
          width: "80%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 60,
              color: "white",
              textShadowColor: "#2d2d2e",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
            }}
          >
            {gameName}
          </Text>
        </View>
        <View
          style={{
            width: "80%",
            height: "8%",
            marginHorizontal: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
            }}
          >
            You have earned:
          </Text>
        </View>
        <View
          style={{
            width: "78%",
            height: "8%",
            marginHorizontal: "11%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 30, color: "white" }}>{points} pkt</Text>
        </View>
        <View
          style={{
            width: "80%",
            height: "8%",
            marginHorizontal: "10%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            {hasWon
              ? "Yay! You learned set:"
              : "Unfortunately, you don't know all words from set:"}
          </Text>
        </View>
        <View
          style={{
            width: "80%",
            height: "8%",
            marginHorizontal: "10%",
            marginBottom: "12%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 30, color: "white" }}>{setName}</Text>
        </View>
        <View style={{ flexDirection: "column", width: "50%" }}>
          <TouchableOpacity onPress={exitGameHandler}>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                backgroundColor: buttonLightPink,
                borderRadius: 30,
                margin: "1%",
                marginBottom: "8%",
              }}
            >
              <Text style={buttonGamesStyles.buttonText}>Exit game</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              width: "100%",
              backgroundColor: buttonLightPink,
              borderRadius: 30,
              margin: "1%",
            }}
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
