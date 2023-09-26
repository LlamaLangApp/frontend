import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAppStore } from "../../state";
import { NavigationProp } from "@react-navigation/native";
import { WordSetStackParamList } from "../../navgation/WordSetStack";
import { Translation, WordSet } from "../../games/GamesTypes";
import { callTranslations, callWordSets } from "../../backend";

export type FlashCards = {
  english: string;
  polish: string;
};

interface WordSetContextType {
  chosenSetName: string;
  chosenPolish: boolean;
  startFlashCards: boolean;
  setFlashCards: Dispatch<SetStateAction<FlashCards[]>>;
  setStartFlashCards: Dispatch<SetStateAction<boolean>>;
  setChosenPolish: Dispatch<SetStateAction<boolean>>;
  wordSetsList: WordSetItem[];
  chosenSet: Translation[];
  flashCards: FlashCards[];
  handleFlashCardsButton: () => void;
  handleChosenSet: (name: string, id: number | undefined) => void;
}

const WordSetContext = createContext<WordSetContextType>({
  chosenSetName: "",
  chosenPolish: true,
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

type WordSetType = "Default" | "Custom";

type WordSetItem = {
  id: number | undefined;
  name: string;
  type: WordSetType;
};

const WordSetProvider = ({ children, navigation }: WordSetProviderProps) => {
  const token = useAppStore.getState().token;
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

  function handleChosenSet(name: string, id: number | undefined) {
    setChosenSetName(name);
    setChosenSetId(id);
    navigation.navigate("Display");
  }

  useEffect(() => {
    callWordSets(token).then((response) => {
      if (response.type === "success") {
        const wordSets: WordSet[] = response.wordSets;
        const newWordSetItem: WordSetItem[] = wordSets.map((wordSet) => ({
          id: wordSet.id,
          name: wordSet.english,
          type: "Default",
        }));
        setWordSetsList(newWordSetItem);
      }
    });
  }, []);

  useEffect(() => {
    if (chosenSetName != "") {
      callTranslations(token, chosenSetId, null).then((response) => {
        if (response.type === "success") {
          setChosenSet(response.translations);
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
