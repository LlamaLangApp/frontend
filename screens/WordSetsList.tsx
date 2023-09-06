import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WordSetStackParamList } from "../navgation/WordSetStack";
import { useEffect, useState } from "react";
import mainStyles from "../styles/MainStyles";
import { buttonDarkPink, buttonLightPink } from "../Consts";
import homeStyles from "../styles/HomeStyles";
import { WordSet } from "../games/GamesTypes";
import { useAppStore } from "../state";
import { callWordSets } from "../backend";

type Props = NativeStackScreenProps<WordSetStackParamList, "List">;

function WordSetsListScreen({ navigation }: Props) {
  type WordSetType = "default" | "custom";
  const [wordSetType, setWordSetType] = useState("default");
  const token = useAppStore.getState().token;
  const defaultPlayerButtonHandler = () => {
    setWordSetType("default");
  };
  const customButtonHandler = () => {
    setWordSetType("custom");
  };

  type WordSetItem = {
    name: string;
    type: WordSetType;
  };
  const [wordSetsList, setWordSetsList] = useState<WordSetItem[]>([
    { name: "coming soon ...", type: "custom" },
  ]);

  useEffect(() => {
    callWordSets(token).then((response) => {
      if (response.type === "success") {
        const wordSets: WordSet[] = response.wordSets;
        const newWordSetItem: WordSetItem[] = wordSets.map((wordSet) => ({
          name: wordSet.english,
          type: "default",
        }));
        setWordSetsList((prevState) => [...prevState, ...newWordSetItem]);
      }
    });
  }, []);

  return (
    <View style={mainStyles.container}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          marginBottom: 30,
          backgroundColor: buttonLightPink,
          borderRadius: 15,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: "40%",
            borderRadius: 15,
            backgroundColor:
              wordSetType === "default" ? buttonDarkPink : buttonLightPink,
          }}
          onPress={defaultPlayerButtonHandler}
        >
          <Text style={homeStyles.buttonText}>default</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: "40%",
            borderRadius: 15,
            backgroundColor: wordSetType === "custom" ? "#b85971" : "#c77d90",
          }}
          onPress={customButtonHandler}
        >
          <Text style={homeStyles.buttonText}>custom</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "90%", flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={wordSetsList.filter((wordSet) => wordSet.type == wordSetType)}
          renderItem={(itemData) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Display");
                }}
              >
                <View
                  style={{
                    margin: 3,
                    paddingVertical: 12,
                    borderRadius: 15,
                    backgroundColor: "#e17c9b",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                    }}
                  >
                    {itemData.item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

export default WordSetsListScreen;
