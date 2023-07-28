import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import gameStyles from "../styles/GamesStyles";
import CustomDropdown from "../components/CustomDropdown";
import FrontLlamaCenter from "../components/FrontLlamaCenter";
import Toast from "react-native-toast-message";

type SinglePlayerStartProps = {
  gameName: string;
  selectTypeHandler: (selectedItem: string) => void;
  wordSetNames: string[];
  selectWordSetHandler: (selectedItem: string) => void;
  startGameHandler: () => void;
};
const SinglePlayerStartScreen = (props: SinglePlayerStartProps) => {
  const {
    gameName,
    selectTypeHandler,
    wordSetNames,
    selectWordSetHandler,
    startGameHandler,
  } = props;
  return (
    <View style={mainStyles.container}>
      <View style={gameStyles.contentContainer}>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.headingText}>{gameName}</Text>
        </View>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>Pick set of words:</Text>
        </View>
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>Type of set:</Text>
        </View>
        <CustomDropdown
          defaultSelectText={"type"}
          selectData={["Default sets", "Custom sets (coming soon...)"]}
          onSelectFunc={selectTypeHandler}
        />
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>Set:</Text>
        </View>
        <CustomDropdown
          defaultSelectText={"set"}
          selectData={wordSetNames}
          onSelectFunc={selectWordSetHandler}
        />
        <Text> </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={gameStyles.startButton}
            onPress={startGameHandler}
          >
            <Text style={gameStyles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
};

export default SinglePlayerStartScreen;
