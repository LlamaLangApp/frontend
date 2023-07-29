import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import gameStyles from "../styles/GamesStyles";
import CustomDropdown from "../components/CustomDropdown";
import FrontLlamaCenter from "../components/FrontLlamaCenter";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import { callWordSets } from "../backend";
import { useAppStore } from "../state";
import { WordSet } from "./GamesTypes";

type SinglePlayerStartProps = {
  gameName: string;
  setWordSetName: (selectedItem: string) => void;
  setWordSetId: (selectedItem: number) => void;
  startGameHandler: () => void;
};
const SinglePlayerStartScreen = (props: SinglePlayerStartProps) => {
  const { gameName, setWordSetName, setWordSetId, startGameHandler } = props;

  const [wordSetType, setWordSetType] = useState<string>("");
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const token = useAppStore.getState().token;

  useEffect(() => {
    if (wordSetType === "Default sets") {
      callWordSets(token).then((response) => {
        if (response.type === "success") {
          setWordSets(response.wordSets);
        } else {
          setWordSets([]);
        }
      });
    } else {
      setWordSets([]);
      setWordSetName("");
      setWordSetId(-1);
    }
  }, [wordSetType]);

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
          onSelectFunc={setWordSetType}
        />
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>Set:</Text>
        </View>
        <CustomDropdown
          defaultSelectText={"set"}
          selectData={wordSets.map((wordSet) => wordSet.polish)}
          onSelectFunc={(selectedItem) => {
            setWordSetName(selectedItem);
            setWordSetId(
              wordSets.find((wordSet) => wordSet.polish === selectedItem)?.id ??
                -1
            );
          }}
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
