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
  inWaitRoom: 1,
  beforeRound: 2,
  roundStarted: 3,
  gameEnded: 4,
};

interface FindingWordsWebSocketContextType {
  ws: WebSocket | undefined;
  setLastAnswer: Dispatch<SetStateAction<string>>;
  points: number;
  round: number;
}

export function shuffleCards<Card>(list: Card[]): Card[] {
  return list.sort(() => Math.random() - 0.5);
}

const FindingWordsWebSocketContext =
  createContext<FindingWordsWebSocketContextType>({
    ws: undefined,
    setLastAnswer: () => {
      return;
    },
    points: 0,
    round: 1,
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
        message.type === "joined_waitroom"
      ) {
        setSocketGameState(SocketGameStates.inWaitRoom);
        navigation.navigate("WaitingRoom");
      } else if (
        socketGameState === SocketGameStates.inWaitRoom &&
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
      }}
    >
      {children}
    </FindingWordsWebSocketContext.Provider>
  );
};
export { FindingWordsWebSocketContext, FindingWordsWebSocketProvider };
