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
import { RaceStackParamList } from "./RaceStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GamesStackParamList } from "../../navgation/GamesStack";
import Toast from "react-native-toast-message";

export const SocketGameStates = {
  justConnected: 0,
  inWaitRoomRandom: 1,
  inWaitRoomAsOwner: 2,
  inWaitRoomJoinedFriend: 3,
  beforeRound: 4,
  roundStarted: 5,
  gameEnded: 6,
};

interface RaceWebSocketContextType {
  ws: WebSocket;
  setLastAnswer: Dispatch<SetStateAction<string>>;
  points: number;
  round: number;
  chosenCard: number;
  setChosenCard: Dispatch<SetStateAction<number>>;
  withFriends: boolean;
  setWithFriends: Dispatch<SetStateAction<boolean>>;
  usersInWaitRoom: string[];
  leaveGame: () => void;
  fromInvite: boolean;
  startGameAsOwner: () => void;
}

export function shuffleCards<Card>(list: Card[]): Card[] {
  return list.sort(() => Math.random() - 0.5);
}

const RaceWebSocketContext = createContext<RaceWebSocketContextType>({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ws: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLastAnswer: () => {},
  points: 0,
  round: 1,
  chosenCard: -1,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setChosenCard: () => {},
  withFriends: false,
  setWithFriends: () => {
    return;
  },
  usersInWaitRoom: [],
  leaveGame: () => console.log("1"),
  fromInvite: false,
  startGameAsOwner: () => console.log("1"),
});

type RaceWebSocketProviderProps = {
  children: ReactNode;
  navigation: NavigationProp<RaceStackParamList>;
  fromInvite: boolean;
};
type GamesStack = NavigationProp<GamesStackParamList, "Home">;

const RaceWebSocketProvider = ({
  children,
  navigation,
  fromInvite,
}: RaceWebSocketProviderProps) => {
  const token = useAppStore.getState().token;
  const headers = { Authorization: "Token " + token };
  const [socketGameState, setSocketGameState] = useState(
    SocketGameStates.justConnected
  );
  const [lastAnswer, setLastAnswer] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");

  const [points, setPoints] = useState(0);
  const [round, setRound] = useState(0);
  const [chosenCard, setChosenCard] = useState(-1);
  const [withFriends, setWithFriends] = useState<boolean>(false);
  const [usersInWaitRoom, setUsersInWaitRoom] = useState<string[]>([]);
  const [waitRoomNumber, setWaitRoomNumber] = useState(0);
  const parentNavigation = useNavigation<GamesStack>();

  const [ws] = useState<WebSocket>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new WebSocket(`ws://${serverURL}/race/`, null, { headers })
  );

  function startGameAsOwner() {
    setSocketGameState(SocketGameStates.beforeRound);
    navigation.navigate("PlayersList", { players: usersInWaitRoom });
  }

  function leaveGame() {
    ws.close();
    parentNavigation.navigate("Home");
  }

  useEffect(() => {
    return () => {
      ws.close();
    };
  }, [ws]);

  useEffect(() => {
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if (
        socketGameState === SocketGameStates.justConnected &&
        message.type === "joined_waitroom" &&
        !withFriends
      ) {
        setSocketGameState(SocketGameStates.inWaitRoomRandom);
        setUsersInWaitRoom(message.usernames);
        setWaitRoomNumber(message.waitroom);
        navigation.navigate("WaitingRoom");
      } else if (
        socketGameState === SocketGameStates.justConnected &&
        message.type === "joined_waitroom" &&
        withFriends
      ) {
        setSocketGameState(SocketGameStates.inWaitRoomAsOwner);
        setUsersInWaitRoom(message.usernames);
        setWaitRoomNumber(message.waitroom);
        navigation.navigate("WaitingRoom");
      } else if (
        (socketGameState === SocketGameStates.inWaitRoomRandom ||
          socketGameState === SocketGameStates.inWaitRoomAsOwner) &&
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
          setRound((prevRound) => prevRound + 1);
          navigation.navigate("Game", {
            question: message.question,
            answers: shuffleCards(message.answers),
          });
        }, 1500);
      } else if (
        socketGameState === SocketGameStates.roundStarted &&
        message.type === "result"
      ) {
        setSocketGameState(SocketGameStates.beforeRound);
        setPoints(message.points);
        navigation.navigate("Answer", {
          answer: lastAnswer,
          question: lastQuestion,
          correctAnswer: message.correct,
        });
        setChosenCard(-1);
      } else if (
        socketGameState === SocketGameStates.beforeRound &&
        message.type === "final_result"
      ) {
        navigation.navigate("EndGame", {
          scoreboard: message.scoreboard,
        });
      } else if (message.type === "player_joined") {
        Toast.show({
          type: "info",
          text1: `${message.username} joined game`,
        });
        setUsersInWaitRoom((prev) => [...prev, message.username]);
      } else if (message.type === "player_left") {
        Toast.show({
          type: "error",
          text1: `${message.username} left game`,
        });
        setUsersInWaitRoom((prev) =>
          prev.filter((username) => username !== message.username)
        );
      } else if (message.type === "waitroom_canceled") {
        console.log("WYWAL LUDZI");
      } else {
        console.error("Error: " + socketGameState + " " + event.data);
      }
    };
  });

  return (
    <RaceWebSocketContext.Provider
      value={{
        ws,
        setLastAnswer,
        points,
        round,
        chosenCard,
        setChosenCard,
        withFriends,
        setWithFriends,
        usersInWaitRoom,
        leaveGame,
        fromInvite,
        startGameAsOwner,
      }}
    >
      {children}
    </RaceWebSocketContext.Provider>
  );
};
export { RaceWebSocketContext, RaceWebSocketProvider };
