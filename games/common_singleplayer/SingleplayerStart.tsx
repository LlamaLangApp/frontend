import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import mainGamesStyles from "../../styles/games/MainGamesStyles";
import CustomDropdown from "../../components/CustomDropdown";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { useEffect, useState } from "react";
import { callWordSets } from "../../backend/WordSetsBackend";
import { useAppStore } from "../../state";
import { WordSet } from "../GamesTypes";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";

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
      <View style={mainGamesStyles.mainContentContainer}>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.headingText}>{gameName}</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>Pick set of words:</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>Type of set:</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <CustomDropdown
            defaultSelectText={"type"}
            selectData={["Default sets", "Custom sets (coming soon...)"]}
            onSelectFunc={setWordSetType}
          />
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <Text style={textGamesStyles.secondaryText}>Set:</Text>
        </View>
        <View style={textGamesStyles.textWithMarginContainer}>
          <CustomDropdown
            defaultSelectText={"set"}
            selectData={wordSets.map((wordSet) => wordSet.polish)}
            onSelectFunc={(selectedItem) => {
              setWordSetName(selectedItem);
              setWordSetId(
                wordSets.find((wordSet) => wordSet.polish === selectedItem)
                  ?.id ?? -1
              );
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={buttonGamesStyles.startButton}
            onPress={startGameHandler}
          >
            <Text style={buttonGamesStyles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
    </View>
  );
};

export default SinglePlayerStartScreen;
