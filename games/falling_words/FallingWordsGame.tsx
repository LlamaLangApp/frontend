import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FallingWordsStackParamList } from "./FallingWordsStack";
import Toast from "react-native-toast-message";
import * as ScreenOrientation from "expo-screen-orientation";
import FallingWordsCard, { Card } from "./FallingWordsCard";
import Bucket from "./FallingWordsBucket";
import textGamesStyles from "../../styles/games/TextGamesStyles";

type Props = NativeStackScreenProps<FallingWordsStackParamList, "Game">;

function FallingWordsGame({ route, navigation }: Props) {
  const { setName, wordsSetID, roundsNumber, rounds } = route.params;

  const [startTime] = useState(() => Date.now());

  const screenHeight = Dimensions.get("window").height;
  const [endRound, setEndRound] = useState(false);
  const cards = useRef<{
    [id: string]: Card;
  }>({});
  const [falling, setFalling] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [round, setRound] = useState(roundsNumber - 1);
  const [bucketPosition, setBucketPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    setEndRound(false);
    setFalling([]);
    const newCards = rounds[round].cards;
    cards.current = Object.fromEntries(
      newCards.map((card) => [card.id.toString(), card])
    );
  }, [round]);

  const isFalling = (id: string, falling: string[]) => {
    for (const fallingId of falling) {
      if (fallingId === id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFalling((falling) => {
        let fallingCount = Math.random() <= 0.33 ? 2 : 1;
        for (const id in cards.current) {
          if (!isFalling(id, falling)) {
            fallingCount -= 1;
            falling = [...falling, id];
            if (fallingCount === 0) return falling;
          }
        }
        return falling;
      });
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [round]);

  const checkCardFallen = (card: Card) => {
    return (
      card.topPosition >= screenHeight - 100 &&
      card.topPosition <= screenHeight - 50
    );
  };

  const checkInBucket = (card: Card) => {
    return (
      checkCardFallen(card) &&
      card.leftPosition - bucketPosition.left < 130 &&
      card.leftPosition - bucketPosition.left > 70
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      let allFallen = true;
      for (const id in cards.current) {
        if (checkInBucket(cards.current[id]) && !cards.current[id].fallen) {
          if (cards.current[id].word === rounds[round].mainWordCard.word) {
            Toast.show({
              type: "success",
              visibilityTime: 1600,
              text1: `Correct! ${cards.current[id].translation} = ${rounds[round].mainWordCard.word}`,
              text2: `+10pts`,
            });
            setPoints((prevState: number) => prevState + 10);
            setProgress((prevProgress) => prevProgress + 1);
          } else {
            Toast.show({
              type: "error",
              visibilityTime: 1600,
              text1: `Wrong! ${cards.current[id].translation} != ${rounds[round].mainWordCard.word}`,
            });
          }
          setEndRound(true);
        }
        if (checkCardFallen(cards.current[id])) {
          cards.current[id].fallen = true;
          console.log(
            cards.current[id].translation,
            cards.current[id].fallen,
            true
          );
        } else {
          console.log(
            cards.current[id].translation,
            cards.current[id].fallen,
            false
          );
          allFallen = false;
        }
      }
      if (allFallen) {
        setEndRound(true);
      }
      // if (Object.keys(cards).length != 0) {
      //   for (const id in cards.current) {
      //     console.log(cards.current[id].fallen);
      //     if (!cards.current[id].fallen) return;
      //   }
      //   setEndRound(true);
      // }
    }, 32);
    return () => {
      clearInterval(intervalId);
    };
  }, [bucketPosition, round]);

  useEffect(() => {
    if (endRound) {
      setTimeout(() => {
        if (round == 0) endGameHandler();
        else {
          setRound(round - 1);
        }
      }, 700);
    }
  }, [endRound]);

  function endGameHandler() {
    const endTime = Date.now();
    navigation.navigate("Results", {
      points,
      accuracy: progress / roundsNumber,
      duration: endTime - startTime,
      wordsSetID,
      setName,
    });
  }

  return (
    <View style={mainStyles.container}>
      <View
        style={{
          top: 30,
          alignItems: "center",
          position: "absolute",
        }}
      >
        <Text style={textGamesStyles.basicText}>
          Drag the bucket left and right to find the correct translation of the
          word
        </Text>
        <TouchableOpacity onPress={endGameHandler}>
          <Text style={textGamesStyles.headingText}>
            {rounds[round].mainWordCard.word}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 5,
        }}
      >
        {rounds[round].cards
          .filter((card) => isFalling(card.id.toString(), falling))
          .map((card) => {
            return <FallingWordsCard card={card} key={card.id} cards={cards} />;
          })}
      </View>
      <View style={{ flex: 2.95 }}>
        <Bucket
          setPosition={setBucketPosition}
          bucketPosition={bucketPosition}
        />
      </View>
      <Toast position="bottom" bottomOffset={8} />
    </View>
  );
}

function FallingWordsGameScreen({ route, navigation }: Props) {
  const [changedOrientation, setChangedOrientation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      ScreenOrientation.unlockAsync().then(() => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
        ).then(() => setChangedOrientation(true));
      });
    }, 1000);
  }, []);

  return changedOrientation ? (
    <FallingWordsGame navigation={navigation} route={route} />
  ) : null;
}

export default FallingWordsGameScreen;
