import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAppStore } from "../../state";
import { serverURL } from "../../backend";
import { RaceStackParamList } from "./RaceStack";
import { NavigationProp } from "@react-navigation/native";

export const SocketGameStates = {
  justConnected: 0,
  inWaitroom: 1,
  beforeRound: 2,
  roundStarted: 3,
  gameEnded: 4,
};

interface RaceWebSocketContextType {
  ws: WebSocket;
  setLastAnswer: Dispatch<SetStateAction<string>>;
}

const RaceWebSocketContext = createContext<RaceWebSocketContextType>({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ws: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLastAnswer: () => {},
});

interface RaceWebSocketProviderProps {
  children: ReactNode;
  navigation: NavigationProp<RaceStackParamList>;
}

const RaceWebSocketProvider = ({
  children,
  navigation,
}: RaceWebSocketProviderProps) => {
  const token = useAppStore.getState().token;
  const headers = { Authorization: "Token " + token };
  const [socketGameState, setSocketGameState] = useState(
    SocketGameStates.justConnected
  );
  const [lastAnswer, setLastAnswer] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");

  const [ws] = useState<WebSocket>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new WebSocket(`ws://${serverURL}/race/`, null, { headers })
  );

  useEffect(() => {
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (
        socketGameState === SocketGameStates.justConnected &&
        message.type === "joined_waitroom"
      ) {
        setSocketGameState(SocketGameStates.inWaitroom);
        navigation.navigate("WaitingRoom");
      } else if (
        socketGameState === SocketGameStates.inWaitroom &&
        message.type === "game_starting"
      ) {
        setSocketGameState(SocketGameStates.beforeRound);
        navigation.navigate("PlayersList", { players: message.players });
      } else if (
        socketGameState === SocketGameStates.beforeRound &&
        message.type === "new_question"
      ) {
        setSocketGameState(SocketGameStates.roundStarted);
        setLastQuestion(message.question);
        setTimeout(() => {
          navigation.navigate("Game", {
            question: message.question,
            answers: message.answers,
          });
        }, 1500);
      } else if (
        socketGameState === SocketGameStates.roundStarted &&
        message.type === "result"
      ) {
        setSocketGameState(SocketGameStates.beforeRound);
        navigation.navigate("Answer", {
          answer: lastAnswer,
          question: lastQuestion,
          correctAnswer: message.correct,
        });
      } else if (
        socketGameState === SocketGameStates.beforeRound &&
        message.type === "result"
      ) {
        console.log("Got points: " + message.points);
        ws.close();
      } else {
        console.error("Error: " + socketGameState + " " + event.data);
      }
    };
  });

  return (
    <RaceWebSocketContext.Provider value={{ ws, setLastAnswer }}>
      {children}
    </RaceWebSocketContext.Provider>
  );
};
export { RaceWebSocketContext, RaceWebSocketProvider };