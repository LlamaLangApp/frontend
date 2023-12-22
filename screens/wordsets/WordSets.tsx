import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { NavigationProp } from "@react-navigation/native";
import { WordSetStackParamList } from "../../navgation/WordSetStack";
import { useAppStore } from "../../state";
import {
  callTranslations,
  callWordSets,
  Translation,
  WordSet,
} from "../../backend/WordSetsBackend";

export type FlashCards = {
  english: string;
  polish: string;
};

interface WordSetContextType {
  chosenSetName: string;
  chosenPolish: boolean;
  chosenWordSet: WordSetItem;
  startFlashCards: boolean;
  setFlashCards: Dispatch<SetStateAction<FlashCards[]>>;
  setStartFlashCards: Dispatch<SetStateAction<boolean>>;
  setChosenPolish: Dispatch<SetStateAction<boolean>>;
  wordSetsList: WordSetItem[];
  chosenSet: Translation[];
  flashCards: FlashCards[];
  handleFlashCardsButton: () => void;
  handleChosenSet: (wordSet: WordSetItem) => void;
}

type WordSetType = "Default" | "Custom";

type WordSetItem = {
  id: number | undefined;
  name: string;
  type: WordSetType;
  category: string;
  locked: boolean;
  depends_on: { name: string }[];
};

export const defaultWordSetData: WordSetItem = {
  id: 0,
  name: "",
  type: "Default",
  category: "",
  locked: false,
  depends_on: [{ name: "" }],
};

const WordSetContext = createContext<WordSetContextType>({
  chosenSetName: "",
  chosenPolish: true,
  chosenWordSet: defaultWordSetData,
  startFlashCards: true,
  setFlashCards: () => {
    return [];
  },
  setStartFlashCards: () => {
    return true;
  },
  setChosenPolish: () => {
    return true;
  },
  wordSetsList: [],
  chosenSet: [],
  flashCards: [],
  handleChosenSet: () => console.log(`1`),
  handleFlashCardsButton: () => console.log(`1`),
});

type WordSetProviderProps = {
  children: ReactNode;
  navigation: NavigationProp<WordSetStackParamList>;
};

const WordSetProvider = ({ children, navigation }: WordSetProviderProps) => {
  const token = useAppStore.getState().token;
  const [chosenWordSet, setChosenWordSet] =
    useState<WordSetItem>(defaultWordSetData);
  const [chosenSetName, setChosenSetName] = useState<string>("");
  const [chosenSetId, setChosenSetId] = useState<number | undefined>(undefined);
  const [flashCards, setFlashCards] = useState<FlashCards[]>([]);
  const [chosenSet, setChosenSet] = useState<Translation[]>([]);
  const [chosenPolish, setChosenPolish] = useState<boolean>(true);
  const [startFlashCards, setStartFlashCards] = useState<boolean>(true);
  const [wordSetsList, setWordSetsList] = useState<WordSetItem[]>([]);

  function handleFlashCardsButton() {
    setFlashCards(
      chosenSet
        .map((translation) => ({
          showAnswer: chosenPolish,
          english: translation.english,
          polish: translation.polish,
        }))
        .sort(() => Math.random() - 0.5)
    );
    setStartFlashCards(true);
    navigation.navigate("FlashCards");
  }

  function handleChosenSet(wordSet: WordSetItem) {
    setChosenWordSet(wordSet);
    setChosenSetName(wordSet.name);
    setChosenSetId(wordSet.id);
    navigation.navigate("Display");
  }

  useEffect(() => {
    callWordSets(token).then((response) => {
      if (response.type === "success") {
        const wordSets: WordSet[] = response.result;
        console.log(response.result);
        const newWordSetItem: WordSetItem[] = wordSets.map((wordSet) => ({
          id: wordSet.id,
          name: wordSet.english,
          type: "Default",
          category: wordSet.category,
          locked: wordSet.locked,
          depends_on: wordSet.depends_on.map((item) => ({
            name: item.english,
          })),
        }));
        setWordSetsList(newWordSetItem);
      }
    });
  }, []);

  useEffect(() => {
    if (chosenSetName != "") {
      callTranslations(token, chosenSetId, null).then((response) => {
        if (response.type === "success") {
          setChosenSet(response.result);
        }
      });
      navigation.navigate("Display");
    }
  }, [chosenSetName]);

  return (
    <WordSetContext.Provider
      value={{
        chosenSetName,
        chosenPolish,
        chosenWordSet,
        startFlashCards,
        setFlashCards,
        setStartFlashCards,
        setChosenPolish,
        wordSetsList,
        chosenSet,
        flashCards,
        handleFlashCardsButton,
        handleChosenSet,
      }}
    >
      {children}
    </WordSetContext.Provider>
  );
};
export { WordSetContext, WordSetProvider };
