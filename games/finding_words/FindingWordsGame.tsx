import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FindingWordsStackParamList } from "./FindingWordsStack";
import { Dimensions, Text, View } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FindingWordsWebSocketContext } from "./FindingWordsWebSocket";
import ScrabbleBlock, {
  Letter,
  scrabbleBlockGap,
  scrabbleBlockSize,
} from "./FindingWordsScrabbleBlock";
import mainStyles from "../../styles/MainStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import * as ScreenOrientation from "expo-screen-orientation";
import FrontLlamaRight from "../../components/llama/FrontLlamaRight";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";

type Props = NativeStackScreenProps<FindingWordsStackParamList, "Game">;

const selectedTopPosition = 100;
const nonSelectedTopPosition = 200;

type LettersStaticPositions = {
  [id: number]: { top: number; left: number };
};

function calculatePositions(
  letters: Letter[],
  screenWidth: number
): LettersStaticPositions {
  const selected = letters.filter(({ selected }) => selected);
  const nonSelected = letters.filter(({ selected }) => !selected);

  function mapLetterToPosition(height: number) {
    return (letter: Letter, index: number, array: Letter[]) => {
      const blockSize = scrabbleBlockSize + scrabbleBlockGap;
      const blocksPerRow = (screenWidth * 0.8) / blockSize;
      const n = array.length;
      const top = height + Math.floor(index / blocksPerRow) * (blockSize + 15);
      const left = blockSize * (index - n / 2);
      return [letter.id, { top, left }];
    };
  }

  const selectedPositions = selected.map(
    mapLetterToPosition(selectedTopPosition)
  );
  const nonSelectedPositions = nonSelected.map(
    mapLetterToPosition(nonSelectedTopPosition)
  );

  return Object.fromEntries([...selectedPositions, ...nonSelectedPositions]);
}

function FindingWordsGame({ route }: Props) {
  const { letters: letterStrings } = route.params;

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    return Dimensions.addEventListener("change", ({ window }) =>
      setScreenWidth(window.width)
    ).remove;
  }, []);

  const { ws, points, round } = useContext(FindingWordsWebSocketContext);

  const [letters, setLetters] = useState<Letter[]>([]);

  const lettersStaticPositions: LettersStaticPositions = useMemo(
    () => calculatePositions(letters, screenWidth),
    [letters]
  );

  useEffect(() => {
    setLetters(
      letterStrings.map((letter, index) => ({
        id: index,
        char: letter,
        selected: false,
      }))
    );
  }, [letterStrings]);

  useEffect(() => {
    if (
      letters.filter(({ selected }) => !selected).length == 0 &&
      letters.filter(({ selected }) => selected).length != 0
    ) {
      const answer = letters
        .filter(({ selected }) => selected)
        .map(({ char: letter }) => letter)
        .join("");
      ws?.send(JSON.stringify({ type: "response", round: round - 1, answer }));
    }
  }, [letters]);

  function toggleSelectionForLetter(id: number) {
    setLetters((letters) => {
      const letter = letters.find((l) => l.id === id);
      if (!letter) {
        return letters;
      }
      return [
        ...letters.filter((l) => l.id !== id),
        { ...letter, selected: !letter.selected },
      ];
    });
  }

  function swapLetter(id: number, direction: "left" | "right") {
    setLetters((letters) => {
      const letter = letters.find((l) => l.id === id);
      if (!letter) {
        return letters;
      }

      // Find what letters to swap
      const possibleSwapTargets = letters.filter(
        (l) => l.selected === letter.selected
      );

      const candidateIndex =
        possibleSwapTargets.findIndex((l) => l.id === id) +
        (direction === "left" ? 1 : -1);

      if (candidateIndex < 0 || candidateIndex >= possibleSwapTargets.length) {
        return letters;
      }

      const swapLetter = possibleSwapTargets[candidateIndex];

      // Swap letter
      const aIndex = letters.findIndex((l) => l.id === letter.id);
      const bIndex = letters.findIndex((l) => l.id === swapLetter.id);

      const newLetters = [...letters];

      newLetters[aIndex] = letters[bIndex];
      newLetters[bIndex] = letters[aIndex];

      return newLetters;
    });
  }

  const lettersDisplay = useMemo(
    () =>
      letters.map((letter) => (
        <ScrabbleBlock
          key={letter.id}
          letter={letter}
          letterStaticPosition={lettersStaticPositions[letter.id]}
          toggleSelection={() => toggleSelectionForLetter(letter.id)}
          swapLetter={(direction) => swapLetter(letter.id, direction)}
          heightRange={[selectedTopPosition, nonSelectedTopPosition]}
        />
      )),
    [letters, lettersStaticPositions]
  );

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View
        style={{
          flex: 1.2,
          marginTop: 30,
          width: "80%",
          alignItems: "center",
        }}
      >
        <View
          style={[containerGamesStyles.textWithMargin, { marginBottom: "1%" }]}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={containerGamesStyles.differentSizeTexts}>
              <Text style={textGamesStyles.basicWeight600}>ROUND</Text>
              <Text style={textGamesStyles.biggerBasicWeight600}>{round}</Text>
            </View>
            <Text style={textGamesStyles.gameNameHorizontally}>
              FINDING WORDS
            </Text>
            <View style={containerGamesStyles.differentSizeTexts}>
              <Text style={textGamesStyles.biggerBasicWeight600}>{points}</Text>
              <Text style={textGamesStyles.basicWeight600}>POINTS</Text>
            </View>
          </View>
          <Text style={textGamesStyles.information}>
            Find the word from mixed letters
          </Text>
          <Text style={textGamesStyles.biggerBasicWeight600}>
            Word from word set:
          </Text>
        </View>
        <View
          style={[containerGamesStyles.textWithMargin, { marginBottom: "1%" }]}
        >
          <Text style={textGamesStyles.important}>FOOD</Text>
        </View>
      </View>
      <GestureHandlerRootView style={{ flex: 5 }}>
        {lettersDisplay}
      </GestureHandlerRootView>
      <FrontLlamaRight />
    </View>
  );
}

function FindingWordsGameScreen({ route, navigation }: Props) {
  const [changedOrientation, setChangedOrientation] = useState(false);

  useEffect(() => {
    (async () => {
      await ScreenOrientation.unlockAsync();
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      setChangedOrientation(true);
    })();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return changedOrientation ? (
    <FindingWordsGame navigation={navigation} route={route} />
  ) : null;
}

export default FindingWordsGameScreen;
