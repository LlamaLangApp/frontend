import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAppStore } from "../../state";
import { serverURL } from "../../backend/CommonBackend";
import { FindingWordsStackParamList } from "./FindingWordsStack";
import { NavigationProp } from "@react-navigation/native";

export const SocketGameStates = {
  justConnected: 0,
  inWaitRoomRandom: 1,
  inWaitRoomAsOwner: 2,
  inWaitRoomJoinedFriend: 3,
  beforeRound: 4,
  roundStarted: 5,
  gameEnded: 6,
};

interface FindingWordsWebSocketContextType {
  ws: WebSocket | undefined;
  setLastAnswer: Dispatch<SetStateAction<string>>;
  points: number;
  round: number;
  withFriends: boolean;
  setWithFriends: Dispatch<SetStateAction<boolean>>;
}

// export function shuffleCards<Card>(list: Card[]): Card[] {
//   return list.sort(() => Math.random() - 0.5);
// }

const FindingWordsWebSocketContext =
  createContext<FindingWordsWebSocketContextType>({
    ws: undefined,
    setLastAnswer: () => {
      return;
    },
    points: 0,
    round: 1,
    withFriends: false,
    setWithFriends: () => {
      return;
    },
  });

type FindingWordsWebSocketProviderProps = {
  children: ReactNode;
  navigation: NavigationProp<FindingWordsStackParamList>;
};

const FindingWordsWebSocketProvider = ({
  children,
  navigation,
}: FindingWordsWebSocketProviderProps) => {
  const token = useAppStore.getState().token;
  const headers = { Authorization: "Token " + token };
  const [socketGameState, setSocketGameState] = useState(
    SocketGameStates.justConnected
  );
  const [lastAnswer, setLastAnswer] = useState("");
  const [points, setPoints] = useState(0);
  const [round, setRound] = useState(0);
  const [withFriends, setWithFriends] = useState<boolean>(false);

  const [ws] = useState<WebSocket>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new WebSocket(`ws://${serverURL}/findingwords/`, null, { headers })
  );

  useEffect(() => {
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (
        socketGameState === SocketGameStates.justConnected &&
        message.type === "joined_waitroom" &&
        !withFriends
      ) {
        setSocketGameState(SocketGameStates.inWaitRoomRandom);
        navigation.navigate("WaitingRoom");
      } else if (
        socketGameState === SocketGameStates.justConnected &&
        message.type === "joined_waitroom" &&
        withFriends
      ) {
        setSocketGameState(SocketGameStates.inWaitRoomAsOwner);
        navigation.navigate("WaitingRoom");
      } else if (
        socketGameState === SocketGameStates.inWaitRoomRandom &&
        message.type === "game_starting"
      ) {
        setSocketGameState(SocketGameStates.beforeRound);
        navigation.navigate("PlayersList", { players: message.players });
      } else if (
        socketGameState === SocketGameStates.beforeRound &&
        message.type === "new_question"
      ) {
        setSocketGameState(SocketGameStates.roundStarted);
        setTimeout(() => {
          setRound((prevRound) => prevRound + 1);
          navigation.navigate("Game", {
            letters: message.letters,
          });
        }, 1500);
        // }, 300000);
      } else if (
        socketGameState === SocketGameStates.roundStarted &&
        message.type === "result"
      ) {
        setSocketGameState(SocketGameStates.beforeRound);
        setPoints(message.points);
        navigation.navigate("Answer", {
          correctAnswer: message.word,
          answer: lastAnswer,
        });
      } else if (
        socketGameState === SocketGameStates.beforeRound &&
        message.type === "final_result"
      ) {
        navigation.navigate("EndGame", {
          scoreboard: message.scoreboard,
        });
        ws.close();
      } else {
        console.error("Error: " + socketGameState + " " + event.data);
      }
    };
  });

  return (
    <FindingWordsWebSocketContext.Provider
      value={{
        ws,
        setLastAnswer,
        points,
        round,
        withFriends,
        setWithFriends,
      }}
    >
      {children}
    </FindingWordsWebSocketContext.Provider>
  );
};
export { FindingWordsWebSocketContext, FindingWordsWebSocketProvider };
