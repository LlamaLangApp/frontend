import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useContext, useEffect, useState } from "react";
import { UpdateHandlerContext } from "../../backend/UpdateHandler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GamesStackParamList } from "../../navgation/GamesStack";

type GamesStack = NavigationProp<GamesStackParamList, "FindingWords">;

function StatisticsScreen() {
  const gamesNavigation = useNavigation<GamesStack>();
  const { onWaitRoomInvitation } = useContext(UpdateHandlerContext);
  const [toGame, setToGame] = useState("");
  const [toWaitRoom, setToWaitRoom] = useState(0);
  const [username, setUsername] = useState("");
  const [wordSetId, setWordSetId] = useState(0);

  const handleWaitRoomInvitation = (
    game: string,
    waitRoom: number,
    username: string,
    wordSetId: number
  ) => {
    console.log(
      `${username} I am further Steve... game: ${game}, waitRoom: ${waitRoom}`
    );
    setToGame(game);
    setToWaitRoom(waitRoom);
    setUsername(username);
    setWordSetId(wordSetId);
    Toast.show({
      type: "error",
      text1: `${username} invites you to play`,
      topOffset: 5,
      visibilityTime: 3000,
    });
  };

  useEffect(() => {
    return onWaitRoomInvitation(handleWaitRoomInvitation);
  }, [handleWaitRoomInvitation]);

  return (
    <View>
      <Text>Statistics</Text>
      {toGame && (
        <TouchableOpacity
          onPress={() =>
            gamesNavigation.navigate("FindingWords", {
              fromInvite: true,
              invite: {
                username: username,
                wordSetId: wordSetId,
                game: toGame,
                waitRoom: toWaitRoom,
              },
            })
          }
        >
          <Text>{toGame}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default StatisticsScreen;
