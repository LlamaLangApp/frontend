import React, { createContext, ReactNode, useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAppStore } from "../../state";
import { serverURL } from "@backend/CommonBackend";
import { GamesStackParamList } from "@navigation/GamesStack";
import { FindingWordsStackParamList } from "./FindingWordsStack";
import {
  commonWebSocketDefaultValues,
  CommonWebSocketProps,
  SocketGameStates,
} from "../common/WebSocket";
import { GameInvite } from "@components/GameInvitations";

interface FindingWordsWebSocketContextType extends CommonWebSocketProps {
  leaveGame: () => void;
}

const FindingWordsWebSocketContext =
  createContext<FindingWordsWebSocketContextType>({
    ...commonWebSocketDefaultValues,
    leaveGame: () => console.log("!"),
  });

type FindingWordsWebSocketProviderProps = {
  children: ReactNode;
  navigation: NavigationProp<FindingWordsStackParamList>;
  fromInvite: boolean;
  invite: GameInvite | null;
};
type GamesStack = NavigationProp<GamesStackParamList, "Home">;

const FindingWordsWebSocketProvider = ({
  children,
  navigation,
  fromInvite,
  invite,
}: FindingWordsWebSocketProviderProps) => {
  const token = useAppStore.getState().token;
  const headers = { Authorization: "Token " + token };
  const [socketGameState, setSocketGameState] = useState(
    SocketGameStates.justConnected
  );
  const [wordSetName, setWordSetName] = useState<string>("0");
  const [points, setPoints] = useState(0);
  const [round, setRound] = useState(0);
  const [withFriends, setWithFriends] = useState<boolean>(false);
  const [usersInWaitRoom, setUsersInWaitRoom] = useState<string[]>([]);
  const parentNavigation = useNavigation<GamesStack>();

  const [ws] = useState<WebSocket>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new WebSocket(`ws://${serverURL}/findingwords/`, null, { headers })
  );

  function leaveGame() {
    parentNavigation.navigate("Home");
    ws.close();
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
        navigation.navigate("WaitingRoom");
      } else if (
        socketGameState === SocketGameStates.justConnected &&
        message.type === "joined_waitroom" &&
        withFriends
      ) {
        setSocketGameState(SocketGameStates.inWaitRoomAsOwner);
        setUsersInWaitRoom(message.usernames);
        navigation.navigate("WaitingRoom");
      } else if (
        (socketGameState === SocketGameStates.inWaitRoomRandom ||
          socketGameState === SocketGameStates.inWaitRoomAsOwner) &&
        message.type === "game_starting"
      ) {
        setSocketGameState(SocketGameStates.beforeRound);
        navigation.navigate("PlayersList", { players: usersInWaitRoom });
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
      } else if (
        socketGameState === SocketGameStates.roundStarted &&
        message.type === "result"
      ) {
        setSocketGameState(SocketGameStates.beforeRound);
        setPoints(message.points);
        navigation.navigate("Answer", {
          correctAnswer: message.word,
          answer: message.user_answer,
          earnedPoints: message.points,
        });
      } else if (
        socketGameState === SocketGameStates.beforeRound &&
        message.type === "final_result"
      ) {
        navigation.navigate("EndGame", {
          scoreboard: message.scoreboard,
        });
        ws.close();
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
    <FindingWordsWebSocketContext.Provider
      value={{
        ws,
        points,
        round,
        withFriends,
        usersInWaitRoom,
        setWithFriends,
        wordSetName,
        setWordSetName,
        fromInvite,
        invite,
        leaveGame,
      }}
    >
      {children}
    </FindingWordsWebSocketContext.Provider>
  );
};
export { FindingWordsWebSocketContext, FindingWordsWebSocketProvider };
