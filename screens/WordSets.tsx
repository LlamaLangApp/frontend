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

export type FlashCards = {
  showAnswer: boolean;
  english: string;
  polish: string;
};
interface WordSetContextType {
  chosenSetName: string;
  chosenPolish: boolean;
  startFlashCards: boolean;
  setStartFlashCards: Dispatch<SetStateAction<boolean>>;
  setChosenSetName: Dispatch<SetStateAction<string>>;
  setChosenPolish: Dispatch<SetStateAction<boolean>>;
  setChosenSetId: Dispatch<SetStateAction<number | undefined>>;
  wordSetsList: WordSetItem[];
  chosenSet: Translation[];
  flashCards: FlashCards[];
  handleFlashCardsButton: () => void;
}

const WordSetContext = createContext<WordSetContextType>({
  chosenSetName: "",
  chosenPolish: true,
  startFlashCards: true,
  setStartFlashCards: () => {
    return true;
  },
  setChosenSetName: () => {
    return "";
  },
  setChosenPolish: () => {
    return true;
  },
  setChosenSetId: () => {
    return undefined;
  },
  wordSetsList: [],
  chosenSet: [],
  flashCards: [],
  handleFlashCardsButton: () => {
    console.log(`1`);
  },
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
  const [flashCards, setFlashCards] = useState<FlashCards[]>([]);
  const [chosenSet, setChosenSet] = useState<Translation[]>([]);
  const [chosenPolish, setChosenPolish] = useState<boolean>(true);
  const [startFlashCards, setStartFlashCards] = useState<boolean>(true);
  const [wordSetsList, setWordSetsList] = useState<WordSetItem[]>([]);

  function handleFlashCardsButton() {
    setFlashCards(
      chosenSet.map((translation) => ({
        showAnswer: chosenPolish,
        english: translation.english,
        polish: translation.polish,
      }))
    );
    setStartFlashCards(true);
    navigation.navigate("FlashCards");
  }

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
        setStartFlashCards,
        setChosenSetName,
        setChosenPolish,
        setChosenSetId,
        wordSetsList,
        chosenSet,
        flashCards,
        handleFlashCardsButton,
      }}
    >
      {children}
    </WordSetContext.Provider>
  );
};
export { WordSetContext, WordSetProvider };
