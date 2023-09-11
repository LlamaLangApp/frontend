import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAppStore } from "../state";
import { NavigationProp } from "@react-navigation/native";
import { WordSetStackParamList } from "../navgation/WordSetStack";
import { Translation, WordSet } from "../games/GamesTypes";
import { callTranslations, callWordSets } from "../backend";
import { makeCards } from "../games/memory/MemoryCard";

interface WordSetContextType {
  chosenSetName: string;
  // chosenCard: number;
  setChosenSetName: Dispatch<SetStateAction<string>>;
  setChosenSetId: Dispatch<SetStateAction<number | undefined>>;
  wordSetsList: WordSetItem[];
  chosenSet: Translation[];
}

const WordSetContext = createContext<WordSetContextType>({
  chosenSetName: "",
  setChosenSetName: () => {
    return "";
  },
  setChosenSetId: () => {
    return undefined;
  },
  wordSetsList: [],
  chosenSet: [],
});

type WordSetProviderProps = {
  children: ReactNode;
  navigation: NavigationProp<WordSetStackParamList>;
};

type WordSetType = "default" | "custom";

type WordSetItem = {
  id: number | undefined;
  name: string;
  type: WordSetType;
};

const WordSetProvider = ({ children, navigation }: WordSetProviderProps) => {
  const token = useAppStore.getState().token;
  const [chosenSetName, setChosenSetName] = useState<string>("");
  const [chosenSetId, setChosenSetId] = useState<number | undefined>(undefined);
  const [chosenSet, setChosenSet] = useState<Translation[]>([]);
  const [wordSetsList, setWordSetsList] = useState<WordSetItem[]>([
    { id: undefined, name: "coming soon ...", type: "custom" },
  ]);
  useEffect(() => {
    callWordSets(token).then((response) => {
      if (response.type === "success") {
        const wordSets: WordSet[] = response.wordSets;
        const newWordSetItem: WordSetItem[] = wordSets.map((wordSet) => ({
          id: wordSet.id,
          name: wordSet.english,
          type: "default",
        }));
        setWordSetsList(newWordSetItem);
      }
    });
  }, []);
  // const [chosenCard, setChosenCard] = useState(-1);

  useEffect(() => {
    console.log(chosenSetName);
    if (chosenSetName != "") {
      callTranslations(token, chosenSetId, null).then((response) => {
        if (response.type === "success") {
          // setChosenSet();
          console.log(response.translations);
        }
      });
      navigation.navigate("Display");
    }
  }, [chosenSetName]);

  return (
    <WordSetContext.Provider
      value={{
        chosenSetName,
        setChosenSetName,
        setChosenSetId,
        wordSetsList,
        chosenSet,
      }}
    >
      {children}
    </WordSetContext.Provider>
  );
};
export { WordSetContext, WordSetProvider };
