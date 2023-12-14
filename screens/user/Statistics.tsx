import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useContext, useEffect, useState } from "react";
import { UpdateHandlerContext } from "../../backend/UpdateHandler";
import { useAppStore } from "../../state";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GamesStackParamList } from "../../navgation/GamesStack";

type GamesStack = NavigationProp<GamesStackParamList, "FindingWords">;

function StatisticsScreen() {
  const { username } = useAppStore((store) => ({
    username: store.username,
  }));
  const gamesNavigation = useNavigation<GamesStack>();
  const { onWaitRoomInvitation } = useContext(UpdateHandlerContext);
  const [toGame, setToGame] = useState("");
  const [toWaitRoom, setToWaitRoom] = useState("");

  const handleWaitRoomInvitation = (game: string, waitRoom: string) => {
    console.log(
      `${username} I am further Steve... game: ${game}, waitRoom: ${waitRoom}`
    );
    setToGame(game);
    setToWaitRoom(waitRoom);
    Toast.show({
      type: "error",
      text1: "STEVE invites you",
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
            gamesNavigation.navigate("FindingWords", { fromInvite: true })
          }
        >
          <Text>{toGame}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default StatisticsScreen;
